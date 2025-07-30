import { NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection with retry logic
    const result = await withRetry(async () => {
      return await prisma.$queryRaw`SELECT 1 as test`
    }, 3, 100)

    return NextResponse.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  } finally {
    await cleanupPrisma()
  }
} 