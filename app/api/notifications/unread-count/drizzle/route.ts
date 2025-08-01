import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔔 UNREAD COUNT DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔔 UNREAD COUNT DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('🔔 UNREAD COUNT DRIZZLE: 👤 User ID:', userId)

    // Get unread notifications count
    console.log('🔔 UNREAD COUNT DRIZZLE: 🔍 Counting unread notifications...')
    const unreadNotifications = await db
      .select()
      .from(notifications)
      .where(
        eq(notifications.userId, userId)
      )

    const unreadCount = unreadNotifications.filter(n => !n.read).length

    console.log('🔔 UNREAD COUNT DRIZZLE: ✅ Unread count:', unreadCount)

    return NextResponse.json({
      unreadCount
    })

  } catch (error) {
    console.error('🔔 UNREAD COUNT DRIZZLE: ❌ Error getting unread count:', error)
    
    return NextResponse.json({
      unreadCount: 0,
      error: 'Failed to get unread count',
      message: 'Unable to get unread count at this time. Please try again later.'
    }, { status: 200 })
  }
} 