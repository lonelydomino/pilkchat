import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, comments } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('👥 TEST USERS: GET request started')
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (userId) {
      // Get specific user
      const userData = await db
        .select({
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)

      console.log('👥 TEST USERS: User data for', userId, ':', userData[0])
      
      return NextResponse.json({
        user: userData[0] || null
      })
    } else {
      // Get all users
      const allUsers = await db
        .select({
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        })
        .from(users)
        .limit(10)

      console.log('👥 TEST USERS: All users:', allUsers)
      
      return NextResponse.json({
        users: allUsers
      })
    }
  } catch (error) {
    console.error('👥 TEST USERS: ❌ Error:', error)
    return NextResponse.json({
      error: 'Failed to fetch users',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 