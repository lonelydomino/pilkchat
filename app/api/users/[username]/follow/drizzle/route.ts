import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { users, follows } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('👥 FOLLOW DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const currentUserId = session.user.id
    console.log('👥 FOLLOW DRIZZLE: 👤 Current user ID:', currentUserId)
    console.log('👥 FOLLOW DRIZZLE: 🎯 Target username:', username)

    if (!username) {
      console.log('👥 FOLLOW DRIZZLE: ❌ No username provided')
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // Get the target user
    const targetUserData = await db
      .select({
        id: users.id,
        username: users.username,
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (!targetUserData || targetUserData.length === 0) {
      console.log('👥 FOLLOW DRIZZLE: ❌ Target user not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const targetUser = targetUserData[0]

    // Prevent self-following
    if (currentUserId === targetUser.id) {
      console.log('👥 FOLLOW DRIZZLE: ❌ Cannot follow yourself')
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      )
    }

    // Check if already following
    const existingFollow = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.followerId, currentUserId),
          eq(follows.followingId, targetUser.id)
        )
      )
      .limit(1)

    if (existingFollow.length > 0) {
      // Unfollow
      console.log('👥 FOLLOW DRIZZLE: 🔄 Unfollowing user...')
      await db
        .delete(follows)
        .where(
          and(
            eq(follows.followerId, currentUserId),
            eq(follows.followingId, targetUser.id)
          )
        )

      console.log('👥 FOLLOW DRIZZLE: ✅ User unfollowed')
      return NextResponse.json({
        following: false,
        message: `Unfollowed ${targetUser.username}`
      })
    } else {
      // Follow
      console.log('👥 FOLLOW DRIZZLE: ➕ Following user...')
      await db
        .insert(follows)
        .values({
          followerId: currentUserId,
          followingId: targetUser.id,
        })

      console.log('👥 FOLLOW DRIZZLE: ✅ User followed')
      return NextResponse.json({
        following: true,
        message: `Started following ${targetUser.username}`
      })
    }

  } catch (error) {
    console.error('👥 FOLLOW DRIZZLE: ❌ Error toggling follow:', error)
    
    return NextResponse.json({
      error: 'Failed to toggle follow',
      message: 'Unable to follow/unfollow user at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET() {
  console.log('👥 FOLLOW DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 