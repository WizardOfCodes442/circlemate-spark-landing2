
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, Shield } from 'lucide-react';
import { Community } from '@/types/community';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CommunityHeaderProps {
  community: Community;
  isAdmin?: boolean;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ community, isAdmin = true }) => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div 
        className="h-64 w-full rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${community.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
      </div>
      
      {/* Community Info Overlay */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{community.name}</h1>
        <div className="flex items-center space-x-4 mb-2">
          <Badge variant="outline" className="bg-white/20 text-white border-none">
            {community.subscriptionType}
          </Badge>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{community.memberCount} members</span>
          </div>
        </div>
      </div>

      {/* Admin Dashboard Button - Always visible now */}
      {/* <div className="absolute top-4 right-4">
        <Button 
          variant="outline" 
          className="bg-white/20 text-white hover:bg-white/30 border-none"
          asChild
        >
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Shield size={16} />
            Admin Dashboard
          </Link>
        </Button>
      </div> */}
    </div>
  );
};

export default CommunityHeader;
