'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, Heart, MessageCircle, Repeat, MoreHorizontal } from 'lucide-react'
import { formatDate } from '@/lib/utils'

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
  _count: {
    likes: number
    comments: number
    reposts: number
  }
  isLiked: boolean
  isReposted: boolean
}

interface PostCardProps {
  post: Post
  onUpdate: (postId: string, updates: Partial<Post>) => void
  onDelete: (postId: string) => void
}

export function PostCard({ post, onUpdate, onDelete }: PostCardProps) {
  const [isLiking, setIsLiking] = useState(false)
  const [isReposting, setIsReposting] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    
    setIsLiking(true)
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
      })

      if (response.ok) {
        const newLikeCount = post.isLiked 
          ? post._count.likes - 1 
          : post._count.likes + 1
        
        onUpdate(post.id, {
          isLiked: !post.isLiked,
          _count: { ...post._count, likes: newLikeCount }
        })
      }
    } catch (error) {
      console.error('Error liking post:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleRepost = async () => {
    if (isReposting) return
    
    setIsReposting(true)
    try {
      const response = await fetch(`/api/posts/${post.id}/repost`, {
        method: 'POST',
      })

      if (response.ok) {
        const newRepostCount = post.isReposted 
          ? post._count.reposts - 1 
          : post._count.reposts + 1
        
        onUpdate(post.id, {
          isReposted: !post.isReposted,
          _count: { ...post._count, reposts: newRepostCount }
        })
      }
    } catch (error) {
      console.error('Error reposting:', error)
    } finally {
      setIsReposting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{post.author.name}</span>
              <span className="text-gray-500">@{post.author.username}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{formatDate(post.createdAt)}</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="text-gray-900 mb-4">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Comments */}
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                <MessageCircle className="w-4 h-4 mr-2" />
                {post._count.comments}
              </Button>
              
              {/* Repost */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={`hover:text-green-500 ${post.isReposted ? 'text-green-500' : 'text-gray-500'}`}
                onClick={handleRepost}
                disabled={isReposting}
              >
                <Repeat className="w-4 h-4 mr-2" />
                {post._count.reposts}
              </Button>
              
              {/* Like */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={`hover:text-red-500 ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                onClick={handleLike}
                disabled={isLiking}
              >
                <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                {post._count.likes}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 