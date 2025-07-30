import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma, executeRawQuery, safeDatabaseOperation } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Try to get posts with Prisma first, fallback to raw SQL if needed
    const posts = await safeDatabaseOperation(
      // Primary operation using Prisma
      async () => {
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
      },
      // Fallback operation using raw SQL
      async () => {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const result = await executeRawQuery(`
          SELECT 
            p.content,
            COALESCE(l.like_count, 0) as like_count,
            COALESCE(c.comment_count, 0) as comment_count,
            COALESCE(r.repost_count, 0) as repost_count
          FROM "Post" p
          LEFT JOIN (
            SELECT post_id, COUNT(*) as like_count 
            FROM "Like" 
            GROUP BY post_id
          ) l ON p.id = l.post_id
          LEFT JOIN (
            SELECT post_id, COUNT(*) as comment_count 
            FROM "Comment" 
            GROUP BY post_id
          ) c ON p.id = c.post_id
          LEFT JOIN (
            SELECT post_id, COUNT(*) as repost_count 
            FROM "Repost" 
            GROUP BY post_id
          ) r ON p.id = r.post_id
          WHERE p.published = true 
          AND p.created_at >= $1
          ORDER BY p.created_at DESC
        `, [sevenDaysAgo])
        
        return result.map((row: any) => ({
          content: row.content,
          _count: {
            likes: parseInt(row.like_count),
            comments: parseInt(row.comment_count),
            reposts: parseInt(row.repost_count),
          }
        }))
      }
    )

    // Extract hashtags from post content
    const hashtagCounts: { [key: string]: number } = {}
    const hashtagEngagement: { [key: string]: number } = {}

    posts.forEach((post: any) => {
      const hashtags = post.content?.match(/#\w+/g) || []
      const engagement = (post._count?.likes || 0) + (post._count?.comments || 0) + (post._count?.reposts || 0)

      hashtags.forEach((tag: string) => {
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
    
    // Return a fallback response instead of error
    return NextResponse.json({ 
      topics: [],
      message: 'Unable to fetch trending topics at this time'
    }, { status: 200 })
  } finally {
    // Clean up connection in serverless environment
    await cleanupPrisma()
  }
} 