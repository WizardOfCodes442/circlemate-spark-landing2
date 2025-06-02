
import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface GeolocationProps {
  onNext: (location: { latitude: number | null; longitude: number | null; address: string }) => void;
}

const Geolocation: React.FC<GeolocationProps> = ({ onNext }) => {
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getGeolocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        
        // In a real app, we would use a geocoding API to get the address
        // For demo purposes, we'll just set a generic message
        setAddress('Your location has been detected');
        toast({
          title: "Location detected",
          description: "We've successfully detected your current location.",
        });
        setIsLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location. Please enter it manually.');
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Location error",
          description: "We couldn't access your location. Please enter your address manually.",
        });
      }
    );
  };

  const handleSubmit = () => {
    if (!location.latitude && !location.longitude && !address.trim()) {
      setError('Please either allow location access or enter your address.');
      return;
    }

    onNext({
      latitude: location.latitude,
      longitude: location.longitude,
      address: address.trim(),
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Your Location</h1>
        <p className="text-gray-600">
          Help us match you with people in your area.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-teal/10 flex items-center gap-3 text-sm">
          <MapPin className="h-5 w-5 text-teal flex-shrink-0" />
          <p>
            We only use your location to suggest suitable matches and meeting places. 
            Your exact address is never shared with other users.
          </p>
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            onClick={getGeolocation}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
            disabled={isLoading}
          >
            <MapPin size={18} /> 
            {isLoading ? "Detecting Location..." : "Detect My Location"}
          </Button>

          <div className="relative text-xs text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <span className="relative px-2 bg-white text-gray-500">or enter manually</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={error && !address ? 'border-red-500' : ''}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {location.latitude && location.longitude && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center text-green-700">
            Location successfully detected!
          </div>
        )}
      </div>

      <Button 
        onClick={handleSubmit}
        className="w-full btn-primary gap-2 mt-6"
      >
        Continue <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default Geolocation;
