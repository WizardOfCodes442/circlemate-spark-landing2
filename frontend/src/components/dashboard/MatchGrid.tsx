
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const matches = [
  {
    id: '1',
    name: 'Sarah Thompson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    group: 'Lagos Tech Circle',
    intent: 'Professional',
    interests: ['Technology', 'Entrepreneurship', 'Design'],
    status: 'pending'
  },
  {
    id: '2',
    name: 'Michael Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    group: 'Lagos Tech Circle',
    intent: 'Friendship',
    interests: ['Gaming', 'Technology', 'Movies'],
    status: 'confirmed'
  },
  {
    id: '3',
    name: 'Jessica Williams',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    group: 'Lagos Tech Circle',
    intent: 'Professional',
    interests: ['Art', 'Design', 'Reading'],
    status: 'meetup_planned'
  },
  {
    id: '4',
    name: 'David Brown',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    group: 'Lagos Tech Circle',
    intent: 'Romance',
    interests: ['Music', 'Travel', 'Photography'],
    status: 'pending'
  }
];

const MatchGrid: React.FC = () => {
  const navigate = useNavigate();
  
  const handleViewAllMatches = () => {
    navigate('/matches');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-navy">Recent Matches</h2>
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 text-teal hover:text-teal"
          onClick={handleViewAllMatches}
        >
          View All <ArrowRight size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              {/* Status badge */}
              {match.status === 'confirmed' && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Confirmed
                </div>
              )}
              {match.status === 'pending' && (
                <div className="absolute top-2 right-2 bg-orange text-white text-xs px-2 py-1 rounded-full">
                  Pending
                </div>
              )}
              {match.status === 'meetup_planned' && (
                <div className="absolute top-2 right-2 bg-teal text-white text-xs px-2 py-1 rounded-full">
                  Meetup Planned
                </div>
              )}
              
              {/* Avatar */}
              <div className="h-48 bg-gray-200">
                <img 
                  src={match.avatar} 
                  alt={match.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-navy">{match.name}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {match.intent}
                </span>
                <span>{match.group}</span>
              </div>
              
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Interests:</div>
                <div className="flex flex-wrap gap-1">
                  {match.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="bg-teal/10 text-teal text-xs px-2 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link to={`/match/${match.id}`}>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-sm w-full"
                  >
                    View Profile
                  </Button>
                </Link>
                <Link to={`/connection/${match.id}`}>
                  <Button 
                    size="sm" 
                    className="bg-teal hover:bg-teal/90 text-white text-sm w-full"
                  >
                    Connect
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchGrid;
