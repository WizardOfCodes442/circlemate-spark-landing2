import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Check } from "lucide-react";
import { Input} from "@/components/ui/input"
import  { Button }  from "@/components/ui/button"
import  { Card,  CardContent } from "@/components/ui/card"
import {  Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCommunity = (id: number) => {
    setSelectedCommunityId(id);
    setInviteCode("");
    setError(null);
  };

  const handleNext = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Adjust the key if your token is stored under a different name

      const payload = inviteCode
        ? { inviteCode }
        : { communityId: selectedCommunityId };
      const response = await fetch("https://circlemate-spark-landing-jet.vercel.app/api/onboarding/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" , 
                  Authorization: `Bearer ${token}`,},
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit community selection");
      }

      const data = await response.json();
      console.log("Community submission response:", data);
      navigate("/onboarding/profile");
    } catch (err) {
      setError("Failed to submit community selection. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout
      currentStep={0}
      totalSteps={7}
      nextAction={handleNext}
      nextDisabled={(!selectedCommunityId && !inviteCode.trim()) || loading}
      nextLabel={loading ? "Submitting..." : "Next"}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Find Your Community</h1>
        <p className="text-muted-foreground">
          Select the community you want to join or enter an invite code
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
        <Input
          placeholder="Search communities..."
          className="pl-10 py-6"
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
                  <Check className="h-4 w-4 text-white" />
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
          className="py-6"
          placeholder="Enter group invite code"
          value={inviteCode}
          onChange={(e) => {
            setInviteCode(e.target.value);
            setSelectedCommunityId(null);
            setError(null);
          }}
        />
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingCommunity;
