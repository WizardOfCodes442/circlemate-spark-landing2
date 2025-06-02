import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  isCompleted: boolean;
  setCompleted: (status: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isCompleted: false,
      setCompleted: (status) => set({ isCompleted: status }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
