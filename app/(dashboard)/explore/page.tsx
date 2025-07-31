'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, Hash, Sparkles } from 'lucide-react'

interface TrendingPost {
  id: string
  content: string
  createdAt: string
  trendingScore: number
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
}

export default function ExplorePage() {
  const { data: session } = useSession()
  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'trending' | 'people' | 'topics'>('trending')

  const fetchTrendingPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/fetch-trending-posts')
      if (response.ok) {
        const data = await response.json()
        setTrendingPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching trending posts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTrendingPosts()
  }, [fetchTrendingPosts])

  const handlePostUpdate = useCallback((postId: string, updates: Partial<TrendingPost>) => {
    setTrendingPosts(prev => 
      prev.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    )
  }, [])

  const handlePostDelete = useCallback((postId: string) => {
    setTrendingPosts(prev => prev.filter(post => post.id !== postId))
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
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
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Explore</h1>
        <p className="text-gray-600">Discover trending content and people</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === 'trending' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('trending')}
          className="flex items-center space-x-2"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Trending</span>
        </Button>
        <Button
          variant={activeTab === 'people' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('people')}
          className="flex items-center space-x-2"
        >
          <Users className="w-4 h-4" />
          <span>People</span>
        </Button>
        <Button
          variant={activeTab === 'topics' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('topics')}
          className="flex items-center space-x-2"
        >
          <Hash className="w-4 h-4" />
          <span>Topics</span>
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'trending' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Trending Posts</h2>
          </div>
          
          {trendingPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-gray-400 mb-4">
                <TrendingUp className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No trending posts yet</h3>
              <p className="text-gray-500">
                Posts will appear here as they gain engagement
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {trendingPosts.map((post) => (
                <div key={post.id} className="relative">
                  <PostCard
                    post={post}
                    onUpdate={handlePostUpdate}
                    onDelete={handlePostDelete}
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    🔥 Trending
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'people' && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-400 mb-4">
            <Users className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">People Discovery</h3>
          <p className="text-gray-500">
            Find interesting people to follow
          </p>
          <Button className="mt-4">
            <Users className="w-4 h-4 mr-2" />
            Discover People
          </Button>
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-400 mb-4">
            <Hash className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Trending Topics</h3>
          <p className="text-gray-500">
            Explore popular hashtags and topics
          </p>
          <Button className="mt-4">
            <Hash className="w-4 h-4 mr-2" />
            Explore Topics
          </Button>
        </div>
      )}
    </div>
  )
} 