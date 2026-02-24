

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/dashboard/NavBar'
import { Footer } from '@/components/dashboard/Foother'
import { dummyUsers, dummyBookings, dummyPayments } from '@/dummyData'

interface UserDetailProps {
  params: {
    id: string
  }
}

export default function UserDetailPage() {
const {id} = useParams();
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  const user = dummyUsers.find((u) => u.id === id)
  const userBookings = dummyBookings.filter((b) => b.userId === id)
  const cancelledBookings = userBookings.filter((b) => b.status === 'cancelled')
  const userPayments = dummyPayments.filter((p) =>
    userBookings.some((b) => b.id === p.bookingId)
  )

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">User not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      count: 1,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: '📅',
      count: userBookings.length,
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      icon: '❌',
      count: cancelledBookings.length,
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: '💳',
      count: userPayments.length,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-end gap-4 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-primary"
            />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  activeTab === tab.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="text-2xl mb-1">{tab.icon}</div>
                <p className="font-semibold text-foreground text-sm">{tab.label}</p>
                <p className="text-lg font-bold text-primary">{tab.count}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          {activeTab === 'profile' && (
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold text-foreground">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-semibold text-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-semibold text-foreground">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Verification Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      user.verified
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {user.verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-semibold text-foreground">
                    {user.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {userBookings.length > 0 ? (
                userBookings.map((booking) => (
                  <Card key={booking.id} className="p-6 border-border">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Booking ID</p>
                        <p className="font-semibold text-foreground">{booking.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Package</p>
                        <p className="font-semibold text-foreground">{booking.packageName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Price</p>
                        <p className="font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-primary/10 text-primary'
                              : booking.status === 'pending'
                                ? 'bg-yellow-500/10 text-yellow-700'
                                : 'bg-destructive/10 text-destructive'
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Travel Dates</p>
                        <p className="font-semibold text-foreground">
                          {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Number of People</p>
                        <p className="font-semibold text-foreground">{booking.numberOfPeople}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center border-border">
                  <p className="text-muted-foreground">No active bookings</p>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'cancelled' && (
            <div className="space-y-4">
              {cancelledBookings.length > 0 ? (
                cancelledBookings.map((booking) => (
                  <Card key={booking.id} className="p-6 border-border">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Package</p>
                        <p className="font-semibold text-foreground">{booking.packageName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cancelled Date</p>
                        <p className="font-semibold text-foreground">
                          {booking.endDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Original Price</p>
                        <p className="font-bold text-destructive">₹{booking.totalPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center border-border">
                  <p className="text-muted-foreground">No cancelled bookings</p>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              {userPayments.length > 0 ? (
                userPayments.map((payment) => (
                  <Card key={payment.id} className="p-6 border-border">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Transaction ID</p>
                        <p className="font-semibold text-foreground text-sm">{payment.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-bold text-primary">₹{payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-semibold text-foreground capitalize">{payment.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            payment.status === 'success'
                              ? 'bg-primary/10 text-primary'
                              : payment.status === 'pending'
                                ? 'bg-yellow-500/10 text-yellow-700'
                                : 'bg-destructive/10 text-destructive'
                          }`}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold text-foreground">
                          {payment.paymentDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Method</p>
                        <p className="font-semibold text-foreground capitalize">{payment.method}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center border-border">
                  <p className="text-muted-foreground">No payments</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
