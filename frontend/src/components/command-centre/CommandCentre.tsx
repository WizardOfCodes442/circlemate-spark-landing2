
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, Users, Flag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import PlatformOverview from './PlatformOverview';
import CommunityDirectory from './CommunityDirectory';
import EventManager from './EventManager';
import RevenueMonitor from './RevenueMonitor';
import ModeratorTools from './ModeratorTools';
import MatchAnalytics from './MatchAnalytics';
import ReportsPanel from './ReportsPanel';
import CommunityLeaderboard from './CommunityLeaderboard';

const CommandCentre: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <section className="bg-white py-10 rounded-3xl shadow-md my-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-navy">Command Centre</h2>
            <p className="text-gray-600">Super Admin Dashboard</p>
          </div>
          <Link to="/admin/dashboard">
            <Button variant="outline" className="flex items-center gap-1">
              Full Dashboard <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start gap-2 overflow-x-auto pb-2 mb-4">
            <TabsTrigger value="overview">Platform Overview</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
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
        </Tabs>
      </div>
    </section>
  );
};

export default CommandCentre;
