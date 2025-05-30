
import React from 'react';
import Logo from '../Logo';
import { ArrowLeft } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  showBackButton?: boolean;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  onBack,
  showBackButton = true,
}) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-4">
          {showBackButton && currentStep > 1 && (
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <Logo size="small" />
        </div>
        <div className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
      </header>
      
      <div className="h-2 w-full bg-gray-100">
        <div 
          className="h-full bg-teal transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center text-sm text-gray-500 border-t">
        <p>© {new Date().getFullYear()} CircleMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OnboardingLayout;
