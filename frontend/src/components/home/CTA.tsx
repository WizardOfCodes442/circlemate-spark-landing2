
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-16 bg-navy text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your <span className="text-teal">Perfect Match</span>?
          </h2>
          <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
            Join CircleMate today and start connecting with like-minded individuals in your trusted communities. Whether you're looking for friendship, romance, or professional connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="bg-teal hover:bg-teal/90 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Join Waitlist <ArrowRight size={18} />
            </Link>
            <Link to="/" className="bg-transparent hover:bg-white/10 border-2 border-white text-white px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center">
              Find Groups
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">50+</div>
              <p className="text-gray-300">Active Communities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">10,000+</div>
              <p className="text-gray-300">Successful Matches</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">87%</div>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
