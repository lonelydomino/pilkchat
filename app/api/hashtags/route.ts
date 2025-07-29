import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

// Get trending hashtags
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    let whereClause = {}
    if (search) {
      whereClause = {
        name: {
          contains: search.toLowerCase(),
          mode: 'insensitive'
        }
      }
    }

    const hashtags = await prisma.hashtag.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      },
      take: limit
    })

    return NextResponse.json({ hashtags })
  } catch (error) {
    console.error('Error fetching hashtags:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hashtags' },
      { status: 500 }
    )
  }
}

// Create hashtag (used internally)
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()
    
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Hashtag name is required' },
        { status: 400 }
      )
    }

    const normalizedName = name.toLowerCase().trim()
    
    // Check if hashtag already exists
    let hashtag = await prisma.hashtag.findUnique({
      where: { name: normalizedName }
    })

    if (!hashtag) {
      hashtag = await prisma.hashtag.create({
        data: { name: normalizedName }
      })
    }

    return NextResponse.json({ hashtag })
  } catch (error) {
    console.error('Error creating hashtag:', error)
    return NextResponse.json(
      { error: 'Failed to create hashtag' },
      { status: 500 }
    )
  }
} 