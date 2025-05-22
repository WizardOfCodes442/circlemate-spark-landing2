
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
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("purpose");
  
  const handlePurposeSelect = (purposeId: string) => {
    setSelectedPurpose(purposeId);
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
  
  const handleNext = () => {
    if (selectedPurpose && selectedInterests.length > 0) {
      console.log("Selected purpose:", selectedPurpose);
      console.log("Selected interests:", selectedInterests);
      navigate("/onboarding/availability");
    }
  };
  
  const handlePrevious = () => {
    if (activeTab === "interests") {
      setActiveTab("purpose");
    } else {
      navigate("/onboarding/personality");
    }
  };
  
  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={7}
      nextAction={activeTab === "purpose" ? () => setActiveTab("interests") : handleNext}
      previousAction={handlePrevious}
      nextDisabled={activeTab === "purpose" ? !selectedPurpose : selectedInterests.length === 0}
      nextLabel={activeTab === "purpose" ? "Next" : "Continue"}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Connection Preferences</h1>
        <p className="text-muted-foreground">
          Tell us what you're looking for in your connections
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="purpose">Purpose</TabsTrigger>
          <TabsTrigger value="interests" disabled={!selectedPurpose}>Interests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="purpose" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectionPurposes.map((purpose) => (
              <Card
                key={purpose.id}
                className={`cursor-pointer border-2 transition-all ${
                  selectedPurpose === purpose.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/20"
                }`}
                onClick={() => handlePurposeSelect(purpose.id)}
              >
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">{purpose.icon}</div>
                  <h3 className="font-medium text-lg">{purpose.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {purpose.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
