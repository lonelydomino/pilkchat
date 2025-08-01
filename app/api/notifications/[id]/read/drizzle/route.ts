import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notificationId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔔 NOTIFICATION READ DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    
    console.log('🔔 NOTIFICATION READ DRIZZLE: 👤 User ID:', userId)
    console.log('🔔 NOTIFICATION READ DRIZZLE: 📝 Notification ID:', notificationId)

    // Mark notification as read
    console.log('🔔 NOTIFICATION READ DRIZZLE: 🔄 Marking notification as read...')
    await db
      .update(notifications)
      .set({ read: true })
      .where(
        and(
          eq(notifications.id, notificationId),
          eq(notifications.userId, userId)
        )
      )

    console.log('🔔 NOTIFICATION READ DRIZZLE: ✅ Notification marked as read')

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read'
    })

  } catch (error) {
    console.error('🔔 NOTIFICATION READ DRIZZLE: ❌ Error marking notification as read:', error)
    
    return NextResponse.json({
      error: 'Failed to mark notification as read',
      message: 'Unable to update notification at this time. Please try again later.'
    }, { status: 200 })
  }
} 