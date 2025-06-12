import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

interface Match {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface ConnectViewProps {
  match: Match;
  onCancel: () => void;
}

const ConnectView = ({ match, onCancel }: ConnectViewProps) => {
  const [showNotification, setShowNotification] = useState<{ message: string } | null>(null);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleSendRequest = () => {
    if (!isRequestSent) {
      setIsRequestSent(true);
      setShowNotification({ message: `Connection request sent to ${match.name}.` });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Notification */}
      {showNotification && (
        <div
          className={`fixed z-50 w-full max-w-md mx-auto p-4 bg-teal-500 text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
            window.innerWidth < 768 ? "top-4" : "bottom-4"
          } transform translate-y-0`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">{showNotification.message}</p>
            <button
              onClick={() => setShowNotification(null)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full">
        <DashboardHeader />
      </div>
      <main className="container mx-auto px-4 py-6 flex-grow max-w-7xl flex justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4 md:w-3/4 lg:w-1/2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button className="bg-transparent text-teal-500 hover:bg-teal-100 rounded-full px-6 py-2 w-auto" onClick={onCancel}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold mb-4">Connect with {match.name}</h1>
          <div className="flex items-center mb-4 relative">
            <img src={match.image} alt={match.name} className="w-24 h-24 object-cover rounded-full mr-4 float-left" />
            {isRequestSent && (
              <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2.5 py-1.5 rounded-full">
                Pending
              </div>
            )}
            <div className="float-left">
              <h2 className="text-xl font-semibold">{match.name}</h2>
              <span className="text-teal-500 bg-teal-100 px-2 py-1 rounded-full text-sm block">{match.role}</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Suggested Meetup Options</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">The Brew House</p>
                    <p className="text-gray-600">Coffee Shop in Lekki</p>
                    <p className="text-gray-500">Suggested: Weekend morning</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Tech Hub Lagos</p>
                    <p className="text-gray-600">Co-working space in Victoria Island</p>
                    <p className="text-gray-500">Suggested: Weekday afternoon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
            <p className="text-gray-600">
              Sending a connection request will notify {match.name}. If they accept, you'll be able to schedule a meetup at one of the suggested locations or propose your own.
            </p>
          </div>
          <div className="flex justify-between">
            <Button
              className="bg-teal-500 text-white rounded-full px-6 py-2 w-full md:w-auto"
              onClick={handleSendRequest}
            >
              Send Connection Request
            </Button>
            <Button
              className="bg-gray-200 text-gray-700 rounded-full px-6 py-2 w-full md:w-auto ml-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConnectView;
