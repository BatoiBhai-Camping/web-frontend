'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dummyPayments } from '@/dummyData'

interface PaymentsListProps {
  onPaymentClick?: (paymentId: string) => void
}

export function PaymentsList({ onPaymentClick }: PaymentsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredPayments = dummyPayments.filter((payment) => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === null || payment.type === typeFilter
    const matchesStatus = statusFilter === null || payment.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-primary/10 text-primary'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700'
      case 'failed':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0)
  const successCount = filteredPayments.filter((p) => p.status === 'success').length
  const pendingCount = filteredPayments.filter((p) => p.status === 'pending').length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">All Payments</h2>

        {/* Search and Filters */}
        <div className="flex gap-3 flex-wrap mb-4">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={typeFilter === 'booking' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter(typeFilter === 'booking' ? null : 'booking')}
            >
              Booking
            </Button>
            <Button
              variant={typeFilter === 'refund' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter(typeFilter === 'refund' ? null : 'refund')}
            >
              Refund
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === 'success' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'success' ? null : 'success')}
            >
              Success
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'pending' ? null : 'pending')}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'failed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'failed' ? null : 'failed')}
            >
              Failed
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted p-3 rounded">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <p className="text-xs text-muted-foreground">Success</p>
            <p className="font-bold text-primary">{successCount}</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="font-bold text-primary">{pendingCount}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3">{filteredPayments.length} payments found</p>
      </div>

      {/* Payments List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {filteredPayments.map((payment:any) => (
            <Card
              key={payment.id}
              className="p-4 hover:shadow-md transition-shadow border-border"
            >
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Transaction ID</p>
                  <p className="font-semibold text-foreground text-sm">{payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-bold text-primary">₹{payment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold text-foreground capitalize">{payment.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Method</p>
                  <p className="font-semibold text-foreground capitalize">{payment.method}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">{payment.paymentDate.toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          ))}

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No payments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
