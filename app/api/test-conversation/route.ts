import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { conversations, conversationParticipants, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('💬 TEST CONVERSATION: POST request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('💬 TEST CONVERSATION: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { participantIds } = await request.json()
    
    console.log('💬 TEST CONVERSATION: 👤 User ID:', userId)
    console.log('💬 TEST CONVERSATION: 👥 Participant IDs:', participantIds)

    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      console.log('💬 TEST CONVERSATION: ❌ Invalid participant IDs')
      return NextResponse.json(
        { error: 'Valid participant IDs are required' },
        { status: 400 }
      )
    }

    // Verify participants exist
    console.log('💬 TEST CONVERSATION: 🔍 Verifying participants exist...')
    const allParticipantIds = [userId, ...participantIds]
    const existingUsers = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
      })
      .from(users)
      .where(eq(users.id, allParticipantIds[0]))

    console.log('💬 TEST CONVERSATION: ✅ Found users:', existingUsers)

    // Create new conversation
    console.log('💬 TEST CONVERSATION: ➕ Creating conversation...')
    const [newConversation] = await db
      .insert(conversations)
      .values({})
      .returning({
        id: conversations.id,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
      })

    console.log('💬 TEST CONVERSATION: ✅ Conversation created:', newConversation)

    // Add participants to conversation
    console.log('💬 TEST CONVERSATION: 👥 Adding participants...')
    
    const participantInserts = await Promise.all(
      allParticipantIds.map(async (participantId) => {
        const [participant] = await db
          .insert(conversationParticipants)
          .values({
            conversationId: newConversation.id,
            userId: participantId,
          })
          .returning()
        return participant
      })
    )

    console.log('💬 TEST CONVERSATION: ✅ Participants added:', participantInserts)

    const response = {
      success: true,
      message: 'Conversation created successfully',
      conversation: newConversation
    }

    console.log('💬 TEST CONVERSATION: 📤 Returning response:', response)

    return NextResponse.json(response)

  } catch (error) {
    console.error('💬 TEST CONVERSATION: ❌ Error:', error)
    return NextResponse.json({
      error: 'Failed to create conversation',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 