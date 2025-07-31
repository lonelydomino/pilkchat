import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { db } from '@/lib/db'
import { posts, users } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('📝 FETCH POSTS DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    console.log('📝 FETCH POSTS DRIZZLE: 📊 Pagination params:', { page, limit, offset })
    console.log('📝 FETCH POSTS DRIZZLE: 👤 Session user:', session?.user?.id || 'No session')

    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Fetching posts...')
    
    // Fetch posts with Drizzle - much simpler!
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
      .limit(limit)
      .offset(offset)

    console.log('📝 FETCH POSTS DRIZZLE: ✅ Found', postsData.length, 'posts')

    // Get total count
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Counting total posts...')
    const totalCountResult = await db
      .select({ count: posts.id })
      .from(posts)
      .where(eq(posts.published, true))

    const totalCount = totalCountResult.length

    console.log('📝 FETCH POSTS DRIZZLE: ✅ Total count:', totalCount)

    // Transform the data to match the expected format
    const transformedPosts = postsData.map(post => ({
      ...post,
      _count: {
        likes: 0, // We'll add these counts later if needed
        comments: 0,
        reposts: 0,
      },
      isLiked: false, // We'll add these flags later if needed
      isReposted: false,
      isBookmarked: false,
    }))

    const response = NextResponse.json({
      posts: transformedPosts,
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
    console.error('📝 FETCH POSTS DRIZZLE: ❌ Error fetching posts:', error)
    
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
  }
}

export async function POST() {
  console.log('📝 FETCH POSTS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 