
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Meaningful{' '}
                <span className="text-primary">Connections</span>{' '}
                Within Your Trusted Circle
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Connect with like-minded individuals in your community for friendship, romance, 
                or professional networking - all within trusted groups you already belong to.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white px-8 py-4 text-lg">
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>50+ Active Communities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>10,000+ Successful Matches</span>
              </div>
            </div>
          </div>

          {/* Right side - Match Request Card */}
          <div className="lg:flex lg:justify-center animate-slide-in-right">
            <div className="relative">
              {/* Floating animation wrapper */}
              <div className="animate-float">
                <Card className="w-full sm:w-[110%] md:w-[120%] lg:w-[140%] p-6 sm:p-8 lg:p-12 bg-white shadow-xl border-0 rounded-2xl">

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Your Match Request</h3>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">New</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        ST
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Sarah Thompson</p>
                        <p className="text-sm text-gray-500">Local Tech Circle - Business</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-primary hover:bg-primary-dark text-white">
                        Accept
                      </Button>
                      <Button variant="outline" className="flex-1 text-gray-600 border-gray-300">
                        Decline
                      </Button>
                    </div>

                    <div className="flex items-center justify-center space-x-4 pt-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
