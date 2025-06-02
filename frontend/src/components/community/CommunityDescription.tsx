
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Community } from '@/types/community';

interface CommunityDescriptionProps {
  community: Community;
}

const CommunityDescription: React.FC<CommunityDescriptionProps> = ({ community }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>About Our Community</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{community.description}</p>
        
        {community.guidelines && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Community Guidelines</h3>
            <p className="text-gray-600">{community.guidelines}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityDescription;
