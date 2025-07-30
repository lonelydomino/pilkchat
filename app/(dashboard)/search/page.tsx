'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { User, Search, UserPlus, UserCheck, MessageSquare, Hash } from 'lucide-react'
import { showToast } from '@/components/toast'

interface SearchResult {
  type: 'user' | 'post' | 'hashtag'
  user?: {
    id: string
    name: string
    username: string
    image?: string
    bio?: string
    isFollowing: boolean
  }
  post?: {
    id: string
    content: string
    createdAt: string
    author: {
      id: string
      name: string
      username: string
      image?: string
    }
    hashtags?: { name: string }[]
    _count: {
      likes: number
      comments: number
      reposts: number
    }
    isLiked: boolean
    isReposted: boolean
    isBookmarked?: boolean
  }
  hashtag?: {
    id: string
    name: string
    _count: {
      posts: number
    }
  }
}

type SearchType = 'all' | 'users' | 'posts' | 'hashtags'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const query = searchParams.get('q') || ''
  
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState<SearchType>('all')
  const [searchQuery, setSearchQuery] = useState(query)

  const performSearch = useCallback(async (searchTerm: string, type: SearchType = 'all') => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchTerm,
        type: type,
      })
      
      const response = await fetch(`/api/search?${params}`)
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.results || [])
      }
    } catch (error) {
      console.error('Error performing search:', error)
      showToast('error', 'Failed to perform search')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      performSearch(query, searchType)
    }
  }, [query, searchType, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery, searchType)
  }

  const handleFollow = async (userId: string, username: string) => {
    try {
      const response = await fetch(`/api/users/${username}/follow`, {
        method: 'POST',
      })

      if (response.ok) {
        // Update the user's following status in search results
        setSearchResults(prev => prev.map(result => {
          if (result.type === 'user' && result.user?.id === userId) {
            return {
              ...result,
              user: {
                ...result.user!,
                isFollowing: !result.user.isFollowing
              }
            }
          }
          return result
        }))
        
        showToast('success', 'Follow status updated')
      }
    } catch (error) {
      console.error('Error following user:', error)
      showToast('error', 'Failed to update follow status')
    }
  }

  const handlePostUpdate = useCallback((postId: string, updates: any) => {
    setSearchResults(prev => prev.map(result => {
      if (result.type === 'post' && result.post?.id === postId) {
        return {
          ...result,
          post: {
            ...result.post!,
            ...updates
          }
        }
      }
      return result
    }))
  }, [])

  const handlePostDelete = useCallback((postId: string) => {
    setSearchResults(prev => prev.filter(result => 
      !(result.type === 'post' && result.post?.id === postId)
    ))
  }, [])

  const renderUserResult = (user: SearchResult['user']) => {
    if (!user) return null

    return (
      <div key={user.id} className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">@{user.username}</p>
              {user.bio && (
                <p className="text-sm text-gray-600 truncate mt-1">{user.bio}</p>
              )}
            </div>
          </div>
          {session?.user?.id !== user.id && (
            <Button
              variant={user.isFollowing ? "outline" : "default"}
              size="sm"
              onClick={() => handleFollow(user.id, user.username)}
              className="flex items-center space-x-1"
            >
              {user.isFollowing ? (
                <>
                  <UserCheck className="w-3 h-3" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3 h-3" />
                  <span>Follow</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    )
  }

  const renderPostResult = (post: SearchResult['post']) => {
    if (!post) return null

    return (
      <PostCard
        key={post.id}
        post={post}
        onUpdate={handlePostUpdate}
        onDelete={handlePostDelete}
      />
    )
  }

  const renderHashtagResult = (hashtag: SearchResult['hashtag']) => {
    if (!hashtag) return null

    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Hash className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <Link
                href={`/hashtag/${hashtag.name}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 hover:underline"
              >
                #{hashtag.name}
              </Link>
              <p className="text-sm text-gray-500">
                {hashtag._count.posts} post{hashtag._count.posts !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Search</h1>
        <p className="text-gray-600">Find users and posts</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for users or posts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={searchType === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType('all')}
            >
              All
            </Button>
            <Button
              type="button"
              variant={searchType === 'users' ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType('users')}
            >
              Users
            </Button>
            <Button
              type="button"
              variant={searchType === 'posts' ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType('posts')}
            >
              Posts
            </Button>
            <Button
              type="button"
              variant={searchType === 'hashtags' ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType('hashtags')}
            >
              Hashtags
            </Button>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery && searchResults.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or search type
            </p>
          </div>
        ) : searchQuery ? (
          <>
            <div className="text-sm text-gray-500 mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
            </div>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={`${result.type}-${index}`}>
                  {result.type === 'user' && renderUserResult(result.user)}
                  {result.type === 'post' && renderPostResult(result.post)}
                  {result.type === 'hashtag' && renderHashtagResult(result.hashtag)}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
            <p className="text-gray-500">
              Enter a search term to find users and posts
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 