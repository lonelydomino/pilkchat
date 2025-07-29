import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Store active connections
const connections = new Map<string, ReadableStreamDefaultController>()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Set up SSE stream
    const stream = new ReadableStream({
      start(controller) {
        // Store the controller for this user
        connections.set(userId, controller)

        // Send initial connection message
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify({
            type: 'connected',
            userId: userId
          })}\n\n`)
        )

        // Send heartbeat every 30 seconds
        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({
                type: 'heartbeat',
                timestamp: new Date().toISOString()
              })}\n\n`)
            )
          } catch (error) {
            clearInterval(heartbeat)
            connections.delete(userId)
          }
        }, 30000)

        // Clean up on close
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat)
          connections.delete(userId)
          controller.close()
        })
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      }
    })
  } catch (error) {
    console.error('Error in message stream:', error)
    return NextResponse.json(
      { error: 'Failed to establish stream' },
      { status: 500 }
    )
  }
}

// Function to send message to specific user
export function sendMessageToUser(userId: string, message: any) {
  const controller = connections.get(userId)
  if (controller) {
    try {
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({
          type: 'new_message',
          message: message
        })}\n\n`)
      )
    } catch (error) {
      console.error('Error sending message to user:', error)
      connections.delete(userId)
    }
  }
}

// Function to send message to multiple users
export function sendMessageToUsers(userIds: string[], message: any) {
  userIds.forEach(userId => sendMessageToUser(userId, message))
} 