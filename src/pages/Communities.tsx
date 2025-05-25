import { useState } from "react";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
import { Users, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
<<<<<<< HEAD
import DashboardHeader from "@/components/DashboardHeader";
import { Link, Navigate } from "react-router-dom";
=======
import Header from "@/components/DashboardHeader";
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4

// Mock data for user communities
const mockUserCommunities = [
  {
    id: "1",
    name: "Tech Enthusiasts",
    code: "TECH01",
    category: "Technology",
    description: "A community for tech lovers to discuss the latest trends and innovations.",
    location: {
      city: "San Francisco",
      state: "California",
      country: "USA"
    },
    memberCount: 1243,
<<<<<<< HEAD
    image: "/group1.png",
    isAdmin: true,
    members: [
      { id: "m1", name: "John Doe", avatar: "/user1.png" },
      { id: "m2", name: "Jane Smith", avatar: "/user2.png" }
    ],
    joinRequests: [
      { id: "r1", name: "Alice Cooper", avatar: "/user1.png" },
      { id: "r2", name: "Bob Dylan", avatar: "/user1.png" }
=======
    image: "/placeholder.svg",
    isAdmin: true,
    members: [
      { id: "m1", name: "John Doe", avatar: "/placeholder.svg" },
      { id: "m2", name: "Jane Smith", avatar: "/placeholder.svg" }
    ],
    joinRequests: [
      { id: "r1", name: "Alice Cooper", avatar: "/placeholder.svg" },
      { id: "r2", name: "Bob Dylan", avatar: "/placeholder.svg" }
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
    ]
  },
  {
    id: "2",
    name: "Book Club",
    code: "BOOK22",
    category: "Education",
    description: "Monthly discussions on bestsellers and classic literature.",
    location: {
      city: "Boston",
      state: "Massachusetts",
      country: "USA"
    },
    memberCount: 89,
<<<<<<< HEAD
    image: "/group4.png",
    isAdmin: false,
    members: [
      { id: "m4", name: "Emma Wilson", avatar: "/user1.png" },
      { id: "m5", name: "Michael Brown", avatar: "/user2.png" }
=======
    image: "/placeholder.svg",
    isAdmin: false,
    members: [
      { id: "m4", name: "Emma Wilson", avatar: "/placeholder.svg" },
      { id: "m5", name: "Michael Brown", avatar: "/placeholder.svg" }
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
    ],
    joinRequests: []
  }
];

const Communities = () => {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
  const [userCommunities] = useState(mockUserCommunities);
  const [activeTab, setActiveTab] = useState("joined");

  const adminCommunities = userCommunities.filter(community => community.isAdmin);
  const joinedCommunities = userCommunities.filter(community => !community.isAdmin);

  // Handle accepting join request
  const handleAcceptRequest = (communityId: string, requestId: string) => {
    // In a real app, this would send a request to the backend
    console.log(`Accept request ${requestId} for community ${communityId}`);
  };

  // Handle rejecting join request
  const handleRejectRequest = (communityId: string, requestId: string) => {
    // In a real app, this would send a request to the backend
    console.log(`Reject request ${requestId} for community ${communityId}`);
  };

  return (
    <div className="min-h-screen bg-background">
<<<<<<< HEAD
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Communities</h1>
          <Link to="/create-community">
          <Button className="text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
          </Link>
=======
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Communities</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
        </div>
        
        <Tabs defaultValue="joined" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="joined">Joined</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="joined" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCommunities.length > 0 ? (
                joinedCommunities.map((community) => (
                  <Card key={community.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-primary/20 to-primary-dark/5 pb-2">
                      <div className="flex items-center space-x-3">
<<<<<<< HEAD
                        <Avatar className="h-12 w-12 ">
=======
                        <Avatar className="h-12 w-12 border-2 border-white">
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
                          <AvatarImage src={community.image} alt={community.name} />
                          <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="link" className="p-0 font-semibold text-lg text-primary">
                                {community.name}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Members of {community.name}</DialogTitle>
                                <DialogDescription>
                                  {community.memberCount} total members
                                </DialogDescription>
                              </DialogHeader>
                              <div className="max-h-[300px] overflow-y-auto">
                                {community.members.map((member) => (
                                  <div key={member.id} className="flex items-center space-x-3 py-2 border-b last:border-0">
                                    <Avatar>
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full mr-2">
                              {community.category}
                            </span>
                            <span>Code: {community.code}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{`${community.location.city}, ${community.location.state}, ${community.location.country}`}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t bg-muted/20 pt-3">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{community.memberCount} members</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground mb-4">You haven't joined any communities yet.</p>
                  <Button onClick={() => window.location.href = "/discover"}>Discover Communities</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="admin" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminCommunities.length > 0 ? (
                adminCommunities.map((community) => (
                  <Card key={community.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-primary/20 to-primary-dark/5 pb-2">
                      <div className="flex items-center space-x-3">
<<<<<<< HEAD
                        <Avatar className="h-12 w-12">
=======
                        <Avatar className="h-12 w-12 border-2 border-white">
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
                          <AvatarImage src={community.image} alt={community.name} />
                          <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="link" className="p-0 font-semibold text-lg text-primary">
                                {community.name}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Members of {community.name}</DialogTitle>
                                <DialogDescription>
                                  {community.memberCount} total members
                                </DialogDescription>
                              </DialogHeader>
                              <div className="max-h-[300px] overflow-y-auto">
                                {community.members.map((member) => (
                                  <div key={member.id} className="flex items-center space-x-3 py-2 border-b last:border-0">
                                    <Avatar>
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full mr-2">
                              {community.category}
                            </span>
                            <span>Code: {community.code}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                      
                      {community.joinRequests && community.joinRequests.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-sm mb-2">Join Requests ({community.joinRequests.length})</h4>
                          <div className="space-y-3">
                            {community.joinRequests.map(request => (
                              <div key={request.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={request.avatar} />
                                    <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{request.name}</span>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleRejectRequest(community.id, request.id)}
                                  >
                                    Decline
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleAcceptRequest(community.id, request.id)}
                                  >
                                    Accept
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t bg-muted/20 pt-3">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{community.memberCount} members</span>
                      </div>
<<<<<<< HEAD
                      <Link to="/manage-community">
                      <Button size="sm" variant="outline">Manage</Button>
                      </Link>
=======
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/manage-community/${community.id}`)}
                      >
                        Manage
                      </Button>
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground mb-4">You're not an admin for any communities yet.</p>
                  <Button>Create a Community</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

<<<<<<< HEAD
export default Communities;
=======
export default Communities;
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
