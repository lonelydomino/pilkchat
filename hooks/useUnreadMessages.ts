'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useUnreadMessages() {
  const { data: session } = useSession()
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!session?.user?.id || !isClient) {
      setUnreadCount(0)
      setIsLoading(false)
      return
    }

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/messages/unread-count/drizzle')
        if (response.ok) {
          const data = await response.json()
          setUnreadCount(data.count)
        }
      } catch (error) {
        console.error('Error fetching unread messages count:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUnreadCount()

    // Set up polling to check for new unread messages every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)

    return () => clearInterval(interval)
  }, [session?.user?.id])

  return { unreadCount, isLoading }
} 