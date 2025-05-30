
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import MatchProfile from "./components/matches/MatchProfile";
import Matches from "./pages/Matches";
import Connection from "./pages/Connection";
import GroupUpdates from "./pages/GroupUpdates";
import PlanMeetup from "./pages/PlanMeetup";
import MeetupFeedback from "./pages/MeetupFeedback";
import AcceptedConnections from "./pages/AcceptedConnections";
import About from "./pages/About";
import FindGroups from "./pages/FindGroups";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import CommunityProfile from "./pages/CommunityProfile";
import AdminDashboard from "./pages/AdminDashboard";
import CommandCentre from "./pages/CommandCentre";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/match/:id" element={<MatchProfile id={''} />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/accepted-connections" element={<AcceptedConnections />} />
          <Route path="/connection/:id" element={<Connection />} />
          <Route path="/group-updates" element={<GroupUpdates />} />
          <Route path="/plan-meetup/:id" element={<PlanMeetup />} />
          <Route path="/meetup-feedback/:id" element={<MeetupFeedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/find-groups" element={<FindGroups />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/community/:id" element={<CommunityProfile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/command-centre" element={<CommandCentre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
