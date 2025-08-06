'use client'

import { useEffect, useState } from 'react'
import VideoCard from './video-card'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  uploadDate: string
  channel: {
    name: string
    avatar: string
  }
}

interface VideoSidebarProps {
  currentVideoId: string
}

export default function VideoSidebar({ currentVideoId }: VideoSidebarProps) {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos')
        const data = await response.json()
        // Filter out current video
        const filteredVideos = data.filter((video: Video) => video.id !== currentVideoId)
        setVideos(filteredVideos)
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }

    fetchVideos()
  }, [currentVideoId])

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Up next</h2>
      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="flex gap-3">
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  )
}
