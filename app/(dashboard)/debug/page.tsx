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
          <p><strong>Has Image:</strong> {'Image not included in session (JWT size)'}</p>
          <p><strong>Image Length:</strong> {'N/A'}</p>
        </div>

        {/* Image Note */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Image Information</h2>
          <p className="text-gray-600">
            <strong>Note:</strong> User images are not included in the session for JWT size optimization. 
            Images are fetched separately when needed (e.g., in profile pages).
          </p>
        </div>
      </div>
    </div>
  )
} 