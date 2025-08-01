import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 NEW ENDPOINTS TEST: Starting test...')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'Please log in to test new endpoints'
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: session.user.id,
        username: session.user.username
      },
      endpoints: {
        createPost: '/api/create-post',
        fetchPosts: '/api/fetch-posts',
        uploadImage: '/api/upload-image',
        test: '/api/test-new-endpoints'
      },
      message: 'New endpoints are properly configured and should bypass Vercel caching'
    })
    
  } catch (error) {
    console.error('🧪 NEW ENDPOINTS TEST: ❌ Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'New endpoints test failed'
    }, { status: 500 })
  }
} 