'use client'

import React from "react"

import { useState } from 'react'
import { NavLink,useNavigate } from "react-router-dom"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SignInPage() {
  const router = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate admin verification
    if (email === 'admin@travel.com' && password === 'password123') {
      // Store session (in real app, use proper auth)
      localStorage.setItem('adminAuth', JSON.stringify({ email, role: 'admin' }))
      router('/dashboard')
    } else {
      setError('Invalid email or password. Try: admin@travel.com / password123')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md border-2 border-border shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TA</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Travel Admin</CardTitle>
          <CardDescription className="text-base">Admin Dashboard Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <Alert className="border-destructive/50 bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="admin@travel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border focus:ring-primary"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{' '}
              <NavLink to="/signup" className="text-primary hover:underline font-semibold">
                Sign Up
              </NavLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
