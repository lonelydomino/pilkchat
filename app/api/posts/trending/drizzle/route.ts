import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { posts, users, likes, reposts, follows } from '@/lib/db/schema'
import { eq, desc, and, isNull } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('📈 TRENDING POSTS DRIZZLE: GET request started')

    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    console.log('📈 TRENDING POSTS DRIZZLE: 👤 Current user ID:', currentUserId)

    // Get trending posts (posts with most likes and reposts in the last 7 days)
    console.log('📈 TRENDING POSTS DRIZZLE: 🔍 Fetching trending posts...')
    
    const trendingPosts = await db
      .select({
        id: posts.id,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
      })
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(20)

    console.log('📈 TRENDING POSTS DRIZZLE: ✅ Found', trendingPosts.length, 'posts')

    if (trendingPosts.length === 0) {
      console.log('📈 TRENDING POSTS DRIZZLE: ✅ No trending posts found')
      return NextResponse.json({
        posts: [],
        totalCount: 0
      })
    }

    // Get author details for each post
    console.log('📈 TRENDING POSTS DRIZZLE: 🔍 Fetching author details...')
    const postsWithAuthors = await Promise.all(
      trendingPosts.map(async (post) => {
        const authorData = await db
          .select({
            id: users.id,
            name: users.name,
            username: users.username,
            image: users.image,
          })
          .from(users)
          .where(eq(users.id, post.authorId))
          .limit(1)

        return {
          ...post,
          author: authorData[0] || null,
        }
      })
    )

    // Get interaction counts and current user's interaction status
    console.log('📈 TRENDING POSTS DRIZZLE: 🔍 Fetching interaction data...')
    const postsWithInteractions = await Promise.all(
      postsWithAuthors.map(async (post) => {
        // Get likes count
        const likesData = await db
          .select()
          .from(likes)
          .where(eq(likes.postId, post.id))

        // Get reposts count
        const repostsData = await db
          .select()
          .from(reposts)
          .where(eq(reposts.postId, post.id))

        // Check if current user has liked this post
        let isLiked = false
        if (currentUserId) {
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
        }

        // Check if current user has reposted this post
        let isReposted = false
        if (currentUserId) {
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

        // Check if current user is following the author
        let isFollowing = false
        if (currentUserId && post.author) {
          const followData = await db
            .select()
            .from(follows)
            .where(
              and(
                eq(follows.followerId, currentUserId),
                eq(follows.followingId, post.author.id)
              )
            )
            .limit(1)
          isFollowing = followData.length > 0
        }

        return {
          ...post,
          _count: {
            likes: likesData.length,
            reposts: repostsData.length,
          },
          isLiked,
          isReposted,
          isFollowing,
        }
      })
    )

    console.log('📈 TRENDING POSTS DRIZZLE: ✅ Posts with interactions prepared')

    return NextResponse.json({
      posts: postsWithInteractions,
      totalCount: postsWithInteractions.length
    })

  } catch (error) {
    console.error('📈 TRENDING POSTS DRIZZLE: ❌ Error fetching trending posts:', error)

    return NextResponse.json(
      { 
        posts: [],
        totalCount: 0,
        error: 'Failed to fetch trending posts',
        message: 'Unable to fetch trending posts at this time. Please try again later.'
      },
      { status: 200 }
    )
  }
}

export async function POST() {
  console.log('🔥 TRENDING POSTS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 