import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('📚 BOOKMARKS: Request started')
    console.log('📚 BOOKMARKS: Request URL:', request.url)
    console.log('📚 BOOKMARKS: Request headers:', Object.fromEntries(request.headers.entries()))
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('📚 BOOKMARKS: ❌ No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('📚 BOOKMARKS: ✅ User authenticated:', session.user.id, 'Username:', session.user.username)

    // Get bookmarked posts for the current user with retry logic
    console.log('📚 BOOKMARKS: 🔍 Fetching bookmarked posts...')
    const bookmarkedPosts = await withRetry(async () => {
      console.log('📚 BOOKMARKS: 📊 Executing database query for user:', session.user.id)
      return await prisma.bookmark.findMany({
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
    }, 3, 200)

    console.log('📚 BOOKMARKS: ✅ Found', bookmarkedPosts.length, 'bookmarked posts')

    // Check interaction status for each post with retry logic
    console.log('📚 BOOKMARKS: 🔍 Checking interaction status for posts...')
    const postsWithInteractions = await Promise.all(
      bookmarkedPosts.map(async (bookmark, index) => {
        try {
          console.log(`📚 BOOKMARKS: 🔍 Checking interactions for post ${index + 1}/${bookmarkedPosts.length}:`, bookmark.post.id)
          
          const [like, repost] = await Promise.all([
            withRetry(async () => {
              return await prisma.like.findUnique({
                where: {
                  userId_postId: {
                    userId: session.user.id,
                    postId: bookmark.post.id,
                  },
                },
              })
            }, 3, 200),
            withRetry(async () => {
              return await prisma.repost.findUnique({
                where: {
                  userId_postId: {
                    userId: session.user.id,
                    postId: bookmark.post.id,
                  },
                },
              })
            }, 3, 200),
          ])

          console.log(`📚 BOOKMARKS: ✅ Post ${index + 1} interactions checked - Like: ${!!like}, Repost: ${!!repost}`)

          return {
            ...bookmark.post,
            isLiked: !!like,
            isReposted: !!repost,
            isBookmarked: true,
          }
        } catch (interactionError) {
          console.warn('📚 BOOKMARKS: ⚠️ Failed to check interactions for post:', bookmark.post.id, interactionError)
          // Return post without interaction status if check fails
          return {
            ...bookmark.post,
            isLiked: false,
            isReposted: false,
            isBookmarked: true,
          }
        }
      })
    )

    console.log('📚 BOOKMARKS: ✅ Returning', postsWithInteractions.length, 'posts with interactions')
    return NextResponse.json({ posts: postsWithInteractions })
  } catch (error) {
    console.error('📚 BOOKMARKS: ❌ Error fetching bookmarks:', error)
    console.error('📚 BOOKMARKS: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    })
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    console.log('📚 BOOKMARKS: 🧹 Cleaning up Prisma connection...')
    await cleanupPrisma()
    console.log('📚 BOOKMARKS: ✅ Cleanup completed')
  }
} 