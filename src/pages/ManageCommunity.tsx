
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCommunity } from "@/data/mockCommunityData";
import { MembersTab } from "@/components/community/MembersTab";
import { UpdatesTab } from "@/components/community/UpdatesTab";
import { RulesTab } from "@/components/community/RulesTab";
import { SettingsTab } from "@/components/community/SettingsTab";
import Header from "@/components/DashboardHeader";

const ManageCommunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(mockCommunity);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate("/communities")}>
              ← Back to Communities
            </Button>
            <h1 className="text-3xl font-bold">Manage {community.name}</h1>
          </div>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Members & Requests</TabsTrigger>
            <TabsTrigger value="updates">Post Updates</TabsTrigger>
            <TabsTrigger value="rules">Community Rules</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <MembersTab community={community} setCommunity={setCommunity} />
          </TabsContent>

          <TabsContent value="updates">
            <UpdatesTab />
          </TabsContent>

          <TabsContent value="rules">
            <RulesTab community={community} setCommunity={setCommunity} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab community={community} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ManageCommunity;
