
import React from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  groupName: string;
  memberCount: number;
  matchesCount: number;
  onGroupUpdatesClick?: () => void;
  onRequestMatchClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  groupName,
  memberCount,
  matchesCount,
  onGroupUpdatesClick,
  onRequestMatchClick
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy">{groupName}</h1>
            <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">
              Active
            </Badge>
          </div>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              {memberCount} members
            </span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {matchesCount} matches
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={onGroupUpdatesClick}
          >
            <Bell size={16} />
            Group Updates
          </Button>
          <Button 
            className="bg-teal hover:bg-teal/90 text-white"
            onClick={onRequestMatchClick}
          >
            Request Match
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
