import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 IMAGE UPLOAD TEST: Starting test...')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'Please log in to test image upload'
      }, { status: 401 })
    }

    // Check Cloudinary credentials
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const hasCredentials = !!(cloudName && apiKey && apiSecret)

    return NextResponse.json({
      success: true,
      user: {
        id: session.user.id,
        username: session.user.username
      },
      cloudinary: {
        configured: hasCredentials,
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
      },
      endpoints: {
        upload: '/api/cloudinary-upload',
        test: '/api/test-image-upload'
      },
      message: hasCredentials 
        ? 'Image upload is properly configured' 
        : 'Image upload will use fallback (no Cloudinary credentials)'
    })
    
  } catch (error) {
    console.error('🧪 IMAGE UPLOAD TEST: ❌ Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Image upload test failed'
    }, { status: 500 })
  }
} 