import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 CHANGE PASSWORD DRIZZLE: POST request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('🔐 CHANGE PASSWORD DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { currentPassword, newPassword } = await request.json()
    
    console.log('🔐 CHANGE PASSWORD DRIZZLE: 👤 User ID:', userId)

    if (!currentPassword || !newPassword) {
      console.log('🔐 CHANGE PASSWORD DRIZZLE: ❌ Missing password fields')
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    // Get current user with password
    console.log('🔐 CHANGE PASSWORD DRIZZLE: 🔍 Fetching user...')
    const userData = await db
      .select({
        id: users.id,
        password: users.password,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (!userData || userData.length === 0) {
      console.log('🔐 CHANGE PASSWORD DRIZZLE: ❌ User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = userData[0]

    if (!user.password) {
      console.log('🔐 CHANGE PASSWORD DRIZZLE: ❌ User has no password (OAuth user)')
      return NextResponse.json(
        { error: 'Cannot change password for OAuth users' },
        { status: 400 }
      )
    }

    // Verify current password
    console.log('🔐 CHANGE PASSWORD DRIZZLE: 🔐 Verifying current password...')
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    
    if (!isCurrentPasswordValid) {
      console.log('🔐 CHANGE PASSWORD DRIZZLE: ❌ Current password is incorrect')
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    console.log('🔐 CHANGE PASSWORD DRIZZLE: 🔐 Hashing new password...')
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    console.log('🔐 CHANGE PASSWORD DRIZZLE: 🔄 Updating password...')
    await db
      .update(users)
      .set({ 
        password: hashedNewPassword,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))

    console.log('🔐 CHANGE PASSWORD DRIZZLE: ✅ Password updated successfully')

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })

  } catch (error) {
    console.error('🔐 CHANGE PASSWORD DRIZZLE: ❌ Error changing password:', error)
    
    return NextResponse.json({
      error: 'Failed to change password',
      message: 'Unable to change password at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET() {
  console.log('🔐 CHANGE PASSWORD DRIZZLE: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 