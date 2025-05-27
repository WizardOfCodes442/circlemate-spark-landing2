
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Bell, DollarSign } from "lucide-react";
import { Community } from "@/data/mockCommunityData";

interface InsightsTabProps {
  community: Community;
}

export const InsightsTab = ({ community }: InsightsTabProps) => {
  const totalRevenue = community.isPaid ? (community.memberCount * (community.subscriptionAmount || 0)) : 0;
  const growthRate = 15.3; // Mock data
  const activeMembers = Math.floor(community.memberCount * 0.8); // Mock calculation

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{community.memberCount}</div>
            <p className="text-xs text-muted-foreground">
              +{growthRate}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Join Requests</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{community.joinRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Pending approval
            </p>
          </CardContent>
        </Card>

        {community.isPaid && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                From {community.memberCount} subscribers
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm font-medium">New member joined</p>
              <p className="text-xs text-muted-foreground">Sarah Johnson joined 2 hours ago</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm font-medium">Community update posted</p>
              <p className="text-xs text-muted-foreground">You posted an update 1 day ago</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm font-medium">Payment received</p>
              <p className="text-xs text-muted-foreground">Monthly subscription from Mike Davis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
