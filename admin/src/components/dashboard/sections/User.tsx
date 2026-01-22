'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X, MapPin, Mail, Phone, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface User {
  id: string
  name: string
  email: string
  phone: string
  location: string
  status: 'approved' | 'pending' | 'rejected'
  joinDate: string
  bookings: number
}

const dummyUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1-555-0101', location: 'New York', status: 'approved', joinDate: '2024-01-15', bookings: 5 },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', phone: '+1-555-0102', location: 'Los Angeles', status: 'pending', joinDate: '2024-02-20', bookings: 2 },
  { id: '3', name: 'Carol White', email: 'carol@example.com', phone: '+1-555-0103', location: 'Chicago', status: 'approved', joinDate: '2024-01-10', bookings: 8 },
  { id: '4', name: 'David Brown', email: 'david@example.com', phone: '+1-555-0104', location: 'Houston', status: 'rejected', joinDate: '2024-03-05', bookings: 0 },
  { id: '5', name: 'Emma Davis', email: 'emma@example.com', phone: '+1-555-0105', location: 'Phoenix', status: 'approved', joinDate: '2024-01-25', bookings: 12 },
  { id: '6', name: 'Frank Miller', email: 'frank@example.com', phone: '+1-555-0106', location: 'Philadelphia', status: 'pending', joinDate: '2024-02-28', bookings: 1 },
  { id: '7', name: 'Grace Lee', email: 'grace@example.com', phone: '+1-555-0107', location: 'San Antonio', status: 'approved', joinDate: '2024-01-08', bookings: 6 },
  { id: '8', name: 'Henry Wilson', email: 'henry@example.com', phone: '+1-555-0108', location: 'San Diego', status: 'approved', joinDate: '2024-02-12', bookings: 9 },
]

export function UsersSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [locationFilter, setLocationFilter] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    return dummyUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)

      const matchesStatus = !statusFilter || user.status === statusFilter
      const matchesLocation = !locationFilter || user.location === locationFilter

      return matchesSearch && matchesStatus && matchesLocation
    })
  }, [searchQuery, statusFilter, locationFilter])

  const locations = Array.from(new Set(dummyUsers.map((u) => u.location)))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header with search and filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Status {statusFilter && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded px-2">1</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => setStatusFilter(null)} className={!statusFilter ? 'bg-muted' : ''}>
                All Status
              </DropdownMenuItem>
              {['approved', 'pending', 'rejected'].map((status) => (
                <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)} className={statusFilter === status ? 'bg-muted' : ''}>
                  <span className="capitalize">{status}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Location filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <MapPin className="w-4 h-4" />
                Location {locationFilter && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded px-2">1</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => setLocationFilter(null)} className={!locationFilter ? 'bg-muted' : ''}>
                All Locations
              </DropdownMenuItem>
              {locations.map((location) => (
                <DropdownMenuItem key={location} onClick={() => setLocationFilter(location)} className={locationFilter === location ? 'bg-muted' : ''}>
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Active filters display */}
          {(statusFilter || locationFilter) && (
            <div className="flex gap-2">
              {statusFilter && (
                <Badge variant="secondary" className="gap-1">
                  {statusFilter}
                  <button onClick={() => setStatusFilter(null)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {locationFilter && (
                <Badge variant="secondary" className="gap-1">
                  {locationFilter}
                  <button onClick={() => setLocationFilter(null)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-4 hover:shadow-md transition cursor-pointer border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <Badge className={`gap-1 ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="capitalize text-xs">{user.status}</span>
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span>Joined: {user.joinDate}</span>
                  <span>Bookings: {user.bookings}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No users found matching your filters</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="border-t border-border pt-4 text-sm text-muted-foreground">
        <p>
          Showing <span className="font-semibold text-foreground">{filteredUsers.length}</span> of <span className="font-semibold text-foreground">{dummyUsers.length}</span> users
        </p>
      </div>
    </div>
  )
}
