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

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        location: true,
        website: true,
      }
    })

    return NextResponse.json({
      session: {
        id: session.user.id,
        name: session.user.name,
        username: session.user.username,
        email: session.user.email,
        image: session.user.image,
      },
      database: user,
      hasImage: !!user?.image,
      imageLength: user?.image?.length || 0,
    })
  } catch (error) {
    console.error('Error in debug route:', error)
    return NextResponse.json(
      { error: 'Failed to get debug info' },
      { status: 500 }
    )
  }
} 