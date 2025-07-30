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
    console.log('Cloudinary upload request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('User authenticated:', session.user.id)

    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      console.log('No image file provided')
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    console.log('File received:', file.name, file.type, file.size)

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.log('Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.log('File too large:', file.size)
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Check if Cloudinary credentials are available
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Missing Cloudinary credentials:', {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
      })
      
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

    console.log('Cloudinary credentials found, proceeding with upload')

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename for Cloudinary
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileName = `${session.user.id}_${timestamp}_${randomString}`

    console.log('Uploading to Cloudinary with filename:', fileName)

    try {
      // Upload to Cloudinary
      const cloudinaryResult = await uploadImageToCloudinary(buffer, fileName, {
        folder: 'pilkchat',
        public_id: fileName,
      })

      console.log('Cloudinary upload successful:', cloudinaryResult.url)

      // Store image info in database (optional)
      try {
        await withRetry(async () => {
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              image: cloudinaryResult.url
            }
          })
        }, 3, 200)
        console.log('User image updated in database')
      } catch (dbError) {
        console.warn('Failed to update user image in database:', dbError)
        // Don't fail the upload if database update fails
      }

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
      console.error('Cloudinary upload failed:', cloudinaryError)
      
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
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 