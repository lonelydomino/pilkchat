import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get user's posts
    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id,
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
    })

    // Add interaction data for each post
    const postsWithInteractions = await Promise.all(posts.map(async (post) => {
      let isLiked = false
      let isReposted = false
      
      if (currentUserId) {
        // Check if current user liked this post
        const like = await prisma.like.findUnique({
          where: {
            userId_postId: {
              userId: currentUserId,
              postId: post.id,
            },
          },
        })
        isLiked = !!like
        
        // Check if current user reposted this post
        const repost = await prisma.repost.findUnique({
          where: {
            userId_postId: {
              userId: currentUserId,
              postId: post.id,
            },
          },
        })
        isReposted = !!repost
      }
      
      return {
        ...post,
        isLiked,
        isReposted,
      }
    }))

    return NextResponse.json({ posts: postsWithInteractions })
  } catch (error) {
    console.error('Error fetching user posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user posts' },
      { status: 500 }
    )
  }
} 