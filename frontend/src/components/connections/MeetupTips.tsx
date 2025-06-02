
import React from 'react';
import { UserCheck, Calendar, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MeetupTips: React.FC = () => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Meetup Tips</h2>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="bg-teal/10 p-1.5 rounded-full">
            <UserCheck className="h-4 w-4 text-teal" />
          </div>
          <div>
            <p className="font-medium text-navy">Meet in public places</p>
            <p className="text-gray-600 text-sm">Choose well-populated venues for your safety</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-teal/10 p-1.5 rounded-full">
            <Calendar className="h-4 w-4 text-teal" />
          </div>
          <div>
            <p className="font-medium text-navy">Be punctual</p>
            <p className="text-gray-600 text-sm">Respect each other's time</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-teal/10 p-1.5 rounded-full">
            <MessageSquare className="h-4 w-4 text-teal" />
          </div>
          <div>
            <p className="font-medium text-navy">Provide honest feedback</p>
            <p className="text-gray-600 text-sm">Help improve the matching algorithm</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-teal hover:bg-teal/90 text-white"
          onClick={() => {
            toast({
              title: "Safety Tips",
              description: "Always let someone know where you're going and with whom when meeting a new connection.",
            });
          }}
        >
          View More Safety Tips
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeetupTips;
