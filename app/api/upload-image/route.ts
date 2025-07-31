import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'
import { uploadImageToCloudinary } from '@/lib/cloudinary'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// Configure upload settings
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
  try {
    console.log('🖼️ NEW UPLOAD: Request started')
    console.log('🖼️ NEW UPLOAD: Request headers:', Object.fromEntries(request.headers.entries()))
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🖼️ NEW UPLOAD: ❌ No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🖼️ NEW UPLOAD: ✅ User authenticated:', session.user.id, 'Username:', session.user.username)

    console.log('🖼️ NEW UPLOAD: Parsing form data...')
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      console.log('🖼️ NEW UPLOAD: ❌ No image file provided')
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    console.log('🖼️ NEW UPLOAD: 📁 File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    })

    // Validate file type
    console.log('🖼️ NEW UPLOAD: 🔍 Validating file type:', file.type)
    console.log('🖼️ NEW UPLOAD: 📋 Allowed types:', ALLOWED_TYPES)
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.log('🖼️ NEW UPLOAD: ❌ Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    console.log('🖼️ NEW UPLOAD: ✅ File type validated')

    // Validate file size
    console.log('🖼️ NEW UPLOAD: 🔍 Validating file size:', file.size, 'bytes')
    console.log('🖼️ NEW UPLOAD: 📏 Max size:', MAX_FILE_SIZE, 'bytes')
    
    if (file.size > MAX_FILE_SIZE) {
      console.log('🖼️ NEW UPLOAD: ❌ File too large:', file.size, 'bytes')
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    console.log('🖼️ NEW UPLOAD: ✅ File size validated')

    // Check if Cloudinary credentials are available
    console.log('🖼️ NEW UPLOAD: 🔍 Checking Cloudinary credentials...')
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    console.log('🖼️ NEW UPLOAD: 🔑 Credentials status:', {
      cloudName: !!cloudName,
      apiKey: !!apiKey,
      apiSecret: !!apiSecret,
      hasAllCredentials: !!(cloudName && apiKey && apiSecret)
    })

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('🖼️ NEW UPLOAD: ❌ Missing Cloudinary credentials:', {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
      })
      
      console.log('🖼️ NEW UPLOAD: 🔄 Returning fallback response')
      // Return a fallback response instead of 500 error
      return NextResponse.json({
        success: true,
        url: 'https://via.placeholder.com/300x300?text=No+Image',
        fileName: 'placeholder.jpg',
        size: file.size,
        type: file.type,
        message: 'Image upload service not configured. Using placeholder.'
      })
    }

    console.log('🖼️ NEW UPLOAD: ✅ Cloudinary credentials found, proceeding with upload')

    // Convert file to buffer
    console.log('🖼️ NEW UPLOAD: 🔄 Converting file to buffer...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('🖼️ NEW UPLOAD: ✅ Buffer created, size:', buffer.length, 'bytes')

    // Generate unique filename for Cloudinary
    console.log('🖼️ NEW UPLOAD: 🔄 Generating unique filename...')
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileName = `${session.user.id}_${timestamp}_${randomString}`
    console.log('🖼️ NEW UPLOAD: 📝 Generated filename:', fileName)

    console.log('🖼️ NEW UPLOAD: 🚀 Starting Cloudinary upload...')

    try {
      // Upload to Cloudinary
      console.log('🖼️ NEW UPLOAD: 📤 Calling uploadImageToCloudinary...')
      const cloudinaryResult = await uploadImageToCloudinary(buffer, fileName, {
        folder: 'pilkchat',
        public_id: fileName,
      })

      console.log('🖼️ NEW UPLOAD: ✅ Cloudinary upload successful!')
      console.log('🖼️ NEW UPLOAD: 📊 Upload result:', {
        url: cloudinaryResult.url,
        public_id: cloudinaryResult.public_id,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format
      })

      // Store image info in database (optional)
      console.log('🖼️ NEW UPLOAD: 💾 Updating user image in database...')
      try {
        await withRetry(async (client) => {
          return await client.user.update({
            where: { id: session.user.id },
            data: {
              image: cloudinaryResult.url
            }
          })
        }, 3, 200)
        console.log('🖼️ NEW UPLOAD: ✅ User image updated in database')
      } catch (dbError) {
        console.warn('🖼️ NEW UPLOAD: ⚠️ Failed to update user image in database:', dbError)
        // Don't fail the upload if database update fails
      }

      console.log('🖼️ NEW UPLOAD: 🎉 Returning success response')
      return NextResponse.json({
        success: true,
        url: cloudinaryResult.url,
        public_id: cloudinaryResult.public_id,
        fileName: fileName,
        size: file.size,
        type: file.type,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format
      })

    } catch (cloudinaryError) {
      console.error('🖼️ NEW UPLOAD: ❌ Cloudinary upload failed:', cloudinaryError)
      console.error('🖼️ NEW UPLOAD: ❌ Error details:', {
        message: cloudinaryError instanceof Error ? cloudinaryError.message : 'Unknown error',
        stack: cloudinaryError instanceof Error ? cloudinaryError.stack : undefined
      })
      
      console.log('🖼️ NEW UPLOAD: 🔄 Returning fallback response due to Cloudinary failure')
      // Return a fallback response instead of 500 error
      return NextResponse.json({
        success: true,
        url: 'https://via.placeholder.com/300x300?text=Upload+Failed',
        fileName: 'placeholder.jpg',
        size: file.size,
        type: file.type,
        message: 'Image upload failed. Using placeholder.'
      })
    }

  } catch (error) {
    console.error('🖼️ NEW UPLOAD: ❌ Unexpected error during upload:', error)
    console.error('🖼️ NEW UPLOAD: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    console.log('🖼️ NEW UPLOAD: 🧹 Cleaning up Prisma connection...')
    await cleanupPrisma()
    console.log('🖼️ NEW UPLOAD: ✅ Cleanup completed')
  }
}

export async function GET() {
  console.log('🖼️ NEW UPLOAD: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 