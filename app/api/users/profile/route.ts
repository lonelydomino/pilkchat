import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        location: true,
        website: true,
        image: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, username, bio, location, website } = await request.json()

    // Validate required fields
    if (!name || !username) {
      return NextResponse.json(
        { error: 'Name and username are required' },
        { status: 400 }
      )
    }

    // Check if username is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
        id: { not: session.user.id },
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 400 }
      )
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        username,
        bio: bio || null,
        location: location || null,
        website: website || null,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        location: true,
        website: true,
        image: true,
        createdAt: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
} 