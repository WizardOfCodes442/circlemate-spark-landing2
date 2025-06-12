// src/components/CommunityProfile.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MapPin, Calendar, DollarSign } from "lucide-react";
import { Community, initialCommunities } from "@/data/communityData";
import { PricingModal } from "@/components/community/PricingModal";
import Header from "@/components/DashboardHeader";

// Mock updates data
const mockUpdates = [
  {
    id: "1",
    title: "Welcome New Members!",
    content: "We're excited to welcome our newest members to the community. Let's continue building amazing things together!",
    author: "John Doe",
    date: "2025-06-10",
    likes: 24,
  },
  {
    id: "2",
    title: "Weekly Discussion",
    content: "This week we'll be discussing the latest trends in the community. Join us for an engaging conversation!",
    author: "Jane Smith",
    date: "2025-06-08",
    likes: 18,
  },
  {
    id: "3",
    title: "Community Guidelines Update",
    content: "We've updated our community guidelines to ensure a better experience for everyone. Please take a moment to review them.",
    author: "John Doe",
    date: "2025-06-05",
    likes: 12,
  },
];

const CommunityProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // Find the community by ID
  const community = initialCommunities.find((c) => c.id === id);

  // Fallback if community is not found
  if (!community) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Button variant="outline" onClick={() => navigate("/discover")} className="mb-6">
            ← Back to Discover
          </Button>
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold text-navy">Community Not Found</h1>
              <p className="text-muted-foreground mt-2">The community you are looking for does not exist.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Add subscription details for paid communities
  const enhancedCommunity: Community & { isPaid: boolean; subscriptionAmount?: number; rules?: string } = {
    ...community,
    isPaid: community.subscriptionType === "Individual-Paid",
    subscriptionAmount: community.subscriptionType === "Individual-Paid" ? 29.99 : undefined,
    rules: "1. Be respectful to all members.\n2. No spam or self-promotion.\n3. Follow community guidelines.",
  };

  const handleJoinRequest = () => {
    if (enhancedCommunity.isPaid) {
      setShowPricingModal(true);
    } else {
      setIsMember(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsMember(true);
    setShowPricingModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate("/discover")} className="mb-6">
          ← Back to Discover
        </Button>

        {/* Community Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24 mx-auto md:mx-0">
                <AvatarImage src={community.image} alt={community.name} />
                <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{community.name}</h1>
                  <div className="flex gap-2 justify-center md:justify-start">
                    <Badge variant="secondary">{community.tags[0] || "Community"}</Badge>
                    {enhancedCommunity.isPaid && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <DollarSign className="h-3 w-3 mr-1" />
                        ${enhancedCommunity.subscriptionAmount}/month
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{community.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{community.tags.includes("Technology") ? "Lagos, Nigeria" : "Nigeria"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created Jun 2024</span>
                  </div>
                </div>
                {!isMember ? (
                  <Button onClick={handleJoinRequest} size="lg" className="text-white">
                    {enhancedCommunity.isPaid ? `Join for $${enhancedCommunity.subscriptionAmount}/month` : "Request to Join"}
                  </Button>
                ) : (
                  <Badge variant="default" className="text-white bg-green-600">
                    ✓ Member
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="updates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="updates">
            <div className="space-y-4">
              {mockUpdates.map((update) => (
                <Card key={update.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                      <span className="text-sm text-muted-foreground">{update.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{update.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">By {update.author}</span>
                      <span className="text-sm text-muted-foreground">{update.likes} likes</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Community Members ({community.memberCount})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {community.members.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{member.role || "member"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About {community.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{community.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Community Rules</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{enhancedCommunity.rules}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <PricingModal
          isOpen={showPricingModal}
          onClose={() => setShowPricingModal(false)}
          communityName={community.name}
          subscriptionAmount={enhancedCommunity.subscriptionAmount || 0}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </main>
    </div>
  );
};

export default CommunityProfile;
