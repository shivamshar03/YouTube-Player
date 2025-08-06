import Header from '@/components/header'
import UploadForm from '@/components/upload-form'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Upload Video</h1>
        <UploadForm />
      </div>
    </div>
  )
}
