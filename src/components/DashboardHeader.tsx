<<<<<<< HEAD
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Bell,
  MessageCircle,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
=======

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Bell, MessageCircle, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< HEAD

  return (
    <header className="border-b bg-card relative z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/discover">
          <img src="/logo.png" alt="CircleMate Logo" className="h-12 w-12" />
          </Link>
          {/* Mobile Logo */}

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/discover">
              <Button variant="ghost" className="text-muted-foreground text-lg">
                Discover
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="ghost" className="text-muted-foreground text-lg">
                Communities
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="ghost" className="text-muted-foreground text-lg">
                Events
              </Button>
            </Link>
            <Link to="/match-making">
              <Button variant="ghost" className="text-muted-foreground text-lg">
                AI-Powered Match Making
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Link to="/notification">
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
            </Link>
            <Link to="/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/icon.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
{isMenuOpen && (
  <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 md:hidden">
    <div className="px-4 py-4 space-y-2">
      <div className="flex justify-between items-center mb-4">
        <img src="/logo.png" alt="CircleMate Logo" className="h-10 w-10" />
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
          <X className="h-8 w-8" />
        </Button>
      </div>

      <Link to="/discover" onClick={() => setIsMenuOpen(false)}>
        <Button variant="ghost" className="w-full justify-start text-lg">
          Discover
        </Button>
      </Link>
      <Link to="/community" onClick={() => setIsMenuOpen(false)}>
        <Button variant="ghost" className="w-full justify-start text-lg">
          My Communities
        </Button>
      </Link>
      <Link to="/events" onClick={() => setIsMenuOpen(false)}>
        <Button variant="ghost" className="w-full justify-start text-lg">
          Events
        </Button>
      </Link>
      <Link to="/match-making">
        <Button variant="ghost" className="text-muted-foreground text-lg">
          AI-Powered Match Making
        </Button>
      </Link>

      <div className="flex justify-around pt-4 border-t mt-4">
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Link to="/notification">
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
        </Button>
        </Link>
        {/* Logout button */}
        <Link to="/login">
          <Button variant="ghost" size="icon">
            <LogOut className="h-6 w-6" />
          </Button>
        </Link>
        <Link to="/profile">
          <Avatar className="h-8 w-8">
              <AvatarImage src="/icon.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </Link>
      </div>
    </div>
  </div>
)}

=======
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
>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
    </header>
  );
};

export default DashboardHeader;
