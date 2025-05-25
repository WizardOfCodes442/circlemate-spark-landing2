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
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(1);
  const [inviteCode, setInviteCode] = useState("");

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCommunity = (id: number) => {
    setSelectedCommunityId(id);
    setInviteCode(""); // Clear invite code if user selects from list
  };

  const handleNext = () => {
    // You can handle joining with inviteCode if filled
    if (inviteCode) {
      console.log("Joining via invite code:", inviteCode);
    } else {
      console.log("Joining community ID:", selectedCommunityId);
    }
    navigate("/onboarding/profile");
  };

  return (
    <OnboardingLayout
      currentStep={0}
      totalSteps={7}
      nextAction={handleNext}
      nextDisabled={!selectedCommunityId && inviteCode.trim() === ""}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Find Your Community</h1>
        <p className="text-muted-foreground">
          Select the community you want to join or enter an invite code
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
              selectedCommunityId === community.id
                ? "border-primary bg-[#22CCBE]/5"
                : "hover:border-primary/20"
            }`}
            onClick={() => handleSelectCommunity(community.id)}
          >
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{community.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {community.members.toLocaleString()} members
                </p>
              </div>

              {selectedCommunityId === community.id ? (
                <Button variant="default" size="icon" className="rounded-full">
                  <Check className="h-4 w-4" />
                </Button>
              ) : (
                <Badge variant="outline" className="bg-secondary text-white">Select</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-sm text-center text-muted-foreground mb-2">
          Or join using an invite code
        </p>
        <Input
          placeholder="Enter group invite code"
          value={inviteCode}
          onChange={(e) => {
            setInviteCode(e.target.value);
            setSelectedCommunityId(null); // Clear selection if entering invite code
          }}
        />
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingCommunity;
