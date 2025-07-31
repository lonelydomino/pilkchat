import NextAuth from "next-auth"
import { authOptions } from './auth-drizzle'

export default NextAuth(authOptions) 