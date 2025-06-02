
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import AcceptedConnectionsTable from '../components/connections/AcceptedConnectionsTable';
import FilterTabs from '../components/connections/FilterTabs';
import NextSteps from '../components/connections/NextSteps';
import MeetupTips from '../components/connections/MeetupTips';
import { acceptedConnections } from '../data/acceptedConnections';

const AcceptedConnections: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'scheduled' | 'completed'>('all');
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Your Accepted Connections</h1>
          <Button 
            variant="outline" 
            className="text-teal border-teal hover:bg-teal/10"
            onClick={() => navigate('/matches')}
          >
            Find More Connections
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <AcceptedConnectionsTable connections={acceptedConnections} activeTab={activeTab} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NextSteps />
          <MeetupTips />
        </div>
      </div>
    </Layout>
  );
};

export default AcceptedConnections;
