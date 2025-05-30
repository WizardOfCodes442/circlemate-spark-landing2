
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Join Your Group",
    description: "Enter your group's code or search to find your community within CircleMate.",
    color: "bg-teal"
  },
  {
    number: "02",
    title: "Create Your Profile",
    description: "Tell us about yourself, your interests, and what kind of connection you're looking for.",
    color: "bg-navy"
  },
  {
    number: "03",
    title: "Get Matched",
    description: "Our algorithm finds compatible matches within your group based on shared interests and availability.",
    color: "bg-orange"
  },
  {
    number: "04",
    title: "Plan & Meet",
    description: "Schedule a meetup at one of our suggested venues and start building a meaningful connection.",
    color: "bg-teal"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-cream">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy">How CircleMate Works</h2>
          <p className="text-lg text-navy/80">
            Your journey to meaningful connections in four simple steps.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="card relative group">
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-navy">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
