import { useState } from "react";
import { Bell, Users, Calendar, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/DashboardHeader";

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "community_update",
    title: "New update from Tech Enthusiasts",
    message: "The community admin posted a new update about upcoming events.",
    timestamp: "2024-01-20T10:30:00Z",
    read: false,
    avatar: "/placeholder.svg",
    icon: Users
  },
  {
    id: "2",
    type: "match",
    title: "New match found!",
    message: "You have a 85% compatibility match with Sarah Wilson in your area.",
    timestamp: "2024-01-20T09:15:00Z",
    read: false,
    avatar: "/placeholder.svg",
    icon: Heart
  },
  {
    id: "3",
    type: "event",
    title: "Event reminder",
    message: "Tech Meetup starts in 2 hours. Don't forget to attend!",
    timestamp: "2024-01-19T14:00:00Z",
    read: true,
    avatar: "/placeholder.svg",
    icon: Calendar
  },
  {
    id: "4",
    type: "message",
    title: "New message",
    message: "John sent you a message in Book Club community.",
    timestamp: "2024-01-19T11:30:00Z",
    read: true,
    avatar: "/placeholder.svg",
    icon: MessageCircle
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(n => !n.read);
      case "matches":
        return notifications.filter(n => n.type === "match");
      case "communities":
        return notifications.filter(n => n.type === "community_update");
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount}</Badge>
              )}
            </div>
            
          </div>
          <div className="flex items-center justify-end mb-4">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="communities">Communities</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="space-y-4">
                {getFilteredNotifications().length > 0 ? (
                  getFilteredNotifications().map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`cursor-pointer transition-colors ${
                        !notification.read ? "bg-primary/5 border-primary/20" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>
                                <notification.icon className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            {!notification.read && (
                              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                                {notification.title}
                              </h3>
                              <span className="text-sm text-muted-foreground">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-8 pb-8 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No notifications found</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
