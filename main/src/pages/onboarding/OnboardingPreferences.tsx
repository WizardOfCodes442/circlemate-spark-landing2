import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

type ConnectionPurpose = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type InterestCategory = {
  id: string;
  name: string;
  interests: string[];
};

type PreferredAge = {
  min: number | "";
  max: number | "";
};

const connectionPurposes: ConnectionPurpose[] = [
  {
    id: "friendship",
    title: "Friendship",
    description: "Find like-minded people to hang out with",
    icon: "👋",
  },
  {
    id: "dating",
    title: "Dating",
    description: "Meet potential romantic partners",
    icon: "❤️",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Expand your professional connections",
    icon: "💼",
  },
  {
    id: "activities",
    title: "Activity Partners",
    description: "Find people to join you in activities",
    icon: "🏄‍♂️",
  },
];

const interestCategories: InterestCategory[] = [
  {
    id: "outdoors",
    name: "Outdoors & Adventure",
    interests: ["Hiking", "Camping", "Kayaking", "Rock Climbing", "Cycling", "Fishing"],
  },
  {
    id: "arts",
    name: "Arts & Culture",
    interests: ["Museums", "Theater", "Live Music", "Photography", "Painting", "Sculpture"],
  },
  {
    id: "food",
    name: "Food & Drink",
    interests: ["Cooking", "Wine Tasting", "Restaurants", "Coffee", "Baking", "Food Tours"],
  },
  {
    id: "tech",
    name: "Technology",
    interests: ["Programming", "Startups", "AI", "Gaming", "Blockchain", "Robotics"],
  },
  {
    id: "wellness",
    name: "Health & Wellness",
    interests: ["Yoga", "Meditation", "Running", "Fitness", "Nutrition", "Mental Health"],
  },
];

const OnboardingPreferences = () => {
  const navigate = useNavigate();
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("purpose");

  const [preferredAges, setPreferredAges] = useState<Record<string, PreferredAge>>({});

  const togglePurpose = (purposeId: string) => {
    setSelectedPurposes((prev) => {
      if (prev.includes(purposeId)) {
        const updated = prev.filter((id) => id !== purposeId);
        const updatedAges = { ...preferredAges };
        delete updatedAges[purposeId];
        setPreferredAges(updatedAges);
        return updated;
      } else {
        return [...prev, purposeId];
      }
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

const handleNext = async () => {
    if (activeTab === "purpose") {
      setActiveTab("interests");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://circlemate-spark-landing-jet.vercel.app/api/onboarding/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,  Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          purposes: selectedPurposes,
          preferredAges,
          interests: selectedInterests,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit preferences");
      }

      const data = await response.json();
      console.log("Preferences submission response:", data);
      navigate("/onboarding/availability");
    } catch (err) {
      setError("Failed to submit preferences. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (activeTab === "interests") {
      setActiveTab("purpose");
    } else {
      navigate("/onboarding/personality");
    }
  };

  const handleAgeChange = (purposeId: string, field: "min" | "max", value: string) => {
    setPreferredAges((prev) => ({
      ...prev,
      [purposeId]: {
        ...prev[purposeId],
        [field]: value === "" ? "" : Math.max(18, Math.min(100, Number(value))),
      },
    }));
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={7}
      nextAction={activeTab === "purpose" ? () => setActiveTab("interests") : handleNext}
      previousAction={handlePrevious}
      nextDisabled={activeTab === "purpose" ? selectedPurposes.length === 0 : selectedInterests.length === 0}
      nextLabel={activeTab === "purpose" ? "Next" : "Continue"}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Connection Preferences</h1>
        <p className="text-muted-foreground">Tell us what you're looking for in your connections</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="purpose">Purpose</TabsTrigger>
          <TabsTrigger value="interests" disabled={selectedPurposes.length === 0}>Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="purpose" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectionPurposes.map((purpose) => (
              <Card
                key={purpose.id}
                className={`cursor-pointer border-2 transition-all ${
                  selectedPurposes.includes(purpose.id)
                    ? "border-primary bg-[#22CCBE]/5"
                    : "hover:border-primary/20"
                }`}
                onClick={() => togglePurpose(purpose.id)}
              >
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">{purpose.icon}</div>
                  <h3 className="font-medium text-lg">{purpose.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{purpose.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedPurposes.length > 0 && (
  <div className="mt-6 space-y-6">
    <h2 className="text-xl font-bold text-gray-800">Preferred Age Range</h2>
    {selectedPurposes.map((purposeId) => (
      <div
        key={purposeId}
        className="bg-gray-100 p-4 rounded-2xl shadow-sm border border-gray-200 space-y-3"
      >
        <label className="block text-md font-medium capitalize text-gray-700">
          For {purposeId}
        </label>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Min Age</span>
            <input
              type="number"
              placeholder="18"
              value={preferredAges[purposeId]?.min ?? ""}
              onChange={(e) => handleAgeChange(purposeId, "min", e.target.value)}
              className="w-24 sm:w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              min={18}
              max={100}
            />
          </div>
          <span className="text-gray-500 mt-5">to</span>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Max Age</span>
            <input
              type="number"
              placeholder="100"
              value={preferredAges[purposeId]?.max ?? ""}
              onChange={(e) => handleAgeChange(purposeId, "max", e.target.value)}
              className="w-24 sm:w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              min={18}
              max={100}
            />
          </div>
          <span className="text-gray-500 mt-5">years</span>
        </div>
      </div>
    ))}
  </div>
)}


          <div className="mt-6 text-center text-sm text-muted-foreground">
            Selected {selectedPurposes.length} {selectedPurposes.length === 1 ? "purpose" : "purposes"}
          </div>
        </TabsContent>

        <TabsContent value="interests" className="pt-6">
          <div className="space-y-8">
            {interestCategories.map((category) => (
              <div key={category.id} className="space-y-3">
                <h3 className="font-medium text-lg">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.interests.map((interest) => (
                    <Button
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleInterest(interest)}
                      className="rounded-full"
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Selected {selectedInterests.length} interests
          </div>
        </TabsContent>
      </Tabs>
    </OnboardingLayout>
  );
};

export default OnboardingPreferences;
