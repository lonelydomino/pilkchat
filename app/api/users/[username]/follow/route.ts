import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { sendNotificationToUser } from '@/lib/notification-stream'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const currentUserId = session.user.id

    // Find user to follow/unfollow
    const userToFollow = await withRetry(async (client) => {
      return await client.user.findUnique({
        where: { username },
      })
    }, 3, 200)

    if (!userToFollow) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent following yourself
    if (currentUserId === userToFollow.id) {
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      )
    }

    // Check if already following
    const existingFollow = await withRetry(async (client) => {
      return await client.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: userToFollow.id,
          },
        },
      })
    }, 3, 200)

    if (existingFollow) {
      // Unfollow
      await withRetry(async (client) => {
        return await client.follows.delete({
          where: {
            followerId_followingId: {
              followerId: currentUserId,
              followingId: userToFollow.id,
            },
          },
        })
      }, 3, 200)

      return NextResponse.json({ 
        success: true, 
        action: 'unfollowed',
        message: `You unfollowed ${userToFollow.name}`
      })
    } else {
      // Follow
      await withRetry(async (client) => {
        return await client.follows.create({
          data: {
            followerId: currentUserId,
            followingId: userToFollow.id,
          },
        })
      }, 3, 200)

      // Create notification for the user being followed
      const notification = await withRetry(async (client) => {
        return await client.notification.create({
          data: {
            type: 'follow',
            message: `${session.user.name} started following you`,
            userId: userToFollow.id,
            relatedUserId: currentUserId,
          },
        })
      }, 3, 200)

      // Send real-time notification
      sendNotificationToUser(userToFollow.id, {
        type: 'new_notification',
        notification: {
          id: notification.id,
          type: notification.type,
          message: notification.message,
          createdAt: notification.createdAt,
          read: notification.read,
          relatedUserId: session.user.id,
        },
      })

      return NextResponse.json({ 
        success: true, 
        action: 'followed',
        message: `You are now following ${userToFollow.name}`
      })
    }
  } catch (error) {
    console.error('Error following/unfollowing user:', error)
    return NextResponse.json(
      { error: 'Failed to follow/unfollow user' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 