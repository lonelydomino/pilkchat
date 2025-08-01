import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes that don't need auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/webhooks') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // TEMPORARILY DISABLE ALL MIDDLEWARE FOR TESTING
  console.log('🔍 MIDDLEWARE: DISABLED - allowing all requests through')
  console.log('  Pathname:', pathname)
  return NextResponse.next()

  /*
  // Skip middleware for the home page - let users access it freely
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Debug logging
  console.log('🔍 MIDDLEWARE DEBUG:')
  console.log('  Pathname:', pathname)
  console.log('  Token exists:', !!token)
  console.log('  Token sub:', token?.sub)
  console.log('  Token email:', token?.email)
  console.log('  Token full:', token)
  console.log('  Token type:', typeof token)
  console.log('  Token keys:', token ? Object.keys(token) : 'No token')

  // Only redirect if we're on auth pages and user is authenticated (with stricter validation)
  if (token?.sub && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    console.log('🔍 MIDDLEWARE: Redirecting authenticated user to dashboard')
    console.log('  Token sub:', token.sub)
    console.log('  Pathname:', pathname)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Only redirect if we're on protected routes and user is not authenticated
  if (!token?.sub && pathname.startsWith('/dashboard')) {
    console.log('🔍 MIDDLEWARE: Redirecting unauthenticated user to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 