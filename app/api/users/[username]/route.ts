import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    console.log('USER PROFILE: Fetching profile for username:', params.username)
    
    const username = params.username
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    console.log('USER PROFILE: Current user ID:', currentUserId)

    // Find user by username with retry logic
    const user = await withRetry(async () => {
      return await prisma.user.findUnique({
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
    }, 3, 200)

    if (!user) {
      console.log('USER PROFILE: User not found:', username)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('USER PROFILE: User found:', user.username)

    // Check if current user is following this user
    let isFollowing = false
    if (currentUserId && currentUserId !== user.id) {
      try {
        const follow = await withRetry(async () => {
          return await prisma.follows.findUnique({
            where: {
              followerId_followingId: {
                followerId: currentUserId,
                followingId: user.id,
              },
            },
          })
        }, 3, 200)
        isFollowing = !!follow
      } catch (followError) {
        console.warn('USER PROFILE: Failed to check follow status:', followError)
        // Don't fail the entire request if follow check fails
      }
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

    console.log('USER PROFILE: Returning profile for:', user.username)
    return NextResponse.json(profile)
  } catch (error) {
    console.error('USER PROFILE: Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 