import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('Test upload endpoint called')
    
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('File received:', file.name, file.type, file.size)

    return NextResponse.json({
      success: true,
      message: 'Test upload successful',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Test upload error:', error)
    return NextResponse.json(
      { error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test upload endpoint is working',
    timestamp: new Date().toISOString()
  })
} 