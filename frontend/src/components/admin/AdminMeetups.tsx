
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle2, Clock, MapPin, Users, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const UPCOMING_MEETUPS = [
  {
    id: '1',
    title: 'Tech Networking Lunch',
    status: 'confirmed',
    date: '2023-12-10T12:30:00',
    location: 'Radisson Blu Hotel, Lagos',
    participants: [
      { id: '1', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '2', name: 'Sophia Chen', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }
    ],
    notes: 'Business cards recommended. Casual business attire.'
  },
  {
    id: '2',
    title: 'Coffee Chat - Career Mentoring',
    status: 'pending',
    date: '2023-12-15T15:00:00',
    location: 'Art Cafe, Victoria Island',
    participants: [
      { id: '3', name: 'Marcus Williams', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { id: '4', name: 'Emma Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
    ],
    notes: 'Informal mentorship session. Emma is looking for career guidance.'
  }
];

const COMPLETED_MEETUPS = [
  {
    id: '3',
    title: 'Business Strategy Workshop',
    date: '2023-11-20T14:00:00',
    location: 'Lagos Business School',
    participants: [
      { id: '1', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '5', name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ],
    feedback: {
      rating: 4.5,
      comments: 'Great discussion on business strategy. Looking forward to future collaborations.',
    }
  },
  {
    id: '4',
    title: 'Yoga in the Park',
    date: '2023-11-15T09:00:00',
    location: 'Freedom Park, Lagos',
    participants: [
      { id: '2', name: 'Sophia Chen', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: '4', name: 'Emma Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
    ],
    feedback: {
      rating: 5,
      comments: 'Wonderful experience! Great way to make friends with similar interests.',
    }
  }
];

const CANCELLED_MEETUPS = [
  {
    id: '5',
    title: 'Product Design Workshop',
    date: '2023-11-05T10:00:00',
    location: 'Impact Hub, Lagos',
    participants: [
      { id: '3', name: 'Marcus Williams', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { id: '6', name: 'Jessica Taylor', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' }
    ],
    cancelReason: 'Scheduling conflict',
    cancelledBy: { id: '3', name: 'Marcus Williams' }
  }
];

// Stats calculation
const getTotalMeetups = () => UPCOMING_MEETUPS.length + COMPLETED_MEETUPS.length + CANCELLED_MEETUPS.length;
const getSuccessRate = () => {
  const total = COMPLETED_MEETUPS.length + CANCELLED_MEETUPS.length;
  return total > 0 ? Math.round((COMPLETED_MEETUPS.length / total) * 100) : 100;
};
const getAverageRating = () => {
  const ratings = COMPLETED_MEETUPS.map(meetup => meetup.feedback?.rating || 0);
  return ratings.length > 0 ? 
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 
    0;
};

const AdminMeetups: React.FC = () => {
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterType, setFilterType] = useState('all');

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <CardTitle>Meetup Monitoring</CardTitle>
            <CardDescription>
              Track scheduled, completed, and canceled meetups within the community.
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select 
              value={filterMonth} 
              onValueChange={setFilterMonth}
            >
              <SelectTrigger className="w-[140px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Month</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
                <SelectItem value="01">January</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={filterType} 
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-[140px]">
                <span>Meetup Type</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="friendship">Friendship</SelectItem>
                <SelectItem value="mentorship">Mentorship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Total Meetups</div>
            <div className="text-2xl font-bold">{getTotalMeetups()}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Upcoming</div>
            <div className="text-2xl font-bold">{UPCOMING_MEETUPS.length}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Success Rate</div>
            <div className="text-2xl font-bold">{getSuccessRate()}%</div>
            <Progress value={getSuccessRate()} className="h-2 mt-2" />
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Average Rating</div>
            <div className="text-2xl font-bold">{getAverageRating().toFixed(1)}/5</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map(star => (
                <svg 
                  key={star} 
                  className={`w-4 h-4 ${star <= Math.round(getAverageRating()) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-4 bg-muted">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Upcoming</span>
              <Badge className="ml-1 bg-blue-500 text-white">{UPCOMING_MEETUPS.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
              <Badge className="ml-1 bg-green-500 text-white">{COMPLETED_MEETUPS.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span>Cancelled</span>
              <Badge className="ml-1 bg-red-500 text-white">{CANCELLED_MEETUPS.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="border rounded-md p-4 space-y-4">
            {UPCOMING_MEETUPS.length > 0 ? (
              UPCOMING_MEETUPS.map(meetup => (
                <div key={meetup.id} className="bg-white rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{meetup.title}</h3>
                    <Badge className={meetup.status === 'confirmed' ? 'bg-green-500' : 'bg-amber-500'}>
                      {meetup.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {new Date(meetup.date).toLocaleString()}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {meetup.location}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Participants:</span>
                    <div className="flex -space-x-2">
                      {meetup.participants.map(participant => (
                        <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  
                  {meetup.notes && (
                    <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <span className="font-medium">Notes:</span> {meetup.notes}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">No upcoming meetups</p>
                <Button variant="outline">Create Meetup</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="border rounded-md p-4 space-y-4">
            {COMPLETED_MEETUPS.length > 0 ? (
              COMPLETED_MEETUPS.map(meetup => (
                <div key={meetup.id} className="bg-white rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">{meetup.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {new Date(meetup.date).toLocaleString()}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {meetup.location}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Participants:</span>
                    <div className="flex -space-x-2">
                      {meetup.participants.map(participant => (
                        <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t pt-3">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-sm">Feedback:</span>
                      <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg 
                            key={star} 
                            className={`w-4 h-4 ${star <= Math.round(meetup.feedback?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {meetup.feedback?.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      "{meetup.feedback?.comments}"
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No completed meetups</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled" className="border rounded-md p-4 space-y-4">
            {CANCELLED_MEETUPS.length > 0 ? (
              CANCELLED_MEETUPS.map(meetup => (
                <div key={meetup.id} className="bg-white rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{meetup.title}</h3>
                    <Badge variant="destructive">Cancelled</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {new Date(meetup.date).toLocaleString()}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {meetup.location}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Participants:</span>
                    <div className="flex -space-x-2">
                      {meetup.participants.map(participant => (
                        <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
                    <span className="font-medium">Cancelled by {meetup.cancelledBy?.name}:</span> {meetup.cancelReason}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No cancelled meetups</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminMeetups;
