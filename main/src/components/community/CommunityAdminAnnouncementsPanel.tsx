import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Bell, Clock, CheckCheck, Users, CircleAlert, Send, Trash2 } from 'lucide-react';

const CommunityAdminAnnouncementsPanel = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'December Meetup Schedule',
      content: 'We have finalized the December meetup schedule. Check your dashboard for potential matches and upcoming events!',
      date: '2023-11-30T14:30:00',
      recipient: 'all',
      readCount: 28,
      totalRecipients: 35,
      sentBy: 'Admin',
    },
    {
      id: 2,
      title: 'New Matching Feature Available',
      content: 'We’ve just launched a new matching algorithm to help you find even better connections within the community.',
      date: '2023-11-22T10:15:00',
      recipient: 'active',
      readCount: 30,
      totalRecipients: 30,
      sentBy: 'Admin',
    },
  ]);

  const [form, setForm] = useState({
    title: '',
    content: '',
    recipient: 'all',
    emailNotification: true,
    pinAnnouncement: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecipientChange = (value) => {
    setForm((prev) => ({ ...prev, recipient: value }));
  };

  const handleSwitchChange = (name) => (checked) => {
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSendAnnouncement = () => {
    if (!form.title || !form.content) return; // Basic validation
    const newAnnouncement = {
      id: announcements.length + 1,
      title: form.title,
      content: form.content,
      date: new Date().toISOString(), // Current date: June 12, 2025, 10:50 AM WAT
      recipient: form.recipient,
      readCount: 0,
      totalRecipients: form.recipient === 'all' ? 35 : form.recipient === 'active' ? 30 : 5,
      sentBy: 'Admin',
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setForm({
      title: '',
      content: '',
      recipient: 'all',
      emailNotification: true,
      pinAnnouncement: false,
    });
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-full overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Broadcast Announcements</h3>
        <p className="text-sm text-muted-foreground">Send announcements and updates to community members.</p>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="announcement-title" className="text-sm font-medium">
                Announcement Title
              </Label>
              <Input
                id="announcement-title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Enter a clear, concise title"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="announcement-content" className="text-sm font-medium">
                Content
              </Label>
              <Textarea
                id="announcement-content"
                name="content"
                value={form.content}
                onChange={handleInputChange}
                placeholder="Write your announcement message here..."
                rows={5}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Send To</Label>
              <RadioGroup value={form.recipient} onValueChange={handleRecipientChange} className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4" />
                    All Members (35)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="flex items-center gap-2 text-sm font-medium">
                    <CheckCheck className="h-4 w-4" />
                    Active Members (30)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="flex items-center gap-2 text-sm font-medium">
                    <CircleAlert className="h-4 w-4" />
                    New Members (5)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="email-notification"
                  checked={form.emailNotification}
                  onCheckedChange={handleSwitchChange('emailNotification')}
                />
                <Label htmlFor="email-notification" className="text-sm font-medium">
                  Also send as email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="pin-announcement"
                  checked={form.pinAnnouncement}
                  onCheckedChange={handleSwitchChange('pinAnnouncement')}
                />
                <Label htmlFor="pin-announcement" className="text-sm font-medium">
                  Pin to community dashboard
                </Label>
              </div>
            </div>
            <div className="flex justify-start mt-2">
              <Button
                onClick={handleSendAnnouncement}
                className="bg-teal-500 hover:bg-teal-600 text-white !block min-h-10 px-6 py-2 flex items-center justify-center"
                data-testid="send-button"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
            </div>
          </div>
          <hr className="shrink-0 bg-gray-200 h-[1px] w-full" />
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Recent Announcements ({announcements.length})</h3>
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-base">
                    <Bell className="h-4 w-4 mr-2 text-teal-500 inline" />
                    {announcement.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                      Sent to {announcement.recipient} members
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{announcement.content}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(announcement.date).toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Read by: {announcement.readCount}/{announcement.totalRecipients}
                  </div>
                  <div>Sent by: {announcement.sentBy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAdminAnnouncementsPanel;
