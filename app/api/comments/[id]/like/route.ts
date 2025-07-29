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
    const commentId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const currentUserId = session.user.id

    // Verify the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId: currentUserId,
          commentId: commentId,
        },
      },
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_commentId: {
            userId: currentUserId,
            commentId: commentId,
          },
        },
      })

      return NextResponse.json({ 
        success: true, 
        action: 'unliked' 
      })
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: currentUserId,
          commentId: commentId,
        },
      })

      return NextResponse.json({ 
        success: true, 
        action: 'liked' 
      })
    }
  } catch (error) {
    console.error('Error liking/unliking comment:', error)
    return NextResponse.json(
      { error: 'Failed to like/unlike comment' },
      { status: 500 }
    )
  }
} 