
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

type DayAvailability = {
  day: string;
  abbr: string;
  selected: boolean;
};

type TimePreference = {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
};

const initialDays: DayAvailability[] = [
  { day: "Monday", abbr: "M", selected: false },
  { day: "Tuesday", abbr: "T", selected: false },
  { day: "Wednesday", abbr: "W", selected: false },
  { day: "Thursday", abbr: "T", selected: false },
  { day: "Friday", abbr: "F", selected: false },
  { day: "Saturday", abbr: "S", selected: true },
  { day: "Sunday", abbr: "S", selected: true },
];

const initialTimePreferences: TimePreference[] = [
  { id: "morning", label: "Morning", icon: "🌅", selected: false },
  { id: "afternoon", label: "Afternoon", icon: "☀️", selected: true },
  { id: "evening", label: "Evening", icon: "🌆", selected: true },
  { id: "night", label: "Night", icon: "🌙", selected: false },
];

const OnboardingAvailability = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState<DayAvailability[]>(initialDays);
  const [timePreferences, setTimePreferences] = useState<TimePreference[]>(
    initialTimePreferences
  );
  
  const toggleDay = (dayIndex: number) => {
    setDays((prev) =>
      prev.map((day, index) =>
        index === dayIndex ? { ...day, selected: !day.selected } : day
      )
    );
  };
  
  const toggleTimePreference = (prefId: string) => {
    setTimePreferences((prev) =>
      prev.map((pref) =>
        pref.id === prefId ? { ...pref, selected: !pref.selected } : pref
      )
    );
  };
  
 const handleNext = async () => {
    const selectedDays = days.filter((day) => day.selected).map((day) => day.day);
    const selectedTimes = timePreferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.label);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://circlemate-spark-landing-jet.vercel.app/api/onboarding/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: selectedDays, times: selectedTimes }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit availability");
      }

      const data = await response.json();
      console.log("Availability submission response:", data);
      navigate("/onboarding/photo");
    } catch (err) {
      setError("Failed to submit availability. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePrevious = () => {
    navigate("/onboarding/preferences");
  };
  
  const hasSelection = days.some((day) => day.selected) && timePreferences.some((pref) => pref.selected);
  
  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={7}
      nextAction={handleNext}
      previousAction={handlePrevious}
      nextDisabled={!hasSelection}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Availability</h1>
        <p className="text-muted-foreground">
          Let us know when you're typically free to meet new people
        </p>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="font-medium text-lg mb-4">Which days are you usually free?</h3>
          <div className="flex space-x-2">
            {days.map((day, index) => (
              <Button
                key={day.day}
                variant={day.selected ? "default" : "outline"}
                className="w-10 h-10 rounded-full"
                onClick={() => toggleDay(index)}
              >
                {day.abbr}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">What times work best for you?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timePreferences.map((pref) => (
              <Card
                key={pref.id}
                className={`cursor-pointer border-2 transition-all ${
                  pref.selected ? "border-primary bg-[#22CCBE]/5" : "hover:border-primary/20"
                }`}
                onClick={() => toggleTimePreference(pref.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{pref.icon}</div>
                  <div className="font-medium">{pref.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          You can always update your availability later
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingAvailability;
