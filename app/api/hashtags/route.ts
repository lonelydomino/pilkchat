import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { withRetry, cleanupPrisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

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

    const hashtags = await withRetry(async (client) => {
      return await client.hashtag.findMany({
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
    }, 3, 200)

    return NextResponse.json({ hashtags })
  } catch (error) {
    console.error('Error fetching hashtags:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hashtags' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
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
    let hashtag = await withRetry(async (client) => {
      return await client.hashtag.findUnique({
        where: { name: normalizedName }
      })
    }, 3, 200)

    if (!hashtag) {
      hashtag = await withRetry(async (client) => {
        return await client.hashtag.create({
          data: { name: normalizedName }
        })
      }, 3, 200)
    }

    return NextResponse.json({ hashtag })
  } catch (error) {
    console.error('Error creating hashtag:', error)
    return NextResponse.json(
      { error: 'Failed to create hashtag' },
      { status: 500 }
    )
  } finally {
    await cleanupPrisma()
  }
} 