import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    const hashtagName = decodeURIComponent(params.name).toLowerCase()

    // Get hashtag info
    const hashtag = await prisma.hashtag.findUnique({
      where: { name: hashtagName },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })

    if (!hashtag) {
      return NextResponse.json(
        { error: 'Hashtag not found' },
        { status: 404 }
      )
    }

    // Get posts with this hashtag
    const posts = await prisma.post.findMany({
      where: {
        hashtags: {
          some: {
            hashtag: {
              name: hashtagName
            }
          }
        },
        published: true
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            reposts: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset,
      take: limit
    })

    // Add interaction status for each post
    const postsWithStatus = await Promise.all(
      posts.map(async (post) => {
        let isLiked = false
        let isReposted = false
        let isBookmarked = false

        if (userId) {
          const [like, repost, bookmark] = await Promise.all([
            prisma.like.findUnique({
              where: {
                userId_postId: {
                  userId,
                  postId: post.id
                }
              }
            }),
            prisma.repost.findUnique({
              where: {
                userId_postId: {
                  userId,
                  postId: post.id
                }
              }
            }),
            prisma.bookmark.findUnique({
              where: {
                userId_postId: {
                  userId,
                  postId: post.id
                }
              }
            })
          ])

          isLiked = !!like
          isReposted = !!repost
          isBookmarked = !!bookmark
        }

        return {
          ...post,
          isLiked,
          isReposted,
          isBookmarked
        }
      })
    )

    const totalPosts = await prisma.post.count({
      where: {
        hashtags: {
          some: {
            hashtag: {
              name: hashtagName
            }
          }
        },
        published: true
      }
    })

    return NextResponse.json({
      hashtag,
      posts: postsWithStatus,
      pagination: {
        page,
        limit,
        total: totalPosts,
        totalPages: Math.ceil(totalPosts / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching hashtag posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hashtag posts' },
      { status: 500 }
    )
  }
} 