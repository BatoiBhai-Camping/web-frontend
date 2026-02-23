'use client'

import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/dashboard/NavBar'
import { Footer } from '@/components/dashboard/Foother'
import { dummySubAdmins } from '@/dummyData'

export default function SubAdminsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<string | null>(null)

  const filteredSubAdmins = dummySubAdmins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === null || admin.approvalStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-primary/10 text-primary border-primary/30'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30'
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/30'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  const selectedAdmin = selectedSubAdmin ? dummySubAdmins.find((a) => a.id === selectedSubAdmin) : null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Sub-Administrators</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - List */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <Card className="p-4 mb-4 border-border">
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-64 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-muted"
                  />
                </div>
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
              <p className="text-sm text-muted-foreground mt-3">{filteredSubAdmins.length} sub-admins found</p>
            </Card>

            {/* Sub-Admins List */}
            <div className="space-y-3">
              {filteredSubAdmins.map((admin) => (
                <Card
                  key={admin.id}
                  className={`p-4 hover:shadow-md transition-all cursor-pointer border-l-4 ${
                    selectedSubAdmin === admin.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedSubAdmin(admin.id)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-12 h-12 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{admin.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{admin.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(admin.approvalStatus)}`}
                      >
                        {admin.approvalStatus.charAt(0).toUpperCase() + admin.approvalStatus.slice(1)}
                      </span>
                      {selectedSubAdmin === admin.id && (
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {filteredSubAdmins.length === 0 && (
                <Card className="p-8 text-center border-border">
                  <p className="text-muted-foreground">No sub-admins found</p>
                </Card>
              )}
            </div>
          </div>

          {/* Right Panel - Detail View */}
          {selectedAdmin ? (
            <Card className="p-6 border-border h-fit lg:sticky lg:top-20">
              <div className="text-center mb-6">
                <img
                  src={selectedAdmin.avatar}
                  alt={selectedAdmin.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <h2 className="text-2xl font-bold text-foreground mb-1">{selectedAdmin.name}</h2>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedAdmin.approvalStatus)}`}
                >
                  {selectedAdmin.approvalStatus.charAt(0).toUpperCase() +
                    selectedAdmin.approvalStatus.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold text-foreground break-all">{selectedAdmin.email}</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p className="font-semibold text-foreground">{selectedAdmin.phone}</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">Address</p>
                  <p className="font-semibold text-foreground">{selectedAdmin.address}</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">City</p>
                  <p className="font-semibold text-foreground">{selectedAdmin.city}</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">State</p>
                  <p className="font-semibold text-foreground">{selectedAdmin.state}</p>
                </div>

                <div className="pb-4">
                  <p className="text-xs text-muted-foreground mb-1">Pincode</p>
                  <p className="font-semibold text-foreground">{selectedAdmin.pincode}</p>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                  <p className="font-semibold text-foreground">
                    {selectedAdmin.createdAt.toLocaleDateString()}
                  </p>
                </div>

                <Button className="w-full mt-4">View Full Profile</Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 border-border h-fit flex items-center justify-center lg:sticky lg:top-20 min-h-96">
              <p className="text-center text-muted-foreground">
                Select a sub-admin to view details
              </p>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
