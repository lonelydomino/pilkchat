'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { User, Save, Camera, MapPin, Globe, FileText } from 'lucide-react'
import { showToast } from '@/components/toast'
import { ImageUpload } from '@/components/image-upload'

interface UserProfile {
  id: string
  name: string
  username: string
  email: string
  bio?: string
  location?: string
  website?: string
  image?: string
}

export default function SettingsPage() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    image: '',
  })

  useEffect(() => {
    if (session?.user?.id) {
      console.log('🔍 SETTINGS: Session user data:', {
        id: session.user.id,
        name: session.user.name,
        username: session.user.username,
        image: session.user.image,
        hasImage: !!session.user.image
      })
      fetchProfile()
    }
  }, [session?.user?.id])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/users/profile/drizzle')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        console.log('🔍 SETTINGS: Profile data loaded:', data)
        console.log('🔍 SETTINGS: User data:', data.user)
        console.log('🔍 SETTINGS: Current image:', data.user?.image)
        setFormData({
          name: data.user?.name || '',
          username: data.user?.username || '',
          bio: data.user?.bio || '',
          location: data.user?.location || '',
          website: data.user?.website || '',
          image: data.user?.image || '',
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      showToast('error', 'Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (url: string) => {
    console.log('🔍 SETTINGS: Image uploaded, URL:', url)
    setFormData(prev => ({
      ...prev,
      image: url
    }))
  }

  const handleImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/users/profile/drizzle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        showToast('success', 'Profile updated successfully')
      } else {
        const error = await response.json()
        showToast('error', error.error || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      showToast('error', 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile not found</h2>
          <p className="text-gray-500">Unable to load your profile information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Update your profile information and preferences</p>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex items-start space-x-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Picture</h3>
              <p className="text-sm text-gray-500 mb-4">Upload a new profile picture</p>
              <ImageUpload
                onUpload={handleImageUpload}
                onRemove={handleImageRemove}
                currentImage={formData.image}
                size="lg"
                variant="default"
                placeholder="Upload profile picture"
              />
              {formData.image && (
                <p className="text-xs text-gray-500 mt-2">
                  Current image: {formData.image.substring(0, 50)}...
                </p>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your display name"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
            <p className="text-xs text-gray-500 mt-1">This will be your unique identifier on the platform</p>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-gray-500 mt-1">A short description about yourself (optional)</p>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your location"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          {/* Email (Read-only) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Email address cannot be changed from this page</p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Additional Settings */}
      <div className="mt-8 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <User className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 