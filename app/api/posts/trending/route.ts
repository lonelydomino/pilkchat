import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    // Get trending posts with engagement metrics
    const trendingPosts = await withRetry(async (client) => {
      return await client.post.findMany({
        where: {
          published: true,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
              reposts: true,
            },
          },
        },
        orderBy: [
          {
            likes: {
              _count: 'desc',
            },
          },
          {
            comments: {
              _count: 'desc',
            },
          },
          {
            createdAt: 'desc',
          },
        ],
        take: 20,
      })
    }, 3, 200)

    // Calculate trending score and add interaction status
    const postsWithScore = await Promise.all(
      trendingPosts.map(async (post) => {
        // Calculate trending score based on engagement and recency
        const hoursSinceCreation = (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60)
        const engagementScore = post._count.likes + (post._count.comments * 2) + (post._count.reposts * 3)
        const trendingScore = engagementScore / Math.pow(hoursSinceCreation + 2, 1.5) // Gravity factor

        // Check if current user has interacted with this post
        let isLiked = false
        let isReposted = false

        if (currentUserId) {
          const [like, repost] = await Promise.all([
            withRetry(async (client) => {
              return await client.like.findUnique({
                where: {
                  userId_postId: {
                    userId: currentUserId,
                    postId: post.id,
                  },
                },
              })
            }, 3, 200),
            withRetry(async (client) => {
              return await client.repost.findUnique({
                where: {
                  userId_postId: {
                    userId: currentUserId,
                    postId: post.id,
                  },
                },
              })
            }, 3, 200),
          ])

          isLiked = !!like
          isReposted = !!repost
        }

        return {
          ...post,
          trendingScore,
          isLiked,
          isReposted,
        }
      })
    )

    // Sort by trending score
    postsWithScore.sort((a, b) => b.trendingScore - a.trendingScore)

    return NextResponse.json({
      posts: postsWithScore.slice(0, 10), // Return top 10 trending posts
    })
  } catch (error) {
    console.error('Error fetching trending posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending posts' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 