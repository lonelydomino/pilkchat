import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('📝 SIGNUP: POST request started')
    
    const { email, password, username, name } = await request.json()
    
    console.log('📝 SIGNUP: 📧 Email:', email)
    console.log('📝 SIGNUP: 👤 Username:', username)
    console.log('📝 SIGNUP: 📝 Name:', name)

    // Validate required fields
    if (!email || !password || !username || !name) {
      console.log('📝 SIGNUP: ❌ Missing required fields')
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    console.log('📝 SIGNUP: 🔍 Checking if email exists...')
    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existingEmail.length > 0) {
      console.log('📝 SIGNUP: ❌ Email already exists')
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if username already exists
    console.log('📝 SIGNUP: 🔍 Checking if username exists...')
    const existingUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (existingUsername.length > 0) {
      console.log('📝 SIGNUP: ❌ Username already exists')
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      )
    }

    // Hash password
    console.log('📝 SIGNUP: 🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    console.log('📝 SIGNUP: ➕ Creating user...')
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        username,
        name,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        name: users.name,
        image: users.image,
      })

    console.log('📝 SIGNUP: ✅ User created with ID:', newUser.id)

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        image: newUser.image,
      }
    })

  } catch (error) {
    console.error('📝 SIGNUP: ❌ Error creating user:', error)
    
    return NextResponse.json({
      error: 'Failed to create user',
      message: 'Unable to create account at this time. Please try again later.'
    }, { status: 500 })
  }
}

export async function GET() {
  console.log('📝 SIGNUP: 📝 GET request received (not allowed)')
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 