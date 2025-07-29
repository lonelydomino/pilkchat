import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    // Get user from session
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const mockUserId = session.user.id

    // Check if user already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: mockUserId,
          postId: postId,
        },
      },
    })

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: mockUserId,
            postId: postId,
          },
        },
      })
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          userId: mockUserId,
          postId: postId,
        },
      })

      // Get the post to find the author
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { authorId: true },
      })

      // Create notification for post author (if not liking own post)
      if (post && post.authorId !== mockUserId) {
        await prisma.notification.create({
          data: {
            type: 'like',
            message: `${session.user.name} liked your post`,
            userId: post.authorId,
            relatedUserId: mockUserId,
            relatedPostId: postId,
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
} 