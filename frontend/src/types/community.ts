
export interface CommunityStats {
  activeConnections: number;
  monthlyMeetups: number;
  discussionTopics: number;
  averageFeedbackRating?: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  logoImage?: string;
  memberCount: number;
  subscriptionType: 'Community' | 'Individual';
  guidelines?: string;
  foundedDate?: string;
  stats?: CommunityStats;
  isPrivate: boolean;
  admins?: CommunityAdmin[];
  matchingRules?: MatchingRule[];
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  occupation: string;
  city: string;
  intent: 'Friendship' | 'Business' | 'Romance' | 'Mentorship';
  joinDate: string;
  isActive: boolean;
  isNew: boolean;
  isBlacklisted?: boolean;
  blacklistedReason?: string;
  blacklistedUntil?: string;
}

export interface CommunityAdmin {
  id: string;
  name: string;
  avatar: string;
  role: 'SuperAdmin' | 'CoAdmin';
  permissions: AdminPermission[];
}

export type AdminPermission = 
  | 'manage_members' 
  | 'approve_requests' 
  | 'manage_events' 
  | 'send_announcements' 
  | 'manage_settings' 
  | 'manage_subscriptions' 
  | 'manage_blacklist';

export interface MatchingRule {
  id: string;
  name: string;
  description: string;
  criteria: {
    attribute: string;
    condition: 'equals' | 'not_equals' | 'contains' | 'not_contains';
    value: string;
  }[];
  isActive: boolean;
}
