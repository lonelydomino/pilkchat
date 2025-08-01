'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { CreatePost } from '@/components/create-post'
import { PostCard } from '@/components/post-card'
import { ImageModal } from '@/components/image-modal'

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
  mediaUrls?: string[]
  _count: {
    likes: number
    comments: number
    reposts: number
  }
  isLiked: boolean
  isReposted: boolean
  isBookmarked?: boolean
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  
  
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentPostImages, setCurrentPostImages] = useState<string[]>([])

  const fetchPosts = useCallback(async (retryCount = 0) => {
    try {

      setError(null)
      
      const response = await fetch('/api/fetch-posts-drizzle', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        credentials: 'include', // Ensure cookies are sent
      })
      
      if (response.ok) {
        const data = await response.json()

        
        // Filter out posts without an id to prevent the error
        const validPosts = (data.posts || []).filter((post: any) => {
          const isValid = post && post.id && typeof post.id === 'string' && post.id.trim() !== ''
          if (!isValid) {
            console.warn('🔍 Skipping invalid post:', post)
          }
          return isValid
        })

        setPosts(validPosts)
      } else {
        console.error('❌ Failed to fetch posts:', response.status, response.statusText)
        setError('Failed to load posts')
        if (retryCount < 2) {
  
          setTimeout(() => fetchPosts(retryCount + 1), 1000 * (retryCount + 1))
          return
        }
      }
    } catch (error) {
      console.error('❌ Error fetching posts:', error)
      setError('Failed to load posts')
      if (retryCount < 2) {

        setTimeout(() => fetchPosts(retryCount + 1), 1000 * (retryCount + 1))
        return
      }
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handlePostCreated = useCallback((newPost: Post) => {

    
    setPosts(prev => {
      const updatedPosts = [newPost, ...prev]
      
      return updatedPosts
    })
  }, [])

  const handlePostUpdate = useCallback((postId: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ))
  }, [])

  const handlePostDelete = useCallback((postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }, [])

  const handleImageClick = (images: string[], index: number) => {
    setCurrentPostImages(images)
    setCurrentImageIndex(index)
    setImageModalOpen(true)
  }

  const handleImageModalClose = () => {
    setImageModalOpen(false)
  }

  const handleImageModalNavigate = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Home</h1>
              <p className="text-gray-600">See what's happening in your network</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <svg className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <CreatePost onPostCreated={handlePostCreated} />
          
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800">{error}</span>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  {isRefreshing ? 'Refreshing...' : 'Try Again'}
                </button>
              </div>
            </div>
          )}
          
          {/* Posts */}
          {posts.length === 0 && !error && !isLoading ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {(() => {
                try {
                  const validPosts = posts.filter((post: any) => {
                    const isValid = post && post.id && typeof post.id === 'string' && post.id.trim() !== ''
                    if (!isValid) {
                      console.warn('🔍 Skipping invalid post:', post)
                    }
                    return isValid
                  })
                  
                  return validPosts.map((post, index) => {
                    try {
                      return (
                        <PostCard
                          key={post.id || `post-${index}`} // Fallback key
                          post={post}
                          onUpdate={handlePostUpdate}
                          onDelete={handlePostDelete}
                          onImageClick={handleImageClick}
                        />
                      )
                    } catch (error) {
                      console.error('🔍 Error rendering PostCard for post:', post, error)
                      return null
                    }
                  })
                } catch (error) {
                  console.error('🔍 Error in posts rendering:', error)
                  return <div>Error loading posts</div>
                }
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {currentPostImages.length > 0 && (
        <ImageModal
          images={currentPostImages}
          currentIndex={currentImageIndex}
          isOpen={imageModalOpen}
          onClose={handleImageModalClose}
          onNavigate={handleImageModalNavigate}
        />
      )}
    </>
  )
} 