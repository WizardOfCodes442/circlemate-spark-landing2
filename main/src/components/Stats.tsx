import React from 'react'
import { Link } from "react-router-dom" 
const Stats = () => {
  const stats = [
    {
      number: "50+",
      label: "Active Communities",
      description: "Trusted groups using CircleMate"
    },
    {
      number: "10,000+", 
      label: "Successful Matches",
      description: "Meaningful connections made"
    },
    {
      number: "87%",
      label: "Satisfaction Rate", 
      description: "Users who found their perfect match"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your <span className="text-[#22CCBE]">Perfect Match</span>?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Join CircleMate today and start connecting with like-minded individuals in your trusted communities. Whether you're looking for friendship, romance, or professional connections.
          </p>
        </div>

        {/* <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-[#22CCBE] mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <div className="text-gray-300 text-sm">{stat.description}</div>
            </div>
          ))}
        </div> */}

        <div className="text-center animate-on-scroll">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
            <button className="bg-[#22CCBE] hover:bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 w-full">
              Get Started
            </button>
            </Link>
            <button className="border border-white text-white hover:bg-white hover:text-secondary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Find Groups
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
