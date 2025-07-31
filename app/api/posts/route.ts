import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('📝 POSTS: GET request started')
    console.log('📝 POSTS: Request URL:', request.url)
    
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    console.log('📝 POSTS: 📊 Pagination params:', { page, limit, offset })
    console.log('📝 POSTS: 👤 Session user:', session?.user?.id || 'No session')

    console.log('📝 POSTS: 🔍 Fetching posts...')
    const posts = await withRetry(async () => {
      return await prisma.post.findMany({
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

    console.log('📝 POSTS: ✅ Found', posts.length, 'posts')

    console.log('📝 POSTS: 🔍 Counting total posts...')
    const totalCount = await withRetry(async () => {
      return await prisma.post.count({
        where: {
          published: true,
        },
      })
    }, 3, 200)

    console.log('📝 POSTS: ✅ Total count:', totalCount)

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('📝 POSTS: ❌ Error fetching posts:', error)
    console.error('📝 POSTS: ❌ Error details:', {
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
    console.log('📝 POSTS: 🧹 Cleaning up Prisma connection...')
    await cleanupPrisma()
    console.log('📝 POSTS: ✅ Cleanup completed')
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('📝 POSTS: POST request started')
    console.log('📝 POSTS: Request URL:', request.url)
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('📝 POSTS: ❌ No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('📝 POSTS: ✅ User authenticated:', session.user.id, 'Username:', session.user.username)

    const body = await request.json()
    const { content, published = true } = body

    console.log('📝 POSTS: 📝 Creating post with content length:', content?.length || 0)
    console.log('📝 POSTS: 📊 Post data:', { content: content?.substring(0, 100) + '...', published })

    console.log('📝 POSTS: 🔍 Creating post in database...')
    const post = await withRetry(async () => {
      return await prisma.post.create({
        data: {
          content,
          published,
          authorId: session.user.id,
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
      })
    }, 3, 200)

    console.log('📝 POSTS: ✅ Post created successfully, ID:', post.id)
    return NextResponse.json(post)
  } catch (error) {
    console.error('📝 POSTS: ❌ Error creating post:', error)
    console.error('📝 POSTS: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to create post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    console.log('📝 POSTS: 🧹 Cleaning up Prisma connection...')
    await cleanupPrisma()
    console.log('📝 POSTS: ✅ Cleanup completed')
  }
} 