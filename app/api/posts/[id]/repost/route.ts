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

    // Check if user already reposted the post
    const existingRepost = await prisma.repost.findUnique({
      where: {
        userId_postId: {
          userId: mockUserId,
          postId: postId,
        },
      },
    })

    if (existingRepost) {
      // Remove repost
      await prisma.repost.delete({
        where: {
          userId_postId: {
            userId: mockUserId,
            postId: postId,
          },
        },
      })
    } else {
      // Create repost
      await prisma.repost.create({
        data: {
          userId: mockUserId,
          postId: postId,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error toggling repost:', error)
    return NextResponse.json(
      { error: 'Failed to toggle repost' },
      { status: 500 }
    )
  }
} 