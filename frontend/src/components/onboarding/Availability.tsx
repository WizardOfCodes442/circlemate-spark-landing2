
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AvailabilityProps {
  onNext: (availability: { days: string[], timePreferences: string[] }) => void;
}

const daysOfWeek = [
  { id: 'monday', name: 'Monday' },
  { id: 'tuesday', name: 'Tuesday' },
  { id: 'wednesday', name: 'Wednesday' },
  { id: 'thursday', name: 'Thursday' },
  { id: 'friday', name: 'Friday' },
  { id: 'saturday', name: 'Saturday' },
  { id: 'sunday', name: 'Sunday' },
];

const timePreferences = [
  { id: 'morning', name: 'Morning (8 AM - 12 PM)', icon: '🌅' },
  { id: 'afternoon', name: 'Afternoon (12 PM - 5 PM)', icon: '☀️' },
  { id: 'evening', name: 'Evening (5 PM - 9 PM)', icon: '🌆' },
  { id: 'night', name: 'Night (After 9 PM)', icon: '🌙' },
];

const Availability: React.FC<AvailabilityProps> = ({ onNext }) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDayToggle = (dayId: string) => {
    setSelectedDays(prev => {
      if (prev.includes(dayId)) {
        return prev.filter(id => id !== dayId);
      } else {
        return [...prev, dayId];
      }
    });
    
    if (errors.days) {
      setErrors(prev => ({ ...prev, days: '' }));
    }
  };

  const handleTimeToggle = (timeId: string) => {
    setSelectedTimes(prev => {
      if (prev.includes(timeId)) {
        return prev.filter(id => id !== timeId);
      } else {
        return [...prev, timeId];
      }
    });
    
    if (errors.times) {
      setErrors(prev => ({ ...prev, times: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (selectedDays.length === 0) {
      newErrors.days = 'Please select at least one day';
    }
    
    if (selectedTimes.length === 0) {
      newErrors.times = 'Please select at least one time preference';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({
        days: selectedDays,
        timePreferences: selectedTimes
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Your Availability</h1>
        <p className="text-gray-600">
          Let us know when you're typically free to meet new connections.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Which days are you usually available? (Select all that apply)</Label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(day => (
              <button
                key={day.id}
                type="button"
                onClick={() => handleDayToggle(day.id)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedDays.includes(day.id) 
                    ? 'border-teal bg-teal text-white' 
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                {day.name}
              </button>
            ))}
          </div>
          {errors.days && <p className="text-red-500 text-sm">{errors.days}</p>}
        </div>

        <div className="space-y-3">
          <Label>What times of day work best for you? (Select all that apply)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timePreferences.map(time => (
              <div 
                key={time.id}
                onClick={() => handleTimeToggle(time.id)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedTimes.includes(time.id)
                    ? 'border-teal bg-teal/5'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Checkbox 
                    id={time.id}
                    checked={selectedTimes.includes(time.id)}
                    onCheckedChange={() => handleTimeToggle(time.id)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{time.icon}</span>
                    <Label htmlFor={time.id} className="cursor-pointer">{time.name}</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.times && <p className="text-red-500 text-sm">{errors.times}</p>}
        </div>
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

export default Availability;
