import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { notifications, users } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔔 TEST NOTIFICATIONS: GET request started')
    
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'create') {
      // Test creating a notification
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'No session found' }, { status: 401 })
      }
      
      console.log('🔔 TEST NOTIFICATIONS: Creating test notification...')
      
      const [newNotification] = await db
        .insert(notifications)
        .values({
          userId: session.user.id,
          type: 'test',
          message: 'This is a test notification',
          read: false,
          createdAt: new Date(),
        })
        .returning()
      
      console.log('🔔 TEST NOTIFICATIONS: Created notification:', newNotification)
      
      return NextResponse.json({
        success: true,
        notification: newNotification
      })
    }
    
    // Get all notifications
    console.log('🔔 TEST NOTIFICATIONS: Fetching all notifications...')
    const allNotifications = await db
      .select({
        id: notifications.id,
        userId: notifications.userId,
        type: notifications.type,
        message: notifications.message,
        read: notifications.read,
        createdAt: notifications.createdAt,
        user: {
          id: users.id,
          name: users.name,
          username: users.username,
        }
      })
      .from(notifications)
      .innerJoin(users, eq(notifications.userId, users.id))
      .orderBy(desc(notifications.createdAt))
      .limit(20)

    console.log('🔔 TEST NOTIFICATIONS: Found', allNotifications.length, 'notifications')
    
    return NextResponse.json({
      notifications: allNotifications,
      total: allNotifications.length
    })
    
  } catch (error) {
    console.error('🔔 TEST NOTIFICATIONS: ❌ Error:', error)
    return NextResponse.json({
      error: 'Failed to test notifications',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 