import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { name, email, username, password } = await request.json()

    // Validate input
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists with retry logic
    const existingUser = await withRetry(async () => {
      return await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username }
          ]
        }
      })
    }, 3, 200)

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with hashed password using retry logic
    const user = await withRetry(async () => {
      return await prisma.user.create({
        data: {
          name,
          email,
          username,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          createdAt: true,
        }
      })
    }, 3, 200)

    return NextResponse.json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user. Please try again.' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 