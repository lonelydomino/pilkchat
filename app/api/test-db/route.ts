import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { posts } from '@/lib/db/schema'

export async function GET() {
  try {
    console.log('🔍 TEST DB: Checking posts table...')
    
    // Get all posts with their IDs
    const allPosts = await db
      .select({
        id: posts.id,
        content: posts.content,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .limit(10)

    console.log('🔍 TEST DB: Found posts:', allPosts.length)
    console.log('🔍 TEST DB: Posts with IDs:', allPosts.map(p => ({ id: p.id, hasId: !!p.id, idType: typeof p.id })))
    
    // Check for posts without IDs
    const postsWithoutIds = allPosts.filter(p => !p.id || p.id.trim() === '')
    console.log('🔍 TEST DB: Posts without IDs:', postsWithoutIds.length)
    
    return NextResponse.json({
      totalPosts: allPosts.length,
      postsWithIds: allPosts.filter(p => p.id && p.id.trim() !== '').length,
      postsWithoutIds: postsWithoutIds.length,
      samplePosts: allPosts.slice(0, 5),
      postsWithoutIdsSample: postsWithoutIds.slice(0, 5),
    })
  } catch (error) {
    console.error('🔍 TEST DB: Error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
} 