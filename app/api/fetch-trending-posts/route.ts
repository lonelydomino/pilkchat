import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  console.log('📈 TRENDING POSTS: GET request started')
  console.log('📈 TRENDING POSTS: Request URL:', request.url)
  
  try {
    const session = await getServerSession(authOptions)
    console.log('📈 TRENDING POSTS: 👤 Session user:', session?.user?.id || 'No session')

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    console.log('📈 TRENDING POSTS: 📊 Pagination params:', { page, limit, offset })

    console.log('📈 TRENDING POSTS: 🔍 Fetching trending posts...')
    
    const posts = await withRetry(async (client) => {
      return await client.post.findMany({
        where: {
          // Get posts with likes in the last 7 days
          likes: {
            some: {
              createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              }
            }
          }
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              image: true
            }
          },
          likes: {
            select: {
              userId: true
            }
          },
          comments: {
            select: {
              id: true
            }
          },
          reposts: {
            select: {
              id: true
            }
          },
          bookmarks: {
            where: {
              userId: session?.user?.id
            },
            select: {
              id: true
            }
          }
        },
        orderBy: [
          {
            likes: {
              _count: 'desc'
            }
          },
          {
            createdAt: 'desc'
          }
        ],
        skip: offset,
        take: limit
      })
    })

    console.log('📈 TRENDING POSTS: ✅ Found', posts.length, 'trending posts')

    // Get total count for pagination
    console.log('📈 TRENDING POSTS: 🔍 Counting total trending posts...')
    const totalCount = await withRetry(async (client) => {
      return await client.post.count({
        where: {
          likes: {
            some: {
              createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              }
            }
          }
        }
      })
    })

    console.log('📈 TRENDING POSTS: ✅ Total count:', totalCount)

    // Transform posts to include like status for current user
    const transformedPosts = posts.map(post => ({
      ...post,
      isLiked: post.likes.some(like => like.userId === session?.user?.id),
      isBookmarked: post.bookmarks.length > 0,
      likeCount: post.likes.length,
      commentCount: post.comments.length,
      repostCount: post.reposts.length,
      likes: undefined, // Remove the likes array from response
      comments: undefined, // Remove the comments array from response
      reposts: undefined, // Remove the reposts array from response
      bookmarks: undefined // Remove the bookmarks array from response
    }))

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('📈 TRENDING POSTS: ❌ Error fetching trending posts:', error)
    console.error('📈 TRENDING POSTS: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })

    return NextResponse.json(
      { error: 'Failed to fetch trending posts' },
      { status: 500 }
    )
  } finally {
    console.log('📈 TRENDING POSTS: 🧹 Cleaning up Prisma connection...')
    await cleanupPrisma()
    console.log('📈 TRENDING POSTS: ✅ Cleanup completed')
  }
}

export async function POST(request: NextRequest) {
  console.log('📈 TRENDING POSTS: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 