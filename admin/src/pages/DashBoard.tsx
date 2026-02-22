import { Footer } from "@/components/dashboard/Foother";
import { Navbar } from "@/components/dashboard/NavBar";
import { AgentsSection } from "@/components/dashboard/sections/Agent";
import {
  PaymentsSection,
  ReviewsSection,
  StatisticsSection,
  SubAdminsSection,
} from "@/components/dashboard/sections/Other";
import { PackagesSection } from "@/components/dashboard/sections/Package";
import { UsersSection } from "@/components/dashboard/sections/User";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function DashboardPage() {
  const router = useNavigate();
  const [activeSection, setActiveSection] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return <UsersSection />;
      case "agents":
        return <AgentsSection />;
      case "packages":
        return <PackagesSection />;
      case "subadmins":
        return <SubAdminsSection />;
      case "payments":
        return <PaymentsSection />;
      case "reviews":
        return <ReviewsSection />;
      case "statistics":
        return <StatisticsSection />;
      default:
        return <UsersSection />;
    }
  };

  return (

    <div className="h-screen flex flex-col bg-background">
      
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <Card className="h-full flex flex-col border-border bg-card p-6">
              {renderSection()}
            </Card>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
