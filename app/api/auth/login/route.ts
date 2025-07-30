import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user with retry logic
    const user = await withRetry(async () => {
      return await prisma.user.findUnique({
        where: { email }
      })
    }, 3, 200)

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return user data (without password)
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      }
    })
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 