'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowLeft, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { useMessages } from '@/hooks/useMessages'

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
  } | null
}

interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    username: string
    image?: string
  }[]
}

export default function ConversationPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const conversationId = params.id as string
  const { subscribeToConversation, unsubscribeFromConversation } = useMessages()
  
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchConversation = useCallback(async () => {
    try {
      const response = await fetch('/api/conversations/drizzle')
      if (response.ok) {
        const data = await response.json()
        const conv = data.conversations.find((c: any) => c.id === conversationId)
        if (conv) {
          setConversation(conv)
        } else {
          setError('Conversation not found')
        }
      }
    } catch (error) {
      console.error('Error fetching conversation:', error)
      setError('Failed to load conversation')
    }
  }, [conversationId])

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages/drizzle`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }, [conversationId])

  useEffect(() => {
    fetchConversation()
    fetchMessages()
  }, [fetchConversation, fetchMessages])

  // Mark messages as read when user views the conversation
  useEffect(() => {
    if (conversationId && session?.user?.id) {
      const markAsRead = async () => {
        try {
          console.log('🔍 MARK READ: Marking messages as read for conversation:', conversationId)
          const response = await fetch(`/api/conversations/${conversationId}/messages/read/drizzle`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          console.log('🔍 MARK READ: Response status:', response.status)
          if (response.ok) {
            console.log('🔍 MARK READ: Messages marked as read successfully')
          }
        } catch (error) {
          console.error('🔍 MARK READ: Error marking messages as read:', error)
        }
      }
      
      markAsRead()
    }
  }, [conversationId, session?.user?.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Subscribe to real-time messages
  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      setMessages(prev => [...prev, message])
    }

    subscribeToConversation(conversationId, handleNewMessage)

    return () => {
      unsubscribeFromConversation(conversationId)
    }
  }, [conversationId, subscribeToConversation, unsubscribeFromConversation])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages/drizzle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage.trim(),
          type: 'text'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, data.messageData])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const getConversationTitle = () => {
    if (!conversation) return ''
    if (conversation.participants.length === 1) {
      return conversation.participants[0]?.name || 'Unknown User'
    }
    return conversation.participants.map(p => p?.name || 'Unknown User').join(', ')
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600">Please log in to view messages.</p>
          <Link href="/login">
            <Button className="mt-4">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <Link href="/messages">
            <Button className="mt-4">Back to Messages</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Link href="/messages">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              {conversation?.participants[0]?.image ? (
                <img 
                  src={conversation.participants[0].image} 
                  alt={`${conversation.participants[0]?.name || 'Unknown'}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">{getConversationTitle()}</h1>
              <p className="text-sm text-gray-500">
                {conversation?.participants.length === 1 
                  ? `@${conversation.participants[0]?.username || 'unknown'}`
                  : `${conversation?.participants.length} people`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender?.id === session?.user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender?.id === session?.user?.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {message.sender?.image ? (
                      <img 
                        src={message.sender.image} 
                        alt={`${message.sender.name || 'Unknown'}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-3 h-3 text-gray-600" />
                    )}
                  </div>
                  <span className="text-xs opacity-75">
                    {message.sender?.name || 'Unknown User'}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-75 mt-1">
                  {formatDate(message.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSending}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSending ? 'Sending...' : 'Send'}</span>
          </Button>
        </form>
      </div>
    </div>
  )
} 