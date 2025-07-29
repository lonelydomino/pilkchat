import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { sendNotificationToUser } from '../notifications/stream/route'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null, // Only get top-level comments
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

    // Add interaction status for each comment
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

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

        return {
          ...comment,
          isLiked,
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { content, postId, parentId } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      )
    }

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: session.user.id,
        postId,
        parentId: parentId || null,
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

    // Get post details for notification
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    })

    // Only send notification if the post author is not the same as the comment author
    if (post && post.authorId !== session.user.id) {
      // Create notification
      const notification = await prisma.notification.create({
        data: {
          type: 'comment',
          message: `${session.user.name} commented on your post`,
          userId: post.authorId,
          relatedUserId: session.user.id,
          postId: postId,
        },
      })

      // Send real-time notification
      sendNotificationToUser(post.authorId, {
        type: 'new_notification',
        notification: {
          id: notification.id,
          type: notification.type,
          message: notification.message,
          createdAt: notification.createdAt,
          read: notification.read,
          relatedUserId: session.user.id,
        },
      })
    }

    return NextResponse.json({
      ...comment,
      isLiked: false,
    })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
} 