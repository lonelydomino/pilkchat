'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, Heart, MessageCircle, UserPlus, X } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'repost'
  message: string
  read: boolean
  createdAt: string
  relatedUserId?: string
  relatedPostId?: string
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />
      case 'repost':
        return <MessageCircle className="w-4 h-4 text-purple-500" />
      default:
        return <User className="w-4 h-4 text-gray-500" />
    }
  }

  const handleMarkAsRead = async () => {
    if (isMarkingAsRead) return
    
    setIsMarkingAsRead(true)
    try {
      const response = await fetch(`/api/notifications/${notification.id}/read/drizzle`, {
        method: 'POST',
      })

      if (response.ok) {
        onMarkAsRead(notification.id)
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    } finally {
      setIsMarkingAsRead(false)
    }
  }

  const handleDelete = async () => {
    if (isDeleting) return
    
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/notifications/${notification.id}/drizzle`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onDelete(notification.id)
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {getIcon()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                {notification.message}
              </p>
              

              
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(notification.createdAt)}
              </p>
            </div>
            
            <div className="flex items-center space-x-1 ml-2">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAsRead}
                  disabled={isMarkingAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Mark as read
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-xs text-gray-400 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 