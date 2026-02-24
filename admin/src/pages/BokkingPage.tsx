import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/dashboard/NavBar'
import { Footer } from '@/components/dashboard/Foother'
import { dummyBookings, dummyUsers, dummyPackages, dummyAgents, dummyPayments } from '@/dummyData'



export default function BookingDetailPage() {
  const navigate = useNavigate()
const {id} = useParams()
  const booking = dummyBookings.find((b) => b.id === id)
  const user = booking ? dummyUsers.find((u) => u.id === booking.userId) : null
  const pkg = booking ? dummyPackages.find((p) => p.id === booking.packageId) : null
  const agent = pkg ? dummyAgents.find((a) => a.id === pkg.agentId) : null
  const bookingPayments = booking ? dummyPayments.filter((p) => p.bookingId === booking.id) : []

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Booking not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const totalRevenue = bookingPayments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bookings
        </Button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking #{booking.id}</h1>
          <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
            booking.status === 'confirmed'
              ? 'bg-primary/10 text-primary'
              : booking.status === 'pending'
                ? 'bg-yellow-500/10 text-yellow-700'
                : 'bg-destructive/10 text-destructive'
          }`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground">Travelers</p>
            <p className="text-2xl font-bold text-primary">{booking.numberOfPeople}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-2xl font-bold text-primary">{booking.numberOfPeople > 1 ? `${Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))} Days` : 'N/A'}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground">Payments</p>
            <p className="text-2xl font-bold text-primary">{bookingPayments.length}</p>
          </div>
        </div>

        {/* Booking Details */}
        <Card className="p-6 mb-6 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Booking Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Booking Date</p>
              <p className="font-semibold text-foreground">{booking.bookingDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Travel Start Date</p>
              <p className="font-semibold text-foreground">{booking.startDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Travel End Date</p>
              <p className="font-semibold text-foreground">{booking.endDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Package</p>
              <p className="font-semibold text-foreground">{booking.packageName}</p>
            </div>
          </div>
        </Card>

        {/* Customer Info */}
        {user && (
          <Card className="p-6 mb-6 border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Customer Information</h2>
            <div className="flex items-start gap-4 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-muted-foreground">{user.phone}</p>
              </div>
            </div>
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              user.verified
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}>
              {user.verified ? 'Verified' : 'Unverified'}
            </span>
          </Card>
        )}

        {/* Agent Info */}
        {agent && (
          <Card className="p-6 mb-6 border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Agent Information</h2>
            <div className="flex items-start gap-4">
              <img
                src={agent.profileImage}
                alt={agent.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-foreground text-lg">{agent.name}</h3>
                <p className="text-muted-foreground">{agent.email}</p>
                <p className="text-muted-foreground">{agent.phone}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Payments */}
        <Card className="p-6 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Payment Details</h2>

          {bookingPayments.length > 0 ? (
            <div className="space-y-3">
              {bookingPayments.map((payment) => (
                <div key={payment.id} className="p-4 bg-muted rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
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
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        payment.status === 'success'
                          ? 'bg-primary/10 text-primary'
                          : payment.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-700'
                            : 'bg-destructive/10 text-destructive'
                      }`}>
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
                </div>
              ))}

              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Paid:</span>
                  <span className="font-bold text-primary text-lg">₹{totalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No payments recorded</p>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  )
}
