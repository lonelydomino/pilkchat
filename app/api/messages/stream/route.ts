import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { addConnection, removeConnection } from '@/lib/message-stream'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

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
        addConnection(userId, controller)

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
            removeConnection(userId)
          }
        }, 30000)

        // Clean up on close
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat)
          removeConnection(userId)
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