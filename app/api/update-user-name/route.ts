import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 UPDATE USER NAME: POST request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔧 UPDATE USER NAME: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name } = await request.json()
    
    if (!name || name.trim().length === 0) {
      console.log('🔧 UPDATE USER NAME: ❌ No name provided')
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    console.log('🔧 UPDATE USER NAME: 👤 User ID:', session.user.id)
    console.log('🔧 UPDATE USER NAME: 📝 New name:', name)

    // Update user's name in database
    const [updatedUser] = await db
      .update(users)
      .set({ name: name.trim() })
      .where(eq(users.id, session.user.id))
      .returning({
        id: users.id,
        name: users.name,
        username: users.username,
        email: users.email,
      })

    console.log('🔧 UPDATE USER NAME: ✅ User updated:', updatedUser)
    
    return NextResponse.json({
      user: updatedUser,
      message: 'User name updated successfully'
    })

  } catch (error) {
    console.error('🔧 UPDATE USER NAME: ❌ Error updating user:', error)
    
    return NextResponse.json({
      error: 'Failed to update user',
      message: 'Unable to update user at this time. Please try again later.'
    }, { status: 500 })
  }
} 