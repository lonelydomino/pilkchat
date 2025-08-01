import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useUserImage() {
  const { data: session } = useSession()
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserImage = async () => {
      if (!session?.user?.id) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/users/${session.user.username}/drizzle`)
        if (response.ok) {
          const data = await response.json()
          setImage(data.image || null)
        }
      } catch (error) {
        console.error('Error fetching user image:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserImage()
  }, [session?.user?.id, session?.user?.username])

  return { image, isLoading }
} 