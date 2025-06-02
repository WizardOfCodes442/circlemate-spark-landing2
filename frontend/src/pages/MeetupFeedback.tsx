
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/layout/Layout';

const MeetupFeedback: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [enjoyment, setEnjoyment] = useState<'good' | 'bad' | null>(null);
  const [futureMatch, setFutureMatch] = useState<boolean | null>(null);
  
  // This would typically be fetched from API based on ID
  const meetupData = {
    id,
    partner: {
      id: '3',
      name: 'Jessica Williams',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    },
    venue: 'The Brew House',
    date: 'May 23, 2025',
    time: '10:00 AM',
  };
  
  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating for your meetup experience.",
        variant: "destructive",
      });
      return;
    }
    
    // This would typically send the request to API
    setTimeout(() => {
      toast({
        title: "Feedback submitted!",
        description: "Thank you for providing feedback on your meetup experience.",
      });
      navigate('/dashboard');
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
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-navy mb-6">How was your meetup?</h1>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src={meetupData.partner.avatar} 
                    alt={meetupData.partner.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-navy">{meetupData.partner.name}</h3>
                    <div className="text-sm text-gray-600">
                      {meetupData.venue} · {meetupData.date} · {meetupData.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-navy mb-3">1. Rate your overall experience</h3>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <svg 
                        className={`w-8 h-8 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-navy mb-3">2. How did you feel about the meetup?</h3>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={enjoyment === 'good' ? 'default' : 'outline'}
                    className={
                      enjoyment === 'good' 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'hover:bg-green-50'
                    }
                    onClick={() => setEnjoyment('good')}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Enjoyed it
                  </Button>
                  <Button
                    type="button"
                    variant={enjoyment === 'bad' ? 'default' : 'outline'}
                    className={
                      enjoyment === 'bad' 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'hover:bg-red-50'
                    }
                    onClick={() => setEnjoyment('bad')}
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Didn't enjoy it
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-navy mb-3">
                  3. Would you be interested in future matches with this person?
                </h3>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={futureMatch === true ? 'default' : 'outline'}
                    className={
                      futureMatch === true 
                        ? 'bg-teal hover:bg-teal/90 text-white' 
                        : ''
                    }
                    onClick={() => setFutureMatch(true)}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={futureMatch === false ? 'default' : 'outline'}
                    className={
                      futureMatch === false 
                        ? 'bg-gray-700 hover:bg-gray-800 text-white' 
                        : ''
                    }
                    onClick={() => setFutureMatch(false)}
                  >
                    No
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-navy mb-3">4. Additional feedback (optional)</h3>
                <Textarea
                  placeholder="Share your thoughts about the meetup..."
                  className="h-32 resize-none"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              
              <div className="pt-4 border-t">
                <Button
                  className="w-full md:w-auto bg-teal hover:bg-teal/90 text-white"
                  onClick={handleSubmitFeedback}
                >
                  Submit Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MeetupFeedback;
