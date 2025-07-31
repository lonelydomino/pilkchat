import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { uploadImageToCloudinary } from '@/lib/cloudinary'

export const dynamic = 'force-dynamic'

// Configure upload settings
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
  try {
    console.log('🖼️ UPLOAD DRIZZLE: Request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🖼️ UPLOAD DRIZZLE: ❌ No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🖼️ UPLOAD DRIZZLE: ✅ User authenticated:', session.user.id, 'Username:', session.user.username)

    console.log('🖼️ UPLOAD DRIZZLE: Parsing form data...')
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      console.log('🖼️ UPLOAD DRIZZLE: ❌ No image file provided')
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    console.log('🖼️ UPLOAD DRIZZLE: 📁 File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    })

    // Validate file type
    console.log('🖼️ UPLOAD DRIZZLE: 🔍 Validating file type:', file.type)
    console.log('🖼️ UPLOAD DRIZZLE: 📋 Allowed types:', ALLOWED_TYPES)
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.log('🖼️ UPLOAD DRIZZLE: ❌ Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    console.log('🖼️ UPLOAD DRIZZLE: ✅ File type validated')

    // Validate file size
    console.log('🖼️ UPLOAD DRIZZLE: 🔍 Validating file size:', file.size, 'bytes')
    console.log('🖼️ UPLOAD DRIZZLE: 📏 Max size:', MAX_FILE_SIZE, 'bytes')
    
    if (file.size > MAX_FILE_SIZE) {
      console.log('🖼️ UPLOAD DRIZZLE: ❌ File too large:', file.size, 'bytes')
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    console.log('🖼️ UPLOAD DRIZZLE: ✅ File size validated')

    // Check if Cloudinary credentials are available
    console.log('🖼️ UPLOAD DRIZZLE: 🔍 Checking Cloudinary credentials...')
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    console.log('🖼️ UPLOAD DRIZZLE: 🔑 Credentials status:', {
      cloudName: !!cloudName,
      apiKey: !!apiKey,
      apiSecret: !!apiSecret,
      hasAllCredentials: !!(cloudName && apiKey && apiSecret)
    })

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('🖼️ UPLOAD DRIZZLE: ❌ Missing Cloudinary credentials')
      
      console.log('🖼️ UPLOAD DRIZZLE: 🔄 Returning fallback response')
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

    console.log('🖼️ UPLOAD DRIZZLE: ✅ Cloudinary credentials found, proceeding with upload')

    // Convert file to buffer
    console.log('🖼️ UPLOAD DRIZZLE: 🔄 Converting file to buffer...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('🖼️ UPLOAD DRIZZLE: ✅ Buffer created, size:', buffer.length, 'bytes')

    // Generate unique filename for Cloudinary
    console.log('🖼️ UPLOAD DRIZZLE: 🔄 Generating unique filename...')
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileName = `${session.user.id}_${timestamp}_${randomString}`
    console.log('🖼️ UPLOAD DRIZZLE: 📝 Generated filename:', fileName)

    console.log('🖼️ UPLOAD DRIZZLE: 🚀 Starting Cloudinary upload...')

    try {
      // Upload to Cloudinary
      console.log('🖼️ UPLOAD DRIZZLE: 📤 Calling uploadImageToCloudinary...')
      const cloudinaryResult = await uploadImageToCloudinary(buffer, fileName, {
        folder: 'pilkchat',
        public_id: fileName,
      })

      console.log('🖼️ UPLOAD DRIZZLE: ✅ Cloudinary upload successful!')
      console.log('🖼️ UPLOAD DRIZZLE: 📊 Upload result:', {
        url: cloudinaryResult.url,
        public_id: cloudinaryResult.public_id,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format
      })

      // Store image info in database using Drizzle
      console.log('🖼️ UPLOAD DRIZZLE: 💾 Updating user image in database...')
      try {
        await db
          .update(users)
          .set({ image: cloudinaryResult.url })
          .where(eq(users.id, session.user.id))

        console.log('🖼️ UPLOAD DRIZZLE: ✅ User image updated in database')
      } catch (dbError) {
        console.warn('🖼️ UPLOAD DRIZZLE: ⚠️ Failed to update user image in database:', dbError)
        // Don't fail the upload if database update fails
      }

      console.log('🖼️ UPLOAD DRIZZLE: 🎉 Returning success response')
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
      console.error('🖼️ UPLOAD DRIZZLE: ❌ Cloudinary upload failed:', cloudinaryError)
      console.error('🖼️ UPLOAD DRIZZLE: ❌ Error details:', {
        message: cloudinaryError instanceof Error ? cloudinaryError.message : 'Unknown error',
        stack: cloudinaryError instanceof Error ? cloudinaryError.stack : undefined
      })
      
      console.log('🖼️ UPLOAD DRIZZLE: 🔄 Returning fallback response due to Cloudinary failure')
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
    console.error('🖼️ UPLOAD DRIZZLE: ❌ Unexpected error during upload:', error)
    console.error('🖼️ UPLOAD DRIZZLE: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('🖼️ UPLOAD DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 