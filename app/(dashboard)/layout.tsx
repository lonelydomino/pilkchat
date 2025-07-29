import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { TrendingHashtags } from '@/components/trending-hashtags'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 flex">
            <div className="flex-1 max-w-2xl mx-auto p-6">
              {children}
            </div>
            <div className="w-80 p-6 space-y-6">
              <TrendingHashtags />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 