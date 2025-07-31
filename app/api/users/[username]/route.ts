import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma, withRetry, cleanupPrisma, createPrismaClient } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  let username: string = ''
  let session: any = null
  let currentUserId: string | undefined = undefined
  
  try {
    console.log('USER PROFILE: Fetching profile for username:', params.username)
    
    username = params.username
    session = await getServerSession(authOptions)
    currentUserId = session?.user?.id

    console.log('USER PROFILE: Current user ID:', currentUserId)

    // Find user by username with retry logic
    const user = await withRetry(async (client) => {
      return await client.user.findUnique({
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
    }, 3, 500) // Increased delay for user profile queries

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
        const follow = await withRetry(async (client) => {
          return await client.follows.findUnique({
            where: {
              followerId_followingId: {
                followerId: currentUserId as string,
                followingId: user.id,
              },
            },
          })
        }, 2, 300) // Shorter retry for follow check
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
    
    // Try fallback approach with direct client
    try {
      console.log('USER PROFILE: 🔄 Trying fallback approach...')
      
      // Validate we have the required data
      if (!username) {
        throw new Error('Missing username for fallback')
      }
      
      const fallbackClient = createPrismaClient()
      
      const fallbackUser = await fallbackClient.user.findUnique({
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
      
      if (!fallbackUser) {
        await fallbackClient.$disconnect()
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      
      // Check follow status with fallback client
      let isFollowing = false
      if (currentUserId && currentUserId !== fallbackUser.id) {
        try {
          const follow = await fallbackClient.follows.findUnique({
            where: {
              followerId_followingId: {
                followerId: currentUserId as string,
                followingId: fallbackUser.id,
              },
            },
          })
          isFollowing = !!follow
        } catch (followError) {
          console.warn('USER PROFILE: Failed to check follow status in fallback:', followError)
        }
      }
      
      await fallbackClient.$disconnect()
      
      const fallbackProfile = {
        id: fallbackUser.id,
        name: fallbackUser.name,
        username: fallbackUser.username,
        email: fallbackUser.email,
        bio: fallbackUser.bio,
        location: fallbackUser.location,
        website: fallbackUser.website,
        image: fallbackUser.image,
        createdAt: fallbackUser.createdAt,
        _count: fallbackUser._count,
        isFollowing,
        isOwnProfile: currentUserId === fallbackUser.id,
      }
      
      console.log('USER PROFILE: ✅ Profile fetched with fallback for:', fallbackUser.username)
      return NextResponse.json(fallbackProfile)
    } catch (fallbackError) {
      console.error('USER PROFILE: ❌ Fallback also failed:', fallbackError)
      return NextResponse.json(
        { error: 'Failed to fetch user profile', details: 'Database connection issues. Please try again.' },
        { status: 500 }
      )
    }
  } finally {
    try {
      await cleanupPrisma()
    } catch (cleanupError) {
      console.error('USER PROFILE: ❌ Error during cleanup:', cleanupError)
    }
  }
} 