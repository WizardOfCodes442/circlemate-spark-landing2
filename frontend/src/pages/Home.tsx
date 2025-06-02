
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { mockCommunityData } from '@/data/mockCommunityData';

const Home: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the '#' character
      const id = location.hash.substring(1);
      
      // Find the element with the matching ID
      const element = document.getElementById(id);
      
      // If found, scroll to it
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);
  
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <div className="bg-cream py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockCommunityData.map(community => (
              <Card key={community.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div 
                  className="h-48 w-full bg-cover bg-center border-b"
                  style={{ backgroundImage: `url(${community.bannerImage})` }}
                />
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{community.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{community.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{community.memberCount} members</span>
                    <Link 
                      to={`/community/${community.id}`}
                      className="text-teal hover:text-teal/80 font-medium"
                    >
                      View Community
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <CTA />
    </Layout>
  );
};

export default Home;
