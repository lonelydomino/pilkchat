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
      include: {
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if current user is following this user
    let isFollowing = false
    if (currentUserId && currentUserId !== user.id) {
      const follow = await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: user.id,
          },
        },
      })
      isFollowing = !!follow
    }

    const profile = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      location: user.location,
      website: user.website,
      image: user.image,
      createdAt: user.createdAt,
      _count: user._count,
      isFollowing,
      isOwnProfile: currentUserId === user.id,
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
} 