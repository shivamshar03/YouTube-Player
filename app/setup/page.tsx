import Header from '@/components/header'
import QuickStartGuide from '@/components/quick-start-guide'

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <QuickStartGuide />
      </div>
    </div>
  )
}
