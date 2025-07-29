import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { showToast } from '@/components/toast'

interface Message {
  id: string
  content: string
  type: string
  createdAt: string
  sender: {
    id: string
    name: string
    username: string
    image?: string
  }
}

interface MessageStreamEvent {
  type: 'connected' | 'heartbeat' | 'new_message'
  userId?: string
  timestamp?: string
  message?: {
    conversationId: string
    message: Message
  }
}

export function useMessages() {
  const { data: session } = useSession()
  const [isConnected, setIsConnected] = useState(false)
  const [messageCallbacks, setMessageCallbacks] = useState<Map<string, (message: Message) => void>>(new Map())

  const connectToStream = useCallback(() => {
    if (!session?.user?.id) return

    let eventSource: EventSource | null = null

    const connect = () => {
      eventSource = new EventSource('/api/messages/stream')

      eventSource.onopen = () => {
        setIsConnected(true)
        console.log('Connected to messages stream')
      }

      eventSource.onmessage = (event) => {
        try {
          const data: MessageStreamEvent = JSON.parse(event.data)
          
          switch (data.type) {
            case 'connected':
              setIsConnected(true)
              break
            case 'heartbeat':
              // Keep connection alive
              break
            case 'new_message':
              if (data.message) {
                const callback = messageCallbacks.get(data.message.conversationId)
                if (callback) {
                  callback(data.message.message)
                  showToast('info', `New message from ${data.message.message.sender.name}`)
                }
              }
              break
          }
        } catch (error) {
          console.error('Error parsing message stream event:', error)
        }
      }

      eventSource.onerror = (error) => {
        console.error('Message stream error:', error)
        setIsConnected(false)
        
        // Reconnect after 5 seconds
        setTimeout(() => {
          if (eventSource) {
            eventSource.close()
            connect()
          }
        }, 5000)
      }
    }

    connect()

    return () => {
      if (eventSource) {
        eventSource.close()
        setIsConnected(false)
      }
    }
  }, [session?.user?.id, messageCallbacks])

  useEffect(() => {
    const cleanup = connectToStream()
    return cleanup
  }, [connectToStream])

  const subscribeToConversation = useCallback((conversationId: string, callback: (message: Message) => void) => {
    setMessageCallbacks(prev => new Map(prev).set(conversationId, callback))
  }, [])

  const unsubscribeFromConversation = useCallback((conversationId: string) => {
    setMessageCallbacks(prev => {
      const newMap = new Map(prev)
      newMap.delete(conversationId)
      return newMap
    })
  }, [])

  return {
    isConnected,
    subscribeToConversation,
    unsubscribeFromConversation
  }
} 