import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { users, follows } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    console.log('👤 USER PROFILE DRIZZLE: Fetching profile for username:', username)
    console.log('👤 USER PROFILE DRIZZLE: Current user ID:', currentUserId)

    if (!username) {
      console.log('👤 USER PROFILE DRIZZLE: ❌ No username provided')
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // Fetch user profile with Drizzle
    const userData = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        image: users.image,
        bio: users.bio,
        location: users.location,
        website: users.website,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (!userData || userData.length === 0) {
      console.log('👤 USER PROFILE DRIZZLE: ❌ User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = userData[0]
    console.log('👤 USER PROFILE DRIZZLE: ✅ User found:', user.username)

    // Check if current user is following this user
    let isFollowing = false
    if (currentUserId && currentUserId !== user.id) {
      console.log('👤 USER PROFILE DRIZZLE: 🔍 Checking follow status...')
      
      const followData = await db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.followerId, currentUserId),
            eq(follows.followingId, user.id)
          )
        )
        .limit(1)

      isFollowing = followData.length > 0
      console.log('👤 USER PROFILE DRIZZLE: 👥 Is following:', isFollowing)
    }

    // Get follower and following counts
    console.log('👤 USER PROFILE DRIZZLE: 🔍 Getting follower counts...')
    
    const [followerCount] = await db
      .select({ count: follows.id })
      .from(follows)
      .where(eq(follows.followingId, user.id))

    const [followingCount] = await db
      .select({ count: follows.id })
      .from(follows)
      .where(eq(follows.followerId, user.id))

    const profile = {
      ...user,
      _count: {
        followers: followerCount?.count || 0,
        following: followingCount?.count || 0,
      },
      isFollowing,
      isCurrentUser: currentUserId === user.id,
    }

    console.log('👤 USER PROFILE DRIZZLE: ✅ Profile data prepared')
    
    return NextResponse.json({ profile })

  } catch (error) {
    console.error('👤 USER PROFILE DRIZZLE: ❌ Error fetching user profile:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch user profile',
      message: 'Unable to load user profile at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('👤 USER PROFILE DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 