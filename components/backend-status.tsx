'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react'

export default function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkBackendStatus = async () => {
    setStatus('checking')
    
    try {
      const response = await fetch('http://127.0.0.1:5328/api/health', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.status === 'healthy') {
          setStatus('connected')
          setLastChecked(new Date())
          return
        }
      }
      
      throw new Error('Health check failed')
      
    } catch (error) {
      console.log('Backend health check failed:', error)
      setStatus('disconnected')
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkBackendStatus()
    
    // Check every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (status === 'connected') {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Backend server is running. Full functionality available.
          {lastChecked && (
            <span className="text-xs ml-2">
              (Last checked: {lastChecked.toLocaleTimeString()})
            </span>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <XCircle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <div className="flex items-center justify-between">
          <div>
            Backend server is not running. Using demo data. 
            <br />
            <strong>To start:</strong> <code>python api/index.py</code>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkBackendStatus}
            disabled={status === 'checking'}
          >
            {status === 'checking' ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              'Retry'
            )}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
