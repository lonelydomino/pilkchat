import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth-drizzle'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function PUT(request: NextRequest) {
  try {
    console.log('👤 PROFILE UPDATE DRIZZLE: PUT request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('👤 PROFILE UPDATE DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { name, bio, location, website, image } = await request.json()
    
    console.log('👤 PROFILE UPDATE DRIZZLE: 👤 User ID:', userId)
    console.log('👤 PROFILE UPDATE DRIZZLE: 📝 Update data:', { name, bio, location, website, image })

    // Validate that at least one field is provided
    if (!name && !bio && !location && !website && !image) {
      console.log('👤 PROFILE UPDATE DRIZZLE: ❌ No fields to update')
      return NextResponse.json(
        { error: 'At least one field must be provided' },
        { status: 400 }
      )
    }

    // Build update object with only provided fields
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (bio !== undefined) updateData.bio = bio
    if (location !== undefined) updateData.location = location
    if (website !== undefined) updateData.website = website
    if (image !== undefined) updateData.image = image
    updateData.updatedAt = new Date() // Always update the timestamp

    // Update user profile
    console.log('👤 PROFILE UPDATE DRIZZLE: 🔄 Updating profile...')
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        image: users.image,
        bio: users.bio,
        location: users.location,
        website: users.website,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })

    if (!updatedUser) {
      console.log('👤 PROFILE UPDATE DRIZZLE: ❌ User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('👤 PROFILE UPDATE DRIZZLE: ✅ Profile updated successfully')

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('👤 PROFILE UPDATE DRIZZLE: ❌ Error updating profile:', error)
    
    return NextResponse.json({
      error: 'Failed to update profile',
      message: 'Unable to update profile at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('👤 PROFILE UPDATE DRIZZLE: GET request started')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('👤 PROFILE UPDATE DRIZZLE: ❌ No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    console.log('👤 PROFILE UPDATE DRIZZLE: 👤 User ID:', userId)

    // Get current user profile
    console.log('👤 PROFILE UPDATE DRIZZLE: 🔍 Fetching user profile...')
    const userData = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        image: users.image,
        bio: users.bio,
        location: users.location,
        website: users.website,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (!userData || userData.length === 0) {
      console.log('👤 PROFILE UPDATE DRIZZLE: ❌ User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = userData[0]
    console.log('👤 PROFILE UPDATE DRIZZLE: ✅ User profile fetched')
    console.log('👤 PROFILE UPDATE DRIZZLE: 🔍 User data:', {
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
      hasImage: !!user.image,
      imageLength: user.image?.length || 0
    })

    return NextResponse.json({
      user
    })

  } catch (error) {
    console.error('👤 PROFILE UPDATE DRIZZLE: ❌ Error fetching profile:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch profile',
      message: 'Unable to load profile at this time. Please try again later.'
    }, { status: 200 })
  }
}

export async function POST() {
  console.log('👤 PROFILE UPDATE DRIZZLE: 📝 POST request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 