import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Upload, X, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const MAX_PHOTOS = 8;

interface Photo {
  file: File;
  url: string;
  photoId?: string; // Store server-assigned photo ID after upload
}

const OnboardingPhoto = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, MAX_PHOTOS - photos.length);

    setLoading(true);
    setError(null);

    try {
      const newPhotos: Photo[] = [];
      for (const file of newFiles) {
        const formData = new FormData();
        formData.append("photo", file);

        const response = await fetch("/api/onboarding/photos", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload photo: ${file.name}`);
        }

        const data = await response.json();
        newPhotos.push({
          file,
          url: URL.createObjectURL(file),
          photoId: data.photoId, // Assume server returns photoId
        });
      }

      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch (err) {
      setError("Failed to upload one or more photos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (!files) return;

    const newFiles = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, MAX_PHOTOS - photos.length);

    setLoading(true);
    setError(null);

    try {
      const newPhotos: Photo[] = [];
      for (const file of newFiles) {
        const formData = new FormData();
        formData.append("photo", file);

        const response = await fetch("/api/onboarding/photos", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload photo: ${file.name}`);
        }

        const data = await response.json();
        newPhotos.push({
          file,
          url: URL.createObjectURL(file),
          photoId: data.photoId,
        });
      }

      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch (err) {
      setError("Failed to upload one or more photos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = async (index: number) => {
    const photo = photos[index];
    if (photo.photoId) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/onboarding/photos/${photo.photoId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete photo");
        }

        setPhotos((prev) => prev.filter((_, i) => i !== index));
        URL.revokeObjectURL(photo.url); // Clean up URL
      } catch (err) {
        setError("Failed to delete photo. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      // If no photoId (not yet uploaded), remove locally
      setPhotos((prev) => prev.filter((_, i) => i !== index));
      URL.revokeObjectURL(photo.url);
    }
  };

  const handleNext = async () => {
    if (photos.length === 0) {
      navigate("/onboarding/success"); // Allow skipping if no photos
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://circlemate-spark-landing-jet.vercel.app/api/onboarding/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          photoIds: photos.map((photo) => photo.photoId).filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to finalize photo submission");
      }

      const data = await response.json();
      console.log("Photos submission response:", data);
      navigate("/onboarding/success");
    } catch (err) {
      setError("Failed to finalize photo submission. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      nextDisabled={loading}
      nextLabel={loading ? "Processing..." : "Next"}
      showSkip={true}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Add Your Photos</h1>
        <p className="text-muted-foreground">
          Upload up to {MAX_PHOTOS} photos for your profile
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mb-6">
          {photos.map((photo, index) => (
            <div key={index} className="relative group w-full">
              <img
                src={photo.url}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto aspect-square object-cover border-4 border-background shadow-lg"
              />
              <button
                className="absolute top-1 right-1 bg-destructive hover:bg-destructive/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePhoto(index)}
                disabled={loading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {photos.length < MAX_PHOTOS && (
          <Card
            className={`border-dashed border-2 p-12 w-full max-w-xs flex flex-col items-center justify-center cursor-pointer ${
              isDragging ? "border-primary bg-[#22CCBE]/5" : "hover:border-primary/50"
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
              disabled={loading}
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

export default OnboardingPhoto
