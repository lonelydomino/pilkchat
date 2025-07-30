import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Serverless-specific configuration
  __internal: {
    engine: {
      connectionLimit: 1,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Enhanced retry function with exponential backoff
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 100
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error: any) {
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