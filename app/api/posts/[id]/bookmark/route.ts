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
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const postId = params.id
    const userId = session.user.id

    // Check if post exists
    const post = await withRetry(async (client) => {
      return await client.post.findUnique({
        where: { id: postId },
      })
    }, 3, 200)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Check if already bookmarked
    const existingBookmark = await withRetry(async (client) => {
      return await client.bookmark.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      })
    }, 3, 200)

    if (existingBookmark) {
      // Remove bookmark
      await withRetry(async (client) => {
        return await client.bookmark.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        })
      }, 3, 200)

      return NextResponse.json({ 
        success: true, 
        bookmarked: false,
        message: 'Post removed from bookmarks'
      })
    } else {
      // Add bookmark
      await withRetry(async (client) => {
        return await client.bookmark.create({
          data: {
            userId,
            postId,
          },
        })
      }, 3, 200)

      return NextResponse.json({ 
        success: true, 
        bookmarked: true,
        message: 'Post added to bookmarks'
      })
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    return NextResponse.json(
      { error: 'Failed to toggle bookmark' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 