import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma, createPrismaClient } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  let username: string = ''
  let session: any = null
  let currentUserId: string | undefined = undefined
  
  try {
    console.log('👤 USER POSTS: GET request started for username:', params.username)
    
    username = params.username
    session = await getServerSession(authOptions)
    currentUserId = session?.user?.id

    console.log('👤 USER POSTS: 👤 Session user:', currentUserId || 'No session')

    // Find user by username with retry logic
    console.log('👤 USER POSTS: 🔍 Finding user by username...')
    const user = await withRetry(async (client) => {
      return await client.user.findUnique({
        where: { username },
      })
    }, 3, 500) // Increased delay for user queries

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
    }, 3, 400) // Increased delay for posts queries

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
                  userId: currentUserId as string,
                  postId: post.id,
                },
              },
            })
          }, 2, 200)
          isLiked = !!like
          
          // Check if current user reposted this post
          const repost = await withRetry(async (client) => {
            return await client.repost.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId as string,
                  postId: post.id,
                },
              },
            })
          }, 2, 200)
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
    
    // Try fallback approach with direct client
    try {
      console.log('👤 USER POSTS: 🔄 Trying fallback approach...')
      
      // Validate we have the required data
      if (!username) {
        throw new Error('Missing username for fallback')
      }
      
      const fallbackClient = createPrismaClient()
      
      // Find user with fallback client
      const fallbackUser = await fallbackClient.user.findUnique({
        where: { username },
      })
      
      if (!fallbackUser) {
        await fallbackClient.$disconnect()
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      
      // Get user's posts with fallback client
      const fallbackPosts = await fallbackClient.post.findMany({
        where: {
          authorId: fallbackUser.id,
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
      
      // Add interaction data for each post with fallback client
      const fallbackPostsWithInteractions = await Promise.all(fallbackPosts.map(async (post) => {
        let isLiked = false
        let isReposted = false
        
        if (currentUserId) {
          try {
            // Check if current user liked this post
            const like = await fallbackClient.like.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId as string,
                  postId: post.id,
                },
              },
            })
            isLiked = !!like
            
            // Check if current user reposted this post
            const repost = await fallbackClient.repost.findUnique({
              where: {
                userId_postId: {
                  userId: currentUserId as string,
                  postId: post.id,
                },
              },
            })
            isReposted = !!repost
          } catch (interactionError) {
            console.warn('👤 USER POSTS: ⚠️ Failed to check interactions in fallback for post:', post.id, interactionError)
          }
        }
        
        return {
          ...post,
          isLiked,
          isReposted,
        }
      }))
      
      await fallbackClient.$disconnect()
      
      console.log('👤 USER POSTS: ✅ Posts fetched with fallback:', fallbackPostsWithInteractions.length, 'posts')
      return NextResponse.json({ posts: fallbackPostsWithInteractions })
    } catch (fallbackError) {
      console.error('👤 USER POSTS: ❌ Fallback also failed:', fallbackError)
      return NextResponse.json(
        { 
          posts: [],
          error: 'Failed to fetch user posts',
          message: 'Unable to load user posts at this time. Please try again later.'
        },
        { status: 200 }
      )
    }
  } finally {
    try {
      await cleanupPrisma()
    } catch (cleanupError) {
      console.error('👤 USER POSTS: ❌ Error during cleanup:', cleanupError)
    }
  }
} 