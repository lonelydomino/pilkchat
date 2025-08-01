import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 TEST SESSION: GET request started')
    
    const session = await getServerSession(authOptions)
    console.log('🔍 TEST SESSION: Session data:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      username: session?.user?.username,
      email: session?.user?.email,
      sessionData: session
    })
    
    return NextResponse.json({
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      username: session?.user?.username,
      email: session?.user?.email,
      sessionData: session
    })
  } catch (error) {
    console.error('🔍 TEST SESSION: Error:', error)
    return NextResponse.json({ error: 'Session test failed' }, { status: 500 })
  }
} 