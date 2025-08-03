import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { messages, conversationParticipants } from '@/lib/db/schema'
import { eq, and, isNull } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('📖 MARK READ DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('📖 MARK READ DRIZZLE: 👤 User ID:', userId)
    console.log('📖 MARK READ DRIZZLE: 💬 Conversation ID:', conversationId)

    // Check if user is a participant in this conversation
    console.log('📖 MARK READ DRIZZLE: 🔍 Checking if user is participant...')
    const participantCheck = await db
      .select()
      .from(conversationParticipants)
      .where(
        and(
          eq(conversationParticipants.conversationId, conversationId),
          eq(conversationParticipants.userId, userId),
          isNull(conversationParticipants.leftAt)
        )
      )
      .limit(1)

    if (participantCheck.length === 0) {
      console.log('📖 MARK READ DRIZZLE: ❌ User is not a participant in this conversation')
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Mark all unread messages in this conversation as read for this user
    console.log('📖 MARK READ DRIZZLE: ✅ Marking messages as read...')
    const now = new Date()
    
    await db
      .update(messages)
      .set({ readAt: now })
      .where(
        and(
          eq(messages.conversationId, conversationId),
          eq(messages.senderId, userId),
          isNull(messages.readAt)
        )
      )

    console.log('📖 MARK READ DRIZZLE: ✅ Messages marked as read')

    return NextResponse.json({
      success: true,
      message: 'Messages marked as read'
    })

  } catch (error) {
    console.error('📖 MARK READ DRIZZLE: ❌ Error marking messages as read:', error)
    
    return NextResponse.json({
      error: 'Failed to mark messages as read',
      message: 'Unable to mark messages as read at this time. Please try again later.'
    }, { status: 200 })
  }
} 