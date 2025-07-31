import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { comments, users, posts } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('💭 COMMENTS DRIZZLE: GET request started')
    
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    
    console.log('💭 COMMENTS DRIZZLE: 📝 Post ID:', postId)

    if (!postId) {
      console.log('💭 COMMENTS DRIZZLE: ❌ No post ID provided')
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Check if post exists
    console.log('💭 COMMENTS DRIZZLE: 🔍 Checking if post exists...')
    const postData = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)

    if (!postData || postData.length === 0) {
      console.log('💭 COMMENTS DRIZZLE: ❌ Post not found')
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Get comments for this post
    console.log('💭 COMMENTS DRIZZLE: 🔍 Fetching comments...')
    const commentsData = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        },
      })
      .from(comments)
      .innerJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt))

    console.log('💭 COMMENTS DRIZZLE: ✅ Found', commentsData.length, 'comments')

    return NextResponse.json({
      comments: commentsData
    })

  } catch (error) {
    console.error('💭 COMMENTS DRIZZLE: ❌ Error fetching comments:', error)
    
    return NextResponse.json({
      comments: [],
      error: 'Failed to fetch comments',
      message: 'Unable to load comments at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('💭 COMMENTS DRIZZLE: POST request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💭 COMMENTS DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { content, postId, parentId } = await request.json()
    
    console.log('💭 COMMENTS DRIZZLE: 👤 User ID:', userId)
    console.log('💭 COMMENTS DRIZZLE: 📝 Post ID:', postId)
    console.log('💭 COMMENTS DRIZZLE: 💭 Parent ID:', parentId)
    console.log('💭 COMMENTS DRIZZLE: 📝 Content length:', content?.length)

    if (!content || content.trim().length === 0) {
      console.log('💭 COMMENTS DRIZZLE: ❌ No content provided')
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      )
    }

    if (!postId) {
      console.log('💭 COMMENTS DRIZZLE: ❌ No post ID provided')
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Check if post exists
    console.log('💭 COMMENTS DRIZZLE: 🔍 Checking if post exists...')
    const postData = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)

    if (!postData || postData.length === 0) {
      console.log('💭 COMMENTS DRIZZLE: ❌ Post not found')
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // If parentId is provided, check if parent comment exists
    if (parentId) {
      console.log('💭 COMMENTS DRIZZLE: 🔍 Checking if parent comment exists...')
      const parentComment = await db
        .select()
        .from(comments)
        .where(eq(comments.id, parentId))
        .limit(1)

      if (!parentComment || parentComment.length === 0) {
        console.log('💭 COMMENTS DRIZZLE: ❌ Parent comment not found')
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        )
      }
    }

    // Create new comment
    console.log('💭 COMMENTS DRIZZLE: ➕ Creating comment...')
    const [newComment] = await db
      .insert(comments)
      .values({
        content: content.trim(),
        postId,
        authorId: userId,
        parentId: parentId || null,
      })
      .returning({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        },
      })

    console.log('💭 COMMENTS DRIZZLE: ✅ Comment created with ID:', newComment.id)

    return NextResponse.json({
      success: true,
      message: 'Comment created successfully',
      comment: newComment
    })

  } catch (error) {
    console.error('💭 COMMENTS DRIZZLE: ❌ Error creating comment:', error)
    
    return NextResponse.json({
      error: 'Failed to create comment',
      message: 'Unable to create comment at this time. Please try again later.'
    }, { status: 200 })
  }
} 