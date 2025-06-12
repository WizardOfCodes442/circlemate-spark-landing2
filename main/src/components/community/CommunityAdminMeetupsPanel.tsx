import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Calendar, Clock, MapPin, Users, CircleCheck, CircleX, Star, ChevronDown, Edit } from 'lucide-react';

const CommunityAdminMeetupsPanel = () => {
  const [meetups, setMeetups] = useState([
    {
      id: 1,
      title: 'Tech Networking Lunch',
      date: '2023-12-10T12:30:00',
      location: 'Radisson Blu Hotel, Lagos',
      status: 'upcoming',
      confirmed: true,
      participants: [
        { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Sophia Chen', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      ],
      notes: 'Business cards recommended. Casual business attire.',
    },
    {
      id: 2,
      title: 'Coffee Chat - Career Mentoring',
      date: '2023-12-15T15:00:00',
      location: 'Art Cafe, Victoria Island',
      status: 'upcoming',
      confirmed: false,
      participants: [
        { name: 'Marcus Williams', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Emma Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { name: 'Liam Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Olivia Davis', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      ],
      notes: 'Informal mentorship session. Emma is looking for career guidance.',
    },
    {
      id: 3,
      title: 'Startup Pitch Night',
      date: '2023-11-01T18:00:00',
      location: 'Online',
      status: 'completed',
      confirmed: true,
      participants: [
        { name: 'Noah Wilson', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { name: 'Ava Martinez', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      ],
      notes: 'Successful event with 10 pitches.',
    },
    {
      id: 4,
      title: 'Hackathon',
      date: '2023-10-20T09:00:00',
      location: 'Tech Hub, Lagos',
      status: 'cancelled',
      confirmed: false,
      participants: [
        { name: 'Ethan Taylor', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { name: 'Isabella Anderson', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { name: 'James Thomas', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
        { name: 'Mia Jackson', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
      ],
      notes: 'Cancelled due to venue issues.',
    },
  ]);

  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentMeetup, setCurrentMeetup] = useState(null);
  const [newMeetup, setNewMeetup] = useState({
    title: '',
    date: '',
    location: '',
    notes: '',
  });
  const [editMeetup, setEditMeetup] = useState({
    title: '',
    date: '',
    location: '',
    notes: '',
  });

  const upcomingCount = meetups.filter((m) => m.status === 'upcoming').length;
  const completedCount = meetups.filter((m) => m.status === 'completed').length;
  const cancelledCount = meetups.filter((m) => m.status === 'cancelled').length;
  const totalMeetups = meetups.length;
  const successRate = totalMeetups > 0 ? Math.round((completedCount / totalMeetups) * 100) : 0;
  const averageRating = 4.8; // Static for demo; replace with dynamic data if available

  const handleStatusChange = (meetupId, newStatus) => {
    setMeetups(
      meetups.map((meetup) =>
        meetup.id === meetupId
          ? { ...meetup, status: newStatus, confirmed: newStatus === 'completed' }
          : meetup
      )
    );
  };

  const handleRestore = (meetupId) => {
    setMeetups(
      meetups.map((meetup) =>
        meetup.id === meetupId ? { ...meetup, status: 'upcoming', confirmed: false } : meetup
      )
    );
    setIsParticipantsDialogOpen(false);
  };

  const handleShowParticipants = (participants) => {
    setSelectedParticipants(participants);
    setIsParticipantsDialogOpen(true);
  };

  const handleScheduleMeetup = () => {
    setMeetups([
      ...meetups,
      {
        id: meetups.length + 1,
        title: newMeetup.title,
        date: new Date(newMeetup.date).toISOString(),
        location: newMeetup.location,
        status: 'upcoming',
        confirmed: false,
        participants: [],
        notes: newMeetup.notes,
      },
    ]);
    setNewMeetup({ title: '', date: '', location: '', notes: '' });
    setIsScheduleDialogOpen(false);
  };

  const handleOpenEditDialog = (meetup) => {
    setCurrentMeetup(meetup);
    setEditMeetup({
      title: meetup.title,
      date: new Date(meetup.date).toISOString().slice(0, 16),
      location: meetup.location,
      notes: meetup.notes,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditMeetup = () => {
    setMeetups(
      meetups.map((meetup) =>
        meetup.id === currentMeetup.id
          ? {
              ...meetup,
              title: editMeetup.title,
              date: new Date(editMeetup.date).toISOString(),
              location: editMeetup.location,
              notes: editMeetup.notes,
            }
          : meetup
      )
    );
    setIsEditDialogOpen(false);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-full">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Meetup Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Track scheduled, completed, and canceled meetups within the community.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="july">July</SelectItem>
                <SelectItem value="august">August</SelectItem>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">December</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Meetup Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="mentoring">Mentoring</SelectItem>
                <SelectItem value="pitch">Pitch</SelectItem>
                <SelectItem value="hackathon">Hackathon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Total Meetups</div>
            <div className="text-2xl font-bold">{totalMeetups}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Upcoming</div>
            <div className="text-2xl font-bold">{upcomingCount}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Success Rate</div>
            <div className="text-2xl font-bold">{successRate}%</div>
            <Progress value={successRate} className="mt-2" />
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-gray-500 mb-1 text-sm">Average Rating</div>
            <div className="text-2xl font-bold">{averageRating}/5</div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground mb-4 bg-muted">
            <TabsTrigger
              value="upcoming"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <Calendar className="h-4 w-4" />
              Upcoming
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500 text-white ml-1">
                {upcomingCount}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <CircleCheck className="h-4 w-4" />
              Completed
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500 text-white ml-1">
                {completedCount}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <CircleX className="h-4 w-4" />
              Cancelled
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-500 text-white ml-1">
                {cancelledCount}
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="border rounded-md p-4 space-y-4">
            {meetups
              .filter((meetup) => meetup.status === 'upcoming')
              .map((meetup) => (
                <div key={meetup.id} className="bg-white rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{meetup.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        meetup.confirmed ? 'bg-green-500' : 'bg-amber-500'
                      } text-primary-foreground`}
                    >
                      {meetup.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
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
                    <div
                      className="flex -space-x-2 cursor-pointer"
                      onClick={() => meetup.participants.length > 3 && handleShowParticipants(meetup.participants)}
                    >
                      {meetup.participants.slice(0, 3).map((participant, index) => (
                        <span
                          key={index}
                          className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6 border-2 border-white"
                        >
                          <img className="aspect-square h-full w-full" alt={participant.name} src={participant.avatar} />
                        </span>
                      ))}
                      {meetup.participants.length > 3 && (
                        <span className="relative flex shrink-0 rounded-full h-6 w-6 border-2 border-white bg-gray-200 text-xs flex items-center justify-center">
                          +{meetup.participants.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Notes:</span> {meetup.notes}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(meetup.id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(meetup.id, 'completed')}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditDialog(meetup)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="completed" className="border rounded-md p-4 space-y-4">
            {meetups
              .filter((meetup) => meetup.status === 'completed')
              .map((meetup) => (
                <div key={meetup.id} className="bg-white rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{meetup.title}</h3>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500 text-primary-foreground">
                      Confirmed
                    </span>
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
                    <div
                      className="flex -space-x-2 cursor-pointer"
                      onClick={() => meetup.participants.length > 3 && handleShowParticipants(meetup.participants)}
                    >
                      {meetup.participants.slice(0, 3).map((participant, index) => (
                        <span
                          key={index}
                          className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6 border-2 border-white"
                        >
                          <img className="aspect-square h-full w-full" alt={participant.name} src={participant.avatar} />
                        </span>
                      ))}
                      {meetup.participants.length > 3 && (
                        <span className="relative flex shrink-0 rounded-full h-6 w-6 border-2 border-white bg-gray-200 text-xs flex items-center justify-center">
                          +{meetup.participants.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Notes:</span> {meetup.notes}
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="cancelled" className="border rounded-md p-4 space-y-4">
            {meetups
              .filter((meetup) => meetup.status === 'cancelled')
              .map((meetup) => (
                <div key={meetup.id} className="bg-white rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{meetup.title}</h3>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-500 text-primary-foreground">
                      Cancelled
                    </span>
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
                    <div
                      className="flex -space-x-2 cursor-pointer"
                      onClick={() => meetup.participants.length > 3 && handleShowParticipants(meetup.participants)}
                    >
                      {meetup.participants.slice(0, 3).map((participant, index) => (
                        <span
                          key={index}
                          className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6 border-2 border-white"
                        >
                          <img className="aspect-square h-full w-full" alt={participant.name} src={participant.avatar} />
                        </span>
                      ))}
                      {meetup.participants.length > 3 && (
                        <span className="relative flex shrink-0 rounded-full h-6 w-6 border-2 border-white bg-gray-200 text-xs flex items-center justify-center">
                          +{meetup.participants.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Notes:</span> {meetup.notes}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestore(meetup.id)}
                    >
                      Restore
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditDialog(meetup)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
        <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Participants</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2">
              {selectedParticipants.map((participant, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 border-2 border-white">
                    <img className="aspect-square h-full w-full" alt={participant.name} src={participant.avatar} />
                  </span>
                  <span>{participant.name}</span>
                </div>
              ))}
            </div>
            {meetups.find(
              (m) => m.participants === selectedParticipants && m.status === 'cancelled'
            ) && (
              <DialogFooter>
                <Button onClick={() => handleRestore(meetups.find((m) => m.participants === selectedParticipants).id)}>
                  Restore
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meetup
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Meetup</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newMeetup.title}
                  onChange={(e) => setNewMeetup({ ...newMeetup, title: e.target.value })}
                  placeholder="e.g., Tech Networking Lunch"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date and Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={newMeetup.date}
                  onChange={(e) => setNewMeetup({ ...newMeetup, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newMeetup.location}
                  onChange={(e) => setNewMeetup({ ...newMeetup, location: e.target.value })}
                  placeholder="e.g., Radisson Blu Hotel, Lagos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newMeetup.notes}
                  onChange={(e) => setNewMeetup({ ...newMeetup, notes: e.target.value })}
                  placeholder="e.g., Business cards recommended."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleMeetup}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Meetup</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editMeetup.title}
                  onChange={(e) => setEditMeetup({ ...editMeetup, title: e.target.value })}
                  placeholder="e.g., Tech Networking Lunch"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date and Time</Label>
                <Input
                  id="edit-date"
                  type="datetime-local"
                  value={editMeetup.date}
                  onChange={(e) => setEditMeetup({ ...editMeetup, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editMeetup.location}
                  onChange={(e) => setEditMeetup({ ...editMeetup, location: e.target.value })}
                  placeholder="e.g., Radisson Blu Hotel, Lagos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input
                  id="edit-notes"
                  value={editMeetup.notes}
                  onChange={(e) => setEditMeetup({ ...editMeetup, notes: e.target.value })}
                  placeholder="e.g., Business cards recommended."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditMeetup}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CommunityAdminMeetupsPanel;
