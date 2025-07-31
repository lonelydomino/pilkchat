import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('📖 MARK ALL READ DRIZZLE: POST request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('📖 MARK ALL READ DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('📖 MARK ALL READ DRIZZLE: 👤 User ID:', userId)

    // Mark all notifications as read
    console.log('📖 MARK ALL READ DRIZZLE: 🔄 Marking all notifications as read...')
    const result = await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, userId))

    console.log('📖 MARK ALL READ DRIZZLE: ✅ All notifications marked as read')

    return NextResponse.json({
      success: true,
      message: 'All notifications marked as read'
    })

  } catch (error) {
    console.error('📖 MARK ALL READ DRIZZLE: ❌ Error marking notifications as read:', error)
    
    return NextResponse.json({
      error: 'Failed to mark notifications as read',
      message: 'Unable to mark notifications as read at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET() {
  console.log('📖 MARK ALL READ DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 