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
    
    if (!session?.user?.id) {
      console.log('📝 CREATE POST DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { content } = await request.json()
    
    if (!content || content.trim().length === 0) {
      console.log('📝 CREATE POST DRIZZLE: ❌ No content provided')
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    console.log('📝 CREATE POST DRIZZLE: 👤 User ID:', session.user.id)
    console.log('📝 CREATE POST DRIZZLE: 📝 Content length:', content.length)

    // Create post with Drizzle - much simpler!
    const [newPost] = await db
      .insert(posts)
      .values({
        content: content.trim(),
        published: true,
        authorId: session.user.id,
      })
      .returning({
        id: posts.id,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
      })

    console.log('📝 CREATE POST DRIZZLE: ✅ Post created with ID:', newPost.id)

    // Fetch the created post with author info
    const postWithAuthor = await db
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
    
    // Transform to match expected format
    const transformedPost = {
      ...post,
      _count: {
        likes: 0,
        comments: 0,
        reposts: 0,
      },
      isLiked: false,
      isReposted: false,
      isBookmarked: false,
    }

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