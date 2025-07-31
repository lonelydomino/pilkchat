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

    console.log('👥 FOLLOWING DRIZZLE: Fetching following for username:', username)
    console.log('👥 FOLLOWING DRIZZLE: Current user ID:', currentUserId)

    if (!username) {
      console.log('👥 FOLLOWING DRIZZLE: ❌ No username provided')
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // Get the user
    console.log('👥 FOLLOWING DRIZZLE: 🔍 Looking up user...')
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
      console.log('👥 FOLLOWING DRIZZLE: ❌ User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = userData[0]
    console.log('👥 FOLLOWING DRIZZLE: ✅ User found:', user.username)

    // Get following with their info
    console.log('👥 FOLLOWING DRIZZLE: 🔍 Fetching following...')
    const followingData = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        image: users.image,
        bio: users.bio,
        createdAt: follows.createdAt,
      })
      .from(follows)
      .innerJoin(users, eq(follows.followingId, users.id))
      .where(eq(follows.followerId, user.id))

    console.log('👥 FOLLOWING DRIZZLE: ✅ Found', followingData.length, 'following')

    // Check if current user is following each following
    const followingWithFollowStatus = await Promise.all(
      followingData.map(async (following) => {
        let isFollowing = false

        if (currentUserId && currentUserId !== following.id) {
          const followData = await db
            .select()
            .from(follows)
            .where(
              and(
                eq(follows.followerId, currentUserId),
                eq(follows.followingId, following.id)
              )
            )
            .limit(1)

          isFollowing = followData.length > 0
        }

        return {
          ...following,
          isFollowing,
          isCurrentUser: currentUserId === following.id,
        }
      })
    )

    console.log('👥 FOLLOWING DRIZZLE: ✅ Following with follow status prepared')
    
    return NextResponse.json({
      following: followingWithFollowStatus,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
      }
    })

  } catch (error) {
    console.error('👥 FOLLOWING DRIZZLE: ❌ Error fetching following:', error)
    
    return NextResponse.json({
      following: [],
      error: 'Failed to fetch following',
      message: 'Unable to load following at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('👥 FOLLOWING DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 