import { Home, TrendingUpIcon as Trending, ShoppingCartIcon as Subscriptions, Library, History, WatchIcon as WatchLater, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Trending, label: 'Trending', href: '/trending' },
  { icon: Subscriptions, label: 'Subscriptions', href: '/subscriptions' },
  { icon: Library, label: 'Library', href: '/library' },
  { icon: History, label: 'History', href: '/history' },
  { icon: WatchLater, label: 'Watch Later', href: '/watch-later' },
  { icon: ThumbsUp, label: 'Liked Videos', href: '/liked' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 h-10"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>
    </aside>
  )
}
