import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

interface Match {
  id: string;
  name: string;
  role: string;
  interests: string[];
  image: string;
  about: string;
  personalityType: string;
  essentials: { location: string };
}

interface ProfileViewProps {
  match: Match;
  onBack: () => void;
}

const ProfileView = ({ match, onBack }: ProfileViewProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <DashboardHeader />
      </div>
      <main className="container mx-auto px-4 py-6 flex-grow max-w-7xl flex justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4 md:w-3/4 lg:w-1/2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button className="bg-transparent text-teal-500 hover:bg-teal-100 rounded-full px-6 py-2 w-auto" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
          <div className="py-4">
            <img src={match.image} alt={match.name} className="w-full h-64 object-cover rounded-t-lg mb-4" />
            <h1 className="text-2xl font-bold mb-2">{match.name}</h1>
            <div className="flex justify-start space-x-2 mb-4">
              <span className="text-teal-500 bg-teal-100 px-2 py-1 rounded-full text-sm">{match.role}</span>
              <span className="text-gray-600">Lagos Tech Circle</span>
            </div>
            <div className="flex justify-start space-x-2 mb-4">
              <Button className="bg-teal-500 text-white rounded-full px-6 py-2">Connect</Button>
              <Button className="bg-red-500 text-white rounded-full px-6 py-2">Report</Button>
              <Button className="bg-gray-500 text-white rounded-full px-6 py-2">Block</Button>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-600">{match.about}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p className="text-gray-600">{match.essentials.location}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Temperament</h2>
              <p className="text-gray-600">{match.personalityType} (ENTJ)</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {match.interests.map((interest, index) => (
                  <span key={index} className="text-xs bg-teal-100 text-teal-500 px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Values</h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Growth</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Innovation</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Authenticity</span>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Availability</h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">Weekends</span>
                <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">Evenings</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileView;