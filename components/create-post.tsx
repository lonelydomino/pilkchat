'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, Image, Send } from 'lucide-react'

interface CreatePostProps {
  onPostCreated: (post: any) => void
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content.trim() }),
      })

      if (response.ok) {
        const newPost = await response.json()
        onPostCreated(newPost)
        setContent('')
      } else {
        console.error('Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const characterCount = content.length
  const maxCharacters = 280
  const isOverLimit = characterCount > maxCharacters

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full border-0 resize-none focus:outline-none focus:ring-0 text-lg placeholder-gray-500"
              rows={3}
              maxLength={maxCharacters}
            />
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Image className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-500">
                  <span className={isOverLimit ? 'text-red-500' : ''}>
                    {characterCount}
                  </span>
                  /{maxCharacters}
                </div>
                
                <Button
                  type="submit"
                  disabled={!content.trim() || isOverLimit || isSubmitting}
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
} 