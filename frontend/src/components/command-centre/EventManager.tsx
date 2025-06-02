
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flag, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";

const mockEvents = [
  {
    id: 'evt-1',
    name: 'Tech Networking Mixer',
    communityName: 'Tech Enthusiasts Group',
    date: '2025-06-15',
    price: 15.00,
    attendees: 45,
    status: 'upcoming',
    description: 'Join us for an evening of networking with professionals in the tech industry. Refreshments will be provided.'
  },
  {
    id: 'evt-2',
    name: 'Wellness Workshop',
    communityName: 'Mindful Living Circle',
    date: '2025-06-12',
    price: 0,
    attendees: 28,
    status: 'upcoming',
    description: 'Learn techniques for stress reduction and mindfulness in this interactive workshop.'
  },
  {
    id: 'evt-3',
    name: 'Business Strategy Seminar',
    communityName: 'Entrepreneur Network',
    date: '2025-06-10',
    price: 25.00,
    attendees: 52,
    status: 'upcoming',
    description: 'Discover effective business strategies from industry experts that will help your startup thrive.'
  },
  {
    id: 'evt-4',
    name: 'Book Club Meeting',
    communityName: 'Literary Minds',
    date: '2025-06-08',
    price: 0,
    attendees: 18,
    status: 'upcoming',
    description: 'This month we\'re discussing "The Midnight Library" by Matt Haig. All are welcome!'
  }
];

const EventManager = () => {
  const [viewEvent, setViewEvent] = useState(null);
  const [flagEvent, setFlagEvent] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const { toast } = useToast();
  
  const handleViewEvent = (event) => {
    setViewEvent(event);
  };
  
  const handleFlagEvent = (event) => {
    setFlagEvent(event);
  };
  
  const submitFlag = () => {
    toast({
      title: "Event Flagged",
      description: `${flagEvent.name} has been flagged for review`,
      variant: "destructive"
    });
    setFlagEvent(null);
  };
  
  const handleViewAllEvents = () => {
    setShowAllEvents(true);
    toast({
      title: "All Events View",
      description: "Viewing all platform events. This would typically show a full event calendar.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Upcoming Events</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleViewAllEvents}
        >
          <Calendar className="h-4 w-4" />
          All Events
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Community</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.communityName}</TableCell>
                <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-gray-500" />
                    <span>{event.attendees}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewEvent(event)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-amber-500"
                      onClick={() => handleFlagEvent(event)}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Event Dialog */}
      <Dialog open={!!viewEvent} onOpenChange={() => setViewEvent(null)}>
        <DialogContent className="max-w-3xl">
          {viewEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{viewEvent.name}</DialogTitle>
                <DialogDescription>
                  Hosted by {viewEvent.communityName}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Event Details</h3>
                    <p className="text-sm text-gray-600 mb-4">{viewEvent.description}</p>
                    
                    <h4 className="font-medium mb-1 text-sm">Date & Time</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(viewEvent.date).toLocaleDateString()} at 6:30 PM
                    </p>
                    
                    <h4 className="font-medium mb-1 text-sm">Location</h4>
                    <p className="text-sm text-gray-600">Central Community Center, Room 204</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Ticket Price</h4>
                      <Badge>
                        {viewEvent.price > 0 ? `$${viewEvent.price.toFixed(2)}` : 'Free'}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Attendees</h4>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{viewEvent.attendees} registered</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Status</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {viewEvent.status.charAt(0).toUpperCase() + viewEvent.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-amber-500 mr-auto"
                  onClick={() => {
                    setViewEvent(null);
                    setFlagEvent(viewEvent);
                  }}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Flag Event
                </Button>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Flag Event Dialog */}
      <Dialog open={!!flagEvent} onOpenChange={() => setFlagEvent(null)}>
        <DialogContent>
          {flagEvent && (
            <>
              <DialogHeader>
                <DialogTitle>Flag Event</DialogTitle>
                <DialogDescription>
                  Flag "{flagEvent.name}" for review by administrators
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Flag Reason</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inappropriate" />
                      <label htmlFor="inappropriate" className="text-sm">Inappropriate Content</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="misleading" />
                      <label htmlFor="misleading" className="text-sm">Misleading Information</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="commercial" />
                      <label htmlFor="commercial" className="text-sm">Unauthorized Commercial Content</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duplicate" />
                      <label htmlFor="duplicate" className="text-sm">Duplicate Event</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="other-flag" />
                      <label htmlFor="other-flag" className="text-sm">Other</label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Additional Comments</h3>
                  <Textarea placeholder="Provide more details about why you're flagging this event..." />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setFlagEvent(null)}>Cancel</Button>
                <Button variant="destructive" onClick={submitFlag}>Submit Flag</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* All Events Calendar Dialog */}
      <Dialog open={showAllEvents} onOpenChange={setShowAllEvents}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Event Calendar</DialogTitle>
            <DialogDescription>
              All upcoming platform events
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="border p-6 rounded-md bg-gray-50 text-center">
              <Calendar className="h-16 w-16 mx-auto text-teal mb-3" />
              <p className="text-lg font-medium mb-1">Event Calendar View</p>
              <p className="text-sm text-gray-600">
                In a full implementation, this would display a calendar with all platform events.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">All Upcoming Events ({mockEvents.length})</h3>
              <div className="space-y-3">
                {mockEvents.map(event => (
                  <div key={event.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-gray-500">
                        {event.communityName} • {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setShowAllEvents(false);
                        setViewEvent(event);
                      }}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventManager;
