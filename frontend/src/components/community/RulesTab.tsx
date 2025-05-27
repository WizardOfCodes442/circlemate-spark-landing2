
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Community } from "@/data/mockCommunityData";

interface RulesTabProps {
  community: Community;
  setCommunity: React.Dispatch<React.SetStateAction<Community>>;
}

export const RulesTab = ({ community, setCommunity }: RulesTabProps) => {
  const [editingRules, setEditingRules] = useState(false);
  const [newRules, setNewRules] = useState(community.rules);

  const handleSaveRules = () => {
    setCommunity(prev => ({ ...prev, rules: newRules }));
    setEditingRules(false);
    toast({
      title: "Rules Updated",
      description: "Community rules have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Community Rules</CardTitle>
          <Button 
            variant="outline" 
            onClick={() => setEditingRules(!editingRules)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {editingRules ? "Cancel" : "Edit Rules"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {editingRules ? (
          <div className="space-y-4">
            <Textarea
              value={newRules}
              onChange={(e) => setNewRules(e.target.value)}
              rows={8}
              placeholder="Enter community rules..."
            />
            <Button onClick={handleSaveRules}>Save Rules</Button>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm">{community.rules}</div>
        )}
      </CardContent>
    </Card>
  );
};
