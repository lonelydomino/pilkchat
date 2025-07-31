import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 BOOKMARKS TEST: Test endpoint called!')
    console.log('🧪 BOOKMARKS TEST: URL:', request.url)
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🧪 BOOKMARKS TEST: ❌ No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🧪 BOOKMARKS TEST: ✅ User authenticated:', session.user.id)

    // Simple test query
    console.log('🧪 BOOKMARKS TEST: 🔍 Testing simple database query...')
    const bookmarkCount = await withRetry(async () => {
      return await prisma.bookmark.count({
        where: {
          userId: session.user.id,
        },
      })
    }, 3, 200)

    console.log('🧪 BOOKMARKS TEST: ✅ Query successful, bookmark count:', bookmarkCount)

    return NextResponse.json({
      success: true,
      message: 'Bookmarks test successful',
      userId: session.user.id,
      bookmarkCount: bookmarkCount,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('🧪 BOOKMARKS TEST: ❌ Error:', error)
    console.error('🧪 BOOKMARKS TEST: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Bookmarks test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 