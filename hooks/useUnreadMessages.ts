'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface UnreadCounts {
  totalUnread: number
  conversationsWithUnread: Array<{
    conversationId: string
    unreadCount: number
  }>
}

export function useUnreadMessages() {
  const { data: session } = useSession()
  console.log('🔍 UNREAD MESSAGES HOOK: Hook initialized, session:', session?.user?.id)
  
  const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({
    totalUnread: 0,
    conversationsWithUnread: []
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchUnreadCounts = useCallback(async () => {
    if (!session?.user?.id) {
      console.log('🔍 UNREAD MESSAGES: No session user ID')
      return
    }

    console.log('🔍 UNREAD MESSAGES: Fetching unread counts for user:', session.user.id)
    setIsLoading(true)
    try {
      const response = await fetch('/api/messages/unread-count/drizzle')
      console.log('🔍 UNREAD MESSAGES: Response status:', response.status)
      if (response.ok) {
        const data = await response.json()
        console.log('🔍 UNREAD MESSAGES: Received data:', data)
        setUnreadCounts(data)
      } else {
        console.log('🔍 UNREAD MESSAGES: Response not ok:', response.status)
      }
    } catch (error) {
      console.error('🔍 UNREAD MESSAGES: Error fetching unread counts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  // Fetch unread counts on mount and when session changes
  useEffect(() => {
    fetchUnreadCounts()
  }, [fetchUnreadCounts])

  // Poll for updates every 30 seconds
  useEffect(() => {
    if (!session?.user?.id) return

    const interval = setInterval(() => {
      fetchUnreadCounts()
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchUnreadCounts, session?.user?.id])

  const markConversationAsRead = useCallback(async (conversationId: string) => {
    try {
      await fetch(`/api/conversations/${conversationId}/messages/read/drizzle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      // Update local state
      setUnreadCounts(prev => ({
        totalUnread: Math.max(0, prev.totalUnread - (prev.conversationsWithUnread.find(c => c.conversationId === conversationId)?.unreadCount || 0)),
        conversationsWithUnread: prev.conversationsWithUnread.filter(c => c.conversationId !== conversationId)
      }))
    } catch (error) {
      console.error('Error marking conversation as read:', error)
    }
  }, [])

  const getUnreadCountForConversation = useCallback((conversationId: string) => {
    return unreadCounts.conversationsWithUnread.find(c => c.conversationId === conversationId)?.unreadCount || 0
  }, [unreadCounts.conversationsWithUnread])

  return {
    totalUnread: unreadCounts.totalUnread,
    conversationsWithUnread: unreadCounts.conversationsWithUnread,
    isLoading,
    fetchUnreadCounts,
    markConversationAsRead,
    getUnreadCountForConversation
  }
} 