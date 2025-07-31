import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { reposts, posts } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔄 REPOST DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('🔄 REPOST DRIZZLE: 👤 User ID:', userId)
    console.log('🔄 REPOST DRIZZLE: 📝 Post ID:', postId)

    // Check if post exists
    const postData = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)

    if (!postData || postData.length === 0) {
      console.log('🔄 REPOST DRIZZLE: ❌ Post not found')
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Check if user already reposted this post
    const existingRepost = await db
      .select()
      .from(reposts)
      .where(
        and(
          eq(reposts.postId, postId),
          eq(reposts.userId, userId)
        )
      )
      .limit(1)

    if (existingRepost.length > 0) {
      // Remove repost
      console.log('🔄 REPOST DRIZZLE: 🔄 Removing repost...')
      await db
        .delete(reposts)
        .where(
          and(
            eq(reposts.postId, postId),
            eq(reposts.userId, userId)
          )
        )

      console.log('🔄 REPOST DRIZZLE: ✅ Repost removed')
      return NextResponse.json({
        reposted: false,
        message: 'Repost removed'
      })
    } else {
      // Add repost
      console.log('🔄 REPOST DRIZZLE: 🔄 Adding repost...')
      await db
        .insert(reposts)
        .values({
          postId,
          userId,
        })

      console.log('🔄 REPOST DRIZZLE: ✅ Post reposted')
      return NextResponse.json({
        reposted: true,
        message: 'Post reposted'
      })
    }

  } catch (error) {
    console.error('🔄 REPOST DRIZZLE: ❌ Error toggling repost:', error)
    
    return NextResponse.json({
      error: 'Failed to toggle repost',
      message: 'Unable to repost/unrepost at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET() {
  console.log('🔄 REPOST DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 