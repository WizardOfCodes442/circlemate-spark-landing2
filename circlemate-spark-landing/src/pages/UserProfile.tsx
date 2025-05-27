import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, MapPin, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/DashboardHeader";

// Mock user data
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/user1.png",
  bio: "Tech enthusiast and coffee lover. Always learning something new!",
  location: "San Francisco, CA",
  joinedDate: "2024-01-15",
  interests: ["Technology", "Coffee", "Reading", "Travel"],
  communities: [
    { id: "1", name: "Tech Enthusiasts", role: "Admin" },
    { id: "2", name: "Book Club", role: "Member" },
    { id: "3", name: "Coffee Lovers", role: "Member" }
  ],
  stats: {
    communitiesJoined: 3,
    eventsAttended: 12,
    connectionsMore: 45
  }
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [user] = useState(mockUser);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{user.name}</h1>
                      <p className="text-muted-foreground">{user.email}</p>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {user.location}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined {formatDate(user.joinedDate)}
                      </div>
                    </div>
                    
                    <Button className="text-white" onClick={() => navigate("/edit-profile")}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  <p className="mt-4 text-muted-foreground">{user.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-primary">{user.stats.communitiesJoined}</div>
                <div className="text-sm text-muted-foreground">Communities Joined</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-primary">{user.stats.eventsAttended}</div>
                <div className="text-sm text-muted-foreground">Events Attended</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-primary">{user.stats.connectionsMore}</div>
                <div className="text-sm text-muted-foreground">Connections Made</div>
              </CardContent>
            </Card>
          </div>

          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">{interest}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communities */}
          <Card>
            <CardHeader>
              <CardTitle>My Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.communities.map((community) => (
                  <div key={community.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{community.name}</span>
                    </div>
                    <Badge variant={community.role === "Admin" ? "default" : "secondary"}>
                      {community.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
