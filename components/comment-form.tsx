'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Send } from 'lucide-react'

interface CommentFormProps {
  postId: string
  parentId?: string
  onCommentAdded: (comment: any) => void
  placeholder?: string
  className?: string
}

export function CommentForm({ 
  postId, 
  parentId, 
  onCommentAdded, 
  placeholder = "Write a comment...",
  className = ""
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/comments/drizzle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          postId,
          parentId,
        }),
      })

      if (response.ok) {
        const newComment = await response.json()
        onCommentAdded(newComment)
        setContent('')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex space-x-3">
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            maxLength={500}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {content.length}/500
        </div>
        
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          size="sm"
          className="flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
        </Button>
      </div>
    </form>
  )
} 