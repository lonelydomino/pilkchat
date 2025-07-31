import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { posts, users, likes, reposts } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔥 TRENDING POSTS DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    console.log('🔥 TRENDING POSTS DRIZZLE: 👤 Current user ID:', currentUserId)

    // Get posts with author info
    console.log('🔥 TRENDING POSTS DRIZZLE: 🔍 Fetching trending posts...')
    const postsData = await db
      .select({
        id: posts.id,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        },
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(20)

    console.log('🔥 TRENDING POSTS DRIZZLE: ✅ Found', postsData.length, 'posts')

    // Get interaction counts and status for each post
    const postsWithInteractions = await Promise.all(
      postsData.map(async (post) => {
        // Get like count
        const likeCount = await db
          .select({ count: likes.id })
          .from(likes)
          .where(eq(likes.postId, post.id))

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
        }

        return {
          ...post,
          _count: {
            likes: likeCount.length,
            comments: 0, // TODO: Add comments
            reposts: repostCount.length,
          },
          isLiked,
          isReposted,
          isBookmarked,
        }
      })
    )

    console.log('🔥 TRENDING POSTS DRIZZLE: ✅ Posts with interactions prepared')

    const response = NextResponse.json({
      posts: postsWithInteractions,
    })

    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response

  } catch (error) {
    console.error('🔥 TRENDING POSTS DRIZZLE: ❌ Error fetching trending posts:', error)
    
    return NextResponse.json({
      posts: [],
      error: 'Failed to fetch trending posts',
      message: 'Unable to load trending posts at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('🔥 TRENDING POSTS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 