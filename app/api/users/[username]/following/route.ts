import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get following with their follow status
    const following = await prisma.follows.findMany({
      where: {
        followerId: user.id,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Check if current user is following each user in the following list
    const followingWithStatus = await Promise.all(
      following.map(async (follow) => {
        let isFollowing = false
        if (currentUserId && currentUserId !== follow.following.id) {
          const currentUserFollow = await prisma.follows.findUnique({
            where: {
              followerId_followingId: {
                followerId: currentUserId,
                followingId: follow.following.id,
              },
            },
          })
          isFollowing = !!currentUserFollow
        }

        return {
          id: follow.following.id,
          name: follow.following.name,
          username: follow.following.username,
          image: follow.following.image,
          bio: follow.following.bio,
          isFollowing,
        }
      })
    )

    return NextResponse.json({ following: followingWithStatus })
  } catch (error) {
    console.error('Error fetching following:', error)
    return NextResponse.json(
      { error: 'Failed to fetch following' },
      { status: 500 }
    )
  }
} 