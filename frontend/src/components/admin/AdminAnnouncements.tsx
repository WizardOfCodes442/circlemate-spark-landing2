
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Bell, Send, Clock, CheckCheck, Users, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Mock Data
const RECENT_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'December Meetup Schedule',
    content: 'We have finalized the December meetup schedule. Check your dashboard for potential matches and upcoming events!',
    sentAt: '2023-11-30T14:30:00',
    sentTo: 'all',
    sentBy: 'Admin',
    readCount: 28,
    totalCount: 35,
  },
  {
    id: '2',
    title: 'New Matching Feature Available',
    content: 'We\'ve just launched a new matching algorithm to help you find even better connections within the community.',
    sentAt: '2023-11-22T10:15:00',
    sentTo: 'active',
    sentBy: 'Admin',
    readCount: 30,
    totalCount: 30,
  }
];

type AnnouncementTarget = 'all' | 'active' | 'new';

const AdminAnnouncements: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [target, setTarget] = useState<AnnouncementTarget>('all');
  const [sendEmail, setSendEmail] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const { toast } = useToast();

  const handleSendAnnouncement = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and content for your announcement.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Logic to send announcement
    toast({
      title: "Announcement Sent",
      description: `Your announcement "${title}" has been sent to ${getTargetDescription(target)} members.`,
      duration: 3000,
    });

    // Reset the form
    setTitle('');
    setContent('');
    setTarget('all');
    setSendEmail(true);
    setIsPinned(false);
  };

  const getTargetDescription = (target: AnnouncementTarget) => {
    switch (target) {
      case 'all': return 'all';
      case 'active': return 'active';
      case 'new': return 'new';
      default: return 'all';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Broadcast Announcements</CardTitle>
        <CardDescription>
          Send announcements and updates to community members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="announcement-title">Announcement Title</Label>
              <Input
                id="announcement-title"
                placeholder="Enter a clear, concise title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="announcement-content">Content</Label>
              <Textarea
                id="announcement-content"
                placeholder="Write your announcement message here..."
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Send To</Label>
              <RadioGroup 
                value={target} 
                onValueChange={(value) => setTarget(value as AnnouncementTarget)}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    All Members (35)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="flex items-center gap-2">
                    <CheckCheck className="h-4 w-4" />
                    Active Members (30)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    New Members (5)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="email-notification" 
                  checked={sendEmail} 
                  onCheckedChange={setSendEmail}
                />
                <Label htmlFor="email-notification">Also send as email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="pin-announcement" 
                  checked={isPinned} 
                  onCheckedChange={setIsPinned}
                />
                <Label htmlFor="pin-announcement">Pin to community dashboard</Label>
              </div>
            </div>
            
            <Button 
              className="bg-teal hover:bg-teal/90 text-white mt-2"
              onClick={handleSendAnnouncement}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Recent Announcements</h3>
            
            {RECENT_ANNOUNCEMENTS.map(announcement => (
              <div key={announcement.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-teal" />
                    {announcement.title}
                  </h4>
                  <Badge variant="outline">
                    Sent to {announcement.sentTo} members
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{announcement.content}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {new Date(announcement.sentAt).toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <CheckCheck className="h-3.5 w-3.5 mr-1" />
                    Read by {announcement.readCount}/{announcement.totalCount}
                  </div>
                  <div>
                    Sent by: {announcement.sentBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAnnouncements;
