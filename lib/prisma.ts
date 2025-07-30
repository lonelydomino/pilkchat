import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Add connection pooling configuration for serverless
  __internal: {
    engine: {
      connectionLimit: 1,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper function to handle prepared statement errors
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error: any) {
      if (error?.meta?.code === '42P05' && i < maxRetries - 1) {
        // Prepared statement already exists error - wait and retry
        await new Promise(resolve => setTimeout(resolve, 100 * (i + 1)))
        continue
      }
      throw error
    }
  }
  throw new Error('Max retries exceeded')
} 