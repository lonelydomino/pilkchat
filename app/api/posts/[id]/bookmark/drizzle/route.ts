import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { bookmarks, posts } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔖 BOOKMARK DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('🔖 BOOKMARK DRIZZLE: 👤 User ID:', userId)
    console.log('🔖 BOOKMARK DRIZZLE: 📝 Post ID:', postId)

    // Check if post exists
    const postData = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)

    if (!postData || postData.length === 0) {
      console.log('🔖 BOOKMARK DRIZZLE: ❌ Post not found')
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Check if user already bookmarked this post
    const existingBookmark = await db
      .select()
      .from(bookmarks)
      .where(
        and(
          eq(bookmarks.postId, postId),
          eq(bookmarks.userId, userId)
        )
      )
      .limit(1)

    if (existingBookmark.length > 0) {
      // Remove bookmark
      console.log('🔖 BOOKMARK DRIZZLE: 🔄 Removing bookmark...')
      await db
        .delete(bookmarks)
        .where(
          and(
            eq(bookmarks.postId, postId),
            eq(bookmarks.userId, userId)
          )
        )

      console.log('🔖 BOOKMARK DRIZZLE: ✅ Bookmark removed')
      return NextResponse.json({
        bookmarked: false,
        message: 'Bookmark removed'
      })
    } else {
      // Add bookmark
      console.log('🔖 BOOKMARK DRIZZLE: 🔖 Adding bookmark...')
      await db
        .insert(bookmarks)
        .values({
          postId,
          userId,
        })

      console.log('🔖 BOOKMARK DRIZZLE: ✅ Post bookmarked')
      return NextResponse.json({
        bookmarked: true,
        message: 'Post bookmarked'
      })
    }

  } catch (error) {
    console.error('🔖 BOOKMARK DRIZZLE: ❌ Error toggling bookmark:', error)
    
    return NextResponse.json({
      error: 'Failed to toggle bookmark',
      message: 'Unable to bookmark/unbookmark at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET() {
  console.log('🔖 BOOKMARK DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 