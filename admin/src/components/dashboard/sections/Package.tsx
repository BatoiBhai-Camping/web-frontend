'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dummyPackages } from '@/dummyData'

interface PackagesListProps {
  onPackageClick: (packageId: string) => void
}

export function PackagesList({ onPackageClick }: PackagesListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredPackages = dummyPackages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === null || pkg.approvalStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-primary/10 text-primary'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700'
      case 'rejected':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Travel Packages</h2>

        {/* Search and Filter */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by package or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'approved' ? null : 'approved')}
            >
              Approved
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'pending' ? null : 'pending')}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'rejected' ? null : 'rejected')}
            >
              Rejected
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3">{filteredPackages.length} packages found</p>
      </div>

      {/* Packages Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="p-0 hover:shadow-md transition-shadow cursor-pointer border-border overflow-hidden"
              onClick={() => onPackageClick(pkg.id)}
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{pkg.destination}</p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Price</span>
                    <span className="font-bold text-primary">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Duration</span>
                    <span className="font-semibold text-foreground">{pkg.duration} days</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(pkg.approvalStatus)}`}>
                    {pkg.approvalStatus.charAt(0).toUpperCase() + pkg.approvalStatus.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{pkg.bookings} bookings</span>
                </div>
              </div>
            </Card>
          ))}

          {filteredPackages.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No packages found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
