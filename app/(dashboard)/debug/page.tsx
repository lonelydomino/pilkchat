'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function DebugPage() {
  const { data: session, status } = useSession()
  const [debugData, setDebugData] = useState<any>(null)

  useEffect(() => {
    const fetchDebugData = async () => {
      try {
        const response = await fetch('/api/debug/user')
        if (response.ok) {
          const data = await response.json()
          setDebugData(data)
        }
      } catch (error) {
        console.error('Error fetching debug data:', error)
      }
    }

    if (session?.user?.id) {
      fetchDebugData()
    }
  }, [session])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      <div className="space-y-6">
        {/* Session Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Session Data</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        {/* Debug API Data */}
        {debugData && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Debug API Data</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(debugData, null, 2)}
            </pre>
          </div>
        )}

        {/* Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Status</h2>
          <p><strong>Session Status:</strong> {status}</p>
          <p><strong>Has Session:</strong> {!!session ? 'Yes' : 'No'}</p>
          <p><strong>Has User:</strong> {!!session?.user ? 'Yes' : 'No'}</p>
          <p><strong>Has Image:</strong> {!!session?.user?.image ? 'Yes' : 'No'}</p>
          <p><strong>Image Length:</strong> {session?.user?.image?.length || 0}</p>
        </div>

        {/* Test Image Display */}
        {session?.user?.image && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Test Image Display</h2>
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={session.user.image} 
                alt="Test profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Image failed to load:', session.user.image)
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <div className="hidden w-full h-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-sm">Failed to load</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Image URL: {session.user.image.substring(0, 100)}...
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 