'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, Heart, MessageCircle, Repeat, MoreHorizontal, ChevronDown, ChevronUp, Bookmark, Image as ImageIcon } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { CommentForm } from './comment-form'
import { Comment } from './comment'
import { ImageModal } from './image-modal'
import { showToast } from './toast'

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
  hashtags?: { name: string }[]
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

interface PostCardProps {
  post: Post
  onUpdate: (postId: string, updates: Partial<Post>) => void
  onDelete: (postId: string) => void
  onImageClick?: (images: string[], index: number) => void
}

export function PostCard({ post, onUpdate, onDelete, onImageClick }: PostCardProps) {
  // Defensive check - if post is undefined or null, don't render anything
  if (!post || !post.id) {
    console.warn('🔍 PostCard received invalid post:', post)
    return null
  }
  
  console.log('🔍 PostCard received post:', post)
  console.log('🔍 PostCard author data:', post.author)
  console.log('🔍 PostCard author name:', post.author?.name)
  console.log('🔍 PostCard author username:', post.author?.username)
  console.log('🔍 PostCard mediaUrls:', post.mediaUrls)
  console.log('🔍 PostCard has mediaUrls:', (post.mediaUrls?.length || 0) > 0)
  const [isLiking, setIsLiking] = useState(false)
  const [isReposting, setIsReposting] = useState(false)
  const [isBookmarking, setIsBookmarking] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleLike = async () => {
    if (isLiking) return
    
    setIsLiking(true)
    try {
      const response = await fetch(`/api/posts/${post.id}/like/drizzle`, {
        method: 'POST',
        credentials: 'include',
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
      const response = await fetch(`/api/posts/${post.id}/repost/drizzle`, {
        method: 'POST',
        credentials: 'include',
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

  const handleBookmark = async () => {
    if (isBookmarking) return
    
    setIsBookmarking(true)
    try {
      const response = await fetch(`/api/posts/${post.id}/bookmark/drizzle`, {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        onUpdate(post.id, { isBookmarked: data.bookmarked })
        
        // Show toast notification
        if (data.bookmarked) {
          showToast('success', 'Post added to bookmarks')
        } else {
          showToast('info', 'Post removed from bookmarks')
        }
      } else {
        showToast('error', 'Failed to update bookmark')
      }
    } catch (error) {
      console.error('Error bookmarking:', error)
      showToast('error', 'Failed to update bookmark')
    } finally {
      setIsBookmarking(false)
    }
  }

  const fetchComments = async () => {
    setIsLoadingComments(true)
    try {
      const response = await fetch(`/api/comments/drizzle?postId=${post.id}`, {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setIsLoadingComments(false)
    }
  }

  const handleCommentAdded = (newComment: any) => {
    setComments(prev => [newComment, ...prev])
    onUpdate(post.id, {
      _count: { ...post._count, comments: post._count.comments + 1 }
    })
  }

  const handleCommentUpdate = (commentId: string, updates: any) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId ? { ...comment, ...updates } : comment
    ))
  }

  const handleCommentDelete = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId))
    onUpdate(post.id, {
      _count: { ...post._count, comments: post._count.comments - 1 }
    })
  }

  const handleShowComments = () => {
    if (!showComments && comments.length === 0) {
      fetchComments()
    }
    setShowComments(!showComments)
  }

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      // Use external handler if provided
      onImageClick(post.mediaUrls || [], index)
    } else {
      // Use internal modal
      setCurrentImageIndex(index)
      setImageModalOpen(true)
    }
  }

  const handleImageModalClose = () => {
    setImageModalOpen(false)
  }

  const handleImageModalNavigate = (index: number) => {
    setCurrentImageIndex(index)
  }

  const renderHashtags = () => {
    if (!post.hashtags || post.hashtags.length === 0) return null

    return (
      <div className="mt-2 flex flex-wrap gap-1">
        {post.hashtags.map((hashtag, index) => (
          <Link
            key={`${post.id}-hashtag-${hashtag.name}-${index}`}
            href={`/hashtag/${hashtag.name}`}
            className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
          >
            #{hashtag.name}
          </Link>
        ))}
      </div>
    )
  }

  const renderMediaGrid = () => {
    console.log('🔍 renderMediaGrid called with mediaUrls:', post.mediaUrls)
    if (!post.mediaUrls || post.mediaUrls.length === 0) {
      console.log('🔍 renderMediaGrid: No mediaUrls, returning null')
      return null
    }

    const images = post.mediaUrls
    const imageCount = images.length
    console.log('🔍 renderMediaGrid: Rendering', imageCount, 'images')

    if (imageCount === 1) {
      return (
        <div className="mt-3">
          <img
            src={images[0]}
            alt="Post media"
            className="w-full max-h-96 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => handleImageClick(0)}
          />
        </div>
      )
    }

    if (imageCount === 2) {
      return (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post media ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      )
    }

    if (imageCount === 3) {
      return (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <img
            src={images[0]}
            alt="Post media 1"
            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => handleImageClick(0)}
          />
          <div className="space-y-2">
            {images.slice(1).map((image, index) => (
              <img
                key={index + 1}
                src={image}
                alt={`Post media ${index + 2}`}
                className="w-full h-23 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => handleImageClick(index + 1)}
              />
            ))}
          </div>
        </div>
      )
    }

    if (imageCount === 4) {
      return (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post media ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
        <div className="flex space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
            {post.author?.image ? (
              <img 
                src={post.author.image} 
                alt={`${post.author.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-600" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Link href={`/profile/${post.author?.username || 'unknown'}`} className="hover:underline">
                  <span className="font-semibold text-gray-900">{post.author?.name || 'Unknown User'}</span>
                </Link>
                <span className="text-gray-500">@{post.author?.username || 'unknown'}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{formatDate(post.createdAt)}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="mb-4">
              <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
              {renderHashtags()}
              {renderMediaGrid()}
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Comments */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-blue-500"
                  onClick={handleShowComments}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post._count?.comments || 0}
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
                  {post._count?.reposts || 0}
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
                  {post._count?.likes || 0}
                </Button>
                
                {/* Bookmark */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`hover:text-yellow-500 ${post.isBookmarked ? 'text-yellow-500' : 'text-gray-500'}`}
                  onClick={handleBookmark}
                  disabled={isBookmarking}
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Comments Section */}
            {showComments && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {/* Comment Form */}
                <div className="mb-4">
                  <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                    placeholder="Write a comment..."
                  />
                </div>
                
                {/* Comments List */}
                {isLoadingComments ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        onCommentAdded={handleCommentAdded}
                        onCommentUpdate={handleCommentUpdate}
                        onCommentDelete={handleCommentDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <ImageModal
          images={post.mediaUrls}
          currentIndex={currentImageIndex}
          isOpen={imageModalOpen}
          onClose={handleImageModalClose}
          onNavigate={handleImageModalNavigate}
        />
      )}
    </>
  )
} 