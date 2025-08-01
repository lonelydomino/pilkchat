'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { PostCard } from '@/components/post-card'
import { Bookmark, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BookmarkedPost {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    username: string
    image?: string
  }
  _count: {
    likes: number
    comments: number
    reposts: number
  }
  isLiked: boolean
  isReposted: boolean
  isBookmarked: boolean
}

export default function BookmarksPage() {
  const { data: session } = useSession()
  const [bookmarkedPosts, setBookmarkedPosts] = useState<BookmarkedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBookmarks = useCallback(async () => {
    try {
      setError(null)

      const response = await fetch('/api/bookmarks/drizzle')
      if (response.ok) {
        const data = await response.json()

        setBookmarkedPosts(data.posts)
      } else {
        setError('Failed to load bookmarks')
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error)
      setError('Failed to load bookmarks')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await fetchBookmarks()
    setIsRefreshing(false)
  }, [fetchBookmarks])

  useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  const handlePostUpdate = useCallback((postId: string, updates: Partial<BookmarkedPost>) => {
    setBookmarkedPosts(prev => 
      prev.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    )
    
    // If post was unbookmarked, remove it from the list
    if (updates.isBookmarked === false) {
      setBookmarkedPosts(prev => prev.filter(post => post.id !== postId))
    }
  }, [])

  const handlePostDelete = useCallback((postId: string) => {
    setBookmarkedPosts(prev => prev.filter(post => post.id !== postId))
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-gray-500 hover:text-gray-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <p className="text-gray-600">Your saved posts</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Bookmarks */}
      <div className="space-y-4">
        {bookmarkedPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-400 mb-4">
              <Bookmark className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
            <p className="text-gray-500 mb-4">
              Save posts you want to read later by clicking the bookmark icon
            </p>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-500 mb-4">
              {bookmarkedPosts.length} bookmark{bookmarkedPosts.length !== 1 ? 's' : ''}
            </div>
            {bookmarkedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={handlePostUpdate}
                onDelete={handlePostDelete}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
} 