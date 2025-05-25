import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/DashboardHeader";
import EventsTab from "@/components/events/EventsTab";
import { Event } from "../../types";

// Mock data for events
const mockEvents: Event[] = [
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
          
          <EventsTab
            value="upcoming"
            events={upcomingEvents}
            onRegister={handleRegister}
            onUnregister={handleUnregister}
            emptyMessage="There are no upcoming events at the moment."
            emptyButtonText="Create an Event"
          />
          
          <EventsTab
            value="registered"
            events={registeredEvents}
            onRegister={handleRegister}
            onUnregister={handleUnregister}
            emptyMessage="You haven't registered for any events yet."
            emptyButtonText="Browse Upcoming Events"
            onEmptyButtonClick={handleBrowseUpcoming}
          />
        </Tabs>
      </main>
    </div>
  );
};

export default Events;
