
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Confetti from "@/components/effects/Confetti";

const OnboardingSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Slight delay to ensure component is mounted before animation
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col items-center justify-center px-4 py-12">
      {showConfetti && <Confetti duration={5000} pieces={200} />}
      
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Profile Created Successfully!</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You're all set up and ready to start connecting with your community
        </p>
      </div>
      
      <Card className="w-full max-w-md animate-fade-in">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Next steps:</h3>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-primary/10 p-1 rounded-full">
                <span className="text-lg">👋</span>
              </div>
              <div>
                <p className="font-medium">Explore your communities</p>
                <p className="text-sm text-muted-foreground">
                  Find groups that match your interests
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-primary/10 p-1 rounded-full">
                <span className="text-lg">👥</span>
              </div>
              <div>
                <p className="font-medium">Connect with others</p>
                <p className="text-sm text-muted-foreground">
                  Start meeting like-minded people
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-primary/10 p-1 rounded-full">
                <span className="text-lg">📅</span>
              </div>
              <div>
                <p className="font-medium">Attend events</p>
                <p className="text-sm text-muted-foreground">
                  Join activities and build relationships
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button asChild className="w-full">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSuccess;
