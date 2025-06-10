import React from 'react';
import { Button } from '../ui/button';
import { Settings } from 'lucide-react';
import { Input } from '../ui/input';

const CommunityAdminSettingsPanel = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Settings Management</h3>
        <p className="text-sm text-muted-foreground">Configure community settings.</p>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Community Name</label>
            <Input placeholder="Enter community name..." defaultValue="Tech Circle" />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Input placeholder="Enter community description..." defaultValue="A community for tech enthusiasts." />
          </div>
        </div>
        <Button className="mt-4">
          <Settings className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default CommunityAdminSettingsPanel;