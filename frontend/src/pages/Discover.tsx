import { useEffect, useState } from "react";
import { Search, Users, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/DashboardHeader";
import { PricingModal } from "@/components/community/PricingModal";
import { Community } from "@/data/mockCommunityData";
import { Link, useNavigate } from "react-router-dom";


// Mock data for communities
const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Tech Enthusiasts",
    description: "A community for tech lovers to discuss the latest trends and innovations.",
    rules: "1. Be respectful\n2. No spam\n3. Stay on topic",
    category: "Technology",
    location: {
      city: "San Francisco",
      state: "California",
      country: "USA"
    },
    memberCount: 1243,
    image: "/group1.png",
    members: [
      { id: "m1", name: "John Doe", avatar: "/user1.png", role: "admin" },
      { id: "m2", name: "Jane Smith", avatar: "/user2.png", role: "member" },
      { id: "m3", name: "Alex Johnson", avatar: "/user1.png", role: "member" }
    ],
    joinRequests: [],
    isPaid: true,
    subscriptionAmount: 19.99
  },
  {
    id: "2",
    name: "Book Club",
    description: "Monthly discussions on bestsellers and classic users of CircleMate.",
    rules: "1. Be respectful\n2. No spoilers\n3. Participate in discussions",
    category: "Education",
    location: {
      city: "Boston",
      state: "Massachusetts",
      country: "USA"
    },
    memberCount: 89,
    image: "/group2.png",
    members: [
      { id: "m4", name: "Emma Wilson", avatar: "/user1.png", role: "admin" },
      { id: "m5", name: "Michael Brown", avatar: "/user2.png", role: "member" }
    ],
    joinRequests: [],
    isPaid: true,
    subscriptionAmount: 500
  },
  {
    id: "3",
    name: "Fitness Fanatics",
    description: "Share workout routines, nutrition tips, and fitness goals on CircleMate.",
    rules: "1. Be supportive\n2. Share your progress\n3. No harmful advice",
    category: "Health",
    location: {
      city: "Toronto",
      state: "Ontario",
      country: "Canada"
    },
    memberCount: 567,
    image: "/group3.png",
    members: [
      { id: "m6", name: "David Clark", avatar: "/user1.png", role: "admin" },
      { id: "m7", name: "Sarah Miller", avatar: "/user2.png", role: "member" },
      { id: "m8", name: "Robert Johnson", avatar: "/user1.png", role: "member" }
    ],
    joinRequests: [],
    isPaid: true,
    subscriptionAmount: 14.99
  }
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(mockCommunities);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const navigate = useNavigate();


  // Handle search
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredCommunities(communities);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    
    const filtered = communities.filter(community => {
      switch (searchBy) {
        case "name":
          return community.name.toLowerCase().includes(lowerCaseSearch);
        case "state":
          return community.location?.state.toLowerCase().includes(lowerCaseSearch) || false;
        case "city":
          return community.location?.city.toLowerCase().includes(lowerCaseSearch) || false;
        case "country":
          return community.location?.country.toLowerCase().includes(lowerCaseSearch) || false;
        case "category":
          return community.category?.toLowerCase().includes(lowerCaseSearch) || false;
        default:
          return true;
      }
    });

    setFilteredCommunities(filtered);
  };

  // Handle join request
  const handleJoinRequest = (community: Community) => {
    if (community.isPaid && community.subscriptionAmount && community.subscriptionAmount > 0) {
      setSelectedCommunity(community);
      setShowPricingModal(true);
    } else {
      toast({
        title: "Join Request Sent",
        description: `Your request to join ${community.name} has been sent to the community admin.`,
      });
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedCommunity) {
      toast({
        title: "Successfully Joined",
        description: `Welcome to ${selectedCommunity.name}!`,
      });
    }
  };


const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (onboardingCompleted !== "true") {
      setShowOnboardingModal(true);
    }
  }, []);

  const handleGoToOnboarding = () => {
    setShowOnboardingModal(false);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Discover Communities</h1>
        
        {/* Search Section */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-[1fr_200px_auto] gap-4 items-end">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Select value={searchBy} onValueChange={setSearchBy}>
              <SelectTrigger>
                <SelectValue placeholder="Search by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCommunities.length > 0 ? (
            filteredCommunities.map((community) => (
              
                  <Card key={community.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/20 to-primary-dark/5 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-10 w-10">
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
                      </div>
                    </div>
                    {community.category && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {community.category}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <Link to="/community-profile">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                  
                  {community.isPaid && community.subscriptionAmount && community.subscriptionAmount > 0 && (
                    <div className="flex items-center text-sm text-green-600 mb-2">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>${community.subscriptionAmount}/month</span>
                    </div>
                  )}
                  
                  {community.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{`${community.location.city}, ${community.location.state}, ${community.location.country}`}</span>
                    </div>
                  )}
                </CardContent>
                </Link>
                
                <CardFooter className="flex justify-between items-center border-t bg-muted/20 pt-3">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{community.memberCount} members</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleJoinRequest(community)}
                    className="text-white"
                  >
                    {community.isPaid && community.subscriptionAmount && community.subscriptionAmount > 0 
                      ? `Join $${community.subscriptionAmount}` 
                      : "Request to Join"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <div className="text-muted-foreground mb-2">No communities found matching your search criteria.</div>
              <Button onClick={() => setFilteredCommunities(communities)}>View All Communities</Button>
            </div>
          )}
        </div>

        {selectedCommunity && (
          <PricingModal
            isOpen={showPricingModal}
            onClose={() => setShowPricingModal(false)}
            communityName={selectedCommunity.name}
            subscriptionAmount={selectedCommunity.subscriptionAmount || 0}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </main>
      <Dialog
  open={showOnboardingModal}
  onOpenChange={(open) => {
    // Only allow closing if explicitly called via setShowOnboardingModal(false)
    // Prevent close if user tries to click outside or press ESC
    if (!open) {
      // Do nothing here to block closing
      // or just keep open true:
      setShowOnboardingModal(true);
    }
  }}
>
  <DialogContent className="max-w-md rounded-lg p-6 bg-white shadow-lg">
    <DialogHeader>
      <DialogTitle>Complete Your Onboarding</DialogTitle>
    </DialogHeader>
    <div className="py-4 text-center text-gray-700">
      You have not set up your onboarding yet. Please complete it to proceed.
    </div>
    <DialogFooter className="flex justify-end">
      <Button className="text-white" onClick={handleGoToOnboarding}>Go to Onboarding</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default Discover;
