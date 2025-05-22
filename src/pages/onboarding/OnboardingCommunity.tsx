
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const communities = [
  { id: 1, name: "Tech Enthusiasts", members: 5243, active: true },
  { id: 2, name: "Fitness & Wellness", members: 8712, active: false },
  { id: 3, name: "Book Lovers", members: 3819, active: false },
  { id: 4, name: "Photography Club", members: 4567, active: false },
  { id: 5, name: "Foodies Network", members: 9231, active: false },
  { id: 6, name: "Travel Adventurers", members: 6854, active: false },
];

const OnboardingCommunity = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState<number[]>([1]);
  
  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleCommunity = (id: number) => {
    setSelectedCommunities((prev) => {
      if (prev.includes(id)) {
        return prev.filter((communityId) => communityId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleNext = () => {
    navigate("/onboarding/profile");
  };
  
  return (
    <OnboardingLayout
      currentStep={0}
      totalSteps={7}
      nextAction={handleNext}
      nextDisabled={selectedCommunities.length === 0}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Find Your Community</h1>
        <p className="text-muted-foreground">
          Select the communities you're interested in to find like-minded people
        </p>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search communities..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommunities.map((community) => (
          <Card 
            key={community.id}
            className={`cursor-pointer border-2 transition-all ${
              selectedCommunities.includes(community.id) 
                ? "border-primary bg-primary/5" 
                : "hover:border-primary/20"
            }`}
            onClick={() => handleToggleCommunity(community.id)}
          >
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{community.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {community.members.toLocaleString()} members
                </p>
              </div>
              
              {selectedCommunities.includes(community.id) ? (
                <Button variant="default" size="icon" className="rounded-full">
                  <Check className="h-4 w-4" />
                </Button>
              ) : (
                <Badge variant="outline" className="bg-secondary">Select</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-center text-muted-foreground">
          Don't see your community? You can create or join more later.
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingCommunity;
