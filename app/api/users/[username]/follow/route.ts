import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { sendNotificationToUser } from '../../../notifications/stream/route'

const prisma = new PrismaClient()

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
    const userToFollow = await prisma.user.findUnique({
      where: { username },
    })

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
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: userToFollow.id,
        },
      },
    })

    if (existingFollow) {
      // Unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: userToFollow.id,
          },
        },
      })

      return NextResponse.json({ 
        success: true, 
        action: 'unfollowed',
        message: `You unfollowed ${userToFollow.name}`
      })
    } else {
      // Follow
      await prisma.follows.create({
        data: {
          followerId: currentUserId,
          followingId: userToFollow.id,
        },
      })

      // Create notification for the user being followed
      const notification = await prisma.notification.create({
        data: {
          type: 'follow',
          message: `${session.user.name} started following you`,
          userId: userToFollow.id,
          relatedUserId: currentUserId,
        },
      })

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
  }
} 