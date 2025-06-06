
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

type PersonalityTrait = {
  id: string;
  label: string;
  description: string;
};

const personalityTraits: PersonalityTrait[] = [
  {
    id: "adventurous",
    label: "Adventurous",
    description: "Always seeking new experiences and thrills",
  },
  {
    id: "analytical",
    label: "Analytical",
    description: "Rational and logical in your approach to challenges",
  },
  {
    id: "creative",
    label: "Creative",
    description: "Imaginative with unique perspectives and ideas",
  },
  {
    id: "empathetic",
    label: "Empathetic",
    description: "Sensitive to others' feelings and needs",
  },
  {
    id: "organized",
    label: "Organized",
    description: "Structured and methodical in your approach",
  },
  {
    id: "outgoing",
    label: "Outgoing",
    description: "Social and energized by interactions with others",
  },
  {
    id: "relaxed",
    label: "Relaxed",
    description: "Laid-back and easy-going in most situations",
  },
  {
    id: "ambitious",
    label: "Ambitious",
    description: "Driven to achieve goals and succeed",
  },
  {
    id: "thoughtful",
    label: "Thoughtful",
    description: "Considerate and reflective in your approach",
  },
  {
    id: "practical",
    label: "Practical",
    description: "Realistic and focused on what works",
  },
  {
    id: "curious",
    label: "Curious",
    description: "Always asking questions and seeking knowledge",
  },
  {
    id: "reliable",
    label: "Reliable",
    description: "Dependable and consistent in your actions",
  },
];

const OnboardingPersonality = () => {
  const navigate = useNavigate();
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  
  const toggleTrait = (traitId: string) => {
    setSelectedTraits((prev) => {
      if (prev.includes(traitId)) {
        return prev.filter((id) => id !== traitId);
      } else {
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, traitId];
      }
    });
  };
  
const handleNext = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://circlemate-spark-landing-jet.vercel.app/api/onboarding/personality", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ traits: selectedTraits }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit personality traits");
      }

      const data = await response.json();
      console.log("Personality submission response:", data);
      navigate("/onboarding/preferences");
    } catch (err) {
      setError("Failed to submit personality traits. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePrevious = () => {
    navigate("/onboarding/location");
  };
  
  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={7}
      nextAction={handleNext}
      previousAction={handlePrevious}
      nextDisabled={selectedTraits.length === 0}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Personality Style</h1>
        <p className="text-muted-foreground">
          Select up to 5 traits that best describe you
        </p>
      </div>
      
      <div className="mb-4 text-center">
        <span className="text-sm font-medium">
          Selected: {selectedTraits.length}/5
        </span>
        <div className="w-full bg-secondary h-2 rounded-full mt-2">
          <div
            className="bg-[#22CCBE] h-2 rounded-full transition-all"
            style={{ width: `${(selectedTraits.length / 5) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {personalityTraits.map((trait) => (
          <Button
            key={trait.id}
            variant={selectedTraits.includes(trait.id) ? "default" : "outline"}
            className={`h-auto py-3 px-4 justify-start text-left break-words whitespace-normal w-full ${
              selectedTraits.includes(trait.id)
                ? ""
                : selectedTraits.length >= 5
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => toggleTrait(trait.id)}
            disabled={selectedTraits.length >= 5 && !selectedTraits.includes(trait.id)}
          >
            <div className="w-full">
              <div className="font-semibold">{trait.label}</div>
              <div className="text-xs mt-1 opacity-80">{trait.description}</div>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-6">
        {selectedTraits.map((traitId) => {
          const trait = personalityTraits.find((t) => t.id === traitId);
          return (
            <Badge key={traitId} variant="secondary" className="text-sm py-2">
              {trait?.label}
            </Badge>
          );
        })}
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingPersonality;
