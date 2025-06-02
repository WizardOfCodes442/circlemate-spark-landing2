
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useCommunityMembers } from '@/hooks/useCommunityMembers';

interface MemberDirectoryProps {
  communityId: string;
}

const MemberDirectory: React.FC<MemberDirectoryProps> = ({ communityId }) => {
  const { members, isLoading } = useCommunityMembers(communityId);
  const [viewType, setViewType] = useState<'all' | 'new' | 'active'>('all');
  
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Member Directory</CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant={viewType === 'all' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewType('all')}
              className={viewType === 'all' ? 'bg-teal text-white' : ''}
            >
              All
            </Button>
            <Button 
              variant={viewType === 'new' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewType('new')}
              className={viewType === 'new' ? 'bg-teal text-white' : ''}
            >
              New
            </Button>
            <Button 
              variant={viewType === 'active' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewType('active')}
              className={viewType === 'active' ? 'bg-teal text-white' : ''}
            >
              Active
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-gray-200 mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {members.map((member) => (
                <div key={member.id} className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-navy">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.occupation}</p>
                  <p className="text-xs text-gray-400 mt-1">{member.city}</p>
                  <span className="bg-teal/10 text-teal text-xs px-2 py-1 rounded-full mt-2">
                    {member.intent}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberDirectory;
