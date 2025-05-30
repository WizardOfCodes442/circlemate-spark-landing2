
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Community } from "@/data/mockCommunityData";

interface SubscriptionTabProps {
  community: Community;
  setCommunity: (community: Community) => void;
}

export const SubscriptionTab = ({ community, setCommunity }: SubscriptionTabProps) => {
  const [subscriptionAmount, setSubscriptionAmount] = useState(community.subscriptionAmount || 0);
  const [isPaidCommunity, setIsPaidCommunity] = useState(community.isPaid || false);

  const handleSaveSubscription = () => {
    setCommunity({
      ...community,
      isPaid: isPaidCommunity,
      subscriptionAmount: isPaidCommunity ? subscriptionAmount : 0
    });
    
    toast({
      title: "Subscription Settings Updated",
      description: isPaidCommunity 
        ? `Community subscription set to $${subscriptionAmount}/month` 
        : "Community set to free",
    });
  };

  const handleDeactivate = () => {
    setCommunity({
      ...community,
      isActive: false
    });
    
    toast({
      title: "Community Deactivated",
      description: "Your community has been deactivated.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="paid-community"
              checked={isPaidCommunity}
              onCheckedChange={setIsPaidCommunity}
            />
            <Label htmlFor="paid-community">Enable paid membership</Label>
          </div>
          
          {isPaidCommunity && (
            <div>
              <Label htmlFor="subscription-amount">Monthly subscription amount ($)</Label>
              <Input
                id="subscription-amount"
                type="number"
                value={subscriptionAmount}
                onChange={(e) => setSubscriptionAmount(Number(e.target.value))}
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>
          )}
          
          <Button onClick={handleSaveSubscription}>
            Save Subscription Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleDeactivate}>
            Deactivate Community
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
