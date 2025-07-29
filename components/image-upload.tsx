'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, X, Upload, Image as ImageIcon, Plus } from 'lucide-react'
import { showToast } from './toast'

interface ImageUploadProps {
  onUpload: (url: string) => void
  onRemove?: () => void
  currentImage?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  aspectRatio?: 'square' | 'video' | 'auto'
  maxSize?: number // in MB
  allowedTypes?: string[]
  placeholder?: string
  variant?: 'default' | 'compact' | 'button'
}

export function ImageUpload({
  onUpload,
  onRemove,
  currentImage,
  className = '',
  size = 'md',
  aspectRatio = 'square',
  maxSize = 5,
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  placeholder = 'Upload image',
  variant = 'default'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'compact' ? 'w-16 h-16' : 'w-20 h-20'
      case 'lg':
        return 'w-32 h-32'
      default:
        return variant === 'compact' ? 'w-20 h-20' : 'w-24 h-24'
    }
  }

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video'
      case 'auto':
        return 'aspect-auto'
      default:
        return 'aspect-square'
    }
  }

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    }

    // Check file size
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `File size too large. Maximum size is ${maxSize}MB.`
    }

    return null
  }

  const handleFileSelect = useCallback(async (file: File) => {
    const error = validateFile(file)
    if (error) {
      showToast('error', error)
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setPreview(data.url)
        onUpload(data.url)
        showToast('success', 'Image uploaded successfully')
      } else {
        const error = await response.json()
        showToast('error', error.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      showToast('error', 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }, [onUpload, allowedTypes, maxSize])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleFileSelect(imageFile)
    } else {
      showToast('error', 'Please select an image file')
    }
  }, [handleFileSelect])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleRemove = () => {
    setPreview(null)
    onRemove?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Compact variant for create post form
  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <div
          className={`
            ${getSizeClasses()} ${getAspectRatioClasses()}
            border border-gray-300 rounded-lg
            flex items-center justify-center
            transition-all duration-200
            ${isDragOver ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400 hover:bg-gray-50'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!isUploading ? triggerFileInput : undefined}
        >
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              {!isUploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              {isUploading ? (
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-gray-500">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-1">
                  <Plus className="w-5 h-5 text-gray-400" />
                  <p className="text-xs text-gray-500">Add</p>
                </div>
              )}
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>
    )
  }

  // Button variant for inline use
  if (variant === 'button') {
    return (
      <div className={`relative ${className}`}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={triggerFileInput}
          disabled={isUploading}
          className="flex items-center space-x-2"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-4 h-4" />
              <span>{placeholder}</span>
            </>
          )}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>
    )
  }

  // Default variant (original design)
  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${getSizeClasses()} ${getAspectRatioClasses()}
          border-2 border-dashed rounded-lg
          flex items-center justify-center
          transition-all duration-200
          ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!isUploading ? triggerFileInput : undefined}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            {!isUploading && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            {isUploading ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-500">{placeholder}</p>
                <p className="text-xs text-gray-400">
                  Drag & drop or click to upload
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isUploading}
      />

      {!preview && !isUploading && (
        <div className="mt-2 text-xs text-gray-500">
          <p>Supported formats: JPEG, PNG, WebP, GIF</p>
          <p>Maximum size: {maxSize}MB</p>
        </div>
      )}
    </div>
  )
} 