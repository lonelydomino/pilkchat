import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { sendNotificationToUser } from '@/lib/notification-stream'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Use retry logic for database queries
    const [notifications, totalCount] = await withRetry(async () => {
      const [notifs, count] = await Promise.all([
        prisma.notification.findMany({
          where: {
            userId: session.user.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: offset,
          take: limit,
        }),
        prisma.notification.count({
          where: {
            userId: session.user.id,
          },
        })
      ])
      return [notifs, count]
    }, 3, 200)

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    
    // Return fallback response instead of 500 error
    return NextResponse.json({
      notifications: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
      message: 'Unable to fetch notifications at this time'
    }, { status: 200 })
  } finally {
    await cleanupPrisma()
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { type, message, userId, relatedUserId, postId } = await request.json()

    // Use retry logic for creating notification
    const notification = await withRetry(async () => {
      return await prisma.notification.create({
        data: {
          type,
          message,
          userId,
          relatedUserId,
          relatedPostId: postId,
        },
      })
    }, 3, 200)

    // Send real-time notification
    try {
      sendNotificationToUser(userId, {
        type: 'new_notification',
        notification: {
          id: notification.id,
          type: notification.type,
          message: notification.message,
          createdAt: notification.createdAt,
          read: notification.read,
          relatedUserId: notification.relatedUserId,
        },
      })
    } catch (streamError) {
      console.error('Error sending real-time notification:', streamError)
      // Don't fail the request if real-time notification fails
    }

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 