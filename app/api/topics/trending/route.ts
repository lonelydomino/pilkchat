import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Extract hashtags from posts and count their usage with retry logic
    const posts = await withRetry(async () => {
      return await prisma.post.findMany({
        where: {
          published: true,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
        select: {
          content: true,
          _count: {
            select: {
              likes: true,
              comments: true,
              reposts: true,
            },
          },
        },
      })
    })

    // Extract hashtags from post content
    const hashtagCounts: { [key: string]: number } = {}
    const hashtagEngagement: { [key: string]: number } = {}

    posts.forEach(post => {
      const hashtags = post.content.match(/#\w+/g) || []
      const engagement = post._count.likes + post._count.comments + post._count.reposts

      hashtags.forEach(tag => {
        const cleanTag = tag.toLowerCase()
        hashtagCounts[cleanTag] = (hashtagCounts[cleanTag] || 0) + 1
        hashtagEngagement[cleanTag] = (hashtagEngagement[cleanTag] || 0) + engagement
      })
    })

    // Convert to array and sort by usage
    const trendingTopics = Object.entries(hashtagCounts)
      .map(([tag, count]) => ({
        tag: tag.substring(1), // Remove # symbol
        count,
        engagement: hashtagEngagement[tag],
        trendingScore: hashtagEngagement[tag] / Math.pow(count, 0.5), // Engagement per post
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 10)

    return NextResponse.json({ topics: trendingTopics })
  } catch (error) {
    console.error('Error fetching trending topics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending topics' },
      { status: 500 }
    )
  }
} 