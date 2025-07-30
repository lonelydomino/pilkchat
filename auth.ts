import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Only create Prisma client if DATABASE_URL is available
let prisma: PrismaClient | null = null

try {
  if (process.env.DATABASE_URL) {
    prisma = new PrismaClient()
  }
} catch (error) {
  console.warn('Could not initialize Prisma client:', error)
}

// Ensure required environment variables are available
const requiredEnvVars = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  DATABASE_URL: process.env.DATABASE_URL,
}

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.warn(`Missing required environment variables: ${missingVars.join(', ')}`)
}

export const authOptions = {
  adapter: prisma ? PrismaAdapter(prisma) as any : undefined, // Only use adapter if prisma is available
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password || !prisma) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email || '', // Ensure email is never null
            name: user.name || '', // Ensure name is never null
            username: user.username,
            // Don't include image in JWT to avoid token size issues
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.username = user.username
        // Don't store image in JWT to avoid token size issues
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.sub!
        session.user.username = token.username as string
        // Don't include image in session to avoid token size issues
        // Image will be fetched from database when needed
      }
      return session
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Handle relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      // Handle URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url
      }
      // Default fallback
      return baseUrl
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions) 