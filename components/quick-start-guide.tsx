'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Terminal, Play, CheckCircle, ExternalLink } from 'lucide-react'

export default function QuickStartGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepNumber)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">🎬 YouTube Clone Quick Start</h1>
        <p className="text-gray-600">
          Get your full-stack YouTube clone running in under 2 minutes!
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800">
          <strong>🎉 Good News:</strong> The app is already working in demo mode! 
          You can browse videos, search, and explore the interface. 
          Start the backend for full functionality including comments and uploads.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Option 1: Automated Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              The easiest way to get everything running with one command:
            </p>
            
            <div className="space-y-3">
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm flex items-center justify-between">
                <span>python scripts/quick_start.py</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('python scripts/quick_start.py', 0)}
                >
                  {copiedStep === 0 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                This will:
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Install Python dependencies (flask, flask-cors)</li>
                  <li>Install Node.js dependencies (if needed)</li>
                  <li>Start Flask backend server</li>
                  <li>Start Next.js frontend</li>
                  <li>Open your browser automatically</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Option 2: Manual Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Start the backend and frontend separately:
            </p>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Step 1: Start Backend</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm flex items-center justify-between">
                  <span>python api/index.py</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard('python api/index.py', 1)}
                  >
                    {copiedStep === 1 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Step 2: Start Frontend</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm flex items-center justify-between">
                  <span>npm run dev</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard('npm run dev', 2)}
                  >
                    {copiedStep === 2 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🔧 Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Common Issues:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• <strong>Port 5328 in use:</strong> Stop existing Flask servers</li>
                <li>• <strong>Python not found:</strong> Install Python 3.7+</li>
                <li>• <strong>npm not found:</strong> Install Node.js</li>
                <li>• <strong>Permission errors:</strong> Try with sudo (Linux/Mac)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quick Fixes:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• <strong>Install Python deps:</strong> pip install flask flask-cors</li>
                <li>• <strong>Install Node deps:</strong> npm install</li>
                <li>• <strong>Check Python:</strong> python --version</li>
                <li>• <strong>Check Node:</strong> node --version</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Demo Mode
          </Button>
          <Button 
            onClick={() => window.location.reload()}
          >
            <Play className="w-4 h-4 mr-2" />
            Refresh After Starting Backend
          </Button>
        </div>
        
        <p className="text-sm text-gray-500">
          Once the backend is running, the status indicator will turn green and you'll have full functionality!
        </p>
      </div>
    </div>
  )
}
