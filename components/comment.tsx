'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CommentForm } from './comment-form'
import { User, Heart, MessageCircle, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Comment {
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
    replies: number
  }
  isLiked: boolean
  replies?: Comment[]
}

interface CommentProps {
  comment: Comment
  onCommentAdded: (comment: Comment) => void
  onCommentUpdate: (commentId: string, updates: Partial<Comment>) => void
  onCommentDelete: (commentId: string) => void
  depth?: number
}

export function Comment({ 
  comment, 
  onCommentAdded, 
  onCommentUpdate, 
  onCommentDelete,
  depth = 0 
}: CommentProps) {
  const [isLiking, setIsLiking] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    
    setIsLiking(true)
    try {
      const response = await fetch(`/api/comments/${comment.id}/like`, {
        method: 'POST',
      })

      if (response.ok) {
        const newLikeCount = comment.isLiked 
          ? comment._count.likes - 1 
          : comment._count.likes + 1
        
        onCommentUpdate(comment.id, {
          isLiked: !comment.isLiked,
          _count: { ...comment._count, likes: newLikeCount }
        })
      }
    } catch (error) {
      console.error('Error liking comment:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleReplyAdded = (newReply: Comment) => {
    onCommentAdded(newReply)
    setShowReplyForm(false)
    setShowReplies(true)
  }

  const maxDepth = 3 // Prevent infinite nesting
  const canReply = depth < maxDepth

  return (
    <div className={`border-l-2 border-gray-100 pl-4 ${depth > 0 ? 'ml-4' : ''}`}>
               <div className="flex space-x-3">
           <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
             {comment.author.image ? (
               <img 
                 src={comment.author.image} 
                 alt={`${comment.author.name}'s profile`}
                 className="w-full h-full object-cover"
               />
             ) : (
               <User className="w-4 h-4 text-gray-600" />
             )}
           </div>
        
        <div className="flex-1 min-w-0">
          {/* Comment Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Link href={`/profile/${comment.author.username}`} className="hover:underline">
                <span className="font-semibold text-gray-900 text-sm">{comment.author.name}</span>
              </Link>
              <Link href={`/profile/${comment.author.username}`} className="hover:underline">
                <span className="text-gray-500 text-sm">@{comment.author.username}</span>
              </Link>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500 text-xs">{formatDate(comment.createdAt)}</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Comment Content */}
          <div className="text-gray-900 mb-3">
            <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
          </div>
          
          {/* Comment Actions */}
          <div className="flex items-center space-x-4">
            {/* Like */}
            <Button 
              variant="ghost" 
              size="sm" 
              className={`hover:text-red-500 text-xs ${comment.isLiked ? 'text-red-500' : 'text-gray-500'}`}
              onClick={handleLike}
              disabled={isLiking}
            >
              <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
              {comment._count.likes}
            </Button>
            
            {/* Reply */}
            {canReply && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:text-blue-500 text-xs text-gray-500"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Reply
              </Button>
            )}
            
            {/* Show Replies */}
            {comment._count.replies > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:text-blue-500 text-xs text-gray-500"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Hide replies
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    {comment._count.replies} replies
                  </>
                )}
              </Button>
            )}
          </div>
          
          {/* Reply Form */}
          {showReplyForm && canReply && (
            <div className="mt-3">
              <CommentForm
                postId={comment.id} // This will be the parent comment ID
                parentId={comment.id}
                onCommentAdded={handleReplyAdded}
                placeholder={`Reply to @${comment.author.username}...`}
                className="border-t border-gray-100 pt-3"
              />
            </div>
          )}
          
          {/* Nested Replies */}
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onCommentAdded={onCommentAdded}
                  onCommentUpdate={onCommentUpdate}
                  onCommentDelete={onCommentDelete}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 