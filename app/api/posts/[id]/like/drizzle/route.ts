import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { likes, posts, notifications, users } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { sendNotificationToUser } from '@/lib/notification-stream'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('👍 LIKE DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('👍 LIKE DRIZZLE: 👤 User ID:', userId)
    console.log('👍 LIKE DRIZZLE: 📝 Post ID:', postId)

    // Check if post exists
    const postData = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)

    if (!postData || postData.length === 0) {
      console.log('👍 LIKE DRIZZLE: ❌ Post not found')
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Check if user already liked this post
    const existingLike = await db
      .select()
      .from(likes)
      .where(
        and(
          eq(likes.postId, postId),
          eq(likes.userId, userId)
        )
      )
      .limit(1)

    if (existingLike.length > 0) {
      // Unlike the post
      console.log('👍 LIKE DRIZZLE: 🔄 Unliking post...')
      await db
        .delete(likes)
        .where(
          and(
            eq(likes.postId, postId),
            eq(likes.userId, userId)
          )
        )

      console.log('👍 LIKE DRIZZLE: ✅ Post unliked')
      return NextResponse.json({
        liked: false,
        message: 'Post unliked'
      })
    } else {
      // Like the post
      console.log('👍 LIKE DRIZZLE: ❤️ Liking post...')
      await db
        .insert(likes)
        .values({
          postId,
          userId,
        })

      // Create notification for post author (if not liking own post)
      const post = postData[0]
      if (post.authorId !== userId) {
        try {
          console.log('👍 LIKE DRIZZLE: 🔔 Creating notification...')
          
          // Get the user who liked the post
          const [likingUser] = await db
            .select({
              id: users.id,
              name: users.name,
              username: users.username,
            })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)

          // Create notification
          const [newNotification] = await db
            .insert(notifications)
            .values({
              userId: post.authorId,
              type: 'like',
              message: `${likingUser?.name || 'Someone'} liked your post`,
              relatedUserId: userId,
              relatedPostId: postId,
              read: false,
              createdAt: new Date(),
            })
            .returning()

          console.log('👍 LIKE DRIZZLE: ✅ Notification created:', newNotification.id)

          // Send real-time notification
          sendNotificationToUser(post.authorId, {
            type: 'new_notification',
            notification: {
              id: newNotification.id,
              type: 'like',
              message: `${likingUser?.name || 'Someone'} liked your post`,
              createdAt: newNotification.createdAt,
            }
          })
        } catch (error) {
          console.error('👍 LIKE DRIZZLE: ❌ Error creating notification:', error)
        }
      }

      console.log('👍 LIKE DRIZZLE: ✅ Post liked')
      return NextResponse.json({
        liked: true,
        message: 'Post liked'
      })
    }

  } catch (error) {
    console.error('👍 LIKE DRIZZLE: ❌ Error toggling like:', error)
    
    return NextResponse.json({
      error: 'Failed to toggle like',
      message: 'Unable to like/unlike post at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET() {
  console.log('👍 LIKE DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 