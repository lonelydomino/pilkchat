import { NextRequest, NextResponse } from 'next/server'
import { withRetry, cleanupPrisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('📝 FETCH POSTS: GET request started')
    console.log('📝 FETCH POSTS: Request URL:', request.url)
    
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    console.log('📝 FETCH POSTS: 📊 Pagination params:', { page, limit, offset })
    console.log('📝 FETCH POSTS: 👤 Session user:', session?.user?.id || 'No session')

    console.log('📝 FETCH POSTS: 🔍 Fetching posts...')
    const posts = await withRetry(async (client) => {
      return await client.post.findMany({
        where: {
          published: true,
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
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: limit,
      })
    }, 3, 200)

    console.log('📝 FETCH POSTS: ✅ Found', posts.length, 'posts')

    console.log('📝 FETCH POSTS: 🔍 Counting total posts...')
    const totalCount = await withRetry(async (client) => {
      return await client.post.count({
        where: {
          published: true,
        },
      })
    }, 3, 200)

    console.log('📝 FETCH POSTS: ✅ Total count:', totalCount)

    const response = NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })

    // Add cache control headers to prevent caching issues
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('📝 FETCH POSTS: ❌ Error fetching posts:', error)
    console.error('📝 FETCH POSTS: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({
      posts: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
      message: 'Unable to fetch posts at this time'
    }, { status: 200 })
  } finally {
    console.log('📝 FETCH POSTS: 🧹 Cleaning up Prisma connection...')
    await cleanupPrisma()
    console.log('📝 FETCH POSTS: ✅ Cleanup completed')
  }
}

export async function POST() {
  console.log('📝 FETCH POSTS: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 