import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";

// New pages

// Onboarding routes
import OnboardingCommunity from "./pages/onboarding/OnboardingCommunity";
import OnboardingProfile from "./pages/onboarding/OnboardingProfile";
import OnboardingLocation from "./pages/onboarding/OnboardingLocation";
import OnboardingPersonality from "./pages/onboarding/OnboardingPersonality";
import OnboardingPreferences from "./pages/onboarding/OnboardingPreferences";
import OnboardingAvailability from "./pages/onboarding/OnboardingAvailability";
import OnboardingPhoto from "./pages/onboarding/OnboardingPhoto";
import OnboardingSuccess from "./pages/onboarding/OnboardingSuccess";
import Discover from "./pages/Discover";
import Communities from "./pages/Communities";
import Events from "./pages/Events";
import Notifications from "./pages/Notification";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import Matchmaking from "./pages/Matchmaking";
import CreateCommunity from "./pages/CreateCommunity";
import CommunityProfile from "./pages/CommunityProfile";
import ManageCommunity from "./pages/ManageCommunity";
import VerifyEmail from "./pages/VerifyEmail";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/community" element={<Communities />} />
          <Route path="/events" element={<Events />} />
          <Route path="/manage-community" element={<ManageCommunity />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/match-making" element={<Matchmaking />} />
          <Route path="/create-community" element={<CreateCommunity />} />
          <Route path="/community-profile" element={<CommunityProfile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          
          {/* Catch-all route for 404 */}
          
          {/* Onboarding Routes */}
          <Route path="/onboarding" element={<OnboardingCommunity />} />
          <Route path="/onboarding/profile" element={<OnboardingProfile />} />
          <Route path="/onboarding/location" element={<OnboardingLocation />} />
          <Route path="/onboarding/personality" element={<OnboardingPersonality />} />
          <Route path="/onboarding/preferences" element={<OnboardingPreferences />} />
          <Route path="/onboarding/availability" element={<OnboardingAvailability />} />
          <Route path="/onboarding/photo" element={<OnboardingPhoto />} />
          <Route path="/onboarding/success" element={<OnboardingSuccess />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
