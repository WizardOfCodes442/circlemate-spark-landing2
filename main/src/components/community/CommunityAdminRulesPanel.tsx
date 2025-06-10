import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus } from 'lucide-react';

const CommunityAdminRulesPanel = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Rules Management</h3>
        <p className="text-sm text-muted-foreground">Create and manage community rules.</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-6">
          <Input placeholder="Add new rule..." />
        </div>
        <div className="grid gap-4">
          {[
            { id: 1, text: 'Be respectful to all members', created: '3/14/2023' },
            { id: 2, text: 'No spam or self-promotion', created: '5/21/2023' },
          ].map((rule) => (
            <div key={rule.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
              <div>
                <p className="font-medium">{rule.text}</p>
                <span className="text-xs text-gray-400">Created {rule.created}</span>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
        <Button className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>
    </div>
  );
};

export default CommunityAdminRulesPanel;