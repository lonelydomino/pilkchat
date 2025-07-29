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

    // Get followers with their follow status
    const followers = await prisma.follows.findMany({
      where: {
        followingId: user.id,
      },
      include: {
        follower: {
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

    // Check if current user is following each follower
    const followersWithStatus = await Promise.all(
      followers.map(async (follow) => {
        let isFollowing = false
        if (currentUserId && currentUserId !== follow.follower.id) {
          const currentUserFollow = await prisma.follows.findUnique({
            where: {
              followerId_followingId: {
                followerId: currentUserId,
                followingId: follow.follower.id,
              },
            },
          })
          isFollowing = !!currentUserFollow
        }

        return {
          id: follow.follower.id,
          name: follow.follower.name,
          username: follow.follower.username,
          image: follow.follower.image,
          bio: follow.follower.bio,
          isFollowing,
        }
      })
    )

    return NextResponse.json({ followers: followersWithStatus })
  } catch (error) {
    console.error('Error fetching followers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch followers' },
      { status: 500 }
    )
  }
} 