
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Community, Member, JoinRequest } from "@/data/mockCommunityData";

interface MembersTabProps {
  community: Community;
  setCommunity: React.Dispatch<React.SetStateAction<Community>>;
}

export const MembersTab = ({ community, setCommunity }: MembersTabProps) => {
  const handleRemoveMember = (memberId: string, memberName: string) => {
    setCommunity(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== memberId)
    }));
    toast({
      title: "Member Removed",
      description: `${memberName} has been removed from the community.`,
    });
  };

  const handleAcceptRequest = (requestId: string, requestName: string) => {
    setCommunity(prev => ({
      ...prev,
      joinRequests: prev.joinRequests.filter(req => req.id !== requestId),
      members: [...prev.members, { 
        id: requestId, 
        name: requestName, 
        avatar: "/placeholder.svg", 
        role: "member" 
      }]
    }));
    toast({
      title: "Join Request Accepted",
      description: `${requestName} has been added to the community.`,
    });
  };

  const handleRejectRequest = (requestId: string, requestName: string) => {
    setCommunity(prev => ({
      ...prev,
      joinRequests: prev.joinRequests.filter(req => req.id !== requestId)
    }));
    toast({
      title: "Join Request Rejected",
      description: `${requestName}'s request has been rejected.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Join Requests */}
      {community.joinRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Join Requests ({community.joinRequests.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {community.joinRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{request.name}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleRejectRequest(request.id, request.name)}
                  >
                    Reject
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAcceptRequest(request.id, request.name)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Community Members ({community.members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {community.members.map(member => (
              <div key={member.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium">{member.name}</span>
                    <div className="text-sm text-muted-foreground capitalize">{member.role}</div>
                  </div>
                </div>
                {member.role !== "admin" && (
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleRemoveMember(member.id, member.name)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
