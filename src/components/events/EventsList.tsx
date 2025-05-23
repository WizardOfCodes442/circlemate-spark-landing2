
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";

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

interface EventsListProps {
  events: Event[];
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
  emptyMessage: string;
  emptyButtonText?: string;
  onEmptyButtonClick?: () => void;
}

const EventsList = ({ 
  events, 
  onRegister, 
  onUnregister, 
  emptyMessage, 
  emptyButtonText, 
  onEmptyButtonClick 
}: EventsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={onRegister}
          onUnregister={onUnregister}
        />
      ))}
      
      {events.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-muted-foreground mb-4">{emptyMessage}</p>
          {emptyButtonText && onEmptyButtonClick && (
            <Button onClick={onEmptyButtonClick}>
              {emptyButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsList;
