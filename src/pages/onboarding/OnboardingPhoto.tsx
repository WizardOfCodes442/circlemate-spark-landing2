
import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Upload, X, Check, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const OnboardingPhoto = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };
  
  const clearPhoto = () => {
    setPhotoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleNext = () => {
    navigate("/onboarding/success");
  };
  
  const handlePrevious = () => {
    navigate("/onboarding/availability");
  };
  
  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={7}
      nextAction={handleNext}
      previousAction={handlePrevious}
      nextDisabled={!photoUrl}
      showSkip={true}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Add a Profile Photo</h1>
        <p className="text-muted-foreground">
          Let others see who they're connecting with
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        {photoUrl ? (
          <div className="relative group">
            <Avatar className="w-48 h-48 border-4 border-background shadow-lg">
              <AvatarImage src={photoUrl} />
              <AvatarFallback>
                <User className="w-12 h-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute -top-2 -right-2 bg-destructive hover:bg-destructive/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={clearPhoto}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mt-4 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-green-500">Great choice!</span>
            </div>
          </div>
        ) : (
          <Card
            className={`border-dashed border-2 p-12 w-full max-w-xs flex flex-col items-center justify-center cursor-pointer ${
              isDragging ? "border-primary bg-primary/5" : "hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Image className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="font-medium mb-2">Click or drag to upload</p>
            <p className="text-sm text-muted-foreground text-center">
              JPG, PNG or GIF, up to 5MB
            </p>
          </Card>
        )}
        
        {!photoUrl && (
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose a photo
          </Button>
        )}
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Your profile photo will be visible to other users in your communities
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingPhoto;
