import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  iconType: "user" | "calendar" | "message" | "heart";
  details?: string;
  date?: string;
  feedback?: string;
  rating?: number;
  status?: "pending" | "confirmed";
}

interface RecentActivitiesProps {
  activities: Activity[];
  onViewAll: () => void;
  showAll?: boolean;
  className?: string;
}

const RecentActivities = ({
  activities,
  onViewAll,
  showAll = false,
  className,
}: RecentActivitiesProps) => {
  const getIcon = (iconType: Activity["iconType"], colorClass: string) => {
    switch (iconType) {
      case "user":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 ${colorClass}`}
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      case "calendar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 ${colorClass}`}
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
        );
      case "message":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 ${colorClass}`}
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        );
      case "heart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 ${colorClass}`}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const getIconBgColor = (iconType: Activity["iconType"]) => {
    switch (iconType) {
      case "user":
      case "heart":
        return "bg-orange-100 text-orange-500";
      case "calendar":
        return "bg-teal-100 text-teal-500";
      case "message":
        return "bg-navy-100 text-navy-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ));
  };

  return (
    <Card className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-navy-800">
          {showAll ? "All Activities" : "Recent Activity"}
        </h2>
        <Button
          variant="link"
          className="text-teal-500 text-sm"
          onClick={onViewAll}
        >
          {showAll ? (
            <>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </>
          ) : (
            <>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBgColor(activity.iconType)}`}
            >
              {getIcon(activity.iconType, "")}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <span className="font-medium text-navy-800">
                    {activity.user}
                  </span>
                  <span className="ml-1">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              {(activity.details || activity.date || activity.feedback) && (
                <div className="mt-1 text-sm text-gray-600">
                  {activity.details && <p>{activity.details}</p>}
                  {activity.date && (
                    <p className="flex items-center gap-1 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      {activity.date}
                    </p>
                  )}
                  {activity.feedback && <p>{activity.feedback}</p>}
                </div>
              )}
              {activity.rating && (
                <div className="flex mt-1">{renderStars(activity.rating)}</div>
              )}
              <div className="mt-3 flex gap-2">
                {activity.status === "pending" && (
                  <>
                    <Button
                      className="bg-teal-500 hover:bg-teal-600 text-white text-sm h-9 rounded-md px-3"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="border border-gray-300 bg-white hover:bg-gray-50 text-sm h-9 rounded-md px-3"
                    >
                      Decline
                    </Button>
                  </>
                )}
                {(activity.date || activity.feedback || activity.status === "confirmed") && (
                  <Button
                    variant="outline"
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-sm h-9 rounded-md px-3"
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivities;