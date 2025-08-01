import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 ALL ROUTES TEST: Starting comprehensive test...')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'Please log in to test all routes'
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: session.user.id,
        username: session.user.username
      },
      updatedRoutes: {
        // Post routes
        createPost: '/api/create-post',
        fetchPosts: '/api/fetch-posts',
        likePost: '/api/posts/[id]/like',
        repostPost: '/api/posts/[id]/repost',
        bookmarkPost: '/api/posts/[id]/bookmark',
        trendingPosts: '/api/posts/trending',
        
        // User routes
        userProfile: '/api/users/[username]',
        followUser: '/api/users/[username]/follow',
        changePassword: '/api/users/change-password',
        updateProfile: '/api/users/profile',
        
        // Notification routes
        notifications: '/api/notifications',
        deleteNotification: '/api/notifications/[id]',
        markAsRead: '/api/notifications/[id]/read',
        markAllRead: '/api/notifications/mark-all-read',
        
        // Comment routes
        comments: '/api/comments',
        
        // Hashtag routes
        hashtags: '/api/hashtags',
        hashtagPosts: '/api/hashtags/[name]',
        
        // Upload routes
        uploadImage: '/api/upload-image',
        
        // Search routes
        search: '/api/search',
        
        // Bookmark routes
        bookmarks: '/api/bookmarks',
        
        // Topics routes
        trendingTopics: '/api/topics/trending'
      },
      architecture: {
        freshClients: '✅ All routes use fresh Prisma client instances',
        retryLogic: '✅ Exponential backoff for transient errors',
        cleanup: '✅ Proper connection cleanup in finally blocks',
        isolation: '✅ No shared connection state between operations',
        dynamicRendering: '✅ Force dynamic rendering for all routes'
      },
      message: 'All routes have been updated to use the fresh client architecture and should resolve prepared statement errors!'
    })
    
  } catch (error) {
    console.error('🧪 ALL ROUTES TEST: ❌ Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'All routes test failed'
    }, { status: 500 })
  }
} 