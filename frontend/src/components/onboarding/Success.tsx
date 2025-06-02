
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Success: React.FC = () => {
  return (
    <div className="text-center py-6 space-y-8">
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-teal/20 rounded-full flex items-center justify-center">
          <CheckCircle size={64} className="text-teal" />
        </div>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold mb-4 text-navy">Profile Created Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Your CircleMate profile is ready. Get started by exploring your dashboard and finding your first connections.
        </p>
      </div>
      
      <div className="max-w-xs mx-auto space-y-4">
        <Link 
          to="/dashboard" 
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          Go to Dashboard <ArrowRight size={18} />
        </Link>
        <Link 
          to="/explore" 
          className="btn-outline w-full"
        >
          Browse Matches
        </Link>
      </div>
      
      <div className="pt-6">
        <h2 className="font-semibold mb-3 text-navy">What's Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center p-3">
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-teal font-bold">1</span>
            </div>
            <p className="text-sm">Explore your group</p>
          </div>
          <div className="text-center p-3">
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-teal font-bold">2</span>
            </div>
            <p className="text-sm">Request matches</p>
          </div>
          <div className="text-center p-3">
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-teal font-bold">3</span>
            </div>
            <p className="text-sm">Plan meetups</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
