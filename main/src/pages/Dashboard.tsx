import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Users, Bell, Heart, Stack } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer"; // Imported Footer
import { mockCommunity } from "@/data/mockCommunityData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentMatches, setRecentMatches] = useState([mockCommunity]); // Using single mockCommunity as an array
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "David Brown", action: "requested to connect with you", time: "2 hours ago", status: "pending" },
    { id: 2, user: "Jessica Williams", action: "scheduled a meetup with you", time: "1 day ago", date: "Tomorrow, 10:00 AM", status: "scheduled" },
    { id: 3, user: "Michael Johnson", action: "left feedback on your meetup", time: "2 days ago", feedback: "Great conversation, would meet again!", rating: 4 },
    { id: 4, user: "Sarah Thompson", action: "confirmed your connection request", time: "3 days ago", status: "confirmed" },
  ]);

  const statsData = {
    newMatches: { value: 2, change: "+2 this week" },
    meetupsPlanned: { value: 1, change: "1 upcoming" },
    profileViews: { value: 15, change: "+6% from last week" },
    satisfactionRate: { value: "95%", change: "Based on feedback" },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Lagos Tech Circle <span className="text-green-500 text-sm font-normal">Active</span></h1>
        <div className="text-sm mb-4 text-muted-foreground flex items-center">
          <Users className="h-4 w-4 mr-1" /> 534 members <Heart className="h-4 w-4 mx-2 text-red-500" /> 156 matches
          <Button variant="ghost" size="sm" className="ml-auto">
            <Bell className="h-4 w-4 mr-2" /> Group Updates
          </Button>
          <Button className="ml-2 text-white">Request Match</Button>
        </div>
        <Button variant="outline" className="mb-6 text-green-500 border-green-500 hover:bg-green-50">
          <Users className="h-4 w-4 mr-2" /> View Accepted Connections
        </Button>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Stats title="New Matches" value={statsData.newMatches.value} change={statsData.newMatches.change} />
          <Stats title="Meetups Planned" value={statsData.meetupsPlanned.value} change={statsData.meetupsPlanned.change} />
          <Stats title="Profile Views" value={statsData.profileViews.value} change={statsData.profileViews.change} />
          <Stats title="Satisfaction Rate" value={statsData.satisfactionRate.value} change={statsData.satisfactionRate.change} />
        </div>

        {/* Recent Matches Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Recent Matches</h2>
            <Button variant="link" className="text-green-500">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentMatches.map((match) => (
              <Card key={match.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={match.image} alt={match.name} />
                    <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">{match.name}</h3>
                  <p className="text-sm text-muted-foreground">{match.category}</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    <Stack className="h-4 w-4 mr-2" /> View Profile
                  </Button>
                  <Button size="sm" className="mt-2 w-full text-white">
                    <Stack className="h-4 w-4 mr-2" /> Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <Button variant="link" className="text-green-500">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="p-4 flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarFallback>{activity.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.user} {activity.action}</p>
                  {activity.date && <p className="text-xs text-muted-foreground">{activity.date}</p>}
                  {activity.feedback && (
                    <div className="text-xs text-muted-foreground">
                      {activity.feedback} <span className="text-yellow-400">{"★".repeat(activity.rating)}</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                {activity.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="text-white">Accept</Button>
                    <Button variant="outline" size="sm">Decline</Button>
                  </div>
                )}
                {activity.status === "scheduled" && <Button variant="link" size="sm" className="text-green-500">View Details</Button>}
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer /> {/* Footer included at the bottom */}
    </div>
  );
};

export default Dashboard;