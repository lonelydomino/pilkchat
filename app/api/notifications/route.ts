import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 most recent notifications
    })

    // Transform notifications to include related data
    const notificationsWithData = await Promise.all(
      notifications.map(async (notification) => {
        let relatedUser = null
        let relatedPost = null

        if (notification.relatedUserId) {
          relatedUser = await prisma.user.findUnique({
            where: { id: notification.relatedUserId },
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          })
        }

        if (notification.relatedPostId) {
          relatedPost = await prisma.post.findUnique({
            where: { id: notification.relatedPostId },
            select: {
              id: true,
              content: true,
            },
          })
        }

        return {
          id: notification.id,
          type: notification.type,
          message: notification.message,
          read: notification.read,
          createdAt: notification.createdAt,
          relatedUser,
          relatedPost,
        }
      })
    )

    return NextResponse.json({ notifications: notificationsWithData })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, message, userId, relatedUserId, relatedPostId } = await request.json()
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        type,
        message,
        userId,
        relatedUserId,
        relatedPostId,
      },
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
} 