import { useState } from "react";
import { Users, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { useCommunities } from "./CommunityContext";

const CommunityView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { communities } = useCommunities();
  const [activeTab, setActiveTab] = useState("active");

  const community = communities.find((c) => c.id === id);

  if (!community || !id) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">Community Not Found</h2>
            <p className="text-gray-600 mb-4">The community you’re looking for doesn’t exist or has been removed.</p>
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 py-2 rounded-md focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              onClick={() => navigate("/discover")}
            >
              Back to Communities
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const today = new Date("2025-06-12");
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const activeUsers = community.members.filter((m) => new Date(m.lastActive) >= sevenDaysAgo);
  const inactiveUsers = community.members.filter((m) => new Date(m.lastActive) < sevenDaysAgo);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative h-64 mb-4">
            <img src={community.image} alt={community.name} className="w-full h-full object-cover rounded-lg" />
            {community.isFeatured && (
              <div className="absolute top-3 right-3 bg-orange text-white text-xs px-2.5 py-1.5 rounded-full">Featured</div>
            )}
            <div className="absolute top-3 left-3 bg-white text-navy text-xs px-2.5 py-1.5 rounded-full">
              {community.subscriptionType}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2">{community.name}</h1>
          <p className="text-gray-600 text-sm mb-4">{community.description}</p>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Users className="h-4 w-4 mr-1" />
            <span>{community.memberCount} members</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {community.tags.map((tag) => (
              <span key={tag} className="bg-teal-100 text-teal-700 text-xs px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="active">Active Users</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Users</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeUsers.length > 0 ? (
                activeUsers.map((user) => (
                  <div
                    key={user.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/community/${community.id}/chat/${user.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No active users.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="inactive" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactiveUsers.length > 0 ? (
                inactiveUsers.map((user) => (
                  <div
                    key={user.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/community/${community.id}/chat/${user.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No inactive users.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CommunityView;
