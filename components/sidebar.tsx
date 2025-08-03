'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Search, 
  Bell, 
  Bookmark, 
  User, 
  Settings, 
  LogOut,
  Users,
  TrendingUp,
  MessageSquare
} from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import { useUnreadMessages } from '@/hooks/useUnreadMessages'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Explore', href: '/explore', icon: TrendingUp },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Messages', href: '/messages', icon: MessageSquare, showCount: true },
  { name: 'Notifications', href: '/notifications', icon: Bell, showCount: true },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark, showCount: true },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { unreadCount, isConnected } = useNotifications()
  const { totalUnread: unreadMessagesCount } = useUnreadMessages()
  const [bookmarkCount, setBookmarkCount] = useState(0)



  const fetchBookmarkCount = async () => {
    try {
      const response = await fetch('/api/bookmarks/drizzle')
      if (response.ok) {
        const data = await response.json()
        setBookmarkCount(data.posts?.length || 0)
      }
    } catch (error) {
      console.error('Error fetching bookmark count:', error)
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchBookmarkCount()
    }
  }, [session?.user?.id])

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/login',
        redirect: true 
      })
    } catch (error) {
      console.error('Sign out error:', error)
      // Fallback: redirect manually if signOut fails
      window.location.href = '/login'
    }
  }

  const getCountForItem = (itemName: string) => {
    if (itemName === 'Notifications') {
      return unreadCount
    }
    if (itemName === 'Messages') {
      return unreadMessagesCount
    }
    if (itemName === 'Bookmarks') {
      return bookmarkCount
    }
    return 0
  }

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">Pilk Chat</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const count = getCountForItem(item.name)
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start relative"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
                {item.showCount && count > 0 && (
                  <span className="absolute right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
                {item.name === 'Notifications' && unreadCount > 0 && (
                  <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm bg-green-500"
                    title={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
                  ></div>
                )}
                {item.name === 'Messages' && unreadMessagesCount > 0 && (
                  <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm bg-green-500"
                    title={`${unreadMessagesCount} unread message${unreadMessagesCount !== 1 ? 's' : ''}`}
                  ></div>
                )}
              </Button>
            </Link>
          )
        })}
        
        {/* Profile Link - Dynamic based on current user */}
        {session?.user?.username && (
          <Link href={`/profile/${session.user.username}`}>
            <Button
              variant={pathname === `/profile/${session.user.username}` ? "secondary" : "ghost"}
              className="w-full justify-start relative"
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </Button>
          </Link>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        {session?.user ? (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {(session.user as any).image ? (
                <img 
                  src={(session.user as any).image} 
                  alt={session.user.name || 'Profile'} 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                @{session.user.username}
              </p>
            </div>
          </div>
        ) : null}
        
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
} 