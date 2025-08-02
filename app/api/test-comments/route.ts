import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, comments } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('💭 TEST COMMENTS: GET request started')
    
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    
    if (postId) {
      // Get comments for specific post
      const commentsData = await db
        .select({
          id: comments.id,
          content: comments.content,
          createdAt: comments.createdAt,
          authorId: comments.authorId,
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

      console.log('💭 TEST COMMENTS: Comments for post', postId, ':', commentsData)
      
      return NextResponse.json({
        comments: commentsData
      })
    } else {
      // Get all comments
      const allComments = await db
        .select({
          id: comments.id,
          content: comments.content,
          createdAt: comments.createdAt,
          authorId: comments.authorId,
          author: {
            id: users.id,
            name: users.name,
            username: users.username,
            image: users.image,
          },
        })
        .from(comments)
        .innerJoin(users, eq(comments.authorId, users.id))
        .limit(10)

      console.log('💭 TEST COMMENTS: All comments:', allComments)
      
      return NextResponse.json({
        comments: allComments
      })
    }
  } catch (error) {
    console.error('💭 TEST COMMENTS: ❌ Error:', error)
    return NextResponse.json({
      error: 'Failed to fetch comments',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 