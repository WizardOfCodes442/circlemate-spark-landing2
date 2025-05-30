
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';

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
  },
  {
    id: '5',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    group: 'Lagos Tech Circle',
    intent: 'Professional',
    interests: ['Marketing', 'Writing', 'Networking'],
    status: 'pending'
  },
  {
    id: '6',
    name: 'James Lee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    group: 'Lagos Tech Circle',
    intent: 'Friendship',
    interests: ['Sports', 'Technology', 'Food'],
    status: 'pending'
  },
];

const Matches: React.FC = () => {
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    filterMatches(term, selectedIntent);
  };
  
  const handleIntentFilter = (intent: string | null) => {
    setSelectedIntent(intent);
    filterMatches(searchTerm, intent);
  };
  
  const filterMatches = (term: string, intent: string | null) => {
    let filtered = matches;
    
    if (term) {
      filtered = filtered.filter(match => 
        match.name.toLowerCase().includes(term.toLowerCase()) || 
        match.interests.some(interest => interest.toLowerCase().includes(term.toLowerCase()))
      );
    }
    
    if (intent) {
      filtered = filtered.filter(match => match.intent === intent);
    }
    
    setFilteredMatches(filtered);
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold text-navy mb-6">All Potential Matches</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or interest"
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedIntent === null ? "default" : "outline"}
                className={selectedIntent === null ? "bg-teal hover:bg-teal/90 text-white" : ""}
                onClick={() => handleIntentFilter(null)}
              >
                All
              </Button>
              <Button 
                variant={selectedIntent === "Professional" ? "default" : "outline"}
                className={selectedIntent === "Professional" ? "bg-teal hover:bg-teal/90 text-white" : ""}
                onClick={() => handleIntentFilter("Professional")}
              >
                Professional
              </Button>
              <Button 
                variant={selectedIntent === "Friendship" ? "default" : "outline"}
                className={selectedIntent === "Friendship" ? "bg-teal hover:bg-teal/90 text-white" : ""}
                onClick={() => handleIntentFilter("Friendship")}
              >
                Friendship
              </Button>
              <Button 
                variant={selectedIntent === "Romance" ? "default" : "outline"}
                className={selectedIntent === "Romance" ? "bg-teal hover:bg-teal/90 text-white" : ""}
                onClick={() => handleIntentFilter("Romance")}
              >
                Romance
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <div key={match.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
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
                        className="w-full text-sm"
                      >
                        View Profile
                      </Button>
                    </Link>
                    <Link to={`/connection/${match.id}`}>
                      <Button 
                        size="sm" 
                        className="w-full bg-teal hover:bg-teal/90 text-white text-sm"
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
      </div>
    </Layout>
  );
};

export default Matches;
