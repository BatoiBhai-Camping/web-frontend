import { useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/dashboard/NavBar'
import { Footer } from '@/components/dashboard/Foother'
import { dummyAgents, dummyPackages, dummyPayments, dummyBookings } from '@/dummyData'

interface AgentDetailProps {
  params: {
    id: string
  }
}

export default function AgentDetailPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile')
  const [packageSearch, setPackageSearch] = useState('')
  const [packageStatusFilter, setPackageStatusFilter] = useState<string | null>(null)
  const [packageActiveFilter, setPackageActiveFilter] = useState<string | null>(null)
    const {id} = useParams()
  const agent = dummyAgents.find((a) => a.id === id)
  const agentPackages = dummyPackages.filter((p) => p.agentId === id)
  
  const agentBookings = dummyBookings.filter((b) =>
    agentPackages.some((p) => p.id === b.packageId)
  )

  const agentPayments = dummyPayments.filter((p) =>
    agentBookings.some((b) => b.id === p.bookingId)
  )

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Agent not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const filteredPackages = agentPackages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(packageSearch.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(packageSearch.toLowerCase())
    const matchesStatus = packageStatusFilter === null || pkg.approvalStatus === packageStatusFilter
    // Note: activated/deactivated would be stored in actual data model
    return matchesSearch && matchesStatus
  })

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
    },
    {
      id: 'packages',
      label: 'Packages',
      icon: '📦',
      count: agentPackages.length,
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: '💳',
      count: agentPayments.length,
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
          Back to Agents
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-end gap-4 mb-4">
            <img
              src={agent.profileImage}
              alt={agent.name}
              className="w-24 h-24 rounded-full border-4 border-primary"
            />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{agent.name}</h1>
              <p className="text-muted-foreground">{agent.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Approval Status</p>
              <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                agent.approvalStatus === 'approved'
                  ? 'bg-primary/10 text-primary'
                  : agent.approvalStatus === 'pending'
                    ? 'bg-yellow-500/10 text-yellow-700'
                    : 'bg-destructive/10 text-destructive'
              }`}>
                {agent.approvalStatus.charAt(0).toUpperCase() + agent.approvalStatus.slice(1)}
              </span>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold text-primary mt-1">{agent.totalBookings}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Packages</p>
              <p className="text-2xl font-bold text-primary mt-1">{agent.packages}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="text-2xl font-bold text-primary mt-1">{agent.rating}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-semibold text-foreground mt-1">{agent.phone}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.icon} {tab.label}
                {tab.count !== undefined && <span className="ml-1 text-xs">({tab.count})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          {activeTab === 'profile' && (
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Agent Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Agency Name</p>
                  <p className="font-semibold text-foreground text-lg">{agent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-semibold text-foreground">{agent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-semibold text-foreground">{agent.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="font-bold text-primary text-lg">⭐ {agent.rating}</p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'packages' && (
            <>
              {/* Search and Filter */}
              <Card className="p-4 border-border">
                <div className="flex gap-3 flex-wrap">
                  <div className="flex-1 min-w-64 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search packages..."
                      value={packageSearch}
                      onChange={(e) => setPackageSearch(e.target.value)}
                      className="pl-10 bg-muted"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={packageStatusFilter === 'approved' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPackageStatusFilter(packageStatusFilter === 'approved' ? null : 'approved')}
                    >
                      Approved
                    </Button>
                    <Button
                      variant={packageStatusFilter === 'pending' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPackageStatusFilter(packageStatusFilter === 'pending' ? null : 'pending')}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={packageStatusFilter === 'rejected' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPackageStatusFilter(packageStatusFilter === 'rejected' ? null : 'rejected')}
                    >
                      Rejected
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Packages Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPackages.map((pkg) => (
                  <Card key={pkg.id} className="p-4 border-border overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-foreground line-clamp-2">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{pkg.destination}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-bold text-primary">₹{pkg.price.toLocaleString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        pkg.approvalStatus === 'approved'
                          ? 'bg-primary/10 text-primary'
                          : pkg.approvalStatus === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-700'
                            : 'bg-destructive/10 text-destructive'
                      }`}>
                        {pkg.approvalStatus.charAt(0).toUpperCase() + pkg.approvalStatus.slice(1)}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredPackages.length === 0 && (
                <Card className="p-8 text-center border-border">
                  <p className="text-muted-foreground">No packages found</p>
                </Card>
              )}
            </>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-3">
              {agentPayments.length > 0 ? (
                agentPayments.map((payment) => (
                  <Card key={payment.id} className="p-4 border-border">
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
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center border-border">
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
