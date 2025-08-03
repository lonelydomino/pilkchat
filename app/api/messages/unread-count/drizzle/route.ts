import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { messages, conversationParticipants } from '@/lib/db/schema'
import { eq, and, isNull, ne } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('📊 UNREAD COUNT DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('📊 UNREAD COUNT DRIZZLE: 👤 User ID:', userId)

    // Get conversations where user is a participant
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

    if (userConversations.length === 0) {
      console.log('📊 UNREAD COUNT DRIZZLE: ✅ No conversations found')
      return NextResponse.json({
        totalUnread: 0,
        conversationsWithUnread: []
      })
    }

    const conversationIds = userConversations.map(c => c.conversationId)

    // Get unread message counts for each conversation
    const unreadCounts = await db
      .select({
        conversationId: messages.conversationId,
        unreadCount: sql<number>`count(*)::int`,
      })
      .from(messages)
      .where(
        and(
          sql`${messages.conversationId} = ANY(${conversationIds})`,
          ne(messages.senderId, userId), // Messages not sent by current user
          isNull(messages.readAt) // Messages not read
        )
      )
      .groupBy(messages.conversationId)

    console.log('📊 UNREAD COUNT DRIZZLE: ✅ Unread counts:', unreadCounts)

    const totalUnread = unreadCounts.reduce((sum, item) => sum + item.unreadCount, 0)
    const conversationsWithUnread = unreadCounts.map(item => ({
      conversationId: item.conversationId,
      unreadCount: item.unreadCount
    }))

    return NextResponse.json({
      totalUnread,
      conversationsWithUnread
    })

  } catch (error) {
    console.error('📊 UNREAD COUNT DRIZZLE: ❌ Error fetching unread counts:', error)
    
    return NextResponse.json({
      totalUnread: 0,
      conversationsWithUnread: [],
      error: 'Failed to fetch unread counts',
      message: 'Unable to load unread counts at this time. Please try again later.'
    }, { status: 200 })
  }
} 