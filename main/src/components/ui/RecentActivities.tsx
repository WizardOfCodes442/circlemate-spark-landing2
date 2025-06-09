import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  className?: string;
}

const RecentActivities = ({ activities, onViewAll, showAll = false, className }: RecentActivitiesProps) => {
  return (
    <Card className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold lg:text-base">{showAll ? "All Activities" : "Recent Activity"}</h2>
        <Button variant="link" className="text-teal-500 text-sm lg:text-xs" onClick={onViewAll}>
          {showAll ? (
            <>
              <ArrowLeft className="h-3 w-3 mr-1 lg:h-2.5 lg:w-2.5" /> Back
            </>
          ) : (
            <>
              View All <ArrowRight className="h-3 w-3 ml-1 lg:h-2.5 lg:w-2.5" />
            </>
          )}
        </Button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex flex-col">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-2 lg:w-5 lg:h-5">
                {activity.status === "pending" && (
                  <svg className="w-3 h-3 text-teal-500 lg:w-2.5 lg:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                )}
                {activity.date && (
                  <svg className="w-3 h-3 text-teal-500 lg:w-2.5 lg:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {activity.feedback && (
                  <svg className="w-3 h-3 text-gray-500 lg:w-2.5 lg:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                )}
                {activity.action.includes("confirmed") && (
                  <svg className="w-3 h-3 text-orange-500 lg:w-2.5 lg:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 flex justify-start">
                <p className="text-xs font-medium lg:text-[0.65rem]">
                  {activity.user} {activity.action}
                </p>
                <p className="text-[0.65rem] text-gray-500 ml-3 lg:text-[0.6rem]">{activity.time}</p>
              </div>
            </div>
            <div className="flex justify-start space-x-2">
              {activity.status === "pending" && (
                <>
                  <Button size="sm" className="bg-teal-500 text-white text-xs lg:text-[0.65rem] px-4 py-1 rounded-full w-20 lg:w-16">
                    Accept
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 text-xs lg:text-[0.65rem] px-4 py-1 rounded-full w-20 lg:w-16">
                    Decline
                  </Button>
                </>
              )}
              {activity.date && (
                <Button variant="ghost" size="sm" className="text-gray-700 bg-gray-200 text-xs lg:text-[0.65rem] px-4 py-1 rounded-full w-20 lg:w-16">
                  View 
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