<<<<<<< HEAD
=======

>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
import { TabsContent } from "@/components/ui/tabs";
import EventsList from "./EventsList";

interface Event {
  id: string;
  title: string;
  community: string;
  communityImage: string;
  description: string;
  date: string;
  location: string;
  attendeeCount: number;
  isRegistered: boolean;
}

interface EventsTabProps {
  value: string;
  events: Event[];
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
  emptyMessage: string;
  emptyButtonText?: string;
  onEmptyButtonClick?: () => void;
}

const EventsTab = ({ 
  value, 
  events, 
  onRegister, 
  onUnregister, 
  emptyMessage, 
  emptyButtonText, 
  onEmptyButtonClick 
}: EventsTabProps) => {
  return (
    <TabsContent value={value} className="mt-6">
      <EventsList
        events={events}
        onRegister={onRegister}
        onUnregister={onUnregister}
        emptyMessage={emptyMessage}
        emptyButtonText={emptyButtonText}
        onEmptyButtonClick={onEmptyButtonClick}
      />
    </TabsContent>
  );
};

<<<<<<< HEAD
export default EventsTab;
=======
export default EventsTab;
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
