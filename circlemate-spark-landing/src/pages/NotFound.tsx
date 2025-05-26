import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <img
          src="/404.png"
          alt="Page not found"
          className="mx-auto w-64 mb-6"
        />
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Button onClick={handleGoBack} className="text-white">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
