'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dummyBookings } from '@/dummyData'

interface BookingsListProps {
  onBookingClick: (bookingId: string) => void
}

export function BookingsList({ onBookingClick }: BookingsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredBookings = dummyBookings.filter((booking) => {
    const matchesSearch =
      booking.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === null || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary/10 text-primary'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700'
      case 'cancelled':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Active Bookings</h2>

        {/* Search and Filter */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by package or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'confirmed' ? null : 'confirmed')}
            >
              Confirmed
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'pending' ? null : 'pending')}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'cancelled' ? null : 'cancelled')}
            >
              Cancelled
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3">{filteredBookings.length} bookings found</p>
      </div>

      {/* Bookings List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {filteredBookings.map((booking) => (
            <Card
              key={booking.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer border-border"
              onClick={() => onBookingClick(booking.id)}
            >
              <div className="mb-3">
                <h3 className="font-bold text-lg text-foreground">{booking.packageName}</h3>
                <p className="text-sm text-muted-foreground">by {booking.agentName}</p>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-semibold text-foreground">{booking.userName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Travelers:</span>
                  <span className="font-semibold text-foreground">{booking.numberOfPeople} people</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold text-foreground">
                    {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <span className="font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</span>
              </div>
            </Card>
          ))}

          {filteredBookings.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
