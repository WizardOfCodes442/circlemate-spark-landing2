import React from 'react';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';

const CommunityAdminMeetupsPanel = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Meetups Management</h3>
        <p className="text-sm text-muted-foreground">Schedule and manage community meetups.</p>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-4">
          {[
            { id: 1, title: 'Tech Meetup Lagos', date: '11/15/2023', location: 'Lagos' },
            { id: 2, title: 'Networking Event', date: '12/01/2023', location: 'Online' },
          ].map((meetup) => (
            <div key={meetup.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
              <div>
                <p className="font-medium">{meetup.title}</p>
                <div className="text-sm text-gray-500">{meetup.date} • {meetup.location}</div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
        <Button className="mt-4">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meetup
        </Button>
      </div>
    </div>
  );
};

export default CommunityAdminMeetupsPanel;