
import { Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/DashboardHeader";

// Mock data for events
const mockEvents = [
  {
    id: "1",
    title: "Tech Meetup 2025",
    community: "Tech Enthusiasts",
    communityImage: "/placeholder.svg",
    description: "Join us for our annual tech meetup with industry experts and networking opportunities.",
    date: "2025-06-15T18:00:00",
    location: "San Francisco Convention Center",
    attendeeCount: 87,
    isRegistered: true
  },
  {
    id: "2",
    title: "Book Club: Sci-Fi Month",
    community: "Book Club",
    communityImage: "/placeholder.svg",
    description: "This month we're discussing classic and modern science fiction literature.",
    date: "2025-05-28T19:00:00",
    location: "Boston Public Library, Room 302",
    attendeeCount: 24,
    isRegistered: false
  },
  {
    id: "3",
    title: "Morning Yoga in the Park",
    community: "Fitness Fanatics",
    communityImage: "/placeholder.svg",
    description: "Start your day with energizing yoga poses and breathing exercises in the open air.",
    date: "2025-06-05T08:00:00",
    location: "Central Park, Toronto",
    attendeeCount: 35,
    isRegistered: true
  }
];

const Events = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const upcomingEvents = mockEvents.filter(event => isUpcoming(event.date));
  const registeredEvents = mockEvents.filter(event => event.isRegistered);

  const handleRegister = (eventId: string) => {
    console.log(`Register for event ${eventId}`);
  };

  const handleUnregister = (eventId: string) => {
    console.log(`Unregister from event ${eventId}`);
  };

  const handleBrowseUpcoming = () => {
    const upcomingTab = document.querySelector('[data-state="inactive"][value="upcoming"]') as HTMLElement;
    if (upcomingTab) {
      upcomingTab.click();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Events</h1>
        </div>
        
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="upcoming">All Upcoming</TabsTrigger>
            <TabsTrigger value="registered">Registered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-primary/20 to-primary-dark/5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={event.communityImage} alt={event.community} />
                          <AvatarFallback>{event.community.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <div className="text-sm text-muted-foreground">{event.community}</div>
                        </div>
                      </div>
                      {event.isRegistered && (
                        <Badge variant="secondary">Registered</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendeeCount} Attending</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    {event.isRegistered ? (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleUnregister(event.id)}
                      >
                        Cancel Registration
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => handleRegister(event.id)}
                      >
                        Register
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              {upcomingEvents.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground mb-4">There are no upcoming events at the moment.</p>
                  <Button>Create an Event</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="registered" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-primary/20 to-primary-dark/5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={event.communityImage} alt={event.community} />
                          <AvatarFallback>{event.community.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <div className="text-sm text-muted-foreground">{event.community}</div>
                        </div>
                      </div>
                      <Badge variant="secondary">Registered</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendeeCount} Attending</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleUnregister(event.id)}
                    >
                      Cancel Registration
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {registeredEvents.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
                  <Button onClick={handleBrowseUpcoming}>
                    Browse Upcoming Events
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Events;
