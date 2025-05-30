
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/layout/Layout';

const Connection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requestSent, setRequestSent] = useState(false);
  
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
    intent: id === '1' ? 'Professional' : id === '2' ? 'Friendship' : id === '3' ? 'Professional' : 'Romance',
  };
  
  const handleSendRequest = () => {
    // This would typically send the request to API
    setTimeout(() => {
      setRequestSent(true);
      toast({
        title: "Connection request sent!",
        description: `You've sent a connection request to ${matchData.name}. We'll notify you when they respond.`,
      });
    }, 1000);
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
        
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-navy mb-6">Connect with {matchData.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={matchData.avatar} 
                alt={matchData.name} 
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-navy">{matchData.name}</h2>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {matchData.intent}
                </span>
              </div>
            </div>
            
            <div className="border-t border-b py-6 my-6">
              <h3 className="font-semibold text-navy mb-4">Suggested Meetup Options</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-teal mt-0.5" />
                    <div>
                      <h4 className="font-medium">The Brew House</h4>
                      <p className="text-sm text-gray-600">Coffee Shop in Lekki</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Suggested: Weekend morning</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-teal mt-0.5" />
                    <div>
                      <h4 className="font-medium">Tech Hub Lagos</h4>
                      <p className="text-sm text-gray-600">Co-working space in Victoria Island</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Suggested: Weekday afternoon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-navy mb-4">Next Steps</h3>
              <p className="text-gray-600 mb-4">
                Sending a connection request will notify {matchData.name}. If they accept, you'll be able to schedule a meetup at one of the suggested locations or propose your own.
              </p>
            </div>
            
            {requestSent ? (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-green-800">
                <p className="font-medium">Request sent!</p>
                <p className="text-sm mt-1">We'll notify you when {matchData.name} responds.</p>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button 
                  className="bg-teal hover:bg-teal/90 text-white"
                  onClick={handleSendRequest}
                >
                  Send Connection Request
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Connection;
