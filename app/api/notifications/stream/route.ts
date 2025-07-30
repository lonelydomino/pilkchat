import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { addConnection, removeConnection } from '@/lib/notification-stream'

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

    // Set up SSE headers
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    }

    // Create the stream
    const stream = new ReadableStream({
      start(controller) {
        // Store the controller for this user
        addConnection(userId, controller)

        // Send initial connection message
        controller.enqueue(`data: ${JSON.stringify({
          type: 'connected',
          message: 'Connected to notifications stream'
        })}\n\n`)

        // Keep connection alive with heartbeat
        const heartbeat = setInterval(() => {
          controller.enqueue(`data: ${JSON.stringify({
            type: 'heartbeat',
            timestamp: new Date().toISOString()
          })}\n\n`)
        }, 30000) // Every 30 seconds

        // Clean up on close
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat)
          removeConnection(userId)
          controller.close()
        })
      }
    })

    return new Response(stream, { headers })
  } catch (error) {
    console.error('Error setting up notification stream:', error)
    return NextResponse.json(
      { error: 'Failed to establish notification stream' },
      { status: 500 }
    )
  }
} 