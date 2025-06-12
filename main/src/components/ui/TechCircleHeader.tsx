
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Bell, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for group updates
const mockGroupUpdates = [
  {
    id: "1",
    title: "New Tech Meetup Announced",
    description: "Join us for a networking event on July 10th at 6 PM in Lagos!",
    timestamp: "2025-06-11 10:00 AM",
  },
  {
    id: "2",
    title: "Hackathon Winners",
    description: "Congratulations to Team CodeX for winning the June Hackathon!",
    timestamp: "2025-06-10 3:00 PM",
  },
  {
    id: "3",
    title: "Community Survey",
    description: "Please fill out our survey to help improve Lagos Tech Circle.",
    timestamp: "2025-06-09 9:00 AM",
  },
];

const TechCircleHeader = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleRequestMatch = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 relative">
      {/* Notification Dialog */}
      {showNotification && (
        <div
          className={`fixed z-50 w-full max-w-md mx-auto p-4 bg-teal-500 text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
            window.innerWidth < 768 ? "top-4" : "bottom-4"
          } transform ${window.innerWidth < 768 ? "translate-y-0" : "translate-y-0"}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">
              Your request for match has been sent. Check matches for your match.
            </p>
            <button
              onClick={() => setShowNotification(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-2 md:space-y-0">
        {/* Mobile View */}
        <div className="flex items-center md:hidden">
          <h1 className="text-2xl font-bold mr-4">Lagos Tech Circle</h1>
          <span className="text-white bg-teal-500 text-sm font-normal px-2 py-1 rounded-full ml-2">Active</span>
        </div>
        <div className="text-sm text-gray-600 flex items-center md:hidden">
          <Users className="h-4 w-4 mr-1" /> 546 members <Heart className="h-4 w-4 mx-2 text-red-500" /> 345 matches
        </div>
        <div className="flex space-x-2 md:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-6 py-2 w-1/2">
                <Bell className="h-4 w-4 mr-2" /> Group Updates
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg max-w-md max-h-[70vh] overflow-y-auto">
              <div className="grid gap-4">
                <h2 className="text-lg font-bold text-navy">Group Updates</h2>
                {mockGroupUpdates.map((update) => (
                  <Card key={update.id} className="border rounded-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{update.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{update.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{update.timestamp}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            className="bg-teal-500 text-white rounded-full px-6 py-2 w-1/2"
            onClick={handleRequestMatch}
          >
            Request Match
          </Button>
        </div>
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Lagos Tech Circle</h1>
              <span className="text-white bg-teal-500 text-sm font-normal px-2 py-1 rounded-full ml-2">Active</span>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-6 py-2 w-1/2">
                    <Bell className="h-4 w-4 mr-2" /> Group Updates
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg max-w-md max-h-[70vh] overflow-y-auto">
                  <div className="grid gap-4">
                    <h2 className="text-lg font-bold text-navy">Group Updates</h2>
                    {mockGroupUpdates.map((update) => (
                      <Card key={update.id} className="border rounded-lg">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">{update.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{update.description}</p>
                          <p className="text-xs text-gray-400 mt-2">{update.timestamp}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                className="bg-teal-500 text-white rounded-full px-6 py-2 w-1/2"
                onClick={handleRequestMatch}
              >
                Request Match
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <Users className="h-4 w-4 mr-1" /> 546 members <Heart className="h-4 w-4 mx-2 text-red-500" /> 345 matches
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCircleHeader;
