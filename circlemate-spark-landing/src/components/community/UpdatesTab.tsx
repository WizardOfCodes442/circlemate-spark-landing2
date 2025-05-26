
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export const UpdatesTab = () => {
  const [updateMessage, setUpdateMessage] = useState("");

  const handlePostUpdate = () => {
    if (!updateMessage.trim()) return;
    
    toast({
      title: "Update Posted",
      description: "Community update has been sent to all members.",
    });
    setUpdateMessage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Community Update</CardTitle>
        <CardDescription>Send an update to all community members</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Write your community update here..."
          value={updateMessage}
          onChange={(e) => setUpdateMessage(e.target.value)}
          rows={5}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handlePostUpdate} disabled={!updateMessage.trim()}>
          <Bell className="h-4 w-4 mr-2" />
          Send Update to All Members
        </Button>
      </CardFooter>
    </Card>
  );
};
