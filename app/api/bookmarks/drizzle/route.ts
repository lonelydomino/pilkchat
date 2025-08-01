import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { bookmarks, posts, users, likes, reposts } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔖 BOOKMARKS DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔖 BOOKMARKS DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('🔖 BOOKMARKS DRIZZLE: 👤 User ID:', userId)

    // Get bookmarked posts with author info
    console.log('🔖 BOOKMARKS DRIZZLE: 🔍 Fetching bookmarked posts...')
    const bookmarkedPosts = await db
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
      .from(bookmarks)
      .innerJoin(posts, eq(bookmarks.postId, posts.id))
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(
        and(
          eq(bookmarks.userId, userId),
          eq(posts.published, true)
        )
      )
      .orderBy(desc(bookmarks.createdAt))

    console.log('🔖 BOOKMARKS DRIZZLE: ✅ Found', bookmarkedPosts.length, 'bookmarked posts')
    console.log('🔖 BOOKMARKS DRIZZLE: 🔍 Sample bookmarked posts with mediaUrls:', bookmarkedPosts.slice(0, 3).map(p => ({
      id: p.id,
      content: p.content?.substring(0, 50) + '...',
      mediaUrls: p.mediaUrls,
      hasMediaUrls: p.mediaUrls?.length > 0,
      author: p.author?.username
    })))

    // Get interaction counts and status for each post
    const postsWithInteractions = await Promise.all(
      bookmarkedPosts.map(async (post) => {
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
        let isBookmarked = true // Already bookmarked

        // Check like status
        const userLike = await db
          .select()
          .from(likes)
          .where(
            and(
              eq(likes.postId, post.id),
              eq(likes.userId, userId)
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
              eq(reposts.userId, userId)
            )
          )
          .limit(1)

        isReposted = userRepost.length > 0

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

    console.log('🔖 BOOKMARKS DRIZZLE: ✅ Posts with interactions prepared')

    const response = NextResponse.json({
      posts: postsWithInteractions,
    })

    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response

  } catch (error) {
    console.error('🔖 BOOKMARKS DRIZZLE: ❌ Error fetching bookmarks:', error)
    
    return NextResponse.json({
      posts: [],
      error: 'Failed to fetch bookmarks',
      message: 'Unable to load bookmarks at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('🔖 BOOKMARKS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 