import {  Card } from "@/components/ui/card";
import {Button } from "@/components/ui/button";

import { ArrowRight, ArrowLeft } from "lucide-react";

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  status?: string;
  date?: string;
  feedback?: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  onViewAll: () => void;
  showAll?: boolean;
}

const RecentActivities = ({ activities, onViewAll, showAll = false }: RecentActivitiesProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{showAll ? "All Activities" : "Recent Activity"}</h2>
        <Button variant="link" className="text-teal-500" onClick={onViewAll}>
          {showAll ? (
            <>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </>
          ) : (
            <>
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex flex-col">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                {activity.status === "pending" && (
                  <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                )}
                {activity.date && (
                  <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {activity.feedback && (
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                )}
                {activity.action.includes("confirmed") && (
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 flex justify-start">
                <p className="text-sm font-medium">
                  {activity.user} {activity.action}
                </p>
                <p className="text-xs text-gray-500 ml-4">{activity.time}</p>
              </div>
            </div>
            <div className="flex justify-start space-x-2">
              {activity.status === "pending" && (
                <>
                  <Button size="sm" className="bg-teal-500 text-white px-6 py-1 rounded-full">
                    Accept
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 px-6 py-1 rounded-full">
                    Decline
                  </Button>
                </>
              )}
              {activity.date && (
                <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 px-6 py-1 rounded-full">
                  View Details
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivities;