import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [acceptedActivities, setAcceptedActivities] = useState<number[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

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
        return null;
    }
  };

  const getIconBgColor = (iconType: Activity["iconType"]) => {
    switch (iconType) {
      case "user":
        return "bg-orange-100";
      case "calendar":
        return "bg-teal-100";
      case "message":
        return "bg-navy-100";
      case "heart":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  const getIconColor = (iconType: Activity["iconType"]) => {
    switch (iconType) {
      case "user":
        return "text-orange-500";
      case "calendar":
        return "text-teal-500";
      case "message":
        return "text-navy-500";
      case "heart":
        return "text-orange-500";
      default:
        return "text-gray-500";
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
            <span className="font-medium text-xs text-navy-800">
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
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-white text-xs h-8 rounded-md px-3"
                  onClick={() => handleAccept(activity.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 text-xs h-8 rounded-md px-3"
                >
                  Decline
                </Button>
              </>
            )}
          {acceptedActivities.includes(activity.id) && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 font-medium">
                Accepted
              </span>
              <Button
                variant="link"
                className="text-teal-500 text-xs h-8 px-1"
                onClick={() => handleRevert(activity.id)}
              >
                Revert
              </Button>
            </div>
          )}
          {(activity.date ||
            activity.feedback ||
            activity.status === "confirmed") && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 text-xs h-8 rounded-md px-3"
                  onClick={() => setSelectedActivity(activity)}
                >
                  View Details
                </Button>
              </DialogTrigger>
              {selectedActivity?.id === activity.id && (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-sm">Activity Details</DialogTitle>
                  </DialogHeader>
                  <div className="mt-2 text-xs">
                    <p>
                      <strong>{activity.user}</strong> {activity.action}
                    </p>
                    <p className="text-gray-400">{activity.time}</p>
                    {activity.details && <p className="mt-1">{activity.details}</p>}
                    {activity.date && (
                      <p className="mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {activity.date}
                      </p>
                    )}
                    {activity.feedback && (
                      <p className="mt-1">{activity.feedback}</p>
                    )}
                    {activity.rating && (
                      <div className="flex mt-1">{renderStars(activity.rating)}</div>
                    )}
                  </div>
                </DialogContent>
              )}
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-navy-800">
          {showAll ? "All Activities" : "Recent Activity"}
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="text-teal-500 text-xs"
              onClick={onViewAll}
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
            </Button>
          </DialogTrigger>
          {!showAll && (
            <DialogContent className="sm:max-w-[425px] max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-sm">All Activities</DialogTitle>
              </DialogHeader>
              <div className="mt-2 space-y-4 overflow-y-auto max-h-[60vh] pr-2">
                {activities.map((activity) => renderActivity(activity))}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div className="space-y-4">{activities.map((activity) => renderActivity(activity))}</div>
    </Card>
  );
};

export default RecentActivities;