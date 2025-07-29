'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useUserImage } from '@/hooks/useUserImage'
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  User, 
  Settings, 
  LogOut,
  Plus
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Messages', href: '/messages', icon: Mail },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { image: userImage, isLoading: imageLoading } = useUserImage()
  const [isSigningOut, setIsSigningOut] = useState(false)



  const handleSignOut = async () => {
    if (isSigningOut) return
    
    setIsSigningOut(true)
    
    try {
      await signOut({ redirect: false })
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Bluesky Clone</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Create Post Button */}
        <div className="mt-6">
          <Button className="w-full">
            <Plus className="w-5 h-5 mr-2" />
            New Post
          </Button>
        </div>

        {/* User Profile */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          {status === 'loading' ? (
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Profile Picture */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  {!imageLoading && userImage ? (
                    <img 
                      src={userImage} 
                      alt={`${session?.user?.name}'s profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', userImage)
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                  ) : null}
                  <User className={`w-8 h-8 text-gray-600 ${!imageLoading && userImage ? 'hidden' : ''}`} />
                </div>
              </div>
              

              
              {/* User Info */}
              <Link href={`/profile/${session?.user?.username || 'username'}`}>
                <div className="flex items-center space-x-3 mb-4 hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer">
                  <div className="flex-1 min-w-0 text-center">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session?.user?.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      @{session?.user?.username || 'username'}
                    </p>
                  </div>
                </div>
              </Link>
            </>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            <LogOut className={`w-5 h-5 mr-3 ${isSigningOut ? 'animate-spin' : ''}`} />
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      </div>
    </div>
  )
} 