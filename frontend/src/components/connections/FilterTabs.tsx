
import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  activeTab: 'all' | 'pending' | 'scheduled' | 'completed';
  setActiveTab: (tab: 'all' | 'pending' | 'scheduled' | 'completed') => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-1 border-b pb-4 mb-6">
      <Button
        variant={activeTab === 'all' ? 'default' : 'ghost'}
        className={activeTab === 'all' ? 'bg-teal text-white' : ''}
        onClick={() => setActiveTab('all')}
      >
        All Connections
      </Button>
      <Button
        variant={activeTab === 'pending' ? 'default' : 'ghost'}
        className={activeTab === 'pending' ? 'bg-teal text-white' : ''}
        onClick={() => setActiveTab('pending')}
      >
        Pending Meetups
      </Button>
      <Button
        variant={activeTab === 'scheduled' ? 'default' : 'ghost'}
        className={activeTab === 'scheduled' ? 'bg-teal text-white' : ''}
        onClick={() => setActiveTab('scheduled')}
      >
        Scheduled Meetups
      </Button>
      <Button
        variant={activeTab === 'completed' ? 'default' : 'ghost'}
        className={activeTab === 'completed' ? 'bg-teal text-white' : ''}
        onClick={() => setActiveTab('completed')}
      >
        Completed Meetups
      </Button>
    </div>
  );
};

export default FilterTabs;
