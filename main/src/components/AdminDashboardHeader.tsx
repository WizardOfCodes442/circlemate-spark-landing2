import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminDashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-card relative z-50 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <Link to="/discover">
            <img src="/logo.png" alt="CircleMate Logo" className="h-12 w-12" />
          </Link>
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/features">
              <Button variant="ghost" className="text-muted-foreground text-base">
                Features
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="ghost" className="text-muted-foreground text-base">
                How It Works
              </Button>
            </Link>
            <Link to="/testimonials">
              <Button variant="ghost" className="text-muted-foreground text-base">
                Testimonials
              </Button>
            </Link>
            <Link to="/command-centre">
              <Button variant="ghost" className="text-muted-foreground text-base">
                Command Centre
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="text-muted-foreground text-base">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="ghost" className="text-muted-foreground text-base">
                Signup
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
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

          <div className="hidden md:flex items-center space-x-2">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 md:hidden">
          <div className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <img src="/logo.png" alt="CircleMate Logo" className="h-10 w-10" />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-8 w-8" />
              </Button>
            </div>
            <Link to="/features" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-lg">
                Features
              </Button>
            </Link>
            <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-lg">
                How It Works
              </Button>
            </Link>
            <Link to="/testimonials" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-lg">
                Testimonials
              </Button>
            </Link>
            <Link to="/command-centre" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-lg">
                Command Centre
              </Button>
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-lg">
                Login
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-lg">
                Signup
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
    </header>
  );
};

export default AdminDashboardHeader;