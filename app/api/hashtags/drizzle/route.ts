import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { hashtags, postHashtags, posts, users } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🏷️ HASHTAGS DRIZZLE: GET request started')
    
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    
    console.log('🏷️ HASHTAGS DRIZZLE: 🏷️ Hashtag name:', name)

    if (!name) {
      console.log('🏷️ HASHTAGS DRIZZLE: ❌ No hashtag name provided')
      return NextResponse.json(
        { error: 'Hashtag name is required' },
        { status: 400 }
      )
    }

    // Get hashtag info
    console.log('🏷️ HASHTAGS DRIZZLE: 🔍 Fetching hashtag info...')
    const hashtagData = await db
      .select()
      .from(hashtags)
      .where(eq(hashtags.name, name))
      .limit(1)

    if (!hashtagData || hashtagData.length === 0) {
      console.log('🏷️ HASHTAGS DRIZZLE: ❌ Hashtag not found')
      return NextResponse.json(
        { error: 'Hashtag not found' },
        { status: 404 }
      )
    }

    const hashtag = hashtagData[0]
    console.log('🏷️ HASHTAGS DRIZZLE: ✅ Hashtag found:', hashtag.name)

    // Get posts with this hashtag
    console.log('🏷️ HASHTAGS DRIZZLE: 🔍 Fetching posts with hashtag...')
    const postsData = await db
      .select({
        id: posts.id,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        },
      })
      .from(postHashtags)
      .innerJoin(posts, eq(postHashtags.postId, posts.id))
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(
        and(
          eq(postHashtags.hashtagId, hashtag.id),
          eq(posts.published, true)
        )
      )
      .orderBy(desc(posts.createdAt))
      .limit(20)

    console.log('🏷️ HASHTAGS DRIZZLE: ✅ Found', postsData.length, 'posts with hashtag')

    return NextResponse.json({
      hashtag,
      posts: postsData
    })

  } catch (error) {
    console.error('🏷️ HASHTAGS DRIZZLE: ❌ Error fetching hashtag:', error)
    
    return NextResponse.json({
      hashtag: null,
      posts: [],
      error: 'Failed to fetch hashtag',
      message: 'Unable to load hashtag at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('🏷️ HASHTAGS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 