import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    const hashtagName = decodeURIComponent(params.name).toLowerCase()

    // Get hashtag info
    const hashtag = await withRetry(async (client) => {
      return await client.hashtag.findUnique({
        where: { name: hashtagName },
        include: {
          _count: {
            select: {
              posts: true
            }
          }
        }
      })
    }, 3, 200)

    if (!hashtag) {
      return NextResponse.json(
        { error: 'Hashtag not found' },
        { status: 404 }
      )
    }

    // Get posts with this hashtag
    const posts = await withRetry(async (client) => {
      return await client.post.findMany({
        where: {
          hashtags: {
            some: {
              hashtag: {
                name: hashtagName
              }
            }
          },
          published: true
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true
            }
          },
          _count: {
            select: {
              comments: true,
              likes: true,
              reposts: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: offset,
        take: limit
      })
    }, 3, 200)

    // Add interaction status for each post
    const postsWithStatus = await Promise.all(
      posts.map(async (post) => {
        let isLiked = false
        let isReposted = false
        let isBookmarked = false

        if (userId) {
          const [like, repost, bookmark] = await Promise.all([
            withRetry(async (client) => {
              return await client.like.findUnique({
                where: {
                  userId_postId: {
                    userId,
                    postId: post.id
                  }
                }
              })
            }, 3, 200),
            withRetry(async (client) => {
              return await client.repost.findUnique({
                where: {
                  userId_postId: {
                    userId,
                    postId: post.id
                  }
                }
              })
            }, 3, 200),
            withRetry(async (client) => {
              return await client.bookmark.findUnique({
                where: {
                  userId_postId: {
                    userId,
                    postId: post.id
                  }
                }
              })
            }, 3, 200)
          ])

          isLiked = !!like
          isReposted = !!repost
          isBookmarked = !!bookmark
        }

        return {
          ...post,
          isLiked,
          isReposted,
          isBookmarked
        }
      })
    )

    const totalPosts = await withRetry(async (client) => {
      return await client.post.count({
        where: {
          hashtags: {
            some: {
              hashtag: {
                name: hashtagName
              }
            }
          },
          published: true
        }
      })
    }, 3, 200)

    return NextResponse.json({
      hashtag,
      posts: postsWithStatus,
      pagination: {
        page,
        limit,
        total: totalPosts,
        totalPages: Math.ceil(totalPosts / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching hashtag posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hashtag posts' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 