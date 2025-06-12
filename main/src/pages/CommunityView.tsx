```tsx
import { useState } from "react";
import { Users, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";

interface Member {
  id: string;
  name: string;
  avatar: string;
  lastActive: string;
}

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  tags: string[];
  subscriptionType: "Admin-Paid" | "Individual-Paid";
  isFeatured?: boolean;
  members: Member[];
}

const mockCommunities: Community[] = [
  // Same as initialCommunities in Communities.tsx
  {
    id: "1",
    name: "Lagos Tech Circle",
    description: "For tech professionals and enthusiasts in Lagos",
    image: "https://images.unsplash.com/photo-1558403194-611308249627",
    memberCount: 534,
    tags: ["Technology", "Professional"],
    subscriptionType: "Admin-Paid",
    isFeatured: true,
    members: [
      { id: "m1", name: "John Doe", avatar: "/user1.png", lastActive: "2025-06-10" },
      { id: "m2", name: "Jane Smith", avatar: "/user2.png", lastActive: "2025-06-05" },
    ],
  },
  // ... (other communities from Communities.tsx)
];

const CommunityView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const community = mockCommunities.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState("active");

  if (!community) {
    return <div>Community not found</div>;
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
              <span key={tag} className="bg-teal/10 text-teal text-xs px-2.5 py-1 rounded-full">
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
```
