
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCards from '../components/dashboard/StatCards';
import MatchGrid from '../components/dashboard/MatchGrid';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { Button } from '@/components/ui/button';
import { UserCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGroupUpdates = () => {
    navigate('/group-updates');
  };
  
  const handleRequestMatch = () => {
    navigate('/matches');
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <DashboardHeader 
          groupName="Lagos Tech Circle"
          memberCount={534}
          matchesCount={156}
          onGroupUpdatesClick={handleGroupUpdates}
          onRequestMatchClick={handleRequestMatch}
        />
        
        <div className="flex justify-end mb-4">
          <Button
            className="bg-teal hover:bg-teal/90 text-white flex items-center gap-2"
            onClick={() => navigate('/accepted-connections')}
          >
            <UserCheck className="h-4 w-4" />
            View Accepted Connections
          </Button>
        </div>
        
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MatchGrid />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
