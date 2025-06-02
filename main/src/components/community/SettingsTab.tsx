
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Community } from "@/data/mockCommunityData";

interface SettingsTabProps {
  community: Community;
}

export const SettingsTab = ({ community }: SettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Community Name</label>
          <Input defaultValue={community.name} />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea defaultValue={community.description} rows={3} />
        </div>
        <Button>Save Settings</Button>
      </CardContent>
    </Card>
  );
};
