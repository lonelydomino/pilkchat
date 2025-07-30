import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get bookmarked posts for the current user
    const bookmarkedPosts = await prisma.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        post: {
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
                comments: true,
                reposts: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Check interaction status for each post
    const postsWithInteractions = await Promise.all(
      bookmarkedPosts.map(async (bookmark) => {
        const [like, repost] = await Promise.all([
          prisma.like.findUnique({
            where: {
              userId_postId: {
                userId: session.user.id,
                postId: bookmark.post.id,
              },
            },
          }),
          prisma.repost.findUnique({
            where: {
              userId_postId: {
                userId: session.user.id,
                postId: bookmark.post.id,
              },
            },
          }),
        ])

        return {
          ...bookmark.post,
          isLiked: !!like,
          isReposted: !!repost,
          isBookmarked: true,
        }
      })
    )

    return NextResponse.json({ posts: postsWithInteractions })
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    )
  }
} 