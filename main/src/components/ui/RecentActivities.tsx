import { useState } from "react";
import {
  User,
  Calendar,
  MessageCircle,
  Heart,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

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
  status?: "pending" | "confirmed" | "accepted";
}

interface RecentActivitiesProps {
  activities?: Activity[];
  onViewAll?: () => void;
  showAll?: boolean;
  className?: string;
}

const RecentActivities = ({
  activities = [],
  onViewAll = () => {},
  showAll = false,
  className = "",
}: RecentActivitiesProps) => {
  const [acceptedActivities, setAcceptedActivities] = useState<number[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showAllDialog, setShowAllDialog] = useState(false);

  const handleAccept = (id: number) => {
    setAcceptedActivities((prev) => [...prev, id]);
  };

  const handleRevert = (id: number) => {
    setAcceptedActivities((prev) => prev.filter((activityId) => activityId !== id));
  };

  const getIcon = (iconType: Activity["iconType"]) => {
    const colorClass = getIconColor(iconType);
    switch (iconType) {
      case "user":
        return <User className={`h-4 w-4 ${colorClass}`} />;
      case "calendar":
        return <Calendar className={`h-4 w-4 ${colorClass}`} />;
      case "message":
        return <MessageCircle className={`h-4 w-4 ${colorClass}`} />;
      case "heart":
        return <Heart className={`h-4 w-4 ${colorClass}`} />;
      default:
        return null; // This should not happen with proper typing
    }
  };

  const getIconBgColor = (iconType: Activity["iconType"]) => {
    switch (iconType) {
      case "user":
        return "bg-orange-100"; // Matches bg-orange/20
      case "calendar":
        return "bg-teal-100"; // Matches bg-teal/20
      case "message":
        return "bg-blue-100"; // Matches bg-navy/20
      case "heart":
        return "bg-orange-100"; // Matches bg-orange/20
      default:
        return "bg-gray-100"; // Fallback, but should be avoided
    }
  };

  const getIconColor = (iconType: Activity["iconType"]) => {
    switch (iconType) {
      case "user":
        return "text-orange-500"; // Matches text-orange
      case "calendar":
        return "text-teal-500"; // Matches text-teal
      case "message":
        return "text-blue-600"; // Matches text-navy
      case "heart":
        return "text-orange-500"; // Matches text-orange
      default:
        return "text-gray-500"; // Fallback, but should be avoided
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className="w-3 h-3 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.05-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ));
  };

  const renderActivity = (activity: Activity) => (
    <div key={activity.id} className="flex gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBgColor(
          activity.iconType
        )}`}
      >
        {getIcon(activity.iconType)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-medium text-xs text-slate-800">
              {activity.user}
            </span>
            <span className="ml-1 text-xs text-gray-500">{activity.action}</span>
          </div>
          <span className="text-xs text-gray-400">{activity.time}</span>
        </div>
        {(activity.details || activity.date || activity.feedback) && (
          <div className="mt-1 text-xs text-gray-600">
            {activity.details && <p>{activity.details}</p>}
            {activity.date && (
              <p className="flex items-center gap-1 mt-0.5">
                <Calendar className="h-3 w-3 text-gray-600" />
                {activity.date}
              </p>
            )}
            {activity.feedback && <p>{activity.feedback}</p>}
          </div>
        )}
        {activity.rating && (
          <div className="flex mt-0.5">{renderStars(activity.rating)}</div>
        )}
        <div className="mt-2 flex gap-2">
          {activity.status === "pending" &&
            !acceptedActivities.includes(activity.id) && (
              <>
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white text-xs h-8 rounded-md px-3 transition-colors"
                  onClick={() => handleAccept(activity.id)}
                >
                  Accept
                </button>
                <button
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 text-xs h-8 rounded-md px-3 transition-colors"
                >
                  Decline
                </button>
              </>
            )}
          {acceptedActivities.includes(activity.id) && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 font-medium">
                Accepted
              </span>
              <button
                className="text-teal-500 text-xs h-8 px-1 hover:underline"
                onClick={() => handleRevert(activity.id)}
              >
                Revert
              </button>
            </div>
          )}
          {(activity.date ||
            activity.feedback ||
            activity.status === "confirmed") && (
            <button
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 text-xs h-8 rounded-md px-3 transition-colors"
              onClick={() => {
                setSelectedActivity(activity);
                setShowDialog(true);
              }}
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Sample data aligned with desired HTML
  const sampleActivities: Activity[] = [
    {
      id: 1,
      user: "David Brown",
      action: "requested to connect with you",
      time: "2 hours ago",
      iconType: "user",
      status: "pending",
    },
    {
      id: 2,
      user: "Jessica Williams",
      action: "scheduled a meetup with you",
      time: "1 day ago",
      iconType: "calendar",
      details: "Coffee at The Brew House",
      date: "Tomorrow, 10:00 AM",
      status: "confirmed",
    },
    {
      id: 3,
      user: "Michael Johnson",
      action: "left feedback on your meetup",
      time: "2 days ago",
      iconType: "message",
      feedback: "Great conversation, would meet again!",
      rating: 5,
    },
    {
      id: 4,
      user: "Sarah Thompson",
      action: "confirmed your connection request",
      time: "3 days ago",
      iconType: "heart",
      status: "confirmed",
    },
  ];

  const activitiesToShow = activities.length > 0 ? activities : sampleActivities;

  return (
    <div className="relative">
      <div className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            {showAll ? "All Activities" : "Recent Activity"}
          </h2>
          <button
            className="text-teal-500 text-xs hover:underline flex items-center"
            onClick={() => {
              if (showAll) {
                onViewAll();
              } else {
                setShowAllDialog(true);
              }
            }}
          >
            {showAll ? (
              <>
                <ArrowLeft className="h-3 w-3 mr-1" /> Back
              </>
            ) : (
              <>
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </>
            )}
          </button>
        </div>
        <div className="space-y-4">{activitiesToShow.map((activity) => renderActivity(activity))}</div>
      </div>

      {/* Activity Details Dialog */}
      {showDialog && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold">Activity Details</h3>
              <button
                onClick={() => setShowDialog(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="text-xs">
              <p>
                <strong>{selectedActivity.user}</strong> {selectedActivity.action}
              </p>
              <p className="text-gray-400">{selectedActivity.time}</p>
              {selectedActivity.details && <p className="mt-1">{selectedActivity.details}</p>}
              {selectedActivity.date && (
                <p className="mt-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {selectedActivity.date}
                </p>
              )}
              {selectedActivity.feedback && (
                <p className="mt-1">{selectedActivity.feedback}</p>
              )}
              {selectedActivity.rating && (
                <div className="flex mt-1">{renderStars(selectedActivity.rating)}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View All Dialog */}
      {showAllDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold">All Activities</h3>
              <button
                onClick={() => setShowAllDialog(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
              {activitiesToShow.map((activity) => renderActivity(activity))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;