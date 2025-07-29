import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { extractHashtags } from '@/lib/utils'

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
        hashtags: {
          include: {
            hashtag: true
          }
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
          hashtags: post.hashtags.map(ph => ph.hashtag),
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

    // Extract hashtags from content
    const hashtagNames = extractHashtags(content)

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

    // Create hashtags and link them to the post
    if (hashtagNames.length > 0) {
      await Promise.all(
        hashtagNames.map(async (hashtagName) => {
          // Create or find hashtag
          let hashtag = await prisma.hashtag.findUnique({
            where: { name: hashtagName }
          })

          if (!hashtag) {
            hashtag = await prisma.hashtag.create({
              data: { name: hashtagName }
            })
          }

          // Link hashtag to post
          await prisma.postHashtag.create({
            data: {
              postId: post.id,
              hashtagId: hashtag.id
            }
          })
        })
      )
    }

    // Return post with interaction status
    const postWithInteractions = {
      ...post,
      hashtags: hashtagNames.map(name => ({ name })),
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