'use client'

import { useState, useCallback, useEffect } from 'react'
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
  const { data: session, status } = useSession()
  const [content, setContent] = useState('')
  

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [resetImageUpload, setResetImageUpload] = useState(false)

  // Reset the resetImageUpload state after a short delay
  useEffect(() => {
    if (resetImageUpload) {
      const timer = setTimeout(() => {
        setResetImageUpload(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [resetImageUpload])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    

    
    if (status === 'loading') {
      showToast('error', 'Please wait while we check your authentication...')
      return
    }
    
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
      const requestBody = {
        content: content.trim(),
        mediaUrls: images,
        userId: session?.user?.id, // Include user ID as fallback
      }

      
      const response = await fetch('/api/create-post-drizzle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        const responseData = await response.json()

        
        onPostCreated(responseData.post) // Pass only the post data, not the entire response
        setContent('')
        setImages([])
        setResetImageUpload(true) // Trigger reset of ImageUpload component
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
    setImages(prev => {
      const newImages = [...prev, url]

      return newImages
    })
  }

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const remainingChars = 280 - content.length
  const isOverLimit = remainingChars < 0

  // Show loading state while session is loading
  if (status === 'loading') {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!session?.user?.id) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Please log in</h3>
          <p className="text-gray-500">You need to be logged in to create posts</p>
        </div>
      </div>
    )
  }

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
                uploadType="post"
                reset={resetImageUpload}
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