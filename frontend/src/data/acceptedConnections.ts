
type ConnectionStatus = 'accepted' | 'pending';
type MeetupStatus = 'scheduled' | 'completed' | null;

export interface Connection {
  id: string;
  name: string;
  avatar: string;
  occupation: string;
  interests: string[];
  status: ConnectionStatus;
  meetupStatus: MeetupStatus;
  meetupDate?: string;
  meetupVenue?: string;
}

// This would typically be fetched from an API
export const acceptedConnections: Connection[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    occupation: 'Software Engineer',
    interests: ['Technology', 'Reading', 'Hiking'],
    status: 'accepted',
    meetupStatus: null
  },
  {
    id: '2',
    name: 'Michael Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    occupation: 'Product Manager',
    interests: ['Business', 'Travel', 'Photography'],
    status: 'accepted',
    meetupStatus: 'scheduled',
    meetupDate: 'May 25, 2025',
    meetupVenue: 'Tech Hub Lagos'
  },
  {
    id: '3',
    name: 'Jessica Williams',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    occupation: 'Marketing Director',
    interests: ['Marketing', 'Art', 'Music'],
    status: 'accepted',
    meetupStatus: 'completed',
    meetupDate: 'May 20, 2025',
    meetupVenue: 'The Brew House'
  },
];
