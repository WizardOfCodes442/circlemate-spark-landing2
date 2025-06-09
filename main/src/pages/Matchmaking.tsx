import { useState } from "react";
import { Heart, Users, MapPin, Zap, RefreshCw, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import TechCircleHeader from "@/components/ui/TechCircleHeader";
import StatsSection from "@/components/ui/StatsSection";
import RecentActivities from "@/components/ui/RecentActivities";
import ProfileView from "@/components/ProfileView";
import ConnectView from "@/components/ConnectView";
import { mockActivities } from "@/data/mockDashboardData";

// Mock user data
const currentUser = {
  interests: ["Technology", "Coffee", "Reading", "Travel", "Photography"],
  communities: ["Tech Enthusiasts", "Coffee Lovers", "Book Club"],
  location: "San Francisco, CA",
};

// Mock potential matches
const mockMatches = [
  {
    id: "1",
    name: "Sarah Wilson",
    avatar: "/user1.png",
    location: "San Francisco, CA",
    interests: ["Technology", "Photography", "Travel", "Music", "Art"],
    communities: ["Tech Enthusiasts", "Photography Club"],
    compatibility: 85,
    sharedInterests: ["Technology", "Photography", "Travel"],
    sharedCommunities: ["Tech Enthusiasts"],
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/user1.png",
    location: "San Jose, CA",
    interests: ["Coffee", "Reading", "Technology", "Gaming"],
    communities: ["Coffee Lovers", "Book Club", "Gaming Community"],
    compatibility: 78,
    sharedInterests: ["Coffee", "Reading", "Technology"],
    sharedCommunities: ["Coffee Lovers", "Book Club"],
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    avatar: "/user1.png",
    location: "Oakland, CA",
    interests: ["Reading", "Travel", "Cooking", "Yoga"],
    communities: ["Book Club", "Travel Enthusiasts"],
    compatibility: 65,
    sharedInterests: ["Reading", "Travel"],
    sharedCommunities: ["Book Club"],
  },
];

const Matchmaking = () => {
  const [matches, setMatches] = useState(mockMatches);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [connectMatch, setConnectMatch] = useState(null);

  // Jaccard similarity calculation
  const calculateJaccardSimilarity = (set1: string[], set2: string[]) => {
    const intersection = set1.filter((item) => set2.includes(item));
    const union = [...new Set([...set1, ...set2])];
    return union.length > 0 ? (intersection.length / union.length) * 100 : 0;
  };

  const recalculateMatches = () => {
    setIsCalculating(true);

    // Simulate AI calculation
    setTimeout(() => {
      const updatedMatches = matches.map((match) => {
        const interestSimilarity = calculateJaccardSimilarity(
          currentUser.interests,
          match.interests
        );
        const communitySimilarity = calculateJaccardSimilarity(
          currentUser.communities,
          match.communities
        );

        // Weighted average (70% interests, 30% communities)
        const newCompatibility = Math.round(
          interestSimilarity * 0.7 + communitySimilarity * 0.3
        );

        return { ...match, compatibility: newCompatibility };
      });

      // Sort by compatibility
      setMatches(updatedMatches.sort((a, b) => b.compatibility - a.compatibility));
      setIsCalculating(false);

      toast({
        title: "Matches Updated",
        description: "AI has recalculated your compatibility scores using Jaccard similarity.",
      });
    }, 2000);
  };

  const connectWithUser = (userId: string, userName: string) => {
    toast({
      title: "Connection Request Sent",
      description: `Your connection request has been sent to ${userName}.`,
    });
    const match = matches.find((m) => m.id === userId);
    setConnectMatch(match);
  };

  const viewProfile = (userId: string) => {
    const match = matches.find((m) => m.id === userId);
    setSelectedMatch(match);
  };

  const goBack = () => {
    setSelectedMatch(null);
    setConnectMatch(null);
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getCompatibilityBadge = (score: number) => {
    if (score >= 80) return "High Match";
    if (score >= 60) return "Good Match";
    return "Low Match";
  };

  if (selectedMatch) {
    return <ProfileView match={selectedMatch} onBack={goBack} />;
  }

  if (connectMatch) {
    return <ConnectView match={connectMatch} onCancel={goBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full">
        <Header />
      </div>
      <main className="container mx-auto px-4 py-8 flex-grow w-full">
        <TechCircleHeader />
        <Card className="mb-8 w-full">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Communities</h4>
                <div className="flex flex-wrap gap-2">
                  {currentUser.communities.map((community, index) => (
                    <Badge key={index} variant="outline">
                      {community}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <StatsSection />
        <div className="max-w-7xl mx-auto">
          {/* Algorithm Explanation and Smart Matchmaking */}
          <Card className="mb-8 w-full">
            <CardHeader>
              <div className="flex items-center space-x-3 pb-4">
                <Heart className="h-8 w-8 text-teal-500" />
                <div>
                  <h1 className="text-3xl font-bold">Smart Matchmaking</h1>
                  <p className="text-gray-600">
                    AI-powered compatibility using Jaccard similarity algorithm
                  </p>
                </div>
              </div>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our AI uses the Jaccard similarity algorithm to calculate compatibility
                between users. It analyzes shared interests (70% weight) and common
                communities (30% weight) to determine your compatibility score with
                other users.
              </p>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end text-white space-x-4 mb-8">
            <Button
              onClick={recalculateMatches}
              disabled={isCalculating}
              className="bg-teal-500 text-white rounded-full"
            >
              {isCalculating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Zap className="h-4 w-4 mr-2" />
              )}
              {isCalculating ? "Calculating..." : "Find New Matches"}
            </Button>
          </div>

          {/* Matches and Recent Activities Side by Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 w-full px-4">
            {/* Recent Matches */}
            <div className="lg:col-span-5">
              <Card className="bg-white rounded-lg shadow-sm p-6 mb-8 w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Recent Matches</h2>
                  <Button variant="link" className="text-teal-500">
                    View All <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {matches.map((match) => (
                    <Card key={match.id} className="overflow-hidden w-full">
                      <CardHeader className="bg-gradient-to-r from-teal-100 to-teal-50">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16 border-2 border-white">
                            <AvatarImage src={match.avatar} alt={match.name} />
                            <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{match.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {match.location}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-4">
                        {/* Compatibility Score */}
                        <div className="text-center">
                          <div
                            className={`text-3xl font-bold ${getCompatibilityColor(
                              match.compatibility
                            )}`}
                          >
                            {match.compatibility}%
                          </div>
                          <Badge
                            className="text-white"
                            variant={
                              match.compatibility >= 80
                                ? "default"
                                : match.compatibility >= 60
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {getCompatibilityBadge(match.compatibility)}
                          </Badge>
                          <Progress value={match.compatibility} className="mt-2" />
                        </div>

                        {/* Shared Interests */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Shared Interests</h4>
                          <div className="flex flex-wrap gap-1">
                            {match.sharedInterests.map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Shared Communities */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Shared Communities</h4>
                          <div className="flex flex-wrap gap-1">
                            {match.sharedCommunities.map((community, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                {community}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-teal-500 text-white rounded-full"
                          onClick={() => connectWithUser(match.id, match.name)}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                        <Button
                          className="w-full bg-gray-200 text-gray-600 rounded-full"
                          onClick={() => viewProfile(match.id)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Card>

              {matches.length === 0 && (
                <Card className="w-full">
                  <CardContent className="pt-8 text-center">
                    <Heart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No matches found. Try updating your profile or interests.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <RecentActivities
                activities={mockActivities.slice(0, 4)}
                onViewAll={() => {}}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matchmaking;