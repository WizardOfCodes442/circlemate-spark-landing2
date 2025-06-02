
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-navy mb-6">About CircleMate</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              CircleMate was founded with a simple mission: to foster meaningful connections within trusted communities.
              In a world where digital interactions often lack depth and authenticity, we wanted to create a platform
              that brings people together based on genuine compatibility and shared values.
            </p>
            
            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              The idea for CircleMate was born when our founders noticed that despite being part of the same communities—churches,
              alumni networks, professional associations—many people struggled to form meaningful connections. 
              Traditional social apps weren't solving this problem, as they often prioritized quantity over quality 
              and lacked the security of a trusted community context.
            </p>
            
            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Our Mission</h2>
            <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 mb-6">
              <p className="text-xl text-navy font-medium">
                "To combat loneliness and build strong communities by facilitating authentic connections 
                among people who already share a foundation of trust."
              </p>
            </div>
            
            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">What Makes Us Different</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Community-Based:</strong> We only operate within established groups where a base level of trust already exists.</li>
              <li><strong>Connection Types:</strong> Whether you're seeking friendship, romance, or professional connections, CircleMate adapts to your intent.</li>
              <li><strong>Smart Matching:</strong> Our algorithm considers multiple factors including values, interests, temperament, and even logistical compatibility.</li>
              <li><strong>Guided Process:</strong> We don't just match you and leave you hanging—we facilitate the entire journey from introduction to meetup.</li>
              <li><strong>Feedback Loop:</strong> Every interaction helps our system learn and improve future matches.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Authenticity</h3>
                <p className="text-sm text-gray-600">
                  We believe in real connections between real people. No fake profiles, no engagement tricks—just genuine interaction.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Community</h3>
                <p className="text-sm text-gray-600">
                  We honor the existing trust in communities and work to strengthen these bonds through meaningful one-on-one connections.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Respect</h3>
                <p className="text-sm text-gray-600">
                  We prioritize user safety, privacy, and agency in all our features and policies.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Join Us</h2>
            <p className="text-gray-700 mb-6">
              Whether you're looking to expand your professional network, find new friends, or discover romantic possibilities,
              CircleMate helps you form relationships that matter within the communities you trust.
            </p>
            
            <div className="flex justify-center mt-8">
              <Link to="/onboarding">
                <Button size="lg" className="bg-teal hover:bg-teal/90 text-white">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
