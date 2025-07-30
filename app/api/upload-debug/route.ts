import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('DEBUG: Upload endpoint called')
    
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      console.log('DEBUG: No file provided')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('DEBUG: File received:', file.name, file.type, file.size)

    return NextResponse.json({
      success: true,
      message: 'DEBUG: Upload successful',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('DEBUG: Upload error:', error)
    return NextResponse.json(
      { error: 'DEBUG: Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'DEBUG: Upload endpoint is working',
    timestamp: new Date().toISOString()
  })
} 