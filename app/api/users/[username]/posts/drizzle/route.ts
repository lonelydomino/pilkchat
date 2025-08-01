import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { users, posts, likes, reposts, bookmarks } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    console.log('👤 USER POSTS DRIZZLE: Fetching posts for username:', username)
    console.log('👤 USER POSTS DRIZZLE: Current user ID:', currentUserId)

    if (!username) {
      console.log('👤 USER POSTS DRIZZLE: ❌ No username provided')
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // First, get the user
    console.log('👤 USER POSTS DRIZZLE: 🔍 Looking up user...')
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
      console.log('👤 USER POSTS DRIZZLE: ❌ User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = userData[0]
    console.log('👤 USER POSTS DRIZZLE: ✅ User found:', user.username)

    // Get posts by this user
    console.log('👤 USER POSTS DRIZZLE: 🔍 Fetching posts...')
    const postsData = await db
      .select({
        id: posts.id,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
        mediaUrls: posts.mediaUrls,
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        },
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(
        and(
          eq(posts.authorId, user.id),
          eq(posts.published, true)
        )
      )
      .orderBy(desc(posts.createdAt))

    console.log('👤 USER POSTS DRIZZLE: ✅ Found', postsData.length, 'posts')

    // Get interaction counts and status for each post
    const postsWithInteractions = await Promise.all(
      postsData.map(async (post) => {
        // Get like count
        const likeCount = await db
          .select({ count: likes.id })
          .from(likes)
          .where(eq(likes.postId, post.id))

        // Get comment count (we'll add this later)
        const commentCount = 0 // TODO: Add comments table

        // Get repost count
        const repostCount = await db
          .select({ count: reposts.id })
          .from(reposts)
          .where(eq(reposts.postId, post.id))

        // Check if current user has interacted with this post
        let isLiked = false
        let isReposted = false
        let isBookmarked = false

        if (currentUserId) {
          // Check like status
          const userLike = await db
            .select()
            .from(likes)
            .where(
              and(
                eq(likes.postId, post.id),
                eq(likes.userId, currentUserId)
              )
            )
            .limit(1)

          isLiked = userLike.length > 0

          // Check repost status
          const userRepost = await db
            .select()
            .from(reposts)
            .where(
              and(
                eq(reposts.postId, post.id),
                eq(reposts.userId, currentUserId)
              )
            )
            .limit(1)

          isReposted = userRepost.length > 0

          // Check bookmark status
          const userBookmark = await db
            .select()
            .from(bookmarks)
            .where(
              and(
                eq(bookmarks.postId, post.id),
                eq(bookmarks.userId, currentUserId)
              )
            )
            .limit(1)

          isBookmarked = userBookmark.length > 0
        }

        return {
          ...post,
          _count: {
            likes: likeCount.length,
            comments: commentCount,
            reposts: repostCount.length,
          },
          isLiked,
          isReposted,
          isBookmarked,
        }
      })
    )

    console.log('👤 USER POSTS DRIZZLE: ✅ Posts with interactions prepared')
    
    return NextResponse.json({
      posts: postsWithInteractions,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
      }
    })

  } catch (error) {
    console.error('👤 USER POSTS DRIZZLE: ❌ Error fetching user posts:', error)
    
    return NextResponse.json({
      posts: [],
      error: 'Failed to fetch user posts',
      message: 'Unable to load user posts at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('👤 USER POSTS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 