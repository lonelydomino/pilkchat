import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { posts, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('📝 CREATE POST DRIZZLE: POST request started')
    
    const session = await getServerSession(authOptions)
    console.log('📝 CREATE POST DRIZZLE: 🔍 Session data:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      username: session?.user?.username,
      email: session?.user?.email,
      sessionData: session
    })
    
    // Also check the request headers for auth info
    const authHeader = request.headers.get('authorization')
    const cookieHeader = request.headers.get('cookie')
    console.log('📝 CREATE POST DRIZZLE: 🔍 Request headers:', {
      hasAuthHeader: !!authHeader,
      hasCookieHeader: !!cookieHeader,
      cookieHeader: cookieHeader?.substring(0, 100) + '...'
    })
    
    // For testing, allow creating posts without session if user ID is provided in request body
    const { content, mediaUrls = [], userId } = await request.json()
    
    console.log('📝 CREATE POST DRIZZLE: 📝 Received data:', { content, mediaUrls, userId })
    
    let authorId = session?.user?.id || userId
    
    if (!authorId) {
      console.log('📝 CREATE POST DRIZZLE: ❌ No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    if (!content || content.trim().length === 0) {
      console.log('📝 CREATE POST DRIZZLE: ❌ No content provided')
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    console.log('📝 CREATE POST DRIZZLE: 👤 Author ID:', authorId)
    console.log('📝 CREATE POST DRIZZLE: 📝 Content length:', content.length)
    
    // Verify user exists in database
    const userExists = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, authorId))
      .limit(1)
    
    console.log('📝 CREATE POST DRIZZLE: 🔍 User exists in DB:', userExists.length > 0)
    if (userExists.length === 0) {
      console.log('📝 CREATE POST DRIZZLE: ❌ User not found in database')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Test database connection
    try {
      const testQuery = await db.select({ count: posts.id }).from(posts).limit(1)
      console.log('📝 CREATE POST DRIZZLE: ✅ Database connection test successful')
    } catch (dbError) {
      console.error('📝 CREATE POST DRIZZLE: ❌ Database connection test failed:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Create post with Drizzle - much simpler!
    const postData = {
      content: content.trim(),
      published: true,
      authorId: authorId,
      updatedAt: new Date(), // Explicitly set updatedAt
      mediaUrls: mediaUrls.length > 0 ? mediaUrls : null, // Store mediaUrls as array
    }
    
    console.log('📝 CREATE POST DRIZZLE: 📝 mediaUrls type:', typeof postData.mediaUrls)
    console.log('📝 CREATE POST DRIZZLE: 📝 mediaUrls value:', postData.mediaUrls)
    
    console.log('📝 CREATE POST DRIZZLE: 📝 Saving post data:', postData)
    
    const [newPost] = await db
      .insert(posts)
      .values({
        ...postData,
        mediaUrls: postData.mediaUrls as string, // Explicitly cast as string
      })
      .returning({
        id: posts.id,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
        mediaUrls: posts.mediaUrls,
      })

    console.log('📝 CREATE POST DRIZZLE: ✅ Post created with ID:', newPost.id)
    console.log('📝 CREATE POST DRIZZLE: 📝 New post data from DB:', newPost)

    // Fetch the created post with author info
    const postWithAuthor = await db
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
      .where(eq(posts.id, newPost.id))
      .limit(1)

    if (!postWithAuthor || postWithAuthor.length === 0) {
      console.log('📝 CREATE POST DRIZZLE: ❌ Failed to fetch created post')
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      )
    }

    const post = postWithAuthor[0]

    // Fetch author details separately
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

    console.log('📝 CREATE POST DRIZZLE: 🔍 Author query result:', authorData)
    console.log('📝 CREATE POST DRIZZLE: 🔍 Post authorId:', post.authorId)
    
    const author = authorData[0] || null
    console.log('📝 CREATE POST DRIZZLE: 🔍 Final author data:', author)
    
    // Transform to match expected format
    let parsedMediaUrls = []
    try {
      if (post.mediaUrls && Array.isArray(post.mediaUrls)) {
        parsedMediaUrls = post.mediaUrls
      } else if (post.mediaUrls && typeof post.mediaUrls === 'string' && post.mediaUrls.trim() !== '') {
        // Try to parse as JSON first, then as comma-separated string
        try {
          parsedMediaUrls = JSON.parse(post.mediaUrls)
        } catch {
          // If JSON parsing fails, try comma-separated string
          parsedMediaUrls = post.mediaUrls.split(',').filter(url => url.trim() !== '')
        }
      }
    } catch (error) {
      console.log('📝 CREATE POST DRIZZLE: ⚠️ Error parsing mediaUrls for post', post.id, ':', error)
      parsedMediaUrls = []
    }

    const transformedPost = {
      ...post,
      author,
      mediaUrls: parsedMediaUrls,
      _count: {
        likes: 0,
        comments: 0,
        reposts: 0,
      },
      isLiked: false,
      isReposted: false,
      isBookmarked: false,
    }

    console.log('📝 CREATE POST DRIZZLE: 📝 Final transformed post:', transformedPost)
    console.log('📝 CREATE POST DRIZZLE: ✅ Post created successfully')
    
    return NextResponse.json({
      post: transformedPost,
      message: 'Post created successfully'
    })

  } catch (error) {
    console.error('📝 CREATE POST DRIZZLE: ❌ Error creating post:', error)
    
    return NextResponse.json({
      error: 'Failed to create post',
      message: 'Unable to create post at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET() {
  console.log('📝 CREATE POST DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 