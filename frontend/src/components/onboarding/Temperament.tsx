
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface TemperamentProps {
  onNext: (temperament: { type: string; traits: string[] }) => void;
}

// MBTI-inspired personality types (simplified)
const personalityTypes = [
  { id: 'introvert', label: 'Introvert', description: 'You prefer meaningful one-on-one interactions and value deeper connections.' },
  { id: 'extrovert', label: 'Extrovert', description: 'You enjoy group activities and meeting new people energizes you.' },
  { id: 'ambivert', label: 'Ambivert', description: 'You balance between social and alone time, adapting to different situations.' },
];

// Personality traits
const personalityTraits = [
  { id: 'analytical', label: 'Analytical', description: 'You enjoy solving problems and think logically.' },
  { id: 'creative', label: 'Creative', description: 'You enjoy art, thinking outside the box, and new ideas.' },
  { id: 'organized', label: 'Organized', description: 'You prefer structure, plans, and order.' },
  { id: 'spontaneous', label: 'Spontaneous', description: 'You prefer flexibility and going with the flow.' },
  { id: 'adventurous', label: 'Adventurous', description: 'You enjoy trying new experiences and taking risks.' },
  { id: 'cautious', label: 'Cautious', description: 'You prefer to think things through before acting.' },
  { id: 'empathetic', label: 'Empathetic', description: 'You easily understand and share others\' feelings.' },
  { id: 'direct', label: 'Direct', description: 'You communicate in a straightforward manner.' },
];

const Temperament: React.FC<TemperamentProps> = ({ onNext }) => {
  const [personalityType, setPersonalityType] = useState('');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTraitChange = (trait: string, checked: boolean) => {
    setSelectedTraits(prev => {
      if (checked) {
        return [...prev, trait];
      } else {
        return prev.filter(t => t !== trait);
      }
    });
    
    if (errors.traits) {
      setErrors(prev => ({ ...prev, traits: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!personalityType) {
      newErrors.type = 'Please select a personality type';
    }
    
    if (selectedTraits.length < 2) {
      newErrors.traits = 'Please select at least 2 traits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({
        type: personalityType,
        traits: selectedTraits
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Your Personality Style</h1>
        <p className="text-gray-600">
          Help us understand your temperament to find compatible matches.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>How would you describe your social energy?</Label>
          <RadioGroup
            value={personalityType}
            onValueChange={value => {
              setPersonalityType(value);
              if (errors.type) setErrors(prev => ({ ...prev, type: '' }));
            }}
          >
            {personalityTypes.map((type) => (
              <div 
                key={type.id} 
                className={`p-4 border rounded-xl cursor-pointer transition-all ${personalityType === type.id ? 'border-teal bg-teal/5' : 'hover:bg-gray-50'}`}
                onClick={() => setPersonalityType(type.id)}
              >
                <div className="flex items-start">
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <div className="ml-3">
                    <Label htmlFor={type.id} className="font-medium text-navy text-base cursor-pointer">
                      {type.label}
                    </Label>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type}</p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Select traits that describe you (at least 2)</Label>
            <span className="text-sm text-gray-500">
              Selected: {selectedTraits.length}/{personalityTraits.length}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalityTraits.map((trait) => (
              <div 
                key={trait.id} 
                className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedTraits.includes(trait.id) ? 'border-teal bg-teal/5' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-start">
                  <Checkbox 
                    id={trait.id} 
                    checked={selectedTraits.includes(trait.id)}
                    onCheckedChange={(checked) => handleTraitChange(trait.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <Label htmlFor={trait.id} className="font-medium text-navy text-sm cursor-pointer">
                      {trait.label}
                    </Label>
                    <p className="text-gray-600 text-xs">{trait.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.traits && (
            <p className="text-red-500 text-sm">{errors.traits}</p>
          )}
        </div>
      </div>
      
      <Button onClick={handleSubmit} className="w-full btn-primary gap-2 mt-6">
        Continue <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default Temperament;
