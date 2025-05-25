import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Users, Settings, Edit, Trash2, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/DashboardHeader";

// Mock data for community
const mockCommunity = {
  id: "1",
  name: "Tech Enthusiasts",
  description: "A community for tech lovers to discuss the latest trends and innovations.",
  rules: "1. Be respectful\n2. No spam\n3. Stay on topic",
  memberCount: 1243,
  image: "/placeholder.svg",
  members: [
    { id: "m1", name: "John Doe", avatar: "/placeholder.svg", role: "admin" },
    { id: "m2", name: "Jane Smith", avatar: "/placeholder.svg", role: "member" },
    { id: "m3", name: "Alex Johnson", avatar: "/placeholder.svg", role: "member" }
  ],
  joinRequests: [
    { id: "r1", name: "Alice Cooper", avatar: "/placeholder.svg" },
    { id: "r2", name: "Bob Dylan", avatar: "/placeholder.svg" }
  ]
};

=======
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCommunity } from "@/data/mockCommunityData";
import { MembersTab } from "@/components/community/MembersTab";
import { UpdatesTab } from "@/components/community/UpdatesTab";
import { RulesTab } from "@/components/community/RulesTab";
import { SettingsTab } from "@/components/community/SettingsTab";
import { SubscriptionTab } from "@/components/community/SubscriptionTab";
import { InsightsTab } from "@/components/community/InsightsTab";
import Header from "@/components/DashboardHeader";

>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
const ManageCommunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(mockCommunity);
<<<<<<< HEAD
  const [updateMessage, setUpdateMessage] = useState("");
  const [editingRules, setEditingRules] = useState(false);
  const [newRules, setNewRules] = useState(community.rules);

  const handleRemoveMember = (memberId: string, memberName: string) => {
    setCommunity(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== memberId)
    }));
    toast({
      title: "Member Removed",
      description: `${memberName} has been removed from the community.`,
    });
  };

  const handleAcceptRequest = (requestId: string, requestName: string) => {
    setCommunity(prev => ({
      ...prev,
      joinRequests: prev.joinRequests.filter(req => req.id !== requestId),
      members: [...prev.members, { 
        id: requestId, 
        name: requestName, 
        avatar: "/placeholder.svg", 
        role: "member" 
      }]
    }));
    toast({
      title: "Join Request Accepted",
      description: `${requestName} has been added to the community.`,
    });
  };

  const handleRejectRequest = (requestId: string, requestName: string) => {
    setCommunity(prev => ({
      ...prev,
      joinRequests: prev.joinRequests.filter(req => req.id !== requestId)
    }));
    toast({
      title: "Join Request Rejected",
      description: `${requestName}'s request has been rejected.`,
    });
  };

  const handlePostUpdate = () => {
    if (!updateMessage.trim()) return;
    
    toast({
      title: "Update Posted",
      description: "Community update has been sent to all members.",
    });
    setUpdateMessage("");
  };

  const handleSaveRules = () => {
    setCommunity(prev => ({ ...prev, rules: newRules }));
    setEditingRules(false);
    toast({
      title: "Rules Updated",
      description: "Community rules have been updated successfully.",
    });
  };
=======
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
<<<<<<< HEAD
            {/* <Button variant="outline" onClick={() => navigate("/communities")}>
              ← Back to Communities
            </Button> */}
=======
            <Button variant="outline" onClick={() => navigate("/communities")}>
              ← Back to Communities
            </Button>
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
            <h1 className="text-3xl font-bold">Manage {community.name}</h1>
          </div>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
<<<<<<< HEAD
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Requests</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            {/* Join Requests */}
            {community.joinRequests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Join Requests ({community.joinRequests.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {community.joinRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{request.name}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRejectRequest(request.id, request.name)}
                        >
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAcceptRequest(request.id, request.name)}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Community Members ({community.members.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {community.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium">{member.name}</span>
                          <div className="text-sm text-muted-foreground capitalize">{member.role}</div>
                        </div>
                      </div>
                      {member.role !== "admin" && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRemoveMember(member.id, member.name)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>Post Community Update</CardTitle>
                <CardDescription>Send an update to all community members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your community update here..."
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  rows={5}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handlePostUpdate} disabled={!updateMessage.trim()}>
                  <Bell className="h-4 w-4 mr-2" />
                  Send Update to All Members
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Community Rules</CardTitle>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingRules(!editingRules)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingRules ? "Cancel" : "Edit Rules"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {editingRules ? (
                  <div className="space-y-4">
                    <Textarea
                      value={newRules}
                      onChange={(e) => setNewRules(e.target.value)}
                      rows={8}
                      placeholder="Enter community rules..."
                    />
                    <Button onClick={handleSaveRules}>Save Rules</Button>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-sm">{community.rules}</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Community Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Community Name</label>
                  <Input defaultValue={community.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea defaultValue={community.description} rows={3} />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
=======
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
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

          <TabsContent value="subscription">
            <SubscriptionTab community={community} setCommunity={setCommunity} />
          </TabsContent>

          <TabsContent value="insights">
            <InsightsTab community={community} />
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

<<<<<<< HEAD
export default ManageCommunity;
=======
export default ManageCommunity;
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
