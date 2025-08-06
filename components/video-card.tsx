import Link from 'next/link'
import Image from 'next/image'

interface VideoCardProps {
  video: {
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
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} className="group">
      <div className="space-y-3">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Image
            src={video.channel.avatar || "/placeholder.svg"}
            alt={video.channel.name}
            width={36}
            height={36}
            className="rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
              {video.title}
            </h3>
            <p className="text-gray-600 text-xs mt-1">{video.channel.name}</p>
            <p className="text-gray-600 text-xs">
              {video.views} views • {video.uploadDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
