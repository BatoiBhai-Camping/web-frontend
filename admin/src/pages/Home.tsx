'use client'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const router = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth) {
      router('/dashboard')
    } else {
      router('/signin')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">TA</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Travel Admin Dashboard</h1>
        <p className="text-muted-foreground">Redirecting you to the admin panel...</p>
      </div>
    </div>
  )
}
