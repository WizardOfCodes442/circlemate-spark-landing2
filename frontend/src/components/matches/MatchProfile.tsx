
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '../layout/Layout';

interface MatchProfileProps {
  id: string;
}

const MatchProfile: React.FC<MatchProfileProps> = ({ id }) => {
  const navigate = useNavigate();
  
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
    group: 'Lagos Tech Circle',
    intent: id === '1' ? 'Professional' : id === '2' ? 'Friendship' : id === '3' ? 'Professional' : 'Romance',
    interests: id === '1' 
      ? ['Technology', 'Entrepreneurship', 'Design'] 
      : id === '2'
        ? ['Gaming', 'Technology', 'Movies']
        : id === '3'
          ? ['Art', 'Design', 'Reading']
          : ['Music', 'Travel', 'Photography'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio at magna tincidunt congue eu vel nisi. Sed euismod, nisl vel aliquam luctus, nunc nisl aliquam mauris.',
    location: 'Lagos, Nigeria',
    availability: ['Weekends', 'Evenings'],
    temperament: 'Extroverted, Intuitive, Thinking, Judging (ENTJ)',
    values: ['Growth', 'Innovation', 'Authenticity']
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
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-64 bg-gray-200">
            <img 
              src={matchData.avatar} 
              alt={matchData.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-navy">{matchData.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {matchData.intent}
                  </span>
                  <span className="text-gray-500 text-sm">{matchData.group}</span>
                </div>
              </div>
              
              <Button 
                className="mt-4 md:mt-0 bg-teal hover:bg-teal/90 text-white"
                onClick={() => navigate(`/connection/${id}`)}
              >
                Connect
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-semibold text-lg text-navy mb-3">About</h2>
                <p className="text-gray-600">{matchData.bio}</p>
                
                <h2 className="font-semibold text-lg text-navy mb-3 mt-6">Location</h2>
                <p className="text-gray-600">{matchData.location}</p>
                
                <h2 className="font-semibold text-lg text-navy mb-3 mt-6">Temperament</h2>
                <p className="text-gray-600">{matchData.temperament}</p>
              </div>
              
              <div>
                <h2 className="font-semibold text-lg text-navy mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {matchData.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="bg-teal/10 text-teal px-3 py-1.5 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <h2 className="font-semibold text-lg text-navy mb-3 mt-6">Values</h2>
                <div className="flex flex-wrap gap-2">
                  {matchData.values.map((value, index) => (
                    <span 
                      key={index}
                      className="bg-navy/10 text-navy px-3 py-1.5 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
                
                <h2 className="font-semibold text-lg text-navy mb-3 mt-6">Availability</h2>
                <div className="flex flex-wrap gap-2">
                  {matchData.availability.map((time, index) => (
                    <span 
                      key={index}
                      className="bg-orange/10 text-orange px-3 py-1.5 rounded-full text-sm"
                    >
                      {time}
                    </span>
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

export default MatchProfile;
