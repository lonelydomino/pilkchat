import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    if (!query.trim()) {
      return NextResponse.json({
        results: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
        },
      })
    }

    const searchQuery = `%${query}%`

    let results: any[] = []
    let totalCount = 0

    if (type === 'all' || type === 'users') {
      const users = await withRetry(async () => {
        return await prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { username: { contains: query, mode: 'insensitive' } },
            ],
          },
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            _count: {
              select: {
                followers: true,
                following: true,
                posts: true,
              },
            },
          },
          take: limit,
          skip: offset,
        })
      }, 3, 200)

      results.push(...users.map(user => ({ ...user, type: 'user' })))
    }

    if (type === 'all' || type === 'posts') {
      const posts = await withRetry(async () => {
        return await prisma.post.findMany({
          where: {
            published: true,
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
                reposts: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: limit,
          skip: offset,
        })
      }, 3, 200)

      results.push(...posts.map(post => ({ ...post, type: 'post' })))
    }

    if (type === 'all' || type === 'hashtags') {
      const hashtags = await withRetry(async () => {
        return await prisma.hashtag.findMany({
          where: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          include: {
            _count: {
              select: {
                posts: true,
              },
            },
          },
          take: limit,
          skip: offset,
        })
      }, 3, 200)

      results.push(...hashtags.map(hashtag => ({ ...hashtag, type: 'hashtag' })))
    }

    // Get total count
    totalCount = await withRetry(async () => {
      let count = 0
      
      if (type === 'all' || type === 'users') {
        count += await prisma.user.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { username: { contains: query, mode: 'insensitive' } },
            ],
          },
        })
      }
      
      if (type === 'all' || type === 'posts') {
        count += await prisma.post.count({
          where: {
            published: true,
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
        })
      }
      
      if (type === 'all' || type === 'hashtags') {
        count += await prisma.hashtag.count({
          where: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        })
      }
      
      return count
    }, 3, 200)

    return NextResponse.json({
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json({
      results: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
      message: 'Unable to perform search at this time'
    }, { status: 200 })
  } finally {
    await cleanupPrisma()
  }
} 