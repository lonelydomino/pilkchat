import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'all'
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] })
    }

    const searchTerm = query.trim()
    const results: any[] = []

    // Search for users
    if (type === 'all' || type === 'users') {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { username: { contains: searchTerm, mode: 'insensitive' } },
            { bio: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
        take: 10,
      })

      // Check follow status for each user
      const usersWithFollowStatus = await Promise.all(
        users.map(async (user) => {
          let isFollowing = false
          if (currentUserId && currentUserId !== user.id) {
            const follow = await prisma.follows.findUnique({
              where: {
                followerId_followingId: {
                  followerId: currentUserId,
                  followingId: user.id,
                },
              },
            })
            isFollowing = !!follow
          }

          return {
            type: 'user' as const,
            user: {
              ...user,
              isFollowing,
            },
          }
        })
      )

      results.push(...usersWithFollowStatus)
    }

    // Search for hashtags
    if (type === 'all' || type === 'hashtags') {
      const hashtags = await prisma.hashtag.findMany({
        where: {
          name: { contains: searchTerm, mode: 'insensitive' },
        },
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
        orderBy: {
          posts: {
            _count: 'desc',
          },
        },
        take: 10,
      })

      const hashtagResults = hashtags.map((hashtag) => ({
        type: 'hashtag' as const,
        hashtag: {
          id: hashtag.id,
          name: hashtag.name,
          _count: hashtag._count,
        },
      }))

      results.push(...hashtagResults)
    }

    // Search for posts
    if (type === 'all' || type === 'posts') {
      const posts = await prisma.post.findMany({
        where: {
          content: { contains: searchTerm, mode: 'insensitive' },
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
          hashtags: {
            include: {
              hashtag: true,
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
        take: 10,
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
            type: 'post' as const,
            post: {
              ...post,
              hashtags: post.hashtags.map(ph => ph.hashtag),
              isLiked,
              isReposted,
              isBookmarked,
            },
          }
        })
      )

      results.push(...postsWithInteractions)
    }

    // Sort results: users first, then hashtags, then posts by creation date
    results.sort((a, b) => {
      if (a.type === 'user' && b.type !== 'user') return -1
      if (a.type === 'hashtag' && b.type === 'post') return -1
      if (a.type === 'post' && b.type !== 'post') return 1
      if (a.type === 'post' && b.type === 'post') {
        return new Date(b.post.createdAt).getTime() - new Date(a.post.createdAt).getTime()
      }
      return 0
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Error performing search:', error)
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    )
  }
} 