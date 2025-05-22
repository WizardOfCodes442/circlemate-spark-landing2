
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
        <Button variant="outline" asChild>
          <Link to="/login">Log in</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Sign up</Link>
        </Button>
      </div>
      
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
