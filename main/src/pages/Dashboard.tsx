import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Users, Bell, Heart, ChevronUp } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

// Mock data for recent matches with real images
const mockMatches = [
  {
    id: "m1",
    name: "Jessica Williams",
    role: "Professional",
    interests: ["Art", "Design", "Reading"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    status: "Pending",
  },
  {
    id: "m2",
    name: "David Brown",
    role: "Romance",
    interests: ["Music", "Travel", "Photography"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    status: "Pending",
  },
  {
    id: "m3",
    name: "Sarah Thompson",
    role: "Professional",
    interests: ["Technology", "Entrepreneurship", "Design"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    status: "Confirmed",
  },
  {
    id: "m4",
    name: "Michael Johnson",
    role: "Friendship",
    interests: ["Gaming", "Technology", "Movies"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    status: "Meetup Planned",
  },
  {
    id: "m5",
    name: "Emily Davis",
    role: "Professional",
    interests: ["Tech", "Innovation", "Coding"],
    image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    status: "Pending",
  },
  {
    id: "m6",
    name: "John Smith",
    role: "Friendship",
    interests: ["Sports", "Travel", "Music"],
    image: "https://images.unsplash.com/photo-1531123897727-8f129e672f9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    status: "Confirmed",
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentMatches, setRecentMatches] = useState(mockMatches.slice(0, 4));
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [recentActivity, setRecentActivity] = useState(mockActivities.slice(0, 4));
  const [showAllActivities, setShowAllActivities] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        {!showAllMatches && !showAllActivities && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Lagos Tech Circle</h1>
                  <span className="text-white bg-teal-500 text-sm font-normal px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Users className="h-4 w-4 mr-1" /> 546 members <Heart className="h-4 w-4 mx-2 text-red-500" /> 345 matches
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-600 border border-gray-200 rounded-full px-6 py-2 flex-1">
                    <Bell className="h-4 w-4 mr-2" /> Group Updates
                  </Button>
                  <Button className="bg-teal-500 text-white rounded-full px-6 py-2 flex-1">Request Match</Button>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-teal-50 text-teal-500 border-teal-500 hover:bg-teal-100 rounded-full mb-6 flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" /> View Accepted Connections
            </Button>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-white rounded-lg shadow-sm p-6 flex items-center w-full">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <ChevronUp className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">New Matches</p>
                  <p className="text-lg font-semibold">2 <span className="text-teal-500">+2 this week</span></p>
                </div>
              </Card>
              <Card className="bg-white rounded-lg shadow-sm p-6 flex items-center w-full">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Meetups Planned</p>
                  <p className="text-lg font-semibold">1 <span className="text-teal-500">1 upcoming</span></p>
                </div>
              </Card>
              <Card className="bg-white rounded-lg shadow-sm p-6 flex items-center w-full">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Profile Views</p>
                  <p className="text-lg font-semibold">15 <span className="text-teal-500">+6% from last week</span></p>
                </div>
              </Card>
              <Card className="bg-white rounded-lg shadow-sm p-6 flex items-center w-full">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Satisfaction Rate</p>
                  <p className="text-lg font-semibold">95% <span className="text-teal-500">Based on feedback</span></p>
                </div>
              </Card>
            </div>

            {/* Recent Matches Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Matches</h2>
                <Button variant="link" className="text-teal-500" onClick={() => setShowAllMatches(true)}>View All</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentMatches.map((match) => (
                  <Card key={match.id} className="bg-white rounded-lg shadow-sm p-4">
                    <CardHeader className="p-0">
                      <img src={match.image} alt={match.name} className="w-full h-48 object-cover rounded-t-lg" />
                      <div className="absolute top-2 right-2">
                        <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded-full">{match.status}</span>
                      </div>
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
                        <Button variant="ghost" className="text-gray-600 border border-gray-200 rounded-full px-4 py-2">
                          View Profile
                        </Button>
                        <Button className="bg-teal-500 text-white rounded-full px-4 py-2">Connect</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Button variant="link" className="text-teal-500" onClick={() => setShowAllActivities(true)}>View All</Button>
              </div>
              <Card className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center">
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
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.user} {activity.action}</p>
                        {activity.date && <p className="text-xs text-gray-500">{activity.date}</p>}
                        {activity.location && <p className="text-xs text-gray-500">{activity.location}</p>}
                        {activity.feedback && (
                          <div className="text-xs text-gray-500">
                            {activity.feedback} <span className="text-yellow-400">{"★".repeat(activity.rating)}</span>
                          </div>
                        )}
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-teal-500 text-white px-3 py-1 rounded-full">Accept</Button>
                          <Button variant="outline" size="sm" className="text-gray-700 px-3 py-1 rounded-full">Decline</Button>
                        </div>
                      )}
                      {activity.date && <Button variant="outline" size="sm" className="text-gray-700 px-3 py-1 rounded-full">View Details</Button>}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {showAllMatches && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Matches</h2>
              <Button variant="link" className="text-teal-500" onClick={() => setShowAllMatches(false)}>Back</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentMatches.map((match) => (
                <Card key={match.id} className="bg-white rounded-lg shadow-sm p-4">
                  <CardHeader className="p-0">
                    <img src={match.image} alt={match.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="absolute top-2 right-2">
                      <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded-full">{match.status}</span>
                    </div>
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
                      <Button variant="ghost" className="text-gray-600 border border-gray-200 rounded-full px-4 py-2">
                        View Profile
                      </Button>
                      <Button className="bg-teal-500 text-white rounded-full px-4 py-2">Connect</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {showAllActivities && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Activities</h2>
              <Button variant="link" className="text-teal-500" onClick={() => setShowAllActivities(false)}>Back</Button>
            </div>
            <Card className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
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
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user} {activity.action}</p>
                      {activity.date && <p className="text-xs text-gray-500">{activity.date}</p>}
                      {activity.location && <p className="text-xs text-gray-500">{activity.location}</p>}
                      {activity.feedback && (
                        <div className="text-xs text-gray-500">
                          {activity.feedback} <span className="text-yellow-400">{"★".repeat(activity.rating)}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-teal-500 text-white px-3 py-1 rounded-full">Accept</Button>
                        <Button variant="outline" size="sm" className="text-gray-700 px-3 py-1 rounded-full">Decline</Button>
                      </div>
                    )}
                    {activity.date && <Button variant="outline" size="sm" className="text-gray-700 px-3 py-1 rounded-full">View Details</Button>}
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
