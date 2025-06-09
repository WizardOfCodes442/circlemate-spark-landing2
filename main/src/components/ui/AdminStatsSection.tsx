import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronUp, Calendar, Heart } from "lucide-react";

const AdminStatsSection = () => {
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
    </>
  );
};

export default AdminStatsSection;