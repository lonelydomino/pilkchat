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
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename for Cloudinary
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${session.user.id}_${timestamp}_${randomString}`

    // Upload to Cloudinary
    const cloudinaryResult = await uploadImageToCloudinary(buffer, fileName, {
      folder: 'pilkchat',
      public_id: fileName,
    })

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

  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
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