
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Bell, MessageCircle, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img
                src="/icon.png"
                alt="CircleMate Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-primary hidden sm:inline">CircleMate</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/dashboard">
                <Button 
                  variant={isActive("/dashboard") ? "default" : "ghost"} 
                  className={isActive("/dashboard") ? "text-primary-foreground" : "text-muted-foreground"}
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/discover">
                <Button 
                  variant={isActive("/discover") ? "default" : "ghost"} 
                  className={isActive("/discover") ? "text-primary-foreground" : "text-muted-foreground"}
                >
                  Discover
                </Button>
              </Link>
              <Link to="/communities">
                <Button 
                  variant={isActive("/communities") ? "default" : "ghost"} 
                  className={isActive("/communities") ? "text-primary-foreground" : "text-muted-foreground"}
                >
                  Communities
                </Button>
              </Link>
              <Link to="/events">
                <Button 
                  variant={isActive("/events") ? "default" : "ghost"} 
                  className={isActive("/events") ? "text-primary-foreground" : "text-muted-foreground"}
                >
                  Events
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Link to="/profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant={isActive("/dashboard") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/discover" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant={isActive("/discover") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                Discover
              </Button>
            </Link>
            <Link to="/communities" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant={isActive("/communities") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                Communities
              </Button>
            </Link>
            <Link to="/events" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant={isActive("/events") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                Events
              </Button>
            </Link>
            <div className="flex space-x-3 pt-2">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
