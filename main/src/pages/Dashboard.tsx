import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Users, Bell, Heart, ChevronUp, ArrowRight, ArrowLeft } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

// Mock data for recent matches with real images
const mockMatches = [
  {
    id: "m1",
    name: "David Brown",
    role: "Romance",
    interests: ["Music", "Travel", "Photography"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio at magna tincidunt congue eu vel nisi. Sed euismod, nisl vel aliquam luctus, nunc nisl aliquam mauris.",
    zodiac: "Sagittarius",
    education: "High School",
    familyPlans: "Not sure",
    personalityType: "ENTJ",
    lifestyle: {
      pets: "Don't have, but love",
      drinking: "On special occasions",
      smoking: "Non-smoker",
      workout: "Sometimes",
      dietaryPreference: "Other",
      socialMedia: "Socially active",
      sleepingHabits: "Night owl",
    },
    interests: ["Music", "Travel", "Photography"],
    lookingFor: "Short-term fun",
    essentials: {
      distance: "8 miles away",
      employment: "Employed",
      education: "Polytechnic Ibadan",
      location: "Lagos, Nigeria",
      languages: "Hausa, Pidgin",
    },
  },
];

// Mock data for recent activities
const mockActivities = [
  { id: 1, user: "David Brown", action: "requested to connect with you", time: "2 hours ago", status: "pending" },
  { id: 2, user: "Jessica Williams", action: "scheduled a meetup with you", time: "1 day ago", date: "Tomorrow, 10:00 AM", location: "Coffee at The Brew House" },
  { id: 3, user: "Michael Johnson", action: "left feedback on your meetup", time: "2 days ago", feedback: "Great conversation, would meet again!", rating: 4 },
  { id: 4, user: "Sarah Thompson", action: "confirmed your connection request", time: "3 days ago" },
  { id: 5, user: "Emily Davis", action: "requested to connect with you", time: "4 hours ago", status: "pending" },
  { id: 6, user: "John Smith", action: "scheduled a meetup with you", time: "1 day ago", date: "Monday, 2:00 PM", location: "Tech Hub" },
];

// Mock API fetch functions
const fetchMatchesFromAPI = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockMatches;
};

const fetchActivitiesFromAPI = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockActivities;
};

