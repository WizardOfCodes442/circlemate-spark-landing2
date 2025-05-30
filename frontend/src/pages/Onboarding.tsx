
import React, { useState } from 'react';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import GroupJoin from '../components/onboarding/GroupJoin';
import PersonalInfo from '../components/onboarding/PersonalInfo';
import ConnectionPreferences from '../components/onboarding/ConnectionPreferences';
import ProfilePhoto from '../components/onboarding/ProfilePhoto';
import Success from '../components/onboarding/Success';
import Geolocation from '../components/onboarding/Geolocation';
import Temperament from '../components/onboarding/Temperament';
import Availability from '../components/onboarding/Availability';

interface OnboardingData {
  groupId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    maritalStatus: string;
  };
  location: {
    latitude: number | null;
    longitude: number | null;
    address: string;
  };
  temperament: {
    type: string;
    traits: string[];
  };
  preferences: {
    intent: string;
    budget: string;
    interests: string[];
    values: string[];
  };
  availability: {
    days: string[];
    timePreferences: string[];
  };
  photoUrl: string;
}

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  
  const totalSteps = 7; // Total number of steps in the wizard
  
  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const handleGroupJoin = (groupId: string) => {
    setOnboardingData(prev => ({ ...prev, groupId }));
    setStep(2);
  };
  
  const handlePersonalInfo = (personalInfo: OnboardingData['personalInfo']) => {
    setOnboardingData(prev => ({ ...prev, personalInfo }));
    setStep(3);
  };

  const handleGeolocation = (location: OnboardingData['location']) => {
    setOnboardingData(prev => ({ ...prev, location }));
    setStep(4);
  };

  const handleTemperament = (temperament: OnboardingData['temperament']) => {
    setOnboardingData(prev => ({ ...prev, temperament }));
    setStep(5);
  };
  
  const handleConnectionPreferences = (preferences: OnboardingData['preferences']) => {
    setOnboardingData(prev => ({ ...prev, preferences }));
    setStep(6);
  };

  const handleAvailability = (availability: OnboardingData['availability']) => {
    setOnboardingData(prev => ({ ...prev, availability }));
    setStep(7);
  };
  
  const handleProfilePhoto = (photoUrl: string) => {
    setOnboardingData(prev => ({ ...prev, photoUrl }));
    // In a real app, we would send the complete onboardingData to the backend here
    console.log('Onboarding complete with data:', { ...onboardingData, photoUrl });
    setStep(8);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return <GroupJoin onNext={handleGroupJoin} />;
      case 2:
        return <PersonalInfo onNext={handlePersonalInfo} />;
      case 3:
        return <Geolocation onNext={handleGeolocation} />;
      case 4:
        return <Temperament onNext={handleTemperament} />;
      case 5:
        return <ConnectionPreferences onNext={handleConnectionPreferences} />;
      case 6:
        return <Availability onNext={handleAvailability} />;
      case 7:
        return <ProfilePhoto onNext={handleProfilePhoto} />;
      case 8:
        return <Success />;
      default:
        return null;
    }
  };
  
  return (
    <OnboardingLayout 
      currentStep={step} 
      totalSteps={totalSteps}
      onBack={handleBack}
      showBackButton={step < 8} // Hide back button on success page
    >
      {renderStep()}
    </OnboardingLayout>
  );
};

export default Onboarding;
