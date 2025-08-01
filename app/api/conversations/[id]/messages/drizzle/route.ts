import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { messages, users, conversationParticipants, conversations } from '@/lib/db/schema'
import { eq, and, desc, isNull } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💬 MESSAGES DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('💬 MESSAGES DRIZZLE: 👤 User ID:', userId)
    console.log('💬 MESSAGES DRIZZLE: 💬 Conversation ID:', conversationId)

    // Check if user is a participant in this conversation
    console.log('💬 MESSAGES DRIZZLE: 🔍 Checking if user is participant...')
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
      console.log('💬 MESSAGES DRIZZLE: ❌ User is not a participant in this conversation')
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Get messages for this conversation
    console.log('💬 MESSAGES DRIZZLE: 🔍 Fetching messages...')
    const messagesData = await db
      .select({
        id: messages.id,
        content: messages.content,
        createdAt: messages.createdAt,
        updatedAt: messages.updatedAt,
        senderId: messages.senderId,
      })
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt))
      .limit(50) // Limit to recent messages

    console.log('💬 MESSAGES DRIZZLE: ✅ Found', messagesData.length, 'messages')

    // Get sender information for each message
    const messagesWithSenders = await Promise.all(
      messagesData.map(async (message) => {
        const senderData = await db
          .select({
            id: users.id,
            name: users.name,
            username: users.username,
            image: users.image,
          })
          .from(users)
          .where(eq(users.id, message.senderId))
          .limit(1)

        return {
          ...message,
          sender: senderData[0] || null,
        }
      })
    )

    // Reverse the order to show oldest first
    const messagesInOrder = messagesWithSenders.reverse()

    return NextResponse.json({
      messages: messagesInOrder
    })

  } catch (error) {
    console.error('💬 MESSAGES DRIZZLE: ❌ Error fetching messages:', error)
    
    return NextResponse.json({
      messages: [],
      error: 'Failed to fetch messages',
      message: 'Unable to load messages at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💬 MESSAGES DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { content } = await request.json()
    
    console.log('💬 MESSAGES DRIZZLE: 👤 User ID:', userId)
    console.log('💬 MESSAGES DRIZZLE: 💬 Conversation ID:', conversationId)
    console.log('💬 MESSAGES DRIZZLE: 📝 Content length:', content?.length)

    if (!content || content.trim().length === 0) {
      console.log('💬 MESSAGES DRIZZLE: ❌ No content provided')
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      )
    }

    // Check if user is a participant in this conversation
    console.log('💬 MESSAGES DRIZZLE: 🔍 Checking if user is participant...')
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
      console.log('💬 MESSAGES DRIZZLE: ❌ User is not a participant in this conversation')
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Create new message
    console.log('💬 MESSAGES DRIZZLE: ➕ Creating message...')
    const [newMessage] = await db
      .insert(messages)
      .values({
        content: content.trim(),
        conversationId,
        senderId: userId,
      })
      .returning({
        id: messages.id,
        content: messages.content,
        createdAt: messages.createdAt,
        updatedAt: messages.updatedAt,
        senderId: messages.senderId,
      })

    console.log('💬 MESSAGES DRIZZLE: ✅ Message created with ID:', newMessage.id)

    // Update conversation's updatedAt timestamp
    console.log('💬 MESSAGES DRIZZLE: 🔄 Updating conversation timestamp...')
    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, conversationId))

    console.log('💬 MESSAGES DRIZZLE: ✅ Conversation timestamp updated')

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      messageData: newMessage
    })

  } catch (error) {
    console.error('💬 MESSAGES DRIZZLE: ❌ Error creating message:', error)
    
    return NextResponse.json({
      error: 'Failed to send message',
      message: 'Unable to send message at this time. Please try again later.'
    }, { status: 200 })
  }
} 