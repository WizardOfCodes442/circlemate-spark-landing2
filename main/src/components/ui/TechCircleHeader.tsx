import { Button } from "@/components/ui/button";
import { Users, Bell, Heart } from "lucide-react";

const TechCircleHeader = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col space-y-2 md:space-y-0">
        {/* Mobile View */}
        <div className="flex items-center md:hidden">
          <h1 className="text-2xl font-bold mr-4">Lagos Tech Circle</h1>
          <span className="text-white bg-teal-500 text-sm font-normal px-2 py-1 rounded-full ml-2">Active</span>
        </div>
        <div className="text-sm text-gray-600 flex items-center md:hidden">
          <Users className="h-4 w-4 mr-1" /> 546 members <Heart className="h-4 w-4 mx-2 text-red-500" /> 345 matches
        </div>
        <div className="flex space-x-2 md:hidden">
          <Button variant="ghost" className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-6 py-2 w-1/2">
            <Bell className="h-4 w-4 mr-2" /> Group Updates
          </Button>
          <Button className="bg-teal-500 text-white rounded-full px-6 py-2 w-1/2">Request Match</Button>
        </div>
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Lagos Tech Circle</h1>
              <span className="text-white bg-teal-500 text-sm font-normal px-2 py-1 rounded-full ml-2">Active</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-6 py-2 w-1/2">
                <Bell className="h-4 w-4 mr-2" /> Group Updates
              </Button>
              <Button className="bg-teal-500 text-white rounded-full px-6 py-2 w-1/2">Request Match</Button>
            </div>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <Users className="h-4 w-4 mr-1" /> 546 members <Heart className="h-4 w-4 mx-2 text-red-500" /> 345 matches
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCircleHeader;