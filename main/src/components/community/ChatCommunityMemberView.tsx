import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Send, ArrowLeft, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardHeader from "@/components/DashboardHeader";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  lastActive: string;
}

interface Community {
  id: string;
  name: string;
  members: Member[];
}

const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Lagos Tech Circle",
    members: [
      { id: "m1", name: "John Doe", avatar: "/user1.png", lastActive: "2025-06-10" },
      { id: "m2", name: "Jane Smith", avatar: "/user2.png", lastActive: "2025-06-05" },
    ],
  },
];

const ChatCommunityMemberView = () => {
  const { communityId, memberId } = useParams<{ communityId: string; memberId: string }>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "m1",
      content: "Hey, welcome to the community!",
      timestamp: "2025-06-12 10:00 AM",
    },
    {
      id: "2",
      senderId: "user1",
      content: "Thanks! Excited to be here.",
      timestamp: "2025-06-12 10:05 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [showNotification, setShowNotification] = useState<{ message: string } | null>(null);

  const community = mockCommunities.find((c) => c.id === communityId);
  const member = community?.members.find((m) => m.id === memberId);

  if (!community || !member) {
    return <div>Community or member not found</div>;
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || isBlocked) return;
    const message: Message = {
      id: (messages.length + 1).toString(),
      senderId: "user1",
      content: newMessage,
      timestamp: new Date().toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }),
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleBlockUser = () => {
    setIsBlocked(true);
    showNotificationMessage("User has been blocked.");
  };

  const handleUnblockUser = () => {
    setIsBlocked(false);
    showNotificationMessage("User has been unblocked.");
  };

  const showNotificationMessage = (message: string) => {
    setShowNotification({ message });
    setTimeout(() => {
      setShowNotification(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Notification */}
      {showNotification && (
        <div
          className={`fixed z-50 w-full max-w-md mx-auto p-4 bg-teal-500 text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
            window.innerWidth < 768 ? "top-4" : "bottom-4"
          } transform translate-y-0`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">{showNotification.message}</p>
            <button
              onClick={() => setShowNotification(null)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/chat">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Avatar className="h-12 w-12 cursor-pointer">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-navy">{member.name}</h2>
                    <p className="text-sm text-gray-600">{community.name}</p>
                    <p className="text-sm text-gray-600">Last Active: {member.lastActive}</p>
                    <Button
                      className={`${isBlocked ? "bg-teal-500" : "bg-red-500"} text-white`}
                      onClick={isBlocked ? handleUnblockUser : handleBlockUser}
                    >
                      {isBlocked ? "Unblock" : "Block"} Contact
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div>
                <h2 className="text-xl font-bold text-navy">{member.name}</h2>
                <p className="text-sm text-gray-600">{community.name}</p>
              </div>
            </div>
            {isBlocked && (
              <span className="text-white bg-red-500 text-sm font-normal px-2 py-1 rounded-full">
                Blocked
              </span>
            )}
          </div>
          <div className="border rounded-lg h-[400px] overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === "user1" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.senderId === "user1" ? "bg-teal text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isBlocked}
            />
            <Button
              className="bg-teal hover:bg-teal/90 text-white"
              onClick={handleSendMessage}
              disabled={isBlocked}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatCommunityMemberView;