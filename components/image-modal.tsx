'use client'

import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageModal({ images, currentIndex, isOpen, onClose, onNavigate }: ImageModalProps) {
  const currentImage = images[currentIndex]

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
        onNavigate(prevIndex)
      } else if (e.key === 'ArrowRight') {
        const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
        onNavigate(nextIndex)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleArrowKeys)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleArrowKeys)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    onNavigate(prevIndex)
  }

  const handleNext = () => {
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    onNavigate(nextIndex)
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={currentImage}
          alt={`Image ${currentIndex + 1} of ${images.length}`}
          className="max-w-full max-h-full object-contain"
          draggable={false}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}
        />
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
} 