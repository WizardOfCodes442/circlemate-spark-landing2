import { useState, useEffect, useCallback } from "react";
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
  const [skipReason, setSkipReason] = useState("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<any>(null);

  // Fallback data from provided API response
  const fallbackCommunities: Community[] = [
    {
      id: "6846ae0ce3a92502d47879df",
      name: "Lagos Tech Circle",
      members: 1,
      active: false,
    },
    {
      id: "6846ae0ce3a92502d47879e1",
      name: "Remote Workers Hub",
      members: 1,
      active: false,
    },
    {
      id: "6846ae0ce3a92502d47879e0",
      name: "Abuja Creatives",
      members: 0,
      active: false,
    },
    {
      id: "6846ae0ce3a92502d47879e2",
      name: "Women in Business",
      members: 0,
      active: false,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
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

        // Extract and normalize communities
        const data = communitiesData?.data?.communities || [];
        if (!Array.isArray(data)) {
          throw new Error("Invalid communities data format");
        }

        const normalizedCommunities = data.map((item: any) => ({
          id: item._id || item.id || `fallback-${Math.random()}`,
          name: item.name || item.communityName || "Unknown Community",
          members: item.memberCount || item["member Count"] || item.members || 0,
          active: item.active || false,
        }));
        console.log("Normalized communities:", normalizedCommunities);
        setCommunities(normalizedCommunities.length > 0 ? normalizedCommunities : fallbackCommunities);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load communities due to server issue (possibly CORS). Using fallback data.");
        setCommunities(fallbackCommunities);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectCommunity = useCallback((id: string) => {
    setSelectedCommunityId(id);
    setInviteCode("");
    setError(null);
  }, []);

  const handleNext = useCallback(() => {
    if (isFetching || isSubmitting) return;

    setIsSubmitting(true);
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
        setIsSubmitting(false);
      }
    };

    submitCommunity();
  }, [inviteCode, selectedCommunityId, isFetching, isSubmitting, navigate]);

  const handleSkip = useCallback(() => {
    if (isFetching || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const skipCommunity = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in again.");
        }

        const payload = { reason: skipReason || "No reason provided" };

        const response = await fetch(
          "https://circlemate-spark-landing-jet.vercel.app/api/v1/onboarding/skip",
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
          throw new Error(`Skip error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Skip response:", responseData);
        navigate("/onboarding/profile");
      } catch (err: any) {
        setError(err.message || "Failed to skip community selection. Please try again.");
        console.error("Skip error:", err);
      } finally {
        setIsSubmitting(false);
      }
    };

    skipCommunity();
  }, [skipReason, isFetching, isSubmitting, navigate]);

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <OnboardingLayout
      currentStep={progress?.completed || 0}
      totalSteps={progress?.total || 7}
      nextAction={handleNext}
      nextDisabled={(!selectedCommunityId && !inviteCode.trim()) || isFetching || isSubmitting}
      nextLabel={isSubmitting ? "Submitting..." : "Next"}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Find Your Community</h1>
          <p className="text-muted-foreground">
            Select a community to join or enter an invite code
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isFetching && (
          <Alert className="mb-6">
            <AlertDescription>Loading communities...</AlertDescription>
          </Alert>
        )}

        {!isFetching && filteredCommunities.length === 0 && (
          <Alert className="mb-6">
            <AlertDescription>No communities found matching your search.</AlertDescription>
          </Alert>
        )}

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            className="pl-10 py-6 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isFetching || isSubmitting}
          />
        </div>

        {!isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {filteredCommunities.map((community, index) => (
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
                    <h3 className="font-medium">
                      {index + 1}. {community.name}
                    </h3>
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
        )}

        <div className="mb-6">
          <p className="text-sm text-center text-muted-foreground mb-2">
            Or join using an invite code
          </p>
          <Input
            className="py-6 rounded-md"
            placeholder="Enter group invite code"
            value={inviteCode}
            onChange={(e) => {
              setInviteCode(e.target.value);
              setSelectedCommunityId(null);
              setError(null);
            }}
            disabled={isFetching || isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Input
            className="w-40 py-2 text-sm rounded-md"
            placeholder="Reason for skipping"
            value={skipReason}
            onChange={(e) => setSkipReason(e.target.value)}
            disabled={isFetching || isSubmitting}
          />
          <Button
            variant="outline"
            size="default"
            onClick={handleSkip}
            disabled={isFetching || isSubmitting}
          >
            Skip
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingCommunity;
