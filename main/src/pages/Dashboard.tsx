import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import TechCircleHeader from "@/components/ui/TechCircleHeader";
import StatsSection from "@/components/ui/StatsSection";
import RecentMatches from "@/components/ui/RecentMatches";
import RecentActivities from "@/components/ui/RecentActivities";
import ProfileView from "@/components/ProfileView";
import ConnectView from "@/components/ConnectView";
import { fetchMatchesFromAPI, fetchActivitiesFromAPI, mockMatches, mockActivities } from "@/data/mockDashboardData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentMatches, setRecentMatches] = useState(mockMatches.slice(0, 4));
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [recentActivity, setRecentActivity] = useState(mockActivities.slice(0, 4));
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [connectMatch, setConnectMatch] = useState(null);

  useEffect(() => {
    if (showAllMatches) {
      const loadAllMatches = async () => {
        const matches = await fetchMatchesFromAPI();
        setRecentMatches(matches);
      };
      loadAllMatches();
    }
  }, [showAllMatches]);

  useEffect(() => {
    if (showAllActivities) {
      const loadAllActivities = async () => {
        const activities = await fetchActivitiesFromAPI();
        setRecentActivity(activities);
      };
      loadAllActivities();
    }
  }, [showAllActivities]);

  const viewProfile = (matchId: string) => {
    const match = mockMatches.find((m) => m.id === matchId);
    setSelectedMatch(match);
  };

  const connectWithMatch = (matchId: string) => {
    const match = mockMatches.find((m) => m.id === matchId);
    setConnectMatch(match);
    setSelectedMatch(null);
  };

  const goBack = () => {
    setSelectedMatch(null);
    setConnectMatch(null);
  };

  if (selectedMatch) {
    return <ProfileView match={selectedMatch} onBack={goBack} />;
  }

  if (connectMatch) {
    return <ConnectView match={connectMatch} onCancel={goBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <DashboardHeader />
      </div>
      <main className="container mx-auto px-4 py-6 flex-grow max-w-7xl">
        {!showAllMatches && !showAllActivities && (
          <>
            <TechCircleHeader />
            <StatsSection />
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <RecentMatches matches={recentMatches} onViewProfile={viewProfile} onConnect={connectWithMatch} onViewAll={() => setShowAllMatches(true)} />
              <RecentActivities activities={recentActivity} onViewAll={() => setShowAllActivities(true)} />
            </div>
          </>
        )}

        {showAllMatches && (
          <div className="mb-6">
            <RecentMatches
              matches={recentMatches}
              onViewProfile={viewProfile}
              onConnect={connectWithMatch}
              onViewAll={() => setShowAllMatches(false)}
              showAll
            />
          </div>
        )}

        {showAllActivities && (
          <div className="mb-6">
            <RecentActivities activities={recentActivity} onViewAll={() => setShowAllActivities(false)} showAll />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;