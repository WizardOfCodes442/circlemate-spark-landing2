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

// Updated mock matches with complete data
const mockMatches = [
  {
    id: "m1",
    name: "David Brown",
    role: "Romance",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio at magna tincidunt congue eu vel nisi.",
    zodiac: "Sagittarius",
    education: "High School",
    familyPlans: "Not sure",
    personalityType: "ENTJ",
    lifestyle: {
      pets: "Don't have, but love",
      drinking: "On special occasions",
      smoking: "Non-smoker",
      workout: "Sometimes",
      dietaryPreference: "Other",
      socialMedia: "Socially active",
      sleepingHabits: "Night owl",
    },
    interests: ["Technology", "Photography", "Travel"],
    lookingFor: "Short-term fun",
    essentials: {
      distance: "8 miles away",
      employment: "Employed",
      education: "Polytechnic Ibadan",
      location: "San Francisco, CA",
      languages: "Hausa, Pidgin",
    },
    communities: ["Tech Enthusiasts", "Photography Club"],
    compatibility: 85,
    sharedInterests: ["Technology", "Photography", "Travel"],
    sharedCommunities: ["Tech Enthusiasts"],
  },
  {
    id: "2",
    name: "Sarah Wilson",
    role: "Friendship",
    image: "/user1.png",
    about: "Passionate about tech and art, always looking for new experiences.",
    zodiac: "Libra",
    education: "Bachelor's Degree",
    familyPlans: "Wants kids",
    personalityType: "ENFP",
    lifestyle: {
      pets: "Has a dog",
      drinking: "Socially",
      smoking: "Non-smoker",
      workout: "Regularly",
      dietaryPreference: "Vegetarian",
      socialMedia: "Moderately active",
      sleepingHabits: "Early bird",
    },
    interests: ["Technology", "Photography", "Travel", "Music", "Art"],
    lookingFor: "Long-term connection",
    essentials: {
      distance: "5 miles away",
      employment: "Self-employed",
      education: "Stanford University",
      location: "San Francisco, CA",
      languages: "English, Spanish",
    },
    communities: ["Tech Enthusiasts", "Photography Club"],
    compatibility: 85,
    sharedInterests: ["Technology", "Photography", "Travel"],
    sharedCommunities: ["Tech Enthusiasts"],
  },
  {
    id: "3",
    name: "Mike Chen",
    role: "Professional",
    image: "/user2.png",
    about: "Tech enthusiast and avid reader, always up for a good coffee chat.",
    zodiac: "Virgo",
    education: "Master's Degree",
    familyPlans: "No kids",
    personalityType: "INTJ",
    lifestyle: {
      pets: "No pets",
      drinking: "Never",
      smoking: "Non-smoker",
      workout: "Occasionally",
      dietaryPreference: "No restrictions",
      socialMedia: "Rarely active",
      sleepingHabits: "Regular",
    },
    interests: ["Coffee", "Reading", "Technology", "Gaming"],
    lookingFor: "Networking",
    essentials: {
      distance: "10 miles away",
      employment: "Tech Industry",
      education: "UC Berkeley",
      location: "San Jose, CA",
      languages: "English, Mandarin",
    },
    communities: ["Coffee Lovers", "Book Club", "Gaming Community"],
    compatibility: 78,
    sharedInterests: ["Coffee", "Reading", "Technology"],
    sharedCommunities: ["Coffee Lovers", "Book Club"],
  },
];

// Mock user data
const currentUser = {
  interests: ["Technology", "Coffee", "Reading", "Travel", "Photography"],
  communities: ["Tech Enthusiasts", "Coffee Lovers", "Book Club"],
  location: "San Francisco, CA",
};

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

        const newCompatibility = Math.round(
          interestSimilarity * 0.7 + communitySimilarity * 0.3
        );

        return { ...match, compatibility: newCompatibility };
      });

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
      <main className="container mx-auto px-4 py-8 flex-grow w-full max-w-[1400px]">
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

        <StatsSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" />
        
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
        <div className="lg:col-span-4">
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
                        <AvatarImage src={match.image} alt={match.name} />
                        <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{match.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {match.essentials.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold ${getCompatibilityColor(
                          match.compatibility
                        )}`}
                      >
                        {match.compatibility}%
                      </div>
                      <Badge
                        className={
                          match.compatibility >= 80
                            ? "bg-green-600 text-white"
                            : match.compatibility >= 50
                            ? "bg-yellow-400 text-gray-800"
                            : "bg-red-500 text-white"
                        }
                        variant={
                          match.compatibility >= 80
                            ? "default"
                            : match.compatibility >= 50
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {getCompatibilityBadge(match.compatibility)}
                      </Badge>
                      <Progress value={match.compatibility} className="mt-2" />
                    </div>

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

          <div className="lg:col-span-1">
            <RecentActivities
              activities={mockActivities.slice(0, 4)}
              onViewAll={() => {}}
              className="w-full"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matchmaking;