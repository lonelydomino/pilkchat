import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 PREPARED STATEMENTS TEST: Starting test...')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'Please log in to test prepared statements'
      }, { status: 401 })
    }

    console.log('🧪 PREPARED STATEMENTS TEST: User authenticated:', session.user.id)

    // Test multiple database operations in sequence to trigger prepared statement conflicts
    const results = {
      userCount: 0,
      postCount: 0,
      notificationCount: 0,
      commentCount: 0,
      likeCount: 0,
      bookmarkCount: 0
    }

    console.log('🧪 PREPARED STATEMENTS TEST: Testing user count...')
    results.userCount = await withRetry(async (client) => {
      return await client.user.count()
    }, 3, 200)

    console.log('🧪 PREPARED STATEMENTS TEST: Testing post count...')
    results.postCount = await withRetry(async (client) => {
      return await client.post.count()
    }, 3, 200)

    console.log('🧪 PREPARED STATEMENTS TEST: Testing notification count...')
    results.notificationCount = await withRetry(async (client) => {
      return await client.notification.count()
    }, 3, 200)

    console.log('🧪 PREPARED STATEMENTS TEST: Testing comment count...')
    results.commentCount = await withRetry(async (client) => {
      return await client.comment.count()
    }, 3, 200)

    console.log('🧪 PREPARED STATEMENTS TEST: Testing like count...')
    results.likeCount = await withRetry(async (client) => {
      return await client.like.count()
    }, 3, 200)

    console.log('🧪 PREPARED STATEMENTS TEST: Testing bookmark count...')
    results.bookmarkCount = await withRetry(async (client) => {
      return await client.bookmark.count()
    }, 3, 200)

    console.log('🧪 PREPARED STATEMENTS TEST: All operations completed successfully!')
    console.log('🧪 PREPARED STATEMENTS TEST: Results:', results)

    return NextResponse.json({
      success: true,
      user: {
        id: session.user.id,
        username: session.user.username
      },
      results,
      message: 'Prepared statement test completed successfully - no conflicts detected!'
    })
    
  } catch (error) {
    console.error('🧪 PREPARED STATEMENTS TEST: ❌ Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Prepared statement test failed'
    }, { status: 500 })
  } finally {
    console.log('🧪 PREPARED STATEMENTS TEST: 🧹 Cleaning up...')
    await cleanupPrisma()
    console.log('🧪 PREPARED STATEMENTS TEST: ✅ Cleanup completed')
  }
} 