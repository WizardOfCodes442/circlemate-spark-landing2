
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '../components/layout/Layout';

const updates = [
  {
    id: '1',
    title: 'New Event: Lagos Tech Meetup',
    description: 'Join us for a tech networking event at The Hub this Saturday.',
    date: '2025-06-01T15:00:00Z',
    type: 'event',
    isImportant: true,
  },
  {
    id: '2',
    title: 'Group Achievement: 500+ Members!',
    description: 'Our group has reached over 500 members. Thank you all for being part of this journey!',
    date: '2025-05-15T09:30:00Z',
    type: 'milestone',
    isImportant: false,
  },
  {
    id: '3',
    title: 'Match Success Rate Increased',
    description: 'Our matching algorithm has been improved, resulting in a 30% increase in successful connections.',
    date: '2025-05-10T14:20:00Z',
    type: 'system',
    isImportant: false,
  },
  {
    id: '4',
    title: 'New Group Rules',
    description: 'Please review our updated community guidelines for respectful interactions.',
    date: '2025-05-05T11:00:00Z',
    type: 'announcement',
    isImportant: true,
  },
  {
    id: '5',
    title: 'Feature Update: Enhanced Profiles',
    description: 'You can now add more details to your profile, including projects and achievements.',
    date: '2025-04-28T16:45:00Z',
    type: 'feature',
    isImportant: false,
  },
];

const GroupUpdates: React.FC = () => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
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
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Group Updates</h1>
          <Button className="bg-teal hover:bg-teal/90 text-white flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notification Settings
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-6">
            {updates.map((update) => (
              <div 
                key={update.id}
                className={`p-4 rounded-lg border ${update.isImportant ? 'bg-orange/5 border-orange/20' : 'bg-gray-50 border-gray-100'}`}
              >
                <div className="flex justify-between">
                  <h3 className={`font-semibold ${update.isImportant ? 'text-orange' : 'text-navy'}`}>
                    {update.title}
                    {update.isImportant && (
                      <span className="ml-2 bg-orange text-white text-xs px-2 py-0.5 rounded-full">
                        Important
                      </span>
                    )}
                  </h3>
                  <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                </div>
                <p className="mt-2 text-gray-600">{update.description}</p>
                
                {update.type === 'event' && (
                  <div className="mt-4">
                    <Button size="sm" className="bg-teal hover:bg-teal/90 text-white">
                      View Event Details
                    </Button>
                  </div>
                )}
                
                {update.type === 'announcement' && (
                  <div className="mt-4">
                    <Button size="sm" variant="outline">
                      Read More
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroupUpdates;
