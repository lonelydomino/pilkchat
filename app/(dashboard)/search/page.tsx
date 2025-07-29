'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { User, Search, UserPlus, UserCheck } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface SearchResult {
  id: string
  name: string
  username: string
  email: string
  bio?: string
  image?: string
  _count: {
    posts: number
    followers: number
    following: number
  }
  isFollowing: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFollowing, setIsFollowing] = useState<string | null>(null)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data.users)
      }
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, performSearch])

  const handleFollow = async (userId: string, username: string) => {
    if (!session?.user?.id) return
    
    setIsFollowing(userId)
    try {
      const response = await fetch(`/api/users/${username}/follow`, {
        method: 'POST',
      })

      if (response.ok) {
        setResults(prev => prev.map(user => 
          user.id === userId 
            ? { 
                ...user, 
                isFollowing: !user.isFollowing,
                _count: {
                  ...user._count,
                  followers: user.isFollowing ? user._count.followers - 1 : user._count.followers + 1
                }
              }
            : user
        ))
      }
    } catch (error) {
      console.error('Error following user:', error)
    } finally {
      setIsFollowing(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Users</h1>
        
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or username..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Search Results */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : query.trim() ? (
        results.length > 0 ? (
          <div className="space-y-4">
            {results.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {user.name}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm truncate">
                        @{user.username}
                      </p>
                      {user.bio && (
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {user.bio}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{user._count.posts} posts</span>
                        <span>{user._count.followers} followers</span>
                        <span>{user._count.following} following</span>
                      </div>
                    </div>
                  </div>
                  
                  {user.id !== session?.user?.id && (
                    <Button
                      variant={user.isFollowing ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleFollow(user.id, user.username)}
                      disabled={isFollowing === user.id}
                      className="flex items-center space-x-2"
                    >
                      {user.isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Follow</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">
              Try searching with a different name or username.
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Search for users</h3>
          <p className="text-gray-500">
            Enter a name or username to find people to follow.
          </p>
        </div>
      )}
    </div>
  )
} 