'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Send, Image as ImageIcon, X } from 'lucide-react'
import { showToast } from './toast'
import { ImageUpload } from './image-upload'

interface CreatePostProps {
  onPostCreated: (post: any) => void
  placeholder?: string
  className?: string
}

export function CreatePost({ onPostCreated, placeholder = "What's happening?", className = "" }: CreatePostProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user?.id) {
      showToast('error', 'You must be logged in to post')
      return
    }

    if (!content.trim() && images.length === 0) {
      showToast('error', 'Please write something or add an image')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          mediaUrls: images,
        }),
      })

      if (response.ok) {
        const newPost = await response.json()
        onPostCreated(newPost)
        setContent('')
        setImages([])
        showToast('success', 'Post created successfully!')
      } else {
        const error = await response.json()
        showToast('error', error.error || 'Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      showToast('error', 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }, [content, images, session?.user?.id, onPostCreated])

  const handleImageUpload = (url: string) => {
    if (images.length >= 4) {
      showToast('error', 'Maximum 4 images allowed per post')
      return
    }
    setImages(prev => [...prev, url])
  }

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const remainingChars = 280 - content.length
  const isOverLimit = remainingChars < 0

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Input */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            maxLength={280}
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">Add images to your post</span>
          </div>
          
          {images.length < 4 && (
            <div className="flex items-center space-x-2">
              <ImageUpload
                onUpload={handleImageUpload}
                size="sm"
                variant="compact"
                aspectRatio="auto"
                placeholder="Add image"
                maxSize={5}
              />
              <span className="text-xs text-gray-400">
                {images.length}/4 images
              </span>
            </div>
          )}

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || (!content.trim() && images.length === 0) || isOverLimit}
            className="flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
          </Button>
        </div>
      </form>
    </div>
  )
} 