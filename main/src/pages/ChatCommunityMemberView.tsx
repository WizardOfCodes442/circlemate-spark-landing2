import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
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
  // Same as initialCommunities in Communities.tsx
  {
    id: "1",
    name: "Lagos Tech Circle",
    members: [
      { id: "m1", name: "John Doe", avatar: "/user1.png", lastActive: "2025-06-10" },
      { id: "m2", name: "Jane Smith", avatar: "/user2.png", lastActive: "2025-06-05" },
    ],
  },
  // ... (other communities)
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

  const community = mockCommunities.find((c) => c.id === communityId);
  const member = community?.members.find((m) => m.id === memberId);

  if (!community || !member) {
    return <div>Community or member not found</div>;
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const message: Message = {
      id: (messages.length + 1).toString(),
      senderId: "user1",
      content: newMessage,
      timestamp: new Date().toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }),
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-navy">{member.name}</h2>
              <p className="text-sm text-gray-600">{community.name}</p>
            </div>
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
            />
            <Button className="bg-teal hover:bg-teal/90 text-white" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatCommunityMemberView;
