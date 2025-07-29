import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ users: [] })
    }

    const searchTerm = query.trim()

    // Search users by name or username
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            username: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
        // Exclude the current user from search results
        id: {
          not: currentUserId,
        },
      },
      include: {
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
      take: 20, // Limit results
      orderBy: [
        {
          followers: {
            _count: 'desc',
          },
        },
        {
          posts: {
            _count: 'desc',
          },
        },
      ],
    })

    // Add follow status for each user
    const usersWithFollowStatus = await Promise.all(
      users.map(async (user) => {
        let isFollowing = false
        
        if (currentUserId) {
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

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          bio: user.bio,
          image: user.image,
          _count: user._count,
          isFollowing,
        }
      })
    )

    return NextResponse.json({ users: usersWithFollowStatus })
  } catch (error) {
    console.error('Error searching users:', error)
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    )
  }
} 