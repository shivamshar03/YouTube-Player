import { Suspense } from 'react'
import VideoPlayer from '@/components/video-player'
import VideoSidebar from '@/components/video-sidebar'
import Header from '@/components/header'

interface WatchPageProps {
  params: {
    id: string
  }
}

export default function WatchPage({ params }: WatchPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex gap-6 p-6">
        <div className="flex-1">
          <Suspense fallback={<div>Loading video...</div>}>
            <VideoPlayer videoId={params.id} />
          </Suspense>
        </div>
        <div className="w-96">
          <Suspense fallback={<div>Loading recommendations...</div>}>
            <VideoSidebar currentVideoId={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
