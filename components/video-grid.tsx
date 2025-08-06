'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import VideoCard from './video-card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Wifi, WifiOff } from 'lucide-react'

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

// Demo data - this is the primary data source
const demoVideos: Video[] = [
  {
    id: "1",
    title: "Building a Full-Stack App with Next.js and Python",
    thumbnail: "/nextjs-python-tutorial.png",
    duration: "15:42",
    views: "125K",
    uploadDate: "2 days ago",
    channel: {
      name: "TechTutorials",
      avatar: "/tech-channel-avatar.png"
    }
  },
  {
    id: "2", 
    title: "Python Flask REST API Tutorial",
    thumbnail: "/python-flask-api-tutorial.png",
    duration: "22:15",
    views: "89K",
    uploadDate: "5 days ago",
    channel: {
      name: "CodeMaster",
      avatar: "/code-master-avatar.png"
    }
  },
  {
    id: "3",
    title: "React Hooks Deep Dive",
    thumbnail: "/react-hooks-tutorial.png",
    duration: "18:30",
    views: "67K",
    uploadDate: "1 week ago",
    channel: {
      name: "ReactPro",
      avatar: "/react-pro-avatar.png"
    }
  },
  {
    id: "4",
    title: "Database Design Fundamentals",
    thumbnail: "/database-design-tutorial.png",
    duration: "25:18",
    views: "156K",
    uploadDate: "3 days ago",
    channel: {
      name: "DataScience Hub",
      avatar: "/data-science-avatar.png"
    }
  },
  {
    id: "5",
    title: "JavaScript ES6+ Features Explained",
    thumbnail: "/javascript-es6-tutorial.png",
    duration: "19:45",
    views: "203K",
    uploadDate: "1 day ago",
    channel: {
      name: "JS Mastery",
      avatar: "/js-channel-avatar.png"
    }
  },
  {
    id: "6",
    title: "CSS Grid vs Flexbox - Complete Guide",
    thumbnail: "/css-grid-flexbox-tutorial.png",
    duration: "16:33",
    views: "178K",
    uploadDate: "4 days ago",
    channel: {
      name: "CSS Pro",
      avatar: "/css-channel-avatar.png"
    }
  }
]

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [backendMode, setBackendMode] = useState(false)
  const [backendStatus, setBackendStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')

  // Initialize with demo data
  useEffect(() => {
    let filteredVideos = demoVideos
    if (searchQuery) {
      filteredVideos = demoVideos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setVideos(filteredVideos)
    setLoading(false)
  }, [searchQuery])

  const tryBackendConnection = async () => {
    setBackendStatus('connecting')
    
    try {
      const flaskUrl = 'http://127.0.0.1:5328/api/videos'
      
      const response = await fetch(flaskUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      })
      
      if (!response.ok) {
        throw new Error(`Flask server responded with status: ${response.status}`)
      }
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Flask server is not returning JSON')
      }
      
      const data = await response.json()
      
      // Filter for search if needed
      let filteredData = data
      if (searchQuery && Array.isArray(data)) {
        filteredData = data.filter((video: Video) => 
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      setVideos(filteredData)
      setBackendMode(true)
      setBackendStatus('connected')
      
    } catch (error) {
      console.error('Backend connection failed:', error)
      setBackendStatus('error')
      // Keep demo data
      setTimeout(() => setBackendStatus('disconnected'), 3000)
    }
  }

  const switchToDemoMode = () => {
    setBackendMode(false)
    setBackendStatus('disconnected')
    
    // Reset to demo data
    let filteredVideos = demoVideos
    if (searchQuery) {
      filteredVideos = demoVideos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setVideos(filteredVideos)
  }

  if (loading) {
    return <div className="text-center py-8">Loading videos...</div>
  }

  return (
    <div className="space-y-4">
      {/* Mode Indicator */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {backendMode ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-blue-600" />
            )}
            <div>
              <h3 className="font-medium text-gray-900">
                {backendMode ? '🚀 Backend Mode' : '🎬 Demo Mode'}
              </h3>
              <p className="text-sm text-gray-600">
                {backendMode 
                  ? 'Connected to Flask backend - Full functionality available'
                  : 'Using sample data - Perfect for exploring the interface'
                }
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {!backendMode && (
              <Button 
                onClick={tryBackendConnection}
                disabled={backendStatus === 'connecting'}
                variant="outline"
                size="sm"
              >
                {backendStatus === 'connecting' ? 'Connecting...' : 'Try Backend'}
              </Button>
            )}
            
            {backendMode && (
              <Button 
                onClick={switchToDemoMode}
                variant="outline"
                size="sm"
              >
                Switch to Demo
              </Button>
            )}
          </div>
        </div>
        
        {backendStatus === 'error' && (
          <Alert className="mt-3 border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              <strong>Backend not available.</strong> Make sure Flask server is running: <code>python api/index.py</code>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No videos found for "{searchQuery}"</p>
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="mt-4"
          >
            View All Videos
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
