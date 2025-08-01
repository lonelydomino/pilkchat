import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
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
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Full session:', session)

    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Fetching posts...')
    
    // Fetch posts with Drizzle - much simpler!
    let postsData
    try {
      postsData = await db
        .select({
          id: posts.id,
          content: posts.content,
          published: posts.published,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          authorId: posts.authorId,
          mediaUrls: posts.mediaUrls,
        })
        .from(posts)
        .where(eq(posts.published, true))
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset)

      console.log('📝 FETCH POSTS DRIZZLE: ✅ Found', postsData.length, 'posts')
      console.log('📝 FETCH POSTS DRIZZLE: 🔍 Posts data sample:', postsData.slice(0, 3).map(p => ({ id: p.id, hasId: !!p.id, idType: typeof p.id })))
      
      // Additional validation of the data
      const invalidPosts = postsData.filter(p => !p || !p.id || typeof p.id !== 'string' || p.id.trim() === '')
      if (invalidPosts.length > 0) {
        console.warn('📝 FETCH POSTS DRIZZLE: ⚠️ Found invalid posts:', invalidPosts.length)
        console.warn('📝 FETCH POSTS DRIZZLE: ⚠️ Invalid posts sample:', invalidPosts.slice(0, 3))
      }
    } catch (error) {
      console.error('📝 FETCH POSTS DRIZZLE: ❌ Error fetching posts from database:', error)
      postsData = []
    }

    // Fetch author details for each post
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Fetching author details...')
    const postsWithAuthors = await Promise.all(
      postsData
        .filter(post => post && post.id) // Filter out posts without IDs before processing
        .map(async (post) => {
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

    console.log('📝 FETCH POSTS DRIZZLE: ✅ Found', postsWithAuthors.length, 'posts')

    // Get total count
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Counting total posts...')
    const totalCountResult = await db
      .select({ count: posts.id })
      .from(posts)
      .where(eq(posts.published, true))

    const totalCount = totalCountResult.length

    console.log('📝 FETCH POSTS DRIZZLE: ✅ Total count:', totalCount)

    // Transform the data to match the expected format
    const transformedPosts = postsWithAuthors
      .filter(post => {
        const isValid = post && post.id && typeof post.id === 'string' && post.id.trim() !== ''
        if (!isValid) {
          console.warn('📝 FETCH POSTS DRIZZLE: ⚠️ Skipping invalid post in transformation:', post)
        }
        return isValid
      })
      .map(post => {
        try {
          let mediaUrls = []
          try {
            if (post.mediaUrls && Array.isArray(post.mediaUrls)) {
              mediaUrls = post.mediaUrls
            } else if (post.mediaUrls && typeof post.mediaUrls === 'string' && post.mediaUrls.trim() !== '') {
              // Try to parse as JSON first, then as comma-separated string
              try {
                mediaUrls = JSON.parse(post.mediaUrls)
              } catch {
                // If JSON parsing fails, try comma-separated string
                mediaUrls = post.mediaUrls.split(',').filter(url => url.trim() !== '')
              }
            }
          } catch (error) {
            console.log('📝 FETCH POSTS DRIZZLE: ⚠️ Error parsing mediaUrls for post', post.id, ':', error)
            mediaUrls = []
          }

          return {
            ...post,
            mediaUrls,
            _count: {
              likes: 0, // We'll add these counts later if needed
              comments: 0,
              reposts: 0,
            },
            isLiked: false, // We'll add these flags later if needed
            isReposted: false,
            isBookmarked: false,
          }
        } catch (error) {
          console.error('📝 FETCH POSTS DRIZZLE: ❌ Error transforming post:', post, error)
          return null
        }
      })
      .filter(Boolean) // Remove any null entries from transformation errors

    console.log('📝 FETCH POSTS DRIZZLE: 🔍 First transformed post:', transformedPosts[0])
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 First post author:', transformedPosts[0]?.author)
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 All posts IDs:', transformedPosts.map(p => ({ id: p.id, hasId: !!p.id })))
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Posts without IDs:', transformedPosts.filter(p => !p.id).length)
    
    // Final safety check - ensure no posts without IDs are returned
    const finalPosts = transformedPosts.filter(post => post && post.id && typeof post.id === 'string' && post.id.trim() !== '')
    console.log('📝 FETCH POSTS DRIZZLE: 🔍 Final posts count:', finalPosts.length, 'out of', transformedPosts.length)
    
    const response = NextResponse.json({
      posts: finalPosts,
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