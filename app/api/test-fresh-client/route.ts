import { NextRequest, NextResponse } from 'next/server'
import { withRetry, executeRawQuery } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 FRESH CLIENT TEST: Starting test...')
    
    // Test 1: Simple user count with fresh client
    const userCount = await withRetry(async (client) => {
      return await client.user.count()
    })
    
    console.log('🧪 FRESH CLIENT TEST: User count:', userCount)
    
    // Test 2: Raw SQL query
    const rawResult = await executeRawQuery<{ count: string }>('SELECT COUNT(*) as count FROM users')
    console.log('🧪 FRESH CLIENT TEST: Raw SQL count:', rawResult[0]?.count)
    
    // Test 3: Multiple operations in sequence
    const results = await Promise.all([
      withRetry(async (client) => client.user.count()),
      withRetry(async (client) => client.post.count()),
      withRetry(async (client) => client.notification.count()),
    ])
    
    console.log('🧪 FRESH CLIENT TEST: Multiple operations:', {
      users: results[0],
      posts: results[1],
      notifications: results[2]
    })
    
    return NextResponse.json({
      success: true,
      userCount,
      rawCount: rawResult[0]?.count,
      multipleOperations: {
        users: results[0],
        posts: results[1],
        notifications: results[2]
      },
      message: 'Fresh client approach working correctly'
    })
    
  } catch (error) {
    console.error('🧪 FRESH CLIENT TEST: ❌ Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Fresh client approach failed'
    }, { status: 500 })
  }
} 