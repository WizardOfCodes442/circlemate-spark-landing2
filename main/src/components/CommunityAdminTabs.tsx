import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Users, Shield, Calendar, Bell, Settings } from 'lucide-react';
import CommunityAdminMemberPanel from './community/CommunityAdminMemberPanel';
import CommunityAdminRulesPanel from './community/CommunityAdminRulesPanel';
import CommunityAdminMeetupsPanel from './community/CommunityAdminMeetupsPanel';
import CommunityAdminAnnouncementsPanel from './community/CommunityAdminAnnouncementsPanel';
import CommunityAdminSettingsPanel from './community/CommunityAdminSettingsPanel';

const CommunityAdminTabs = () => {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex items-center rounded-md p-1 text-muted-foreground w-full bg-transparent gap-4 h-auto pb-2 border-b mb-4 overflow-x-auto">
        <TabsTrigger
          value="members"
          className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[100px]"
        >
          <Users className="h-4 w-4" />
          <span>Members</span>
        </TabsTrigger>
        <TabsTrigger
          value="rules"
          className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[100px]"
        >
          <Shield className="h-4 w-4" />
          <span>Rules</span>
        </TabsTrigger>
        <TabsTrigger
          value="meetups"
          className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[100px]"
        >
          <Calendar className="h-4 w-4" />
          <span>Meetups</span>
        </TabsTrigger>
        <TabsTrigger
          value="announcements"
          className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[100px]"
        >
          <Bell className="h-4 w-4" />
          <span>Announcements</span>
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[100px]"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        <CommunityAdminMemberPanel />
      </TabsContent>
      <TabsContent value="rules">
        <CommunityAdminRulesPanel />
      </TabsContent>
      <TabsContent value="meetups">
        <CommunityAdminMeetupsPanel />
      </TabsContent>
      <TabsContent value="announcements">
        <CommunityAdminAnnouncementsPanel />
      </TabsContent>
      <TabsContent value="settings">
        <CommunityAdminSettingsPanel />
      </TabsContent>
    </Tabs>
  );
};

export default CommunityAdminTabs;
