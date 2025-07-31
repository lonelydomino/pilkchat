import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔔 NOTIFICATIONS DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔔 NOTIFICATIONS DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('🔔 NOTIFICATIONS DRIZZLE: 👤 User ID:', userId)

    // Get notifications for the user
    console.log('🔔 NOTIFICATIONS DRIZZLE: 🔍 Fetching notifications...')
    const notificationsData = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(50) // Limit to recent notifications

    console.log('🔔 NOTIFICATIONS DRIZZLE: ✅ Found', notificationsData.length, 'notifications')

    // Get unread count
    const unreadNotifications = await db
      .select()
      .from(notifications)
      .where(
        eq(notifications.userId, userId)
      )

    const unreadCount = unreadNotifications.filter(n => !n.read).length

    console.log('🔔 NOTIFICATIONS DRIZZLE: 📊 Unread count:', unreadCount)

    const response = NextResponse.json({
      notifications: notificationsData,
      unreadCount,
    })

    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response

  } catch (error) {
    console.error('🔔 NOTIFICATIONS DRIZZLE: ❌ Error fetching notifications:', error)
    
    return NextResponse.json({
      notifications: [],
      unreadCount: 0,
      error: 'Failed to fetch notifications',
      message: 'Unable to load notifications at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('🔔 NOTIFICATIONS DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 