
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Users, UserCheck, MessageSquare } from 'lucide-react';
import { Community } from '@/types/community';

interface CommunityStatsProps {
  community: Community;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({ community }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Users className="text-teal h-5 w-5" />
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="font-semibold">{community.memberCount}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <UserCheck className="text-teal h-5 w-5" />
          <div>
            <p className="text-sm text-gray-500">Active Connections</p>
            <p className="font-semibold">{community.stats?.activeConnections || 0}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-teal h-5 w-5" />
          <div>
            <p className="text-sm text-gray-500">Meetups This Month</p>
            <p className="font-semibold">{community.stats?.monthlyMeetups || 0}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <MessageSquare className="text-teal h-5 w-5" />
          <div>
            <p className="text-sm text-gray-500">Discussion Topics</p>
            <p className="font-semibold">{community.stats?.discussionTopics || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityStats;
