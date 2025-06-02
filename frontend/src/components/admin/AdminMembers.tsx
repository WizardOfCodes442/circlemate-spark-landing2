
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserCheck, UserX, UserPlus, MoreHorizontal, CheckCircle2, XCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const ACTIVE_MEMBERS = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    occupation: 'Software Engineer',
    city: 'Lagos',
    intent: 'Business',
    joinDate: '2023-03-15',
    isActive: true,
    isNew: false,
  },
  {
    id: '2',
    name: 'Sophia Chen',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    occupation: 'Marketing Manager',
    city: 'Lagos',
    intent: 'Friendship',
    joinDate: '2023-05-22',
    isActive: true,
    isNew: false,
  },
  {
    id: '3',
    name: 'Marcus Williams',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    occupation: 'Product Designer',
    city: 'Lagos',
    intent: 'Mentorship',
    joinDate: '2023-10-07',
    isActive: true,
    isNew: true,
  }
];

const PENDING_REQUESTS = [
  {
    id: '4',
    name: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    occupation: 'Data Analyst',
    city: 'Lagos',
    intent: 'Business',
    requestDate: '2023-11-02',
    commonConnections: 3,
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    occupation: 'Entrepreneur',
    city: 'Lagos',
    intent: 'Mentorship',
    requestDate: '2023-11-10',
    commonConnections: 1,
  }
];

const BLACKLISTED = [
  {
    id: '6',
    name: 'Jessica Taylor',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    occupation: 'Content Creator',
    city: 'Lagos',
    blacklistedReason: 'Inappropriate behavior',
    blacklistedUntil: '2023-12-31',
  }
];

