'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { User, MapPin, Globe, Calendar, Users, UserPlus, UserCheck } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface UserProfile {
  id: string
  name: string
  username: string
  email: string
  bio?: string
  location?: string
  website?: string
  image?: string
  createdAt: string
  _count: {
    posts: number
    followers: number
    following: number
  }
  isFollowing: boolean
  isOwnProfile: boolean
}

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

export default function ProfilePage() {
  const params = useParams()
  const { data: session } = useSession()
  const username = params.username as string
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false)

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${username}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setIsFollowing(data.isFollowing)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }, [username])

  const fetchProfilePosts = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${username}/posts`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching profile posts:', error)
    }
  }, [username])

  useEffect(() => {
    fetchProfile()
    fetchProfilePosts()
  }, [fetchProfile, fetchProfilePosts])

  const handleFollow = useCallback(async () => {
    if (!session?.user?.id || !profile) return
    
    setIsUpdatingFollow(true)
    try {
      const response = await fetch(`/api/users/${username}/follow`, {
        method: 'POST',
      })

      if (response.ok) {
        setIsFollowing(!isFollowing)
        setProfile(prev => prev ? {
          ...prev,
          _count: {
            ...prev._count,
            followers: isFollowing ? prev._count.followers - 1 : prev._count.followers + 1
          }
        } : null)
      }
    } catch (error) {
      console.error('Error following user:', error)
    } finally {
      setIsUpdatingFollow(false)
    }
  }, [session?.user?.id, profile, username, isFollowing])

  const handlePostUpdate = useCallback((postId: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ))
  }, [])

  const handlePostDelete = useCallback((postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
          <p className="text-gray-500">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-gray-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-500">@{profile.username}</p>
              </div>
              
              {!profile.isOwnProfile && (
                <Button
                  onClick={handleFollow}
                  disabled={isUpdatingFollow}
                  variant={isFollowing ? "outline" : "default"}
                  className="flex items-center space-x-2"
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </Button>
              )}
            </div>
            
            {profile.bio && (
              <p className="text-gray-700 mb-4">{profile.bio}</p>
            )}
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
              {profile.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              
              {profile.website && (
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(profile.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900">{profile._count.posts}</span>
                <span className="text-gray-500">posts</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900">{profile._count.followers}</span>
                <span className="text-gray-500">followers</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900">{profile._count.following}</span>
                <span className="text-gray-500">following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Posts</h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-400 mb-4">
              <User className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500">
              {profile.isOwnProfile 
                ? "Share your first post!" 
                : `${profile.name} hasn't posted anything yet.`
              }
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpdate={handlePostUpdate}
              onDelete={handlePostDelete}
            />
          ))
        )}
      </div>
    </div>
  )
} 