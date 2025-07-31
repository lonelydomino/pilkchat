import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { hashtags, postHashtags } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔥 TRENDING HASHTAGS DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    const currentUserId = session?.user?.id

    console.log('🔥 TRENDING HASHTAGS DRIZZLE: 👤 Current user ID:', currentUserId)

    // Get trending hashtags (hashtags with most posts in recent time)
    console.log('🔥 TRENDING HASHTAGS DRIZZLE: 🔍 Fetching trending hashtags...')
    const trendingHashtags = await db
      .select({
        id: hashtags.id,
        name: hashtags.name,
        createdAt: hashtags.createdAt,
        updatedAt: hashtags.updatedAt,
        postCount: postHashtags.id, // This will be counted
      })
      .from(hashtags)
      .innerJoin(postHashtags, eq(hashtags.id, postHashtags.hashtagId))
      .groupBy(hashtags.id, hashtags.name, hashtags.createdAt, hashtags.updatedAt)
      .orderBy(desc(postHashtags.id)) // Order by post count
      .limit(10)

    console.log('🔥 TRENDING HASHTAGS DRIZZLE: ✅ Found', trendingHashtags.length, 'trending hashtags')

    // Transform the data to include proper post count
    const hashtagsWithCount = await Promise.all(
      trendingHashtags.map(async (hashtag) => {
        // Get actual post count for this hashtag
        const postCount = await db
          .select({ count: postHashtags.id })
          .from(postHashtags)
          .where(eq(postHashtags.hashtagId, hashtag.id))

        return {
          id: hashtag.id,
          name: hashtag.name,
          createdAt: hashtag.createdAt,
          updatedAt: hashtag.updatedAt,
          postCount: postCount.length,
        }
      })
    )

    // Sort by post count (descending)
    const sortedHashtags = hashtagsWithCount.sort((a, b) => b.postCount - a.postCount)

    console.log('🔥 TRENDING HASHTAGS DRIZZLE: ✅ Trending hashtags prepared')

    const response = NextResponse.json({
      hashtags: sortedHashtags
    })

    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response

  } catch (error) {
    console.error('🔥 TRENDING HASHTAGS DRIZZLE: ❌ Error fetching trending hashtags:', error)
    
    return NextResponse.json({
      hashtags: [],
      error: 'Failed to fetch trending hashtags',
      message: 'Unable to load trending hashtags at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('🔥 TRENDING HASHTAGS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 