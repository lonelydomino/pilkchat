import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { messages, conversationParticipants } from '@/lib/db/schema'
import { eq, and, isNull } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('💬 UNREAD MESSAGES DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💬 UNREAD MESSAGES DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('💬 UNREAD MESSAGES DRIZZLE: 👤 User ID:', userId)

    // Get conversations where user is a participant
    console.log('💬 UNREAD MESSAGES DRIZZLE: 🔍 Getting user conversations...')
    const userConversations = await db
      .select({
        conversationId: conversationParticipants.conversationId,
      })
      .from(conversationParticipants)
      .where(
        and(
          eq(conversationParticipants.userId, userId),
          isNull(conversationParticipants.leftAt)
        )
      )

    const conversationIds = userConversations.map(c => c.conversationId)

    if (conversationIds.length === 0) {
      console.log('💬 UNREAD MESSAGES DRIZZLE: ✅ No conversations found')
      return NextResponse.json({
        unreadCount: 0
      })
    }

    // Get unread messages count (messages not sent by current user)
    console.log('💬 UNREAD MESSAGES DRIZZLE: 🔍 Counting unread messages...')
    const unreadMessages = await db
      .select()
      .from(messages)
      .where(
        and(
          eq(messages.senderId, userId),
          // Note: This is a simplified approach. In a real app, you'd track read status per message
          // For now, we'll return 0 as the schema doesn't have message read tracking
        )
      )

    // Since we don't have message read tracking in the schema, we'll return 0
    // In a real implementation, you'd track which messages each user has read
    const unreadCount = 0

    console.log('💬 UNREAD MESSAGES DRIZZLE: ✅ Unread count:', unreadCount)

    return NextResponse.json({
      unreadCount
    })

  } catch (error) {
    console.error('💬 UNREAD MESSAGES DRIZZLE: ❌ Error getting unread count:', error)
    
    return NextResponse.json({
      unreadCount: 0,
      error: 'Failed to get unread count',
      message: 'Unable to get unread count at this time. Please try again later.'
    }, { status: 200 })
  }
} 