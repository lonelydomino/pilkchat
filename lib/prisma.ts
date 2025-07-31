import { PrismaClient } from '@prisma/client'

// Create a fresh Prisma client instance for each operation
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Optimize for serverless environments
    __internal: {
      engine: {
        binaryPath: undefined,
      },
    },
  })
}

// Enhanced retry function with fresh client instances
export async function withRetry<T>(
  operation: (client: PrismaClient) => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 100
): Promise<T> {
  let client: PrismaClient | null = null
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      // Create a fresh client for each attempt
      client = createPrismaClient()
      const result = await operation(client)
      
      // Clean up the client
      await client.$disconnect()
      return result
      
    } catch (error: any) {
      // Clean up client on error
      if (client) {
        try {
          await client.$disconnect()
        } catch (disconnectError) {
          console.error('Error disconnecting client:', disconnectError)
        }
      }
      
      const isPreparedStatementError = error?.meta?.code === '42P05' || 
                                     error?.message?.includes('prepared statement') ||
                                     error?.message?.includes('already exists')
      
      if (isPreparedStatementError && i < maxRetries - 1) {
        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, i) + Math.random() * 100
        console.log(`Prepared statement error, retrying in ${delay}ms (attempt ${i + 1}/${maxRetries})`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      throw error
    }
  }
  throw new Error('Max retries exceeded')
}

// Raw SQL helper with fresh client
export async function executeRawQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  const client = createPrismaClient()
  try {
    return await client.$queryRawUnsafe(query, ...params)
  } catch (error) {
    console.error('Raw query error:', error)
    throw error
  } finally {
    await client.$disconnect()
  }
}

// Safe database operation that uses fresh clients
export async function safeDatabaseOperation<T>(
  operation: (client: PrismaClient) => Promise<T>,
  fallbackOperation?: (client: PrismaClient) => Promise<T>
): Promise<T> {
  try {
    return await withRetry(operation)
  } catch (error: any) {
    if (fallbackOperation) {
      console.log('Primary operation failed, trying fallback...')
      try {
        return await withRetry(fallbackOperation)
      } catch (fallbackError) {
        console.error('Fallback operation also failed:', fallbackError)
        throw fallbackError
      }
    }
    throw error
  }
}

// Legacy client for backward compatibility (not recommended for new code)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Connection cleanup for serverless environments
export async function cleanupPrisma() {
  try {
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error disconnecting Prisma:', error)
  }
}

// Graceful shutdown handler
if (typeof window === 'undefined') {
  process.on('beforeExit', cleanupPrisma)
  process.on('SIGINT', cleanupPrisma)
  process.on('SIGTERM', cleanupPrisma)
} 