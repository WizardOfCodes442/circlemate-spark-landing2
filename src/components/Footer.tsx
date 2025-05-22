
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/c497d173-04f8-437a-85b8-41ea147dea87.png" 
                alt="CircleMate Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">CircleMate</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Fostering meaningful connections within trusted communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: hello@circlemate.com</li>
              <li className="text-gray-300">Follow Us:</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CircleMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
