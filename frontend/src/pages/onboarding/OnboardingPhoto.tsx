import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Upload, X, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const MAX_PHOTOS = 8;

const OnboardingPhoto = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, MAX_PHOTOS - photos.length);
      const urls = newPhotos.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...urls]);
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
    const files = e.dataTransfer.files;
    if (files) {
      const newPhotos = Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .slice(0, MAX_PHOTOS - photos.length);
      const urls = newPhotos.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...urls]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
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
      nextDisabled={photos.length === 0}
      showSkip={true}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Add Your Photos</h1>
        <p className="text-muted-foreground">
          Upload up to {MAX_PHOTOS} photos for your profile
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg mb-6`}
        >
          {photos.map((url, index) => (
            <div key={index} className="relative group">
              <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                <AvatarImage src={url} />
                <AvatarFallback>
                  <User className="w-12 h-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <button
                className="absolute -top-2 -right-2 bg-destructive hover:bg-destructive/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePhoto(index)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {photos.length < MAX_PHOTOS && (
          <Card
            className={`border-dashed border-2 p-12 w-full max-w-xs flex flex-col items-center justify-center cursor-pointer ${
              isDragging
                ? "border-primary bg-[#22CCBE]/5"
                : "hover:border-primary/50"
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
              multiple
              className="hidden"
            />
            <Image className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="font-medium mb-2">Click or drag to upload</p>
            <p className="text-sm text-muted-foreground text-center">
              JPG, PNG or GIF, up to 5MB each
            </p>
          </Card>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Your photos will be visible to other users in your communities
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingPhoto;
