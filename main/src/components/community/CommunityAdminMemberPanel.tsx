import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Search, UserCheck, UserPlus, UserX, MoreHorizontal, CircleCheck, CircleX, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

const CommunityAdminMemberPanel = () => {
  const [memberTab, setMemberTab] = useState('active');
  const [activeMembers, setActiveMembers] = useState([
    { id: 1, name: 'Alex Johnson', occupation: 'Software Engineer', location: 'Lagos', tag: 'Business', joined: '3/14/2023', img: 'https://randomuser.me/api/portraits/men/1.jpg', messages: [] },
    { id: 2, name: 'Sophia Chen', occupation: 'Marketing Manager', location: 'Lagos', tag: 'Friendship', joined: '5/21/2023', img: 'https://randomuser.me/api/portraits/women/1.jpg', messages: [] },
    { id: 3, name: 'Marcus Williams', occupation: 'Product Designer', location: 'Lagos', tag: 'Mentorship', joined: '10/6/2023', img: 'https://randomuser.me/api/portraits/men/2.jpg', badge: 'New', messages: [] },
  ]);
  const [pendingRequests, setPendingRequests] = useState([
    { id: 4, name: 'David Kim', occupation: 'Entrepreneur', location: 'Lagos', tag: 'Mentorship', requested: '11/9/2023', messages: [] },
  ]);
  const [blacklisted, setBlacklisted] = useState([
    { id: 5, name: 'Jessica Taylor', occupation: 'Content Creator', location: 'Lagos', reason: 'Inappropriate behavior', until: '12/30/2023', messages: [] },
  ]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const handleBlacklist = (member) => {
    setActiveMembers(activeMembers.filter((m) => m.id !== member.id));
    setBlacklisted([...blacklisted, { ...member, reason: 'Manually blacklisted', until: 'Indefinite' }]);
  };

  const handleApprove = (member) => {
    setPendingRequests(pendingRequests.filter((m) => m.id !== member.id));
    setActiveMembers([...activeMembers, { ...member, joined: new Date().toLocaleDateString(), img: '', messages: [] }]);
  };

  const handleReject = (member) => {
    setPendingRequests(pendingRequests.filter((m) => m.id !== member.id));
  };

  const handleRestore = (member) => {
    setBlacklisted(blacklisted.filter((m) => m.id !== member.id));
    setActiveMembers([...activeMembers, { ...member, joined: new Date().toLocaleDateString(), img: '', tag: 'Restored', messages: [] }]);
  };

  const handleSendMessage = (member) => {
    if (messageContent.trim()) {
      const updatedMembers = activeMembers.map((m) =>
        m.id === member.id ? { ...m, messages: [...m.messages, { content: messageContent, sent: new Date().toLocaleString() }] } : m
      );
      setActiveMembers(updatedMembers);
      setMessageContent('');
      setSelectedMember(null);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Members Management</h3>
        <p className="text-sm text-muted-foreground">Manage community members, approve join requests, and handle blacklist.</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input className="pl-10" placeholder="Search members by name, occupation, or location..." />
          </div>
        </div>
        <Tabs value={memberTab} onValueChange={setMemberTab} className="w-full">
<TabsList className="flex h-10 items-center rounded-md p-1 text-muted-foreground mb-4 bg-muted overflow-x-auto whitespace-nowrap">
  <TabsTrigger
    value="active"
    className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm min-w-[100px] sm:min-w-[60px] sm:text-xs max-[400px]:w-[50px] max-[400px]:justify-center"
    data-tooltip="Active Members"
  >
    <UserCheck className="h-4 w-4" />
    <span className="max-[400px]:hidden">Active</span>
    <Badge className="ml-1 bg-teal text-white max-[400px]:absolute max-[400px]:-top-1 max-[400px]:-right-1">{activeMembers.length}</Badge>
  </TabsTrigger>
  <TabsTrigger
    value="pending"
    className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm min-w-[100px] sm:min-w-[60px] sm:text-xs max-[400px]:w-[50px] max-[400px]:justify-center"
    data-tooltip="Pending Requests"
  >
    <UserPlus className="h-4 w-4" />
    <span className="max-[400px]:hidden">Pending</span>
    <Badge className="ml-1 bg-amber-500 text-white max-[400px]:absolute max-[400px]:-top-1 max-[400px]:-right-1">{pendingRequests.length}</Badge>
  </TabsTrigger>
  <TabsTrigger
    value="blacklisted"
    className="flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm min-w-[100px] sm:min-w-[60px] sm:text-xs max-[400px]:w-[50px] max-[400px]:justify-center"
    data-tooltip="Blacklisted"
  >
    <UserX className="h-4 w-4" />
    <span className="max-[400px]:hidden">Blocked</span>
    <Badge className="ml-1 bg-red-500 text-white max-[400px]:absolute max-[400px]:-top-1 max-[400px]:-right-1">{blacklisted.length}</Badge>
  </TabsTrigger>
</TabsList>
          <TabsContent value="active" className="mt-2 border rounded-md p-4">
            <div className="grid gap-4">
              {activeMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.img} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.badge && <Badge className="bg-blue-500">{member.badge}</Badge>}
                        {member.messages.length > 0 && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="relative">
                                <MessageSquare className="h-4 w-4" />
                                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">{member.messages.length}</Badge>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Messages to {member.name}</DialogTitle>
                              </DialogHeader>
                              <div className="max-h-60 overflow-y-auto">
                                {member.messages.map((msg, idx) => (
                                  <div key={idx} className="p-2 border-b last:border-0">
                                    <p className="text-sm">{msg.content}</p>
                                    <p className="text-xs text-gray-400">{msg.sent}</p>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{member.occupation} • {member.location}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{member.tag}</Badge>
                        <span className="text-xs text-gray-400">Joined {member.joined}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Profile</DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{member.name}'s Profile</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-2">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={member.img} alt={member.name} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <p><strong>Name:</strong> {member.name}</p>
                            <p><strong>Occupation:</strong> {member.occupation}</p>
                            <p><strong>Location:</strong> {member.location}</p>
                            <p><strong>Tag:</strong> {member.tag}</p>
                            <p><strong>Joined:</strong> {member.joined}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setSelectedMember(member); }}>Send Message</DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Message to {member.name}</DialogTitle>
                          </DialogHeader>
                          <Textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Type your message..."
                            className="min-h-[100px]"
                          />
                          <DialogFooter>
                            <Button onClick={() => handleSendMessage(member)}>Send</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem onClick={() => handleBlacklist(member)}>Blacklist</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pending" className="mt-2 border rounded-md p-4">
            <div className="grid gap-4">
              {pendingRequests.map((member) => (
                <div key={member.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <div className="text-sm text-gray-500">{member.occupation} • {member.location}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{member.tag}</Badge>
                        <span className="text-xs text-gray-400">Requested {member.requested}</span>
                      </div>
                      <span className="text-xs text-teal mt-1">1 mutual connection</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleApprove(member)}>
                      <CircleCheck className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleReject(member)}>
                      <CircleX className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="blacklisted" className="mt-2 border rounded-md p-4">
            <div className="grid gap-4">
              {blacklisted.map((member) => (
                <div key={member.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <div className="text-sm text-gray-500">{member.occupation} • {member.location}</div>
                      <div className="flex flex-col mt-1">
                        <span className="text-xs text-red-600">Reason: {member.reason}</span>
                        <span className="text-xs text-gray-400">Until: {member.until}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => handleRestore(member)}>Restore</Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityAdminMemberPanel;