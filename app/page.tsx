import { Suspense } from 'react'
import VideoGrid from '@/components/video-grid'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-green-900">🎉 YouTube Clone is Ready!</h3>
                  <p className="text-sm text-green-700">
                    The app is fully functional in demo mode. Explore videos, search, and navigate!
                  </p>
                </div>
                <Link href="/setup">
                  <Button variant="outline" size="sm">
                    Setup Backend
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <Suspense fallback={<div>Loading videos...</div>}>
            <VideoGrid />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
