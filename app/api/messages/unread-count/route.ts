import { NextRequest, NextResponse } from 'next/server'
import { prisma, withRetry, cleanupPrisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ count: 0 })
    }

    // Count unread messages for the current user with retry logic
    const unreadCount = await withRetry(async () => {
      return await prisma.message.count({
        where: {
          conversation: {
            participants: {
              some: {
                userId: session.user.id,
                leftAt: null
              }
            }
          },
          senderId: {
            not: session.user.id
          },
          readAt: null
        }
      })
    }, 3, 200)

    return NextResponse.json({ count: unreadCount })
  } catch (error) {
    console.error('Error fetching unread messages count:', error)
    return NextResponse.json({ count: 0 })
  } finally {
    await cleanupPrisma()
  }
} 