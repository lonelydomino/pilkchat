import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { showToast } from '@/components/toast'

interface Notification {
  id: string
  type: string
  message: string
  read: boolean
  createdAt: string
  relatedUserId?: string
}

interface NotificationStreamEvent {
  type: string
  notification?: Notification
  message?: string
  timestamp?: string
}

export function useNotifications() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Debug connection state changes
  useEffect(() => {
    if (isClient) {
      console.log(`🔗 Notifications connection: ${isConnected ? 'Connected' : 'Disconnected'}`)
    }
  }, [isConnected, isClient])

  // Fetch initial notifications
  const fetchNotifications = useCallback(async () => {
    if (!session?.user?.id || !isClient) return

    try {
      const response = await fetch('/api/notifications')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.notifications.filter((n: Notification) => !n.read).length)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      })

      if (response.ok) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, read: true }
              : notification
          )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }, [])

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'POST',
      })

      if (response.ok) {
        setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }, [])

  // Set up real-time connection
  useEffect(() => {
    if (!session?.user?.id || !isClient) return

    let eventSource: EventSource | null = null

    const connectToStream = () => {
      try {
        eventSource = new EventSource('/api/notifications/stream')

        eventSource.onopen = () => {
          setIsConnected(true)
          console.log('✅ Connected to notifications stream')
        }

        eventSource.onmessage = (event) => {
          try {
            const data: NotificationStreamEvent = JSON.parse(event.data)
            
            switch (data.type) {
              case 'connected':
                console.log('Notifications stream connected')
                break
                
              case 'heartbeat':
                // Keep connection alive
                break
                
              case 'new_notification':
                if (data.notification) {
                  // Add new notification to the top
                  setNotifications(prev => [data.notification!, ...prev])
                  setUnreadCount(prev => prev + 1)
                  
                  // Show toast notification
                  const notification = data.notification
                  showToast('info', notification.message)
                }
                break
                
              default:
                console.log('Unknown notification event type:', data.type)
            }
          } catch (error) {
            console.error('Error parsing notification event:', error)
          }
        }

        eventSource.onerror = (error) => {
          console.error('❌ Notifications stream error:', error)
          setIsConnected(false)
          
          // Attempt to reconnect after 5 seconds
          setTimeout(() => {
            if (eventSource) {
              eventSource.close()
              connectToStream()
            }
          }, 5000)
        }
      } catch (error) {
        console.error('Error setting up notifications stream:', error)
        setIsConnected(false)
      }
    }

    connectToStream()

    // Cleanup on unmount
    return () => {
      if (eventSource) {
        eventSource.close()
      }
      setIsConnected(false)
    }
  }, [session?.user?.id])

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return {
    notifications,
    unreadCount,
    isConnected,
    isLoading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  }
} 