import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { withRetry, createPrismaClient } from "@/lib/prisma"

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
  adapter: PrismaAdapter(createPrismaClient()) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          console.log('AUTH: Missing credentials')
          return null
        }

        try {
          console.log('AUTH: Attempting login for:', credentials.email)
          
          // Use retry logic for database queries with longer delays for auth
          const user = await withRetry(async (client) => {
            return await client.user.findUnique({
              where: {
                email: credentials.email
              }
            })
          }, 2, 500) // Longer delay for auth queries

          if (!user || !user.password) {
            console.log('AUTH: User not found or no password:', credentials.email)
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log('AUTH: Invalid password for user:', credentials.email)
            return null
          }

          console.log('AUTH: Authentication successful for user:', credentials.email)
          return {
            id: user.id,
            email: user.email || '', // Ensure email is never null
            name: user.name || '', // Ensure name is never null
            username: user.username,
            // Don't include image in JWT to avoid token size issues
          }
        } catch (error) {
          console.error('AUTH: Auth error:', error)
          
          // Try fallback approach for auth
          try {
            console.log('AUTH: 🔄 Trying fallback approach for auth...')
            const fallbackClient = createPrismaClient()
            
            const fallbackUser = await fallbackClient.user.findUnique({
              where: {
                email: credentials.email
              }
            })
            
            await fallbackClient.$disconnect()
            
            if (!fallbackUser || !fallbackUser.password) {
              console.log('AUTH: User not found in fallback:', credentials.email)
              return null
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              fallbackUser.password
            )

            if (!isPasswordValid) {
              console.log('AUTH: Invalid password in fallback for user:', credentials.email)
              return null
            }

            console.log('AUTH: Authentication successful with fallback for user:', credentials.email)
            return {
              id: fallbackUser.id,
              email: fallbackUser.email || '',
              name: fallbackUser.name || '',
              username: fallbackUser.username,
            }
          } catch (fallbackError) {
            console.error('AUTH: Fallback auth also failed:', fallbackError)
            return null
          }
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
    signOut: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions) 