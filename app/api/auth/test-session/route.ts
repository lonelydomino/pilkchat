import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    return NextResponse.json({
      authenticated: !!session,
      session: session ? {
        user: {
          id: session.user?.id,
          email: session.user?.email,
          username: session.user?.username,
        }
      } : null,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Session test error:', error)
    return NextResponse.json({
      error: 'Session test failed',
      authenticated: false,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 