const ProfileView = ({ match, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <DashboardHeader />
      </div>
      <main className="container mx-auto px-4 py-6 flex-grow max-w-7xl flex justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4 md:w-3/4 lg:w-1/2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button 
              className="bg-transparent text-teal-500 hover:bg-teal-100 rounded-full px-6 py-2 w-auto" 
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
          <div className="py-4">
            <img 
              src={match.image} 
              alt={match.name} 
              className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
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

const ConnectView = ({ match, onCancel }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <DashboardHeader />
      </div>
      <main className="container mx-auto px-4 py-6 flex-grow max-w-7xl flex justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4 md:w-3/4 lg:w-1/2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button 
              className="bg-transparent text-teal-500 hover:bg-teal-100 rounded-full px-6 py-2 w-auto"
              onClick={onCancel}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold mb-4">Connect with {match.name}</h1>
          <div className="flex items-center mb-4">
            <img 
              src={match.image} 
              alt={match.name} 
              className="w-24 h-24 object-cover rounded-full mr-4 float-left"
            />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
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
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
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
            <Button className="bg-teal-500 text-white rounded-full px-6 py-2 w-full md:w-auto">Send Connection Request</Button>
            <Button className="bg-gray-200 text-gray-700 rounded-full px-6 py-2 w-full md:w-auto ml-2" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

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

  const viewProfile = (matchId) => {
    const match = mockMatches.find(m => m.id === matchId);
    setSelectedMatch(match);
  };

  const connectWithMatch = (matchId) => {
    const match = mockMatches.find(m => m.id === matchId);
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
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
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
                  <Button variant="ghost" className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-6 py-2 w-1/2">
                    <Bell className="h-4 w-4 mr-2" /> Group Updates
                  </Button>
                  <Button className="bg-teal-500 text-white rounded-full px-6 py-2 w-1/2">Request Match</Button>
                </div>
                {/* Desktop View */}
                <div className="hidden md:flex md:justify-between md:items-center md:mb-2">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">Lagos Tech Circle</h1>
                    <span className="text-white bg-teal-500 text-sm font-normal px-2 py-1 rounded-full ml-2">Active</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-6 py-2">
                      <Bell className="h-4 w-4 mr-2" /> Group Updates
                    </Button>
                    <Button className="bg-teal-500 text-white rounded-full px-6 py-2">Request Match</Button>
                    <Button 
                      variant="ghost" 
                      className="bg-teal-500 text-white rounded-full px-4 py-1 text-sm"
                    >
                      <Users className="h-4 w-4 mr-2" /> View Accepted Connections
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block text-sm text-gray-600 flex items-center">
                  <Users className="h-4 w-4 mr-1" /> 546 members <Heart className="h-4 w-4 mx-2 text-red-500" /> 345 matches
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                  <ChevronUp className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">New Matches</p>
                  <p className="text-2xl font-bold text-navy-700">2 <span className="text-sm text-navy-700">+2 this week</span></p>
                </div>
              </Card>
              <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">Meetups Planned</p>
                  <p className="text-2xl font-bold text-navy-700">1 <span className="text-sm text-navy-700">1 upcoming</span></p>
                </div>
              </Card>
              <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">Profile Views</p>
                  <p className="text-2xl font-bold text-navy-700">15 <span className="text-sm text-navy-700">+6% from last week</span></p>
                </div>
              </Card>
              <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">Satisfaction Rate</p>
                  <p className="text-2xl font-bold text-navy-700">95% <span className="text-sm text-navy-700">Based on feedback</span></p>
                </div>
              </Card>
            </div>

            {/* Recent Matches and Activity Section */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="lg:w-2/3">
                <Card className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Matches</h2>
                    <Button variant="link" className="text-teal-500" onClick={() => setShowAllMatches(true)}>
                      View All <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recentMatches.slice(0, 4).map((match) => (
                      <Card key={match.id} className="bg-white rounded-lg shadow-sm p-4 w-full">
                        <CardHeader className="p-0">
                          <img src={match.image} alt={match.name} className="w-full h-48 object-cover rounded-t-lg" />
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <h3 className="font-semibold">{match.name}</h3>
                          <p className="text-sm text-gray-500">{match.role} | Lagos Tech Circle</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {match.interests.map((interest, index) => (
                              <span key={index} className="text-xs bg-teal-100 text-teal-500 px-2 py-1 rounded-full">{interest}</span>
                            ))}
                          </div>
                          <div className="flex justify-between mt-4 space-x-2">
                            <Button 
                              variant="ghost" 
                              className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-3 py-1 flex-1 text-sm min-w-0 truncate" 
                              onClick={() => viewProfile(match.id)}
                            >
                              View Profile
                            </Button>
                            <Button 
                              className="bg-teal-500 text-white rounded-full px-3 py-1 flex-1 text-sm min-w-0 truncate" 
                              onClick={() => connectWithMatch(match.id)}
                            >
                              Connect
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="lg:w-1/3">
                <Card className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <Button variant="link" className="text-teal-500" onClick={() => setShowAllActivities(true)}>
                      View All <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex flex-col">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                            {activity.status === "pending" && <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>}
                            {activity.date && <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>}
                            {activity.feedback && <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>}
                            {activity.action.includes("confirmed") && <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>}
                          </div>
                          <div className="flex-1 flex justify-start">
                            <p className="text-sm font-medium">{activity.user} {activity.action}</p>
                            <p className="text-xs text-gray-500 ml-4">{activity.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-start space-x-2">
                          {activity.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-teal-500 text-white px-6 py-1 rounded-full">Accept</Button>
                              <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 px-6 py-1 rounded-full">Decline</Button>
                            </>
                          )}
                          {activity.date && <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 px-6 py-1 rounded-full">View Details</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {showAllMatches && (
          <div className="mb-6">
            <Card className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Matches</h2>
                <Button variant="link" className="text-teal-500" onClick={() => setShowAllMatches(false)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentMatches.map((match) => (
                  <Card key={match.id} className="bg-white rounded-lg shadow-sm p-4 w-full">
                    <CardHeader className="p-0">
                      <img src={match.image} alt={match.name} className="w-full h-48 object-cover rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <h3 className="font-semibold">{match.name}</h3>
                      <p className="text-sm text-gray-500">{match.role} | Lagos Tech Circle</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {match.interests.map((interest, index) => (
                          <span key={index} className="text-xs bg-teal-100 text-teal-500 px-2 py-1 rounded-full">{interest}</span>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4 space-x-2">
                        <Button 
                          variant="ghost" 
                          className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-3 py-1 flex-1 text-sm min-w-0 truncate" 
                          onClick={() => viewProfile(match.id)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          className="bg-teal-500 text-white rounded-full px-3 py-1 flex-1 text-sm min-w-0 truncate" 
                          onClick={() => connectWithMatch(match.id)}
                        >
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {showAllActivities && (
          <div className="mb-6">
            <Card className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Activities</h2>
                <Button variant="link" className="text-teal-500" onClick={() => setShowAllActivities(false)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              </div>
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                        {activity.status === "pending" && <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>}
                        {activity.date && <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>}
                        {activity.feedback && <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>}
                        {activity.action.includes("confirmed") && <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>}
                      </div>
                      <div className="flex-1 flex justify-start">
                        <p className="text-sm font-medium">{activity.user} {activity.action}</p>
                        <p className="text-xs text-gray-500 ml-4">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex justify-start space-x-2">
                      {activity.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-teal-500 text-white px-6 py-1 rounded-full">Accept</Button>
                          <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 px-6 py-1 rounded-full">Decline</Button>
                        </>
                      )}
                      {activity.date && <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 px-6 py-1 rounded-full">View Details</Button>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
