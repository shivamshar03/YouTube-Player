'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Upload, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">YT</span>
          </div>
          <span className="text-xl font-semibold">YouTube</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
          <div className="flex">
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none border-r-0"
            />
            <Button type="submit" variant="outline" className="rounded-l-none px-6">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-4">
          <Link href="/upload">
            <Button variant="ghost" size="sm">
              <Upload className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
