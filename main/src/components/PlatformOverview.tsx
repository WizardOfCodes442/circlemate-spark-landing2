import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronUp, Calendar, Heart } from "lucide-react";

const PlatformOverview = () => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="ghost" className="bg-teal-500 text-white rounded-full px-4 py-1 text-sm">
          <Users className="h-4 w-4 mr-2" /> View Accepted Connections
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Total Communities</p>
            <p className="text-2xl font-bold text-navy-700">
              287 <span className="text-sm text-navy-700">+12% this month</span>
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Verified Users</p>
            <p className="text-2xl font-bold text-navy-700">
              12,458 <span className="text-sm text-navy-700">+8% this month</span>
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Heart className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Successful Matches</p>
            <p className="text-2xl font-bold text-navy-700">
              3,842 <span className="text-sm text-navy-700">+15% this month</span>
            </p>
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <Calendar className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">Active Events</p>
            <p className="text-2xl font-bold text-navy-700">
              162 <span className="text-sm text-navy-700">+5% this month</span>
            </p>
          </div>
        </Card>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Platform Growth</h3>
        <div className="w-full h-64">
          <svg className="w-full h-full">
            <rect x="0" y="200" width="100%" height="50" fill="#f4a261" />
            <rect x="0" y="150" width="100%" height="50" fill="#e76f51" />
            <rect x="0" y="100" width="80%" height="50" fill="#2a9d8f" />
            <rect x="0" y="50" width="60%" height="50" fill="#264653" />
            <line x1="0" y1="250" x2="100%" y2="250" stroke="#ccc" />
            <line x1="0" y1="200" x2="100%" y2="200" stroke="#ccc" />
            <line x1="0" y1="150" x2="100%" y2="150" stroke="#ccc" />
            <line x1="0" y1="100" x2="100%" y2="100" stroke="#ccc" />
            <line x1="0" y1="50" x2="100%" y2="50" stroke="#ccc" />
            <text x="10" y="260" fill="#666">0</text>
            <text x="10" y="210" fill="#666">2500</text>
            <text x="10" y="160" fill="#666">5000</text>
            <text x="10" y="110" fill="#666">7500</text>
            <text x="10" y="60" fill="#666">10000</text>
            <text x="50" y="280" fill="#666">Jan</text>
            <text x="150" y="280" fill="#666">Feb</text>
            <text x="250" y="280" fill="#666">Mar</text>
            <text x="350" y="280" fill="#666">Apr</text>
            <text x="450" y="280" fill="#666">May</text>
            <text x="550" y="280" fill="#666">Jun</text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default PlatformOverview;