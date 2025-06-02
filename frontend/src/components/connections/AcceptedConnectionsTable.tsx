
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageSquare, UserCheck } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

type ConnectionStatus = 'accepted' | 'pending';
type MeetupStatus = 'scheduled' | 'completed' | null;

interface Connection {
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

interface AcceptedConnectionsTableProps {
  connections: Connection[];
  activeTab: 'all' | 'pending' | 'scheduled' | 'completed';
}

const AcceptedConnectionsTable: React.FC<AcceptedConnectionsTableProps> = ({ 
  connections, 
  activeTab 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredConnections = connections.filter(connection => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return connection.meetupStatus === null;
    return connection.meetupStatus === activeTab;
  });

  const handlePlanMeetup = (connectionId: string) => {
    navigate(`/plan-meetup/${connectionId}`);
  };
  
  const handleViewConnection = (connectionId: string) => {
    navigate(`/connection/${connectionId}`);
  };
  
  const handleProvideFeedback = (connectionId: string) => {
    navigate(`/meetup-feedback/${connectionId}`);
  };
  
  const getMeetupStatusBadge = (status: MeetupStatus) => {
    if (status === 'scheduled') {
      return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Scheduled</span>;
    }
    if (status === 'completed') {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>;
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Pending</span>;
  };

  if (filteredConnections.length === 0) {
    return (
      <div className="text-center py-8">
        <UserCheck className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="font-medium text-gray-900">No connections found</h3>
        <p className="text-gray-500 mb-4">
          {activeTab === 'all' 
            ? "You don't have any accepted connections yet." 
            : `You don't have any ${activeTab} meetups.`}
        </p>
        <Button 
          className="bg-teal hover:bg-teal/90 text-white"
          onClick={() => navigate('/matches')}
        >
          Find Potential Matches
        </Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Occupation</TableHead>
          <TableHead className="hidden md:table-cell">Interests</TableHead>
          <TableHead>Meetup Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredConnections.map((connection) => (
          <TableRow key={connection.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={connection.avatar} alt={connection.name} />
                  <AvatarFallback>{connection.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{connection.name}</div>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{connection.occupation}</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex flex-wrap gap-1">
                {connection.interests.map((interest) => (
                  <span 
                    key={interest}
                    className="px-2 py-0.5 bg-gray-100 text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div>
                {getMeetupStatusBadge(connection.meetupStatus)}
                {connection.meetupStatus && (
                  <div className="text-xs text-gray-500 mt-1">
                    {connection.meetupDate} • {connection.meetupVenue}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8"
                  onClick={() => handleViewConnection(connection.id)}
                >
                  View
                </Button>
                
                {connection.meetupStatus === null && (
                  <Button 
                    size="sm"
                    className="h-8 bg-teal hover:bg-teal/90 text-white"
                    onClick={() => handlePlanMeetup(connection.id)}
                  >
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    Plan Meetup
                  </Button>
                )}
                
                {connection.meetupStatus === 'scheduled' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 border-yellow-500 text-yellow-500 hover:bg-yellow-50"
                    onClick={() => {
                      toast({
                        title: "Meetup Details",
                        description: `Your meetup with ${connection.name} is scheduled for ${connection.meetupDate} at ${connection.meetupVenue}.`,
                      });
                    }}
                  >
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    Details
                  </Button>
                )}
                
                {connection.meetupStatus === 'completed' && (
                  <Button 
                    size="sm"
                    className="h-8 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleProvideFeedback(connection.id)}
                  >
                    <MessageSquare className="mr-1 h-3.5 w-3.5" />
                    Feedback
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AcceptedConnectionsTable;
