'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { MessageSquare, Plus, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { useUnreadMessages } from '@/hooks/useUnreadMessages'

interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    username: string
    image?: string
  }[]
  lastMessage?: {
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
  unreadCount: number
  totalMessages: number
  updatedAt: string
}

export default function MessagesPage() {
  const { data: session } = useSession()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getUnreadCountForConversation, markConversationAsRead } = useUnreadMessages()

  const fetchConversations = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch('/api/conversations/drizzle')
      
      if (response.ok) {
        const data = await response.json()
        setConversations(data.conversations)
      } else {
        setError('Failed to load conversations')
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
      setError('Failed to load conversations')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.participants.length === 1) {
      return conversation.participants[0].name
    }
    return conversation.participants.map(p => p.name).join(', ')
  }

  const getConversationSubtitle = (conversation: Conversation) => {
    if (conversation.participants.length === 1) {
      return `@${conversation.participants[0].username}`
    }
    return `${conversation.participants.length} people`
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Your conversations</p>
        </div>
        <Link href="/messages/new">
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Message</span>
          </Button>
        </Link>
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {conversations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
            <p className="text-gray-500 mb-4">
              Start a conversation with someone to see your messages here
            </p>
            <Link href="/messages/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Start a conversation
              </Button>
            </Link>
          </div>
        ) : (
          conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              onClick={() => markConversationAsRead(conversation.id)}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {conversation.participants[0]?.image ? (
                    <img 
                      src={conversation.participants[0].image} 
                      alt={`${conversation.participants[0].name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {getConversationTitle(conversation)}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(conversation.updatedAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 truncate">
                    {getConversationSubtitle(conversation)}
                  </p>
                  
                  {conversation.lastMessage && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage.sender.name}: {conversation.lastMessage.content}
                      </span>
                      {(() => {
                        const unreadCount = getUnreadCountForConversation(conversation.id)
                        return unreadCount > 0 ? (
                          <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        ) : null
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
} 