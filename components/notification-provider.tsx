'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useNotifications } from '@/hooks/useNotifications'

interface NotificationContextType {
  notifications: any[]
  unreadCount: number
  isConnected: boolean
  isLoading: boolean
  markAsRead: (notificationId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  refetch: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const notificationData = useNotifications()

  return (
    <NotificationContext.Provider value={notificationData}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider')
  }
  return context
} 