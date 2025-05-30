
import React, { useState, useRef } from 'react';
import { ArrowRight, Camera, User, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfilePhotoProps {
  onNext: (photoUrl: string) => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ onNext }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check if file is too large (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image is too large. Please upload an image under 5MB.');
      return;
    }
    
    setError(null);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhoto(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = () => {
    if (photo) {
      onNext(photo);
    } else {
      setError('Please upload a profile photo');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Add a Profile Photo</h1>
        <p className="text-gray-600">
          A good profile photo helps create meaningful connections.
        </p>
      </div>
      
      <div className="flex flex-col items-center">
        <div 
          className="w-48 h-48 mb-6 rounded-full border-4 border-teal flex items-center justify-center overflow-hidden bg-gray-100"
          style={{ 
            backgroundImage: photo ? `url(${photo})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!photo && (
            <User size={64} className="text-gray-400" />
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        <div className="flex gap-4">
          <Button 
            onClick={triggerFileInput}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload size={16} />
            {photo ? 'Change Photo' : 'Upload Photo'}
          </Button>
          
          {photo && (
            <Button 
              variant="outline" 
              className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
              onClick={() => setPhoto(null)}
            >
              Remove
            </Button>
          )}
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Your photo should:</p>
          <ul className="list-disc text-left ml-6 mt-1">
            <li>Clearly show your face</li>
            <li>Be recent and look like you</li>
            <li>Be just of you, with no other people</li>
          </ul>
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit}
        className="w-full btn-primary gap-2 mt-6"
        disabled={!photo}
      >
        Complete Profile <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default ProfilePhoto;
