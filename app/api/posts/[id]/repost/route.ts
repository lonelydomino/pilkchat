import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

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
    const existingRepost = await withRetry(async (client) => {
      return await client.repost.findUnique({
        where: {
          userId_postId: {
            userId: mockUserId,
            postId: postId,
          },
        },
      })
    }, 3, 200)

    if (existingRepost) {
      // Remove repost
      await withRetry(async (client) => {
        return await client.repost.delete({
          where: {
            userId_postId: {
              userId: mockUserId,
              postId: postId,
            },
          },
        })
      }, 3, 200)
    } else {
      // Create repost
      await withRetry(async (client) => {
        return await client.repost.create({
          data: {
            userId: mockUserId,
            postId: postId,
          },
        })
      }, 3, 200)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error toggling repost:', error)
    return NextResponse.json(
      { error: 'Failed to toggle repost' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 