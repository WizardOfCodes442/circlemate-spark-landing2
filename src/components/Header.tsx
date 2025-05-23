
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/icon.png" 
              alt="CircleMate Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-secondary">CircleMate</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</a>
            <div className="flex items-center space-x-4">
              <Link to="/login">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white w-full">
                Log in
              </Button>
              </Link>
              <Link to="/signup">
              <Button className="bg-primary hover:bg-primary-dark text-white w-full">
                Sign Up
              </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 mt-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 mt-1 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white w-full">
                  Log In
                </Button>
                </Link>
                <Link to="/login">
                <Button className="bg-primary hover:bg-primary-dark text-white w-full">
                  Sign Up
                </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
