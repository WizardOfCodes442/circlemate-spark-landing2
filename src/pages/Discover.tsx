
import { useState } from "react";
import { Search, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/DashboardHeader";

// Mock data for communities
const mockCommunities = [
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
    image: "/placeholder.svg",
    members: [
      { id: "m1", name: "John Doe", avatar: "/placeholder.svg" },
      { id: "m2", name: "Jane Smith", avatar: "/placeholder.svg" },
      { id: "m3", name: "Alex Johnson", avatar: "/placeholder.svg" }
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
    image: "/placeholder.svg",
    members: [
      { id: "m4", name: "Emma Wilson", avatar: "/placeholder.svg" },
      { id: "m5", name: "Michael Brown", avatar: "/placeholder.svg" }
    ]
  },
  {
    id: "3",
    name: "Fitness Fanatics",
    code: "FIT123",
    category: "Health",
    description: "Share workout routines, nutrition tips, and fitness goals.",
    location: {
      city: "Toronto",
      state: "Ontario",
      country: "Canada"
    },
    memberCount: 567,
    image: "/placeholder.svg",
    members: [
      { id: "m6", name: "David Clark", avatar: "/placeholder.svg" },
      { id: "m7", name: "Sarah Miller", avatar: "/placeholder.svg" },
      { id: "m8", name: "Robert Johnson", avatar: "/placeholder.svg" }
    ]
  }
];

// Types
type Community = {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  memberCount: number;
  image: string;
  members: {
    id: string;
    name: string;
    avatar: string;
  }[];
};

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(mockCommunities);

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
        case "code":
          return community.code.toLowerCase().includes(lowerCaseSearch);
        case "state":
          return community.location.state.toLowerCase().includes(lowerCaseSearch);
        case "city":
          return community.location.city.toLowerCase().includes(lowerCaseSearch);
        case "country":
          return community.location.country.toLowerCase().includes(lowerCaseSearch);
        case "category":
          return community.category.toLowerCase().includes(lowerCaseSearch);
        default:
          return true;
      }
    });

    setFilteredCommunities(filtered);
  };

  // Handle join request
  const handleJoinRequest = (communityId: string, communityName: string) => {
    // In a real app, this would send a request to the backend
    toast({
      title: "Join Request Sent",
      description: `Your request to join ${communityName} has been sent to the community admin.`,
    });
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
                <SelectItem value="code">Code</SelectItem>
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
                      <Avatar className="h-10 w-10 border-2 border-white">
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
                        <div className="text-xs text-muted-foreground">Code: {community.code}</div>
                      </div>
                    </div>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {community.category}
                    </span>
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
                  <Button 
                    size="sm" 
                    onClick={() => handleJoinRequest(community.id, community.name)}
                  >
                    Request to Join
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
      </main>
    </div>
  );
};

export default Discover;
