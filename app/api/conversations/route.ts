import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

// Get user's conversations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: session.user.id,
            leftAt: null
          }
        }
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            }
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            }
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    // Format conversations for frontend
    const formattedConversations = conversations.map(conversation => {
      const otherParticipants = conversation.participants
        .filter(p => p.userId !== session.user.id)
        .map(p => p.user)

      const lastMessage = conversation.messages[0]
      const unreadCount = conversation.messages.filter(m => 
        m.senderId !== session.user.id && !m.readAt
      ).length

      return {
        id: conversation.id,
        participants: otherParticipants,
        lastMessage: lastMessage ? {
          id: lastMessage.id,
          content: lastMessage.content,
          type: lastMessage.type,
          createdAt: lastMessage.createdAt,
          sender: lastMessage.sender
        } : null,
        unreadCount,
        totalMessages: conversation._count.messages,
        updatedAt: conversation.updatedAt
      }
    })

    return NextResponse.json({ conversations: formattedConversations })
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}

// Create a new conversation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { participantIds } = await request.json()

    if (!participantIds || !Array.isArray(participantIds)) {
      return NextResponse.json(
        { error: 'Participant IDs are required' },
        { status: 400 }
      )
    }

    // Add current user to participants
    const allParticipantIds = Array.from(new Set([session.user.id, ...participantIds]))

    // Check if conversation already exists between these users
    const existingConversations = await prisma.conversation.findMany({
      where: {
        participants: {
          every: {
            userId: {
              in: allParticipantIds
            }
          }
        }
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            }
          }
        }
      }
    })

    // Find conversation with exact participant count
    const existingConversation = existingConversations.find(
      conv => conv.participants.length === allParticipantIds.length
    )

    if (existingConversation) {
      return NextResponse.json({ conversation: existingConversation })
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: allParticipantIds.map(userId => ({
            userId
          }))
        }
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ conversation })
  } catch (error) {
    console.error('Error creating conversation:', error)
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    )
  }
} 