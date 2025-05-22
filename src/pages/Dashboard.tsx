
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { User, Bell, MessageCircle, Search, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/lovable-uploads/c497d173-04f8-437a-85b8-41ea147dea87.png"
              alt="CircleMate Logo"
              className="h-8"
            />
            
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-muted-foreground">Discover</Button>
              <Button variant="ghost" className="text-muted-foreground">Communities</Button>
              <Button variant="ghost" className="text-muted-foreground">Events</Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center my-12">
          <h1 className="text-3xl font-bold mb-4">Welcome to CircleMate!</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your profile is set up and ready to go. Start exploring communities and connecting with others.
          </p>
          
          <div className="mt-8">
            <Button onClick={() => navigate("/")}>Back to Home</Button>
            <Button variant="outline" className="ml-4" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
