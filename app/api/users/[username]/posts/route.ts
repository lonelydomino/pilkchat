import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    console.log('👤 USER POSTS: GET request started for username:', params.username)
    
    const username = params.username
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    console.log('👤 USER POSTS: 👤 Session user:', currentUserId || 'No session')

    // Find user by username with retry logic
    console.log('👤 USER POSTS: 🔍 Finding user by username...')
    const user = await withRetry(async (client) => {
      return await client.user.findUnique({
        where: { username },
      })
    }, 3, 200)

    if (!user) {
      console.log('👤 USER POSTS: ❌ User not found:', username)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('👤 USER POSTS: ✅ User found:', user.id)

    // Get user's posts with retry logic
    console.log('👤 USER POSTS: 🔍 Fetching user posts...')
    const posts = await withRetry(async (client) => {
      return await client.post.findMany({
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
    }, 3, 200)

    console.log('👤 USER POSTS: ✅ Found', posts.length, 'posts')

    // Add interaction data for each post with retry logic
    console.log('👤 USER POSTS: 🔍 Checking interaction status for posts...')
    const postsWithInteractions = await Promise.all(posts.map(async (post) => {
      let isLiked = false
      let isReposted = false
      
      if (currentUserId) {
        try {
          // Check if current user liked this post
          const like = await withRetry(async (client) => {
            return await client.like.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId,
                  postId: post.id,
                },
              },
            })
          }, 2, 100)
          isLiked = !!like
          
          // Check if current user reposted this post
          const repost = await withRetry(async (client) => {
            return await client.repost.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId,
                  postId: post.id,
                },
              },
            })
          }, 2, 100)
          isReposted = !!repost
        } catch (interactionError) {
          console.warn('👤 USER POSTS: ⚠️ Failed to check interactions for post:', post.id, interactionError)
          // Continue with default values if interaction check fails
        }
      }
      
      return {
        ...post,
        isLiked,
        isReposted,
      }
    }))

    console.log('👤 USER POSTS: ✅ Returning', postsWithInteractions.length, 'posts with interactions')
    return NextResponse.json({ posts: postsWithInteractions })
  } catch (error) {
    console.error('👤 USER POSTS: ❌ Error fetching user posts:', error)
    
    // Return a more graceful error response
    return NextResponse.json(
      { 
        posts: [],
        error: 'Failed to fetch user posts',
        message: 'Unable to load user posts at this time. Please try again later.'
      },
      { status: 200 } // Return 200 instead of 500 to prevent client errors
    )
  } finally {
    try {
      await cleanupPrisma()
    } catch (cleanupError) {
      console.error('👤 USER POSTS: ❌ Error during cleanup:', cleanupError)
    }
  }
} 