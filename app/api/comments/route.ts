import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { content, postId, parentId } = await request.json()
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Verify the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // If this is a reply, verify the parent comment exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      })

      if (!parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        )
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: session.user.id,
        postId: parentId ? undefined : postId, // If parentId exists, this is a reply
        parentId: parentId || undefined,
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
            replies: true,
          },
        },
      },
    })

    // Add interaction data
    const commentWithInteractions = {
      ...comment,
      isLiked: false,
      replies: [],
    }

    return NextResponse.json(commentWithInteractions)
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Get top-level comments for the post
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        parentId: null, // Only top-level comments
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
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Add interaction data and replies for each comment
    const commentsWithInteractions = await Promise.all(
      comments.map(async (comment) => {
        let isLiked = false
        
        if (currentUserId) {
          const like = await prisma.like.findUnique({
            where: {
              userId_commentId: {
                userId: currentUserId,
                commentId: comment.id,
              },
            },
          })
          isLiked = !!like
        }

        // Get replies for this comment
        const replies = await prisma.comment.findMany({
          where: {
            parentId: comment.id,
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
                replies: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        })

        // Add interaction data to replies
        const repliesWithInteractions = await Promise.all(
          replies.map(async (reply) => {
            let replyIsLiked = false
            
            if (currentUserId) {
              const replyLike = await prisma.like.findUnique({
                where: {
                  userId_commentId: {
                    userId: currentUserId,
                    commentId: reply.id,
                  },
                },
              })
              replyIsLiked = !!replyLike
            }

            return {
              ...reply,
              isLiked: replyIsLiked,
              replies: [],
            }
          })
        )

        return {
          ...comment,
          isLiked,
          replies: repliesWithInteractions,
        }
      })
    )

    return NextResponse.json({ comments: commentsWithInteractions })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
} 