import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      username: string
      // Image is not included in session to avoid JWT size issues
    }
  }

  interface User {
    id: string
    email: string
    name: string
    username: string
    image?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string
    // Image is not included in JWT to avoid token size issues
  }
} 