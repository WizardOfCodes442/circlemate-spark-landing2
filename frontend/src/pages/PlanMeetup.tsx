
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/layout/Layout';

const venues = [
  {
    id: '1',
    name: 'The Brew House',
    type: 'Coffee Shop',
    address: '123 Lekki Way, Lagos',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Tech Hub Lagos',
    type: 'Co-working Space',
    address: '456 Victoria Island, Lagos',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Seaside Cafe',
    type: 'Restaurant',
    address: '789 Marina, Lagos',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const PlanMeetup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedVenue, setSelectedVenue] = useState<string | undefined>(undefined);
  
  // This would typically be fetched from API based on ID
  const matchData = {
    id,
    name: id === '1' ? 'Sarah Thompson' : id === '2' ? 'Michael Johnson' : id === '3' ? 'Jessica Williams' : 'David Brown',
    avatar: id === '1' 
      ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      : id === '2'
        ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        : id === '3'
          ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
          : 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  };
  
  const handleScheduleMeetup = () => {
    if (!selectedDate || !selectedTime || !selectedVenue) {
      toast({
        title: "Missing information",
        description: "Please select a date, time and venue for your meetup.",
        variant: "destructive",
      });
      return;
    }
    
    // This would typically send the request to API
    setTimeout(() => {
      toast({
        title: "Meetup scheduled!",
        description: `Your meetup with ${matchData.name} has been scheduled.`,
      });
      navigate('/dashboard');
    }, 1000);
  };
  
  const getVenueById = (venueId: string) => {
    return venues.find(venue => venue.id === venueId);
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <Button 
          variant="ghost" 
          className="flex items-center mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-navy mb-6">Plan a Meetup with {matchData.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={matchData.avatar} 
                alt={matchData.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-navy">{matchData.name}</h2>
                <p className="text-sm text-gray-600">Mutual match</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-navy mb-4">1. Select a Date</h3>
                <div className="mb-6">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => 
                          date < new Date() || 
                          date > new Date(new Date().setDate(new Date().getDate() + 14))
                        }
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <h3 className="font-semibold text-navy mb-4">2. Select a Time</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`px-3 py-2 rounded-md text-sm ${
                        selectedTime === time 
                          ? 'bg-teal text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button
                    disabled={!selectedDate || !selectedTime || !selectedVenue}
                    className="w-full bg-teal hover:bg-teal/90 text-white"
                    onClick={handleScheduleMeetup}
                  >
                    Schedule Meetup
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-navy mb-4">3. Select a Venue</h3>
                <div className="space-y-4">
                  {venues.map((venue) => (
                    <div
                      key={venue.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedVenue === venue.id 
                          ? 'ring-2 ring-teal' 
                          : 'hover:border-teal/50'
                      }`}
                      onClick={() => setSelectedVenue(venue.id)}
                    >
                      <div className="h-32 bg-gray-100">
                        <img
                          src={venue.image}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">{venue.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{venue.address}</span>
                        </div>
                        <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mt-2">
                          {venue.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlanMeetup;
