'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThumbsUp, ThumbsDown, Share, Download, Wifi, WifiOff } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Comments from './comments'

interface Video {
  id: string
  title: string
  description: string
  videoUrl?: string
  views: string
  uploadDate: string
  channel: {
    name: string
    avatar: string
    subscribers: string
  }
}

interface VideoPlayerProps {
  videoId: string
}

// Demo video data
const demoVideos: { [key: string]: Video } = {
  "1": {
    id: "1",
    title: "Building a Full-Stack App with Next.js and Python",
    description: "Learn how to create a modern web application using Next.js for the frontend and Python Flask for the backend API. This comprehensive tutorial covers setup, development, and deployment. You'll learn how to integrate React components with Flask APIs, handle CORS, manage state, and create a seamless full-stack experience.",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    views: "125K",
    uploadDate: "2 days ago",
    channel: {
      name: "TechTutorials",
      avatar: "/tech-channel-avatar.png",
      subscribers: "250K"
    }
  },
  "2": {
    id: "2",
    title: "Python Flask REST API Tutorial",
    description: "Complete guide to building REST APIs with Python Flask, including authentication, database integration, and best practices for scalable applications. Learn how to structure your Flask applications, handle errors gracefully, and implement proper API design patterns.",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    views: "89K",
    uploadDate: "5 days ago",
    channel: {
      name: "CodeMaster",
      avatar: "/code-master-avatar.png",
      subscribers: "180K"
    }
  },
  "3": {
    id: "3",
    title: "React Hooks Deep Dive",
    description: "Understanding React Hooks with practical examples and best practices for modern React development. Covers useState, useEffect, custom hooks and more. Perfect for developers looking to master functional components and modern React patterns.",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    views: "67K",
    uploadDate: "1 week ago",
    channel: {
      name: "ReactPro",
      avatar: "/react-pro-avatar.png",
      subscribers: "95K"
    }
  }
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [backendMode, setBackendMode] = useState(false)
  const [backendStatus, setBackendStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected')

  // Initialize with demo data
  useEffect(() => {
    const demoVideo = demoVideos[videoId]
    if (demoVideo) {
      setVideo(demoVideo)
    } else {
      // Create a generic demo video for any ID
      setVideo({
        id: videoId,
        title: "Sample Video",
        description: "This is a sample video in demo mode. Start the Flask backend to see real video data.",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        views: "1K",
        uploadDate: "1 day ago",
        channel: {
          name: "Demo Channel",
          avatar: "/placeholder.svg?height=40&width=40",
          subscribers: "10K"
        }
      })
    }
    setLoading(false)
  }, [videoId])

  const tryBackendConnection = async () => {
    setBackendStatus('connecting')
    
    try {
      const flaskUrl = `http://127.0.0.1:5328/api/videos/${videoId}`
      
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
      setVideo(data)
      setBackendMode(true)
      setBackendStatus('connected')
      
    } catch (error) {
      console.error('Backend connection failed:', error)
      setBackendStatus('error')
      setTimeout(() => setBackendStatus('disconnected'), 3000)
    }
  }

  const switchToDemoMode = () => {
    setBackendMode(false)
    setBackendStatus('disconnected')
    
    // Reset to demo data
    const demoVideo = demoVideos[videoId]
    if (demoVideo) {
      setVideo(demoVideo)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading video...</div>
  }

  if (!video) {
    return <div className="text-center py-8">Video not found.</div>
  }

  return (
    <div className="space-y-4">
      {/* Mode Indicator */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {backendMode ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-blue-600" />
            )}
            <span className="text-sm font-medium">
              {backendMode ? 'Backend Mode' : 'Demo Mode'}
            </span>
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
                Demo Mode
              </Button>
            )}
          </div>
        </div>
        
        {backendStatus === 'error' && (
          <Alert className="mt-2 border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800 text-sm">
              Backend not available. Start Flask server: <code>python api/index.py</code>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Video Player */}
      <div className="aspect-video rounded-lg overflow-hidden bg-black">
        <video 
          className="w-full h-full" 
          controls 
          poster={`/placeholder.svg?height=480&width=854&query=${encodeURIComponent(video.title)}`}
        >
          {video.videoUrl && <source src={video.videoUrl} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-semibold">{video.title}</h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={video.channel.avatar || "/placeholder.svg"}
              alt={video.channel.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium">{video.channel.name}</h3>
              <p className="text-sm text-gray-600">{video.channel.subscribers} subscribers</p>
            </div>
            <Button variant="default" className="ml-4">
              Subscribe
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsDown className="w-4 h-4 mr-2" />
              Dislike
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-2">
            {video.views} views • {video.uploadDate}
          </div>
          <p className="text-sm">{video.description}</p>
        </div>

        <Comments videoId={videoId} backendMode={backendMode} />
      </div>
    </div>
  )
}
