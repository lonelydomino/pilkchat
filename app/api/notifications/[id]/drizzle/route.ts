import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notificationId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔔 NOTIFICATION DELETE DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    
    console.log('🔔 NOTIFICATION DELETE DRIZZLE: 👤 User ID:', userId)
    console.log('🔔 NOTIFICATION DELETE DRIZZLE: 📝 Notification ID:', notificationId)

    // Delete notification
    console.log('🔔 NOTIFICATION DELETE DRIZZLE: 🗑️ Deleting notification...')
    await db
      .delete(notifications)
      .where(
        and(
          eq(notifications.id, notificationId),
          eq(notifications.userId, userId)
        )
      )

    console.log('🔔 NOTIFICATION DELETE DRIZZLE: ✅ Notification deleted')

    return NextResponse.json({
      success: true,
      message: 'Notification deleted'
    })

  } catch (error) {
    console.error('🔔 NOTIFICATION DELETE DRIZZLE: ❌ Error deleting notification:', error)
    
    return NextResponse.json({
      error: 'Failed to delete notification',
      message: 'Unable to delete notification at this time. Please try again later.'
    }, { status: 200 })
  }
} 