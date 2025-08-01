'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { User, MapPin, Globe, Calendar, Users, UserPlus, UserCheck, MessageSquare, Heart } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { showToast } from '@/components/toast'
import { ImageModal } from '@/components/image-modal'

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
  images?: string[]
}

interface UserListItem {
  id: string
  name: string
  username: string
  image?: string
  bio?: string
  isFollowing: boolean
}

type TabType = 'posts' | 'followers' | 'following'

export default function ProfilePage() {
  const params = useParams()
  const { data: session } = useSession()
  const username = params.username as string
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [followers, setFollowers] = useState<UserListItem[]>([])
  const [following, setFollowing] = useState<UserListItem[]>([])
  const [activeTab, setActiveTab] = useState<TabType>('posts')
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false)
  const [isLoadingTab, setIsLoadingTab] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentPostImages, setCurrentPostImages] = useState<string[]>([])

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${username}/drizzle`)
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
      const response = await fetch(`/api/users/${username}/posts/drizzle`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching profile posts:', error)
    }
  }, [username])

  const fetchFollowers = useCallback(async () => {
    setIsLoadingTab(true)
    try {
      const response = await fetch(`/api/users/${username}/followers/drizzle`)
      if (response.ok) {
        const data = await response.json()
        setFollowers(data.followers)
      }
    } catch (error) {
      console.error('Error fetching followers:', error)
    } finally {
      setIsLoadingTab(false)
    }
  }, [username])

  const fetchFollowing = useCallback(async () => {
    setIsLoadingTab(true)
    try {
      const response = await fetch(`/api/users/${username}/following/drizzle`)
      if (response.ok) {
        const data = await response.json()
        setFollowing(data.following)
      }
    } catch (error) {
      console.error('Error fetching following:', error)
    } finally {
      setIsLoadingTab(false)
    }
  }, [username])

  useEffect(() => {
    fetchProfile()
    fetchProfilePosts()
  }, [fetchProfile, fetchProfilePosts])

  useEffect(() => {
    if (activeTab === 'followers' && followers.length === 0) {
      fetchFollowers()
    } else if (activeTab === 'following' && following.length === 0) {
      fetchFollowing()
    }
  }, [activeTab, followers.length, following.length, fetchFollowers, fetchFollowing])

  const handleFollow = useCallback(async () => {
    if (!session?.user?.id || !profile) return
    
    setIsUpdatingFollow(true)
    try {
      const response = await fetch(`/api/users/${username}/follow/drizzle`, {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setIsFollowing(!isFollowing)
        setProfile(prev => prev ? {
          ...prev,
          _count: {
            ...prev._count,
            followers: isFollowing ? prev._count.followers - 1 : prev._count.followers + 1
          }
        } : null)
        
        // Show toast notification
        showToast('success', data.message)
      }
    } catch (error) {
      console.error('Error following user:', error)
      showToast('error', 'Failed to update follow status')
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

  const handleUserFollow = useCallback(async (userId: string, username: string) => {
    try {
      const response = await fetch(`/api/users/${username}/follow/drizzle`, {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        // Update the user's following status in the lists
        setFollowers(prev => prev.map(user => 
          user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
        ))
        setFollowing(prev => prev.map(user => 
          user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
        ))
        
        // Show toast notification
        showToast('success', data.message)
      }
    } catch (error) {
      console.error('Error following user:', error)
      showToast('error', 'Failed to update follow status')
    }
  }, [])

  const handleImageClick = (images: string[], index: number) => {
    setCurrentPostImages(images)
    setCurrentImageIndex(index)
    setImageModalOpen(true)
  }

  const handleImageModalClose = () => {
    setImageModalOpen(false)
  }

  const handleImageModalNavigate = (index: number) => {
    setCurrentImageIndex(index)
  }

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-gray-400 mb-4">
                  <MessageSquare className="w-16 h-16 mx-auto" />
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
                  onImageClick={handleImageClick}
                />
              ))
            )}
          </div>
        )

      case 'followers':
        return (
          <div className="space-y-4">
            {isLoadingTab ? (
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : followers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No followers yet</h3>
                <p className="text-gray-500">
                  {profile.isOwnProfile 
                    ? "When people follow you, they'll appear here." 
                    : `${profile.name} doesn't have any followers yet.`
                  }
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {followers.map((user) => (
                  <div key={user.id} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt={`${user.name}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                          {user.bio && (
                            <p className="text-sm text-gray-600 truncate mt-1">{user.bio}</p>
                          )}
                        </div>
                      </div>
                      {!profile.isOwnProfile && (
                        <Button
                          variant={user.isFollowing ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleUserFollow(user.id, user.username)}
                          className="flex items-center space-x-1"
                        >
                          {user.isFollowing ? (
                            <>
                              <UserCheck className="w-3 h-3" />
                              <span>Following</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-3 h-3" />
                              <span>Follow</span>
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'following':
        return (
          <div className="space-y-4">
            {isLoadingTab ? (
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : following.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Not following anyone</h3>
                <p className="text-gray-500">
                  {profile.isOwnProfile 
                    ? "When you follow people, they'll appear here." 
                    : `${profile.name} isn't following anyone yet.`
                  }
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {following.map((user) => (
                  <div key={user.id} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt={`${user.name}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                          {user.bio && (
                            <p className="text-sm text-gray-600 truncate mt-1">{user.bio}</p>
                          )}
                        </div>
                      </div>
                      {!profile.isOwnProfile && (
                        <Button
                          variant={user.isFollowing ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleUserFollow(user.id, user.username)}
                          className="flex items-center space-x-1"
                        >
                          {user.isFollowing ? (
                            <>
                              <UserCheck className="w-3 h-3" />
                              <span>Following</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-3 h-3" />
                              <span>Follow</span>
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              {profile.image ? (
                <img 
                  src={profile.image} 
                  alt={`${profile.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-600" />
              )}
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
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`flex items-center space-x-1 ${
                    activeTab === 'posts' ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  <span className="font-semibold">{profile._count.posts}</span>
                  <span>posts</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('followers')}
                  className={`flex items-center space-x-1 ${
                    activeTab === 'followers' ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  <span className="font-semibold">{profile._count.followers}</span>
                  <span>followers</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('following')}
                  className={`flex items-center space-x-1 ${
                    activeTab === 'following' ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  <span className="font-semibold">{profile._count.following}</span>
                  <span>following</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
            {activeTab === 'posts' && 'Posts'}
            {activeTab === 'followers' && 'Followers'}
            {activeTab === 'following' && 'Following'}
          </h2>
          
          {renderTabContent()}
        </div>
      </div>

      {/* Image Modal */}
      {currentPostImages.length > 0 && (
        <ImageModal
          images={currentPostImages}
          currentIndex={currentImageIndex}
          isOpen={imageModalOpen}
          onClose={handleImageModalClose}
          onNavigate={handleImageModalNavigate}
        />
      )}
    </>
  )
} 