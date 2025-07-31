import { NextRequest, NextResponse } from 'next/server'
import { withRetry, cleanupPrisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('📝 CREATE POST: POST request started')
    console.log('📝 CREATE POST: Request URL:', request.url)
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('📝 CREATE POST: ❌ No session or user ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('📝 CREATE POST: ✅ User authenticated:', session.user.id, 'Username:', session.user.username)

    const body = await request.json()
    const { content, published = true } = body

    console.log('📝 CREATE POST: 📝 Creating post with content length:', content?.length || 0)
    console.log('📝 CREATE POST: 📊 Post data:', { content: content?.substring(0, 100) + '...', published })

    console.log('📝 CREATE POST: 🔍 Creating post in database...')
    const post = await withRetry(async (client) => {
      return await client.post.create({
        data: {
          content,
          published,
          authorId: session.user.id,
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
      })
    }, 3, 200)

    console.log('📝 CREATE POST: ✅ Post created successfully, ID:', post.id)
    return NextResponse.json(post)
  } catch (error) {
    console.error('📝 CREATE POST: ❌ Error creating post:', error)
    console.error('📝 CREATE POST: ❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to create post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    console.log('📝 CREATE POST: 🧹 Cleaning up Prisma connection...')
    await cleanupPrisma()
    console.log('📝 CREATE POST: ✅ Cleanup completed')
  }
}

export async function GET() {
  console.log('📝 CREATE POST: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 