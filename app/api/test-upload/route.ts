import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('Test upload request started')
    
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

    // Simple success response
    return NextResponse.json({
      success: true,
      message: 'Test upload successful',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      userId: session.user.id
    })

  } catch (error) {
    console.error('Test upload error:', error)
    return NextResponse.json(
      { error: 'Test upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Test upload endpoint is working' },
    { status: 200 }
  )
} 