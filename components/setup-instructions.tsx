'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Terminal, Play, CheckCircle } from 'lucide-react'

export default function SetupInstructions() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepNumber)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const steps = [
    {
      title: "Install Python Dependencies",
      command: "pip install flask flask-cors",
      description: "Install required Python packages for the backend server"
    },
    {
      title: "Start Flask Backend Server",
      command: "python api/index.py",
      description: "Start the Python Flask server on port 5328"
    },
    {
      title: "Verify Backend is Running",
      command: "curl http://127.0.0.1:5328/api/health",
      description: "Test that the backend server is responding"
    }
  ]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Backend Setup Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertDescription>
            The YouTube clone requires a Python Flask backend server to be running. 
            Follow these steps to get it started:
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Step {index + 1}: {step.title}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(step.command, index)}
                >
                  {copiedStep === index ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-3">{step.description}</p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                $ {step.command}
              </div>
            </div>
          ))}
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-800">
            <strong>💡 Pro Tip:</strong> Open a new terminal window to run the Flask server, 
            then refresh this page. The app will automatically detect when the backend is running!
          </AlertDescription>
        </Alert>

        <div className="text-center">
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Refresh Page After Starting Backend
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
