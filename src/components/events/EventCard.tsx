
import { Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
}

const EventCard = ({ event, onRegister, onUnregister }: EventCardProps) => {
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

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
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
            onClick={() => onUnregister(event.id)}
          >
            Cancel Registration
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={() => onRegister(event.id)}
          >
            Register
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
