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

export default EventsTab;
