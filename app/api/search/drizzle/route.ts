import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { users, posts } from '@/lib/db/schema'
import { eq, like, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 SEARCH DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all' // 'users', 'posts', 'all'

    console.log('🔍 SEARCH DRIZZLE: 🔍 Query:', query)
    console.log('🔍 SEARCH DRIZZLE: 📋 Type:', type)

    if (!query.trim()) {
      console.log('🔍 SEARCH DRIZZLE: ❌ No query provided')
      return NextResponse.json({
        users: [],
        posts: [],
        message: 'No search query provided'
      })
    }

    const searchTerm = `%${query.trim()}%`
    const results: any = { users: [], posts: [] }

    // Search users
    if (type === 'users' || type === 'all') {
      console.log('🔍 SEARCH DRIZZLE: 👥 Searching users...')
      const usersData = await db
        .select({
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
          bio: users.bio,
        })
        .from(users)
        .where(
          like(users.username, searchTerm)
        )
        .limit(10)

      results.users = usersData
      console.log('🔍 SEARCH DRIZZLE: ✅ Found', usersData.length, 'users')
    }

    // Search posts
    if (type === 'posts' || type === 'all') {
      console.log('🔍 SEARCH DRIZZLE: 📝 Searching posts...')
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
          like(posts.content, searchTerm)
        )
        .orderBy(desc(posts.createdAt))
        .limit(10)

      results.posts = postsData
      console.log('🔍 SEARCH DRIZZLE: ✅ Found', postsData.length, 'posts')
    }

    console.log('🔍 SEARCH DRIZZLE: ✅ Search completed')

    // Transform results to match frontend expectations
    const transformedResults = []
    
    // Add users as search results
    results.users.forEach((user: any) => {
      transformedResults.push({
        type: 'user',
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          image: user.image,
          bio: user.bio,
          isFollowing: false // TODO: Add actual following status
        }
      })
    })
    
    // Add posts as search results
    results.posts.forEach((post: any) => {
      transformedResults.push({
        type: 'post',
        post: {
          id: post.id,
          content: post.content,
          createdAt: post.createdAt,
          author: post.author,
          _count: {
            likes: 0, // TODO: Add actual counts
            comments: 0,
            reposts: 0
          },
          isLiked: false, // TODO: Add actual status
          isReposted: false,
          isBookmarked: false
        }
      })
    })

    const response = NextResponse.json({
      results: transformedResults
    })

    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response

  } catch (error) {
    console.error('🔍 SEARCH DRIZZLE: ❌ Error searching:', error)
    
    return NextResponse.json({
      users: [],
      posts: [],
      error: 'Failed to search',
      message: 'Unable to search at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('🔍 SEARCH DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 