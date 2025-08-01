import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('AUTH TEST: Testing authentication configuration')
    
    // Check environment variables
    const envCheck = {
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    }

    // Test session
    const session = await getServerSession(authOptions)
    
    return NextResponse.json({
      message: 'Auth test successful',
      environment: envCheck,
      session: session ? {
        userId: session.user.id,
        username: session.user.username,
        email: session.user.email
      } : null,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AUTH TEST: Error:', error)
    return NextResponse.json(
      { error: 'Auth test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 