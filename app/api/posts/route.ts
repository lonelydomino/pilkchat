import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    const posts = await prisma.post.findMany({
      where: {
        published: true,
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
            comments: true,
            reposts: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })

    // Check interaction status for each post
    const postsWithInteractions = await Promise.all(
      posts.map(async (post) => {
        let isLiked = false
        let isReposted = false
        let isBookmarked = false

        if (currentUserId) {
          const [like, repost, bookmark] = await Promise.all([
            prisma.like.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId,
                  postId: post.id,
                },
              },
            }),
            prisma.repost.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId,
                  postId: post.id,
                },
              },
            }),
            prisma.bookmark.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId,
                  postId: post.id,
                },
              },
            }),
          ])

          isLiked = !!like
          isReposted = !!repost
          isBookmarked = !!bookmark
        }

        return {
          ...post,
          isLiked,
          isReposted,
          isBookmarked,
        }
      })
    )

    return NextResponse.json({ posts: postsWithInteractions })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
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

    const { content, mediaUrls = [] } = await request.json()

    if (!content?.trim() && mediaUrls.length === 0) {
      return NextResponse.json(
        { error: 'Post content or media is required' },
        { status: 400 }
      )
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        content: content?.trim() || '',
        authorId: session.user.id,
        mediaUrls: mediaUrls,
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
            comments: true,
            reposts: true,
          },
        },
      },
    })

    // Return post with interaction status
    const postWithInteractions = {
      ...post,
      isLiked: false,
      isReposted: false,
      isBookmarked: false,
    }

    return NextResponse.json(postWithInteractions)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 