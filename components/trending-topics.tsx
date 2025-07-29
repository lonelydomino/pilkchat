'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Hash, TrendingUp } from 'lucide-react'

interface TrendingTopic {
  tag: string
  count: number
  engagement: number
  trendingScore: number
}

interface TrendingTopicsProps {
  className?: string
  limit?: number
}

export function TrendingTopics({ className = "", limit = 5 }: TrendingTopicsProps) {
  const [topics, setTopics] = useState<TrendingTopic[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const response = await fetch('/api/topics/trending')
        if (response.ok) {
          const data = await response.json()
          setTopics(data.topics.slice(0, limit))
        }
      } catch (error) {
        console.error('Error fetching trending topics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingTopics()
  }, [limit])

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (topics.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Trending Topics</h3>
        </div>
        <p className="text-sm text-gray-500">No trending topics yet</p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Trending Topics</h3>
      </div>
      
      <div className="space-y-2">
        {topics.map((topic, index) => (
          <Link
            key={topic.tag}
            href={`/search?q=%23${topic.tag}`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
              <div className="flex items-center space-x-1">
                <Hash className="w-3 h-3 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">#{topic.tag}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {topic.count} posts
            </div>
          </Link>
        ))}
      </div>
      
      <Link
        href="/explore?tab=topics"
        className="block mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        View all topics →
      </Link>
    </div>
  )
} 