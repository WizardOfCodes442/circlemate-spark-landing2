import { useState } from "react";
import { Link } from "react-router-dom";
import { Pin, Trash, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DashboardHeader from "@/components/DashboardHeader";

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

interface Chat {
  id: string;
  memberId: string;
  lastMessage: string;
  timestamp: string;
  pinned: boolean;
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

const ChatListView = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      memberId: "m1",
      lastMessage: "Hey, welcome to the community!",
      timestamp: "2025-06-12 10:00 AM",
      pinned: false,
    },
    {
      id: "2",
      memberId: "m2",
      lastMessage: "Looking forward to the event!",
      timestamp: "2025-06-12 09:30 AM",
      pinned: false,
    },
  ]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const community = mockCommunities[0]; // Assuming single community for simplicity
  const members = community.members;

  const handlePinChat = (chatId: string) => {
    setChats(chats.map((chat) => 
      chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
    ));
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter((chat) => chat.id !== chatId));
  };

  const handleBlockUser = (memberId: string) => {
    setBlockedUsers([...blockedUsers, memberId]);
  };

  const handleUnblockUser = (memberId: string) => {
    setBlockedUsers(blockedUsers.filter((id) => id !== memberId));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Chats</h2>
          <div className="space-y-4">
            {chats
              .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
              .map((chat) => {
                const member = members.find((m) => m.id === chat.memberId);
                if (!member) return null;
                const isBlocked = blockedUsers.includes(member.id);
                return (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
                  >
                    <Link
                      to={`/chat/${community.id}/${member.id}`}
                      className="flex items-center space-x-3 flex-grow"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        <p className="text-xs text-gray-500">{chat.timestamp}</p>
                      </div>
                    </Link>
                    <div className="flex items-center space-x-2">
                      {chat.pinned && <Pin className="h-5 w-5 text-teal-500" />}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePinChat(chat.id)}
                      >
                        <Pin className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteChat(chat.id)}
                      >
                        <Trash className="h-5 w-5" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedMember(member)}
                          >
                            <User className="h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                        {selectedMember?.id === member.id && (
                          <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                            <div className="flex flex-col items-center space-y-4">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                              <h2 className="text-xl font-bold text-navy">{member.name}</h2>
                              <p className="text-sm text-gray-600">{community.name}</p>
                              <p className="text-sm text-gray-600">
                                Last Active: {member.lastActive}
                              </p>
                              <Button
                                className={`${
                                  isBlocked ? "bg-teal-500" : "bg-red-500"
                                } text-white`}
                                onClick={() =>
                                  isBlocked
                                    ? handleUnblockUser(member.id)
                                    : handleBlockUser(member.id)
                                }
                              >
                                {isBlocked ? "Unblock" : "Block"} Contact
                              </Button>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatListView;