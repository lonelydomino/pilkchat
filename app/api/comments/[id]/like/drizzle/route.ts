import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { commentLikes, comments } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💭 COMMENT LIKE DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    
    console.log('💭 COMMENT LIKE DRIZZLE: 👤 User ID:', userId)
    console.log('💭 COMMENT LIKE DRIZZLE: 💭 Comment ID:', commentId)

    // Check if comment exists
    console.log('💭 COMMENT LIKE DRIZZLE: 🔍 Checking if comment exists...')
    const commentData = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1)

    if (!commentData || commentData.length === 0) {
      console.log('💭 COMMENT LIKE DRIZZLE: ❌ Comment not found')
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Check if user already liked this comment
    console.log('💭 COMMENT LIKE DRIZZLE: 🔍 Checking existing like...')
    const existingLike = await db
      .select()
      .from(commentLikes)
      .where(
        and(
          eq(commentLikes.commentId, commentId),
          eq(commentLikes.userId, userId)
        )
      )
      .limit(1)

    if (existingLike.length > 0) {
      // Unlike the comment
      console.log('💭 COMMENT LIKE DRIZZLE: ❌ Removing like...')
      await db
        .delete(commentLikes)
        .where(
          and(
            eq(commentLikes.commentId, commentId),
            eq(commentLikes.userId, userId)
          )
        )
      
      console.log('💭 COMMENT LIKE DRIZZLE: ✅ Like removed')
      
      return NextResponse.json({
        success: true,
        message: 'Comment unliked',
        isLiked: false
      })
    } else {
      // Like the comment
      console.log('💭 COMMENT LIKE DRIZZLE: ❤️ Adding like...')
      await db
        .insert(commentLikes)
        .values({
          commentId,
          userId,
        })
      
      console.log('💭 COMMENT LIKE DRIZZLE: ✅ Like added')
      
      return NextResponse.json({
        success: true,
        message: 'Comment liked',
        isLiked: true
      })
    }

  } catch (error) {
    console.error('💭 COMMENT LIKE DRIZZLE: ❌ Error toggling comment like:', error)
    
    return NextResponse.json({
      error: 'Failed to toggle comment like',
      message: 'Unable to update like status at this time. Please try again later.'
    }, { status: 200 })
  }
} 