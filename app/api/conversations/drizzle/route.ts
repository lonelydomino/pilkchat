import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { conversations, conversationParticipants, users, messages } from '@/lib/db/schema'
import { eq, and, desc, isNull } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('💬 CONVERSATIONS DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💬 CONVERSATIONS DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('💬 CONVERSATIONS DRIZZLE: 👤 User ID:', userId)

    // Get conversations for the current user
    console.log('💬 CONVERSATIONS DRIZZLE: 🔍 Fetching conversations...')
    const conversationsData = await db
      .select({
        id: conversations.id,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
        participants: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        },
      })
      .from(conversationParticipants)
      .innerJoin(conversations, eq(conversationParticipants.conversationId, conversations.id))
      .innerJoin(users, eq(conversationParticipants.userId, users.id))
      .where(
        and(
          eq(conversationParticipants.userId, userId),
          isNull(conversationParticipants.leftAt)
        )
      )
      .orderBy(desc(conversations.updatedAt))

    console.log('💬 CONVERSATIONS DRIZZLE: ✅ Found', conversationsData.length, 'conversations')

    // Group conversations and get latest message for each
    const conversationsWithLatestMessage = await Promise.all(
      conversationsData.map(async (conv) => {
        // Get the latest message for this conversation
        const latestMessage = await db
          .select({
            id: messages.id,
            content: messages.content,
            createdAt: messages.createdAt,
            sender: {
              id: users.id,
              name: users.name,
              username: users.username,
              image: users.image,
            },
          })
          .from(messages)
          .innerJoin(users, eq(messages.senderId, users.id))
          .where(eq(messages.conversationId, conv.id))
          .orderBy(desc(messages.createdAt))
          .limit(1)

        // Get all participants for this conversation
        const participants = await db
          .select({
            id: users.id,
            name: users.name,
            username: users.username,
            image: users.image,
          })
          .from(conversationParticipants)
          .innerJoin(users, eq(conversationParticipants.userId, users.id))
          .where(
            and(
              eq(conversationParticipants.conversationId, conv.id),
              isNull(conversationParticipants.leftAt)
            )
          )

        return {
          id: conv.id,
          createdAt: conv.createdAt,
          updatedAt: conv.updatedAt,
          participants,
          latestMessage: latestMessage[0] || null,
        }
      })
    )

    console.log('💬 CONVERSATIONS DRIZZLE: ✅ Conversations with latest messages prepared')
    
    return NextResponse.json({
      conversations: conversationsWithLatestMessage
    })

  } catch (error) {
    console.error('💬 CONVERSATIONS DRIZZLE: ❌ Error fetching conversations:', error)
    
    return NextResponse.json({
      conversations: [],
      error: 'Failed to fetch conversations',
      message: 'Unable to load conversations at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('💬 CONVERSATIONS DRIZZLE: POST request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💬 CONVERSATIONS DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { participantIds } = await request.json()
    
    console.log('💬 CONVERSATIONS DRIZZLE: 👤 User ID:', userId)
    console.log('💬 CONVERSATIONS DRIZZLE: 👥 Participant IDs:', participantIds)

    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      console.log('💬 CONVERSATIONS DRIZZLE: ❌ Invalid participant IDs')
      return NextResponse.json(
        { error: 'Valid participant IDs are required' },
        { status: 400 }
      )
    }

    // Create new conversation
    console.log('💬 CONVERSATIONS DRIZZLE: ➕ Creating conversation...')
    const [newConversation] = await db
      .insert(conversations)
      .values({})
      .returning({
        id: conversations.id,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
      })

    console.log('💬 CONVERSATIONS DRIZZLE: ✅ Conversation created with ID:', newConversation.id)

    // Add participants to conversation
    const allParticipantIds = [userId, ...participantIds]
    console.log('💬 CONVERSATIONS DRIZZLE: 👥 Adding participants...')
    
    await Promise.all(
      allParticipantIds.map(async (participantId) => {
        await db
          .insert(conversationParticipants)
          .values({
            conversationId: newConversation.id,
            userId: participantId,
          })
      })
    )

    console.log('💬 CONVERSATIONS DRIZZLE: ✅ Participants added to conversation')
    console.log('💬 CONVERSATIONS DRIZZLE: 📤 Returning conversation:', newConversation)

    return NextResponse.json({
      success: true,
      message: 'Conversation created successfully',
      conversation: newConversation
    })

  } catch (error) {
    console.error('💬 CONVERSATIONS DRIZZLE: ❌ Error creating conversation:', error)
    
    return NextResponse.json({
      error: 'Failed to create conversation',
      message: 'Unable to create conversation at this time. Please try again later.'
    }, { status: 200 })
  }
} 