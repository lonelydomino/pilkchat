'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Hash, TrendingUp } from 'lucide-react'

interface Hashtag {
  id: string
  name: string
  _count: {
    posts: number
  }
}

export function TrendingHashtags() {
  const [hashtags, setHashtags] = useState<Hashtag[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const response = await fetch('/api/hashtags?limit=5')
        if (response.ok) {
          const data = await response.json()
          setHashtags(data.hashtags)
        }
      } catch (error) {
        console.error('Error fetching trending hashtags:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingHashtags()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Trending</h3>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (hashtags.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-900">Trending</h3>
      </div>
      
      <div className="space-y-3">
        {hashtags.map((hashtag, index) => (
          <Link
            key={hashtag.id}
            href={`/hashtag/${hashtag.name}`}
            className="block hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  #{hashtag.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {hashtag._count.posts} post{hashtag._count.posts !== 1 ? 's' : ''}
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <Link
          href="/explore"
          className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
        >
          Show more
        </Link>
      </div>
    </div>
  )
} 