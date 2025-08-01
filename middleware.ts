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

  // TEMPORARILY DISABLE ALL MIDDLEWARE REDIRECTS FOR TESTING
  console.log('Middleware - Pathname:', pathname)
  console.log('Middleware - DISABLED - allowing all requests through')
  return NextResponse.next()

  // Check if user is authenticated
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Debug logging
  console.log('Middleware - Pathname:', pathname)
  console.log('Middleware - Token exists:', !!token)
  console.log('Middleware - Token:', token ? { sub: token.sub, email: token.email } : 'No token')

  // Only redirect if we're on auth pages and user is authenticated
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    console.log('Middleware - Redirecting authenticated user to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Only redirect if we're on protected routes and user is not authenticated
  if (!token && pathname.startsWith('/dashboard')) {
    console.log('Middleware - Redirecting unauthenticated user to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
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