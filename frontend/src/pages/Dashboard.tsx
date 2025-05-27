
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");

  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader />
      
      {/* Sidebar */}
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center my-12">
          <h1 className="text-3xl font-bold mb-4">Welcome to CircleMate!</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your profile is set up and ready to go. Start exploring communities and connecting with others.
          </p>
          
          <div className="mt-8">
            <Button onClick={() => navigate("/")}>Back to Home</Button>
            <Button variant="outline" className="ml-4" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
