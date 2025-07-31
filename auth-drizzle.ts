import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('AUTH DRIZZLE: Missing credentials')
          return null
        }

        try {
          console.log('AUTH DRIZZLE: 🔍 Looking up user by email:', credentials.email)
          
          // Simple Drizzle query - no retry logic needed!
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
            .limit(1)

          if (!user || user.length === 0) {
            console.log('AUTH DRIZZLE: ❌ User not found')
            return null
          }

          const foundUser = user[0]
          console.log('AUTH DRIZZLE: ✅ User found:', foundUser.username)

          if (!foundUser.password) {
            console.log('AUTH DRIZZLE: ❌ User has no password (OAuth user)')
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, foundUser.password)
          
          if (!isPasswordValid) {
            console.log('AUTH DRIZZLE: ❌ Invalid password')
            return null
          }

          console.log('AUTH DRIZZLE: ✅ Authentication successful')
          return {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            username: foundUser.username,
            image: foundUser.image,
          }
        } catch (error) {
          console.error('AUTH DRIZZLE: ❌ Error during authentication:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.username = token.username as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
} 