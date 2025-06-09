import { useState } from "react";
import { Link } from "react-router-dom";
import AdminDashboardHeader from "@/components/AdminDashboardHeader";
import AdminStatsSection from "@/components/ui/AdminStatsSection";
import PlatformOverview from "@/components/PlatformOverview";
import AdminTabs from "@/components/ui/AdminTabs";
import Footer from "@/components/Footer";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Platform Overview");

  const renderContent = () => {
    switch (activeTab) {
      case "Platform Overview":
        return <PlatformOverview />;
      default:
        return <PlatformOverview />; // Default to Platform Overview until other views are implemented
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminDashboardHeader />
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Command Centre</h1>
        <h2 className="text-lg text-muted-foreground mb-6">Super Admin Dashboard</h2>
        <div className="mb-6">
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;