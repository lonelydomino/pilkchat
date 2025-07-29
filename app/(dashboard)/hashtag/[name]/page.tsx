'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { PostCard } from '@/components/post-card'
import { TrendingUp, Hash } from 'lucide-react'

interface Hashtag {
  id: string
  name: string
  _count: {
    posts: number
  }
}

interface Post {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    username: string
    image?: string
  }
  hashtags: { name: string }[]
  mediaUrls?: string[]
  _count: {
    likes: number
    comments: number
    reposts: number
  }
  isLiked: boolean
  isReposted: boolean
  isBookmarked: boolean
}

interface HashtagPageData {
  hashtag: Hashtag
  posts: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function HashtagPage() {
  const params = useParams()
  const hashtagName = decodeURIComponent(params.name as string)
  
  const [data, setData] = useState<HashtagPageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchHashtagData = useCallback(async (page: number = 1) => {
    try {
      setError(null)
      const response = await fetch(`/api/hashtags/${encodeURIComponent(hashtagName)}?page=${page}`)
      
      if (response.ok) {
        const hashtagData = await response.json()
        setData(hashtagData)
      } else {
        setError('Failed to load hashtag data')
      }
    } catch (error) {
      console.error('Error fetching hashtag data:', error)
      setError('Failed to load hashtag data')
    } finally {
      setIsLoading(false)
    }
  }, [hashtagName])

  useEffect(() => {
    fetchHashtagData(currentPage)
  }, [fetchHashtagData, currentPage])

  const handlePostUpdate = useCallback((postId: string, updates: Partial<Post>) => {
    setData(prev => {
      if (!prev) return prev
      return {
        ...prev,
        posts: prev.posts.map(post =>
          post.id === postId ? { ...post, ...updates } : post
        )
      }
    })
  }, [])

  const handlePostDelete = useCallback((postId: string) => {
    setData(prev => {
      if (!prev) return prev
      return {
        ...prev,
        posts: prev.posts.filter(post => post.id !== postId)
      }
    })
  }, [])

  const handleLoadMore = () => {
    if (data && currentPage < data.pagination.totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hashtag not found</h1>
          <p className="text-gray-600">The hashtag you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Hashtag Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Hash className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">#{data.hashtag.name}</h1>
            <p className="text-gray-600">
              {data.hashtag._count.posts} post{data.hashtag._count.posts !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>Trending hashtag</span>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {data.posts.length === 0 ? (
          <div className="text-center py-8">
            <Hash className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500">
              Be the first to post with #{data.hashtag.name}
            </p>
          </div>
        ) : (
          data.posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpdate={handlePostUpdate}
              onDelete={handlePostDelete}
            />
          ))
        )}
      </div>

      {/* Load More */}
      {data.posts.length > 0 && currentPage < data.pagination.totalPages && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  )
} 