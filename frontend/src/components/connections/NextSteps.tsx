
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const NextSteps: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Next Steps</h2>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          After connecting with someone, follow these steps to arrange a successful meetup:
        </p>
        <ol className="list-decimal ml-5 space-y-2">
          <li>Plan a meetup by selecting a suitable date, time, and venue</li>
          <li>Meet in person to discuss shared interests and opportunities</li>
          <li>Provide feedback about your experience to help improve future matches</li>
        </ol>
      </CardContent>
    </Card>
  );
};

export default NextSteps;
