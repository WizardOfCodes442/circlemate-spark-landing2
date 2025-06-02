
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Users, Settings, Calendar, Bell, Shield } from 'lucide-react';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminMembers from '@/components/admin/AdminMembers';
import AdminRules from '@/components/admin/AdminRules';
import AdminMeetups from '@/components/admin/AdminMeetups';
import AdminAnnouncements from '@/components/admin/AdminAnnouncements';

const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Community Admin Dashboard</h1>
        
        <Tabs defaultValue="members" className="w-full">
          <div className="border-b mb-4">
            <TabsList className="w-full bg-transparent justify-start gap-4 h-auto pb-2">
              <TabsTrigger value="members" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users size={18} />
                <span>Members</span>
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shield size={18} />
                <span>Rules</span>
              </TabsTrigger>
              <TabsTrigger value="meetups" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar size={18} />
                <span>Meetups</span>
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Bell size={18} />
                <span>Announcements</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings size={18} />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="members">
            <AdminMembers />
          </TabsContent>
          
          <TabsContent value="rules">
            <AdminRules />
          </TabsContent>
          
          <TabsContent value="meetups">
            <AdminMeetups />
          </TabsContent>
          
          <TabsContent value="announcements">
            <AdminAnnouncements />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
