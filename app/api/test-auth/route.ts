import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { authOptions } from '@/auth-drizzle'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 TEST AUTH: GET request started')
    
    // Test getServerSession
    const session = await getServerSession(authOptions)
    console.log('🔍 TEST AUTH: getServerSession result:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      username: session?.user?.username
    })
    
    // Test getToken
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    console.log('🔍 TEST AUTH: getToken result:', {
      hasToken: !!token,
      tokenSub: token?.sub,
      tokenUsername: token?.username,
      tokenData: token
    })
    
    // Also try with different secret
    const tokenAlt = await getToken({ 
      req: request, 
      secret: process.env.JWT_SECRET 
    })
    console.log('🔍 TEST AUTH: getToken with JWT_SECRET result:', {
      hasToken: !!tokenAlt,
      tokenSub: tokenAlt?.sub,
      tokenUsername: tokenAlt?.username
    })
    
    // Check headers
    const authHeader = request.headers.get('authorization')
    const cookieHeader = request.headers.get('cookie')
    console.log('🔍 TEST AUTH: Request headers:', {
      hasAuthHeader: !!authHeader,
      hasCookieHeader: !!cookieHeader,
      cookieHeader: cookieHeader?.substring(0, 100) + '...'
    })
    
    return NextResponse.json({
      session: {
        hasSession: !!session,
        hasUser: !!session?.user,
        userId: session?.user?.id,
        username: session?.user?.username
      },
      token: {
        hasToken: !!token,
        tokenSub: token?.sub,
        tokenUsername: token?.username
      },
      headers: {
        hasAuthHeader: !!authHeader,
        hasCookieHeader: !!cookieHeader
      }
    })
  } catch (error) {
    console.error('🔍 TEST AUTH: Error:', error)
    return NextResponse.json({ error: 'Auth test failed' }, { status: 500 })
  }
} 