const AdminMembers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(ACTIVE_MEMBERS);
  const [pendingRequests, setPendingRequests] = useState(PENDING_REQUESTS);
  const [blacklistedMembers, setBlacklistedMembers] = useState(BLACKLISTED);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [blacklistReason, setBlacklistReason] = useState('');
  const [isBlacklistDialogOpen, setIsBlacklistDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPendingRequests = pendingRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlacklisted = blacklistedMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveRequest = (id: string) => {
    const approvedMember = pendingRequests.find(req => req.id === id);
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    
    if (approvedMember) {
      const newMember = {
        id: approvedMember.id,
        name: approvedMember.name,
        avatar: approvedMember.avatar,
        occupation: approvedMember.occupation,
        city: approvedMember.city,
        intent: approvedMember.intent,
        joinDate: new Date().toISOString().split('T')[0],
        isActive: true,
        isNew: true,
      };
      
      setMembers([...members, newMember]);
      toast({
        title: "Request Approved",
        description: `${approvedMember.name} has been approved to join the community.`,
        duration: 3000,
      });
    }
  };

  const handleRejectRequest = (id: string) => {
    const rejectedMember = pendingRequests.find(req => req.id === id);
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    
    toast({
      title: "Request Rejected",
      description: `${rejectedMember?.name}'s request has been rejected.`,
      variant: "destructive",
      duration: 3000,
    });
  };

  const handleBlacklistMember = (id: string) => {
    if (!blacklistReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for blacklisting this member.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const memberToBlacklist = members.find(m => m.id === id);
    setMembers(members.filter(m => m.id !== id));
    
    if (memberToBlacklist) {
      const blacklistedMember = {
        id: memberToBlacklist.id,
        name: memberToBlacklist.name,
        avatar: memberToBlacklist.avatar,
        occupation: memberToBlacklist.occupation,
        city: memberToBlacklist.city,
        blacklistedReason: blacklistReason,
        blacklistedUntil: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      };
      
      setBlacklistedMembers([...blacklistedMembers, blacklistedMember]);
      toast({
        title: "Member Blacklisted",
        description: `${memberToBlacklist.name} has been blacklisted from the community.`,
        variant: "destructive",
        duration: 3000,
      });
    }
    
    setBlacklistReason('');
    setSelectedMember(null);
    setIsBlacklistDialogOpen(false);
  };

  const handleRestoreMember = (id: string) => {
    const memberToRestore = blacklistedMembers.find(m => m.id === id);
    setBlacklistedMembers(blacklistedMembers.filter(m => m.id !== id));
    
    if (memberToRestore) {
      const restoredMember = {
        id: memberToRestore.id,
        name: memberToRestore.name,
        avatar: memberToRestore.avatar,
        occupation: memberToRestore.occupation,
        city: memberToRestore.city,
        intent: 'Business', // Default intent
        joinDate: new Date().toISOString().split('T')[0],
        isActive: true,
        isNew: false,
      };
      
      setMembers([...members, restoredMember]);
      toast({
        title: "Member Restored",
        description: `${memberToRestore.name} has been restored to the community.`,
        duration: 3000,
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Members Management</CardTitle>
        <CardDescription>
          Manage community members, approve join requests, and handle blacklist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members by name, occupation, or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4 bg-muted">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span>Active Members</span>
              <Badge className="ml-1 bg-teal text-white">{members.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Pending Requests</span>
              <Badge className="ml-1 bg-amber-500 text-white">{pendingRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="blacklisted" className="flex items-center gap-2">
              <UserX className="h-4 w-4" />
              <span>Blacklisted</span>
              <Badge className="ml-1 bg-red-500 text-white">{blacklistedMembers.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="border rounded-md p-4">
            <div className="grid gap-4">
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{member.name}</p>
                          {member.isNew && (
                            <Badge className="bg-blue-500">New</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.occupation} • {member.city}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {member.intent}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            Joined {new Date(member.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setSelectedMember(member);
                          setIsBlacklistDialogOpen(true);
                        }} className="text-red-600">
                          Blacklist Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">No active members found</p>
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm('')}>
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="border rounded-md p-4">
            <div className="grid gap-4">
              {filteredPendingRequests.length > 0 ? (
                filteredPendingRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <div className="text-sm text-gray-500">
                          {request.occupation} • {request.city}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {request.intent}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            Requested {new Date(request.requestDate).toLocaleDateString()}
                          </span>
                        </div>
                        {request.commonConnections > 0 && (
                          <span className="text-xs text-teal mt-1">
                            {request.commonConnections} mutual connection{request.commonConnections > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-green-600 hover:bg-green-50 hover:text-green-700"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-2">No pending requests</p>
                  <p className="text-sm text-muted-foreground">
                    All join requests have been processed
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="blacklisted" className="border rounded-md p-4">
            <div className="grid gap-4">
              {filteredBlacklisted.length > 0 ? (
                filteredBlacklisted.map(member => (
                  <div key={member.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <div className="text-sm text-gray-500">
                          {member.occupation} • {member.city}
                        </div>
                        <div className="flex flex-col mt-1">
                          <span className="text-xs text-red-600">
                            Reason: {member.blacklistedReason}
                          </span>
                          <span className="text-xs text-gray-400">
                            Until: {new Date(member.blacklistedUntil).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleRestoreMember(member.id)}
                    >
                      Restore
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No blacklisted members</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Blacklist Dialog */}
        <Dialog open={isBlacklistDialogOpen} onOpenChange={setIsBlacklistDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Blacklist Member</DialogTitle>
              <DialogDescription>
                {selectedMember && (
                  <span>You are about to blacklist {selectedMember.name} from the community.</span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <label htmlFor="reason" className="block text-sm font-medium mb-2">
                Reason for blacklisting
              </label>
              <Input
                id="reason"
                value={blacklistReason}
                onChange={(e) => setBlacklistReason(e.target.value)}
                placeholder="Provide a reason for this action"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsBlacklistDialogOpen(false);
                setSelectedMember(null);
                setBlacklistReason('');
              }}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedMember && handleBlacklistMember(selectedMember.id)}
              >
                Blacklist
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminMembers;
