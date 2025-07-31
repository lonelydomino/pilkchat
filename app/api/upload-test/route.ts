import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 UPLOAD TEST: Test endpoint called!')
    console.log('🧪 UPLOAD TEST: URL:', request.url)
    console.log('🧪 UPLOAD TEST: Method:', request.method)
    console.log('🧪 UPLOAD TEST: Headers:', Object.fromEntries(request.headers.entries()))
    
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      console.log('🧪 UPLOAD TEST: ❌ No file provided')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('🧪 UPLOAD TEST: ✅ File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    return NextResponse.json({
      success: true,
      message: 'Test upload successful',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      endpoint: '/api/upload-test',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('🧪 UPLOAD TEST: ❌ Error:', error)
    return NextResponse.json(
      { error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('🧪 UPLOAD TEST: GET request received')
  return NextResponse.json({
    message: 'Upload test endpoint is working',
    endpoint: '/api/upload-test',
    timestamp: new Date().toISOString()
  })
} 