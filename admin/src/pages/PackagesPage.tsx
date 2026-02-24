import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/dashboard/NavBar'
import { Footer } from '@/components/dashboard/Foother'
import { dummyPackages, dummyAgents, dummyBookings } from '@/dummyData'

interface PackageDetailProps {
  params: {
    id: string
  }
}

export default function PackageDetailPage() {
  const navigate = useNavigate()
const {id} = useParams();
  const pkg = dummyPackages.find((p) => p.id === id)
  const agent = pkg ? dummyAgents.find((a) => a.id === pkg.agentId) : null
  const packageBookings = pkg ? dummyBookings.filter((b) => b.packageId === pkg.id) : []

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Package not found</p>
        </div>
        <Footer />
      </div>
    )
  }

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
          Back to Packages
        </Button>

        {/* Main Image */}
        <div className="mb-6">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-80 object-cover rounded-lg border border-border"
          />
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">{pkg.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{pkg.destination}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Base Price</p>
              <p className="text-2xl font-bold text-primary">₹{pkg.basePrice.toLocaleString()}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Listed Price</p>
              <p className="text-2xl font-bold text-primary">₹{pkg.price.toLocaleString()}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold text-primary">{pkg.duration} Days</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Bookings</p>
              <p className="text-2xl font-bold text-primary">{packageBookings.length}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Status:</span>
            <span className={`px-3 py-1 rounded text-sm font-medium ${
              pkg.approvalStatus === 'approved'
                ? 'bg-primary/10 text-primary'
                : pkg.approvalStatus === 'pending'
                  ? 'bg-yellow-500/10 text-yellow-700'
                  : 'bg-destructive/10 text-destructive'
            }`}>
              {pkg.approvalStatus.charAt(0).toUpperCase() + pkg.approvalStatus.slice(1)}
            </span>
            <span className="text-sm text-muted-foreground">Rating: ⭐ {pkg.rating}</span>
          </div>
        </div>

        {/* Agent Info */}
        {agent && (
          <Card className="p-6 mb-6 border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Travel Agent</h2>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={agent.profileImage}
                alt={agent.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-foreground">{agent.name}</h3>
                <p className="text-sm text-muted-foreground">{agent.email}</p>
                <p className="text-sm text-muted-foreground">{agent.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  agent.approvalStatus === 'approved'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {agent.approvalStatus.charAt(0).toUpperCase() + agent.approvalStatus.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rating</p>
                <p className="font-bold text-primary">⭐ {agent.rating}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Packages</p>
                <p className="font-bold text-primary">{agent.packages}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Bookings Section */}
        <Card className="p-6 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Bookings ({packageBookings.length})</h2>

          {packageBookings.length > 0 ? (
            <div className="space-y-3">
              {packageBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-muted rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Customer</p>
                      <p className="font-semibold text-foreground">{booking.userName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Booking ID</p>
                      <p className="font-semibold text-foreground">{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Travel Dates</p>
                      <p className="font-semibold text-foreground">
                        {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Price</p>
                      <p className="font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-primary/10 text-primary'
                          : booking.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-700'
                            : 'bg-destructive/10 text-destructive'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Travelers</p>
                      <p className="font-semibold text-foreground">{booking.numberOfPeople} people</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No bookings yet</p>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  )
}
