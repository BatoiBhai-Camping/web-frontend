import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/dashboard/NavBar'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Footer } from '@/components/dashboard/Foother'
import { UsersList } from '@/components/dashboard/sections/User'
import { AgentsList } from '@/components/dashboard/sections/Agent'
import { PackagesList } from '@/components/dashboard/sections/Package'
import { BookingsList } from '@/components/dashboard/sections/Booking'
import { PaymentsList } from '@/components/dashboard/sections/Payment'
import { StatisticsSection } from '@/components/dashboard/sections/Statistic'
import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('users')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  

  const handleUserClick = (userId: string) => {
    navigate(`/dashboard/users/${userId}`)
  }

  const handleAgentClick = (agentId: string) => {
    navigate(`/dashboard/agents/${agentId}`)
  }

  const handlePackageClick = (packageId: string) => {
    navigate(`/dashboard/packages/${packageId}`)
  }

  const handleBookingClick = (bookingId: string) => {
    navigate(`/dashboard/bookings/${bookingId}`)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <UsersList onUserClick={handleUserClick} />
      case 'agents':
        return <AgentsList onAgentClick={handleAgentClick} />
      case 'packages':
        return <PackagesList onPackageClick={handlePackageClick} />
      case 'bookings':
        return <BookingsList onBookingClick={handleBookingClick} />
      case 'payments':
        return <PaymentsList />
      case 'statistics':
        return <StatisticsSection />
      default:
        return <UsersList onUserClick={handleUserClick} />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <Card className="h-full flex flex-col border-0 rounded-none bg-card">
              {renderSection()}
            </Card>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}
