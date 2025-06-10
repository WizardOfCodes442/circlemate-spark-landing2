import React from 'react';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';

const CommunityAdminAnnouncementsPanel = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Announcements Management</h3>
        <p className="text-sm text-muted-foreground">Create and manage community announcements.</p>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-4">
          {[
            { id: 1, title: 'Welcome New Members!', date: '10/10/2023' },
            { id: 2, title: 'Upcoming Webinar', date: '11/01/2023' },
          ].map((announcement) => (
            <div key={announcement.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
              <div>
                <p className="font-medium">{announcement.title}</p>
                <span className="text-xs text-gray-400">Posted {announcement.date}</span>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
        <Button className="mt-4">
          <Bell className="h-4 w-4 mr-2" />
          Create Announcement
        </Button>
      </div>
    </div>
  );
};

export default CommunityAdminAnnouncementsPanel;