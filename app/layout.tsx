import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { ToastContainer } from '@/components/toast'
import { NotificationProvider } from '@/components/notification-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pilk Chat',
  description: 'A modern, decentralized social media platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NotificationProvider>
            <ToastContainer>
              {children}
            </ToastContainer>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  )
} 