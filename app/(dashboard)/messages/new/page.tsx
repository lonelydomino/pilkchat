'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Search, User, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface User {
  id: string
  name: string
  username: string
  image?: string
  bio?: string
  isFollowing: boolean
}

export default function NewMessagePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search/drizzle?q=${encodeURIComponent(query)}&type=users`)
      if (response.ok) {
        const data = await response.json()
        const users = data.results
          .filter((result: any) => result.type === 'user')
          .map((result: any) => result.user)
        setSearchResults(users)
      }
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchUsers])

  const handleUserSelect = (user: User) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(prev => prev.filter(u => u.id !== user.id))
    } else {
      setSelectedUsers(prev => [...prev, user])
    }
  }

  const handleStartConversation = async () => {
    if (selectedUsers.length === 0) return

    setIsCreating(true)
    try {
      const response = await fetch('/api/conversations/drizzle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantIds: selectedUsers.map(user => user.id)
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('💬 NewMessage: API response:', data)
        
        if (data.conversation && data.conversation.id) {
          router.push(`/messages/${data.conversation.id}`)
        } else {
          console.error('💬 NewMessage: ❌ Invalid response structure:', data)
          throw new Error('Invalid response structure')
        }
      } else {
        const errorData = await response.json()
        console.error('💬 NewMessage: ❌ API error:', errorData)
        throw new Error(errorData.message || 'Failed to create conversation')
      }
    } catch (error) {
      console.error('Error creating conversation:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/messages">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Message</h1>
          <p className="text-gray-600">Start a conversation</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-2">
            {isSearching ? (
              <div className="animate-pulse space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No users found</p>
            ) : (
              searchResults.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    selectedUsers.find(u => u.id === user.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={`${user.name}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                  </div>
                  {selectedUsers.find(u => u.id === user.id) && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Selected Users */}
      {selectedUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Selected ({selectedUsers.length})
          </h3>
          <div className="space-y-2">
            {selectedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={`${user.name}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleUserSelect(user)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Start Conversation Button */}
      {selectedUsers.length > 0 && (
        <div className="flex justify-center">
          <Button
            onClick={handleStartConversation}
            disabled={isCreating}
            className="flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isCreating ? 'Creating...' : 'Start Conversation'}</span>
          </Button>
        </div>
      )}
    </div>
  )
} 