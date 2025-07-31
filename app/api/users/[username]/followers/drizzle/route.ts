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

    console.log('👥 FOLLOWERS DRIZZLE: Fetching followers for username:', username)
    console.log('👥 FOLLOWERS DRIZZLE: Current user ID:', currentUserId)

    if (!username) {
      console.log('👥 FOLLOWERS DRIZZLE: ❌ No username provided')
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // Get the user
    console.log('👥 FOLLOWERS DRIZZLE: 🔍 Looking up user...')
    const userData = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        image: users.image,
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (!userData || userData.length === 0) {
      console.log('👥 FOLLOWERS DRIZZLE: ❌ User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = userData[0]
    console.log('👥 FOLLOWERS DRIZZLE: ✅ User found:', user.username)

    // Get followers with their info
    console.log('👥 FOLLOWERS DRIZZLE: 🔍 Fetching followers...')
    const followersData = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        image: users.image,
        bio: users.bio,
        createdAt: follows.createdAt,
      })
      .from(follows)
      .innerJoin(users, eq(follows.followerId, users.id))
      .where(eq(follows.followingId, user.id))

    console.log('👥 FOLLOWERS DRIZZLE: ✅ Found', followersData.length, 'followers')

    // Check if current user is following each follower
    const followersWithFollowStatus = await Promise.all(
      followersData.map(async (follower) => {
        let isFollowing = false

        if (currentUserId && currentUserId !== follower.id) {
          const followData = await db
            .select()
            .from(follows)
            .where(
              and(
                eq(follows.followerId, currentUserId),
                eq(follows.followingId, follower.id)
              )
            )
            .limit(1)

          isFollowing = followData.length > 0
        }

        return {
          ...follower,
          isFollowing,
          isCurrentUser: currentUserId === follower.id,
        }
      })
    )

    console.log('👥 FOLLOWERS DRIZZLE: ✅ Followers with follow status prepared')
    
    return NextResponse.json({
      followers: followersWithFollowStatus,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
      }
    })

  } catch (error) {
    console.error('👥 FOLLOWERS DRIZZLE: ❌ Error fetching followers:', error)
    
    return NextResponse.json({
      followers: [],
      error: 'Failed to fetch followers',
      message: 'Unable to load followers at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('👥 FOLLOWERS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 