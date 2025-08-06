'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
}

interface CommentsProps {
  videoId: string
  backendMode?: boolean
}

// Demo comments data
const demoComments: { [key: string]: Comment[] } = {
  "1": [
    {
      id: "c1",
      author: "DevEnthusiast",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Great tutorial! Really helped me understand the integration between Next.js and Python. The step-by-step approach is perfect.",
      timestamp: "2 hours ago",
      likes: 15
    },
    {
      id: "c2", 
      author: "CodeNewbie",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Can you make a follow-up video about deployment? I'd love to see how to deploy this to production.",
      timestamp: "5 hours ago",
      likes: 8
    },
    {
      id: "c3",
      author: "FullStackDev",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "This is exactly what I was looking for! The Flask integration is so clean.",
      timestamp: "1 day ago",
      likes: 23
    }
  ],
  "2": [
    {
      id: "c4",
      author: "PythonLover",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Flask is such a great framework for APIs. Thanks for the detailed explanation!",
      timestamp: "3 hours ago",
      likes: 12
    }
  ]
}

export default function Comments({ videoId, backendMode = false }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Always start with demo data
    const videoComments = demoComments[videoId] || []
    setComments(videoComments)
    setLoading(false)
  }, [videoId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `demo-${Date.now()}`,
      author: 'Demo User',
      avatar: '/placeholder.svg?height=32&width=32',
      content: newComment,
      timestamp: 'just now',
      likes: 0
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  if (loading) {
    return <div>Loading comments...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{comments.length} Comments</h2>
      
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <div className="flex gap-3">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="Your avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setNewComment('')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!newComment.trim()}>
                Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Image
              src={comment.avatar || "/placeholder.svg"}
              alt={comment.author}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-gray-600 text-xs">{comment.timestamp}</span>
              </div>
              <p className="text-sm mb-2">{comment.content}</p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-xs">
                  👍 {comment.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  👎
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
