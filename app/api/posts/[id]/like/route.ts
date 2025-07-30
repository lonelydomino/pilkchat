import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { sendNotificationToUser } from '@/lib/notification-stream'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      })

      return NextResponse.json({ 
        success: true, 
        liked: false 
      })
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      })

      // Get post details for notification
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      })

      // Only send notification if the post author is not the same as the user liking
      if (post && post.authorId !== userId) {
        // Create notification
        const notification = await prisma.notification.create({
          data: {
            type: 'like',
            message: `${session.user.name} liked your post`,
            userId: post.authorId,
            relatedUserId: userId,
            relatedPostId: postId,
          },
        })

        // Send real-time notification
        sendNotificationToUser(post.authorId, {
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
      }

      return NextResponse.json({ 
        success: true, 
        liked: true 
      })
    }
  } catch (error) {
    console.error('Error liking/unliking post:', error)
    return NextResponse.json(
      { error: 'Failed to like/unlike post' },
      { status: 500 }
    )
  }
} 