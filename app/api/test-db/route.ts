import { NextResponse } from 'next/server'
import { prisma, executeRawQuery, cleanupPrisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test 1: Simple Prisma query
    const userCount = await prisma.user.count()
    
    // Test 2: Raw SQL query
    const rawResult = await executeRawQuery<{ count: string }>('SELECT COUNT(*) as count FROM "User"')
    
    // Test 3: Check database version
    const versionResult = await executeRawQuery<{ version: string }>('SELECT version() as version')
    
    return NextResponse.json({
      status: 'success',
      tests: {
        prismaUserCount: userCount,
        rawUserCount: parseInt(rawResult[0]?.count || '0'),
        databaseVersion: versionResult[0]?.version,
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test failed:', error)
    
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await cleanupPrisma()
  }
} 