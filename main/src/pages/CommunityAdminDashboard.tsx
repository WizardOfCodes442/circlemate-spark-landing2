import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Footer from '../components/Footer';
import CommunityAdminTabs from '../components/CommunityAdminTabs';

const CommunityAdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Community Admin Dashboard</h1>
        <CommunityAdminTabs />
      </div>
      <Footer />
    </div>
  );
};

export default CommunityAdminDashboard;