import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Search, UserCheck, UserPlus, UserX, MoreHorizontal, CircleCheck, CircleX } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '../ui/dropdown-menu';

const CommunityAdminMemberPanel = () => {
  const [memberTab, setMemberTab] = useState('active');

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
        </enoic

System: div>
        <Tabs value={memberTab} onValueChange={setMemberTab} className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground mb-4 bg-muted">
            <TabsTrigger
              value="active"
              className="justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <UserCheck className="h-4 w-4" />
              <span>Active Members</span>
              <Badge className="ml-1 bg-teal text-white">3</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Pending Requests</span>
              <Badge className="ml-1 bg-amber-500 text-white">2</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="blacklisted"
              className="justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <UserX className="h-4 w-4" />
              <span>Blacklisted</span>
              <Badge className="ml-1 bg-red-500 text-white">1</Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-2 border rounded-md p-4">
            <div className="grid gap-4">
              {[
                { name: 'Alex Johnson', occupation: 'Software Engineer', location: 'Lagos', tag: 'Business', joined: '3/14/2023', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
                { name: 'Sophia Chen', occupation: 'Marketing Manager', location: 'Lagos', tag: 'Friendship', joined: '5/21/2023', img: 'https://randomuser.me/api/portraits/women/1.jpg' },
                { name: 'Marcus Williams', occupation: 'Product Designer', location: 'Lagos', tag: 'Mentorship', joined: '10/6/2023', img: 'https://randomuser.me/api/portraits/men/2.jpg', badge: 'New' },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.img} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.badge && <Badge className="bg-blue-500">{member.badge}</Badge>}
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
                    <DropdownMenuContent />
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pending" className="mt-2 border rounded-md p-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">David Kim</p>
                    <div className="text-sm text-gray-500">Entrepreneur • Lagos</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">Mentorship</Badge>
                      <span className="text-xs text-gray-400">Requested 11/9/2023</span>
                    </div>
                    <span className="text-xs text-teal mt-1">1 mutual connection</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="text-green-600 hover:bg-green-50 hover:text-green-700">
                    <CircleCheck className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                    <CircleX className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="blacklisted" className="mt-2 border rounded-md p-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jessica Taylor</p>
                    <div className="text-sm text-gray-500">Content Creator • Lagos</div>
                    <div className="flex flex-col mt-1">
                      <span className="text-xs text-red-600">Reason: Inappropriate behavior</span>
                      <span className="text-xs text-gray-400">Until: 12/30/2023</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Restore</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityAdminMemberPanel;