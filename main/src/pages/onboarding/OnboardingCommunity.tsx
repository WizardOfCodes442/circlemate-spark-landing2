import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

interface Community {
  id: string;
  name: string;
  members: number;
  active: boolean;
}

const OnboardingCommunity = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<any>(null);

  // Fallback mock data
  const fallbackCommunities: Community[] = [
    { id: "1", name: "Tech Enthusiasts", members: 5243, active: true },
    { id: "2", name: "Fitness & Wellness", members: 8712, active: false },
    { id: "3", name: "Book Lovers", members: 3819, active: false },
    { id: "4", name: "Photography Club", members: 4567, active: false },
    { id: "5", name: "Foodies Network", members: 9231, active: false },
    { id: "6", name: "Travel Adventurers", members: 6854, active: false },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in again.");
        }

        // Fetch onboarding progress
        const progressResponse = await fetch(
          "https://circlemate-spark-landing-jet.vercel.app/api/v1/onboarding/progress",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!progressResponse.ok) {
          throw new Error(`Progress API error: ${progressResponse.status} ${progressResponse.statusText}`);
        }
        const progressData = await progressResponse.json();
        console.log("Progress response:", progressData);
        setProgress(progressData.data || { completed: 0, total: 7 });

        // Fetch communities
        const communitiesResponse = await fetch(
          "https://circlemate-spark-landing-jet.vercel.app/api/v1/onboarding/communities",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!communitiesResponse.ok) {
          throw new Error(`Communities API error: ${communitiesResponse.status} ${communitiesResponse.statusText}`);
        }
        const communitiesData = await communitiesResponse.json();
        console.log("Communities response:", communitiesData);

        // Normalize community data
        const data = Array.isArray(communitiesData) ? communitiesData : communitiesData.data || [];
        if (!Array.isArray(data)) {
          throw new Error("Invalid communities data format");
        }

        const normalizedCommunities = data.map((item: any) => ({
          id: item.id || item._id || `fallback-${Math.random()}`,
          name: item.name || item.communityName || "Unknown Community",
          members: item.memberCount || item["member Count"] || item.members || 0,
          active: item.active || false,
        }));
        console.log("Normalized communities:", normalizedCommunities);
        setCommunities(normalizedCommunities);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load communities. Using fallback data.");
        setCommunities(fallbackCommunities);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCommunity = (id: string) => {
    setSelectedCommunityId(id);
    setInviteCode("");
    setError(null);
  };

  const handleNext = () => {
    setLoading(true);
    setError(null);

    const submitCommunity = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in again.");
        }

        const payload = inviteCode
          ? { inviteCode }
          : { communityId: selectedCommunityId };

        const response = await fetch(
          "https://circlemate-spark-landing-jet.vercel.app/api/v1/onboarding/community",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(`Community submission error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Community submission response:", responseData);
        navigate("/onboarding/profile");
      } catch (err: any) {
        setError(err.message || "Failed to submit community selection. Please try again.");
        console.error("Submission error:", err);
      } finally {
        setLoading(false);
      }
    };

    submitCommunity();
  };

  const handleSkip = () => {
    setLoading(true);
    setError(null);

    const skipCommunity = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in again.");
        }

        const response = await fetch(
          "https://circlemate-spark-landing-jet.vercel.app/api/v1/onboarding/skip",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reason: "Skipped community selection" }),
          }
        );

        if (!response.ok) {
          throw new Error(`Skip error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Skip response:", responseData);
        navigate("/onboarding/profile");
      } catch (err: any) {
        setError(err.message || "Failed to skip community selection. Please try again.");
        console.error("Skip error:", err);
      } finally {
        setLoading(false);
      }
    };

    skipCommunity();
  };

  return (
    <OnboardingLayout
      currentStep={progress?.completed || 0}
      totalSteps={progress?.total || 7}
      nextAction={handleNext} // Pass as function reference, not invoked
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

      {loading && (
        <Alert className="mb-6">
          <AlertDescription>Loading communities...</AlertDescription>
        </Alert>
      )}

      {!loading && filteredCommunities.length === 0 && (
        <Alert className="mb-6">
          <AlertDescription>No communities found matching your search.</AlertDescription>
        </Alert>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
        <Input
          placeholder="Search communities..."
          className="pl-10 py-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
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
          disabled={loading}
        />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          variant="outline"
          size="default"
          onClick={handleSkip}
          disabled={loading}
        >
          Skip
        </Button>
        <Button
          variant="default"
          size="default"
          onClick={handleNext}
          disabled={(!selectedCommunityId && !inviteCode.trim()) || loading}
        >
          {loading ? "Submitting..." : "Next"}
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingCommunity;
