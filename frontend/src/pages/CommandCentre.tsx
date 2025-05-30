
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PlatformOverview from '../components/command-centre/PlatformOverview';
import CommunityDirectory from '../components/command-centre/CommunityDirectory';
import EventManager from '../components/command-centre/EventManager';
import RevenueMonitor from '../components/command-centre/RevenueMonitor';
import ModeratorTools from '../components/command-centre/ModeratorTools';
import MatchAnalytics from '../components/command-centre/MatchAnalytics';
import ReportsPanel from '../components/command-centre/ReportsPanel';
import CommunityLeaderboard from '../components/command-centre/CommunityLeaderboard';

const CommandCentre: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-navy">Command Centre</h1>
              <p className="text-gray-600">Super Admin Dashboard</p>
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Download size={16} />
              Export Reports
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start gap-2 overflow-x-auto pb-2 mb-4">
              <TabsTrigger value="overview">Platform Overview</TabsTrigger>
              <TabsTrigger value="communities">Communities</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="analytics">Match Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <PlatformOverview />
            </TabsContent>
            
            <TabsContent value="communities" className="space-y-4">
              <CommunityDirectory />
            </TabsContent>
            
            <TabsContent value="events" className="space-y-4">
              <EventManager />
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-4">
              <RevenueMonitor />
            </TabsContent>
            
            <TabsContent value="moderation" className="space-y-4">
              <ModeratorTools />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <MatchAnalytics />
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <ReportsPanel />
            </TabsContent>
            
            <TabsContent value="leaderboard" className="space-y-4">
              <CommunityLeaderboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CommandCentre;
