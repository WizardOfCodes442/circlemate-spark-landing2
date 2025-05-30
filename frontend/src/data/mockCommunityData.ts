
import { Community, CommunityMember } from '@/types/community';

export const mockCommunityData: Community[] = [
  {
    id: '1',
    name: 'Tech Innovators Hub',
    description: 'A community for technology professionals and enthusiasts to connect, share ideas, and collaborate on innovative projects. We focus on emerging technologies and career growth in the tech industry.',
    bannerImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    memberCount: 248,
    subscriptionType: 'Community',
    guidelines: 'Be respectful of others\' opinions. Share knowledge freely. No promotional content without prior approval.',
    isPrivate: false,
    stats: {
      activeConnections: 86,
      monthlyMeetups: 12,
      discussionTopics: 24,
      averageFeedbackRating: 4.7
    }
  },
  {
    id: '2',
    name: 'Creative Minds Collective',
    description: 'A community for artists, designers, writers, and all creative professionals to network, showcase their work, and find collaborators for projects.',
    bannerImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    memberCount: 175,
    subscriptionType: 'Community',
    isPrivate: false,
    stats: {
      activeConnections: 58,
      monthlyMeetups: 8,
      discussionTopics: 16
    }
  },
  {
    id: '3',
    name: 'Wellness Warriors',
    description: 'A supportive community focused on health, wellness, and personal development. Members share tips, challenges, and encouragement for living a balanced lifestyle.',
    bannerImage: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    memberCount: 320,
    subscriptionType: 'Individual',
    isPrivate: true,
    guidelines: 'Respect privacy. Be supportive, not judgmental. Share evidence-based information.',
    stats: {
      activeConnections: 124,
      monthlyMeetups: 18,
      discussionTopics: 32,
      averageFeedbackRating: 4.9
    }
  }
];

export const mockCommunityMembers: CommunityMember[] = [
  {
    id: '101',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    occupation: 'Software Engineer',
    city: 'San Francisco',
    intent: 'Business',
    joinDate: '2024-10-15',
    isActive: true,
    isNew: false
  },
  {
    id: '102',
    name: 'Michael Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    occupation: 'Product Manager',
    city: 'Atlanta',
    intent: 'Mentorship',
    joinDate: '2024-11-02',
    isActive: true,
    isNew: false
  },
  {
    id: '103',
    name: 'Jessica Kim',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    occupation: 'UX Designer',
    city: 'Chicago',
    intent: 'Friendship',
    joinDate: '2025-01-10',
    isActive: false,
    isNew: true
  },
  {
    id: '104',
    name: 'David Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79',
    occupation: 'Data Scientist',
    city: 'Boston',
    intent: 'Business',
    joinDate: '2024-12-05',
    isActive: true,
    isNew: false
  },
  {
    id: '105',
    name: 'Amanda Lewis',
    avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1',
    occupation: 'Marketing Director',
    city: 'Denver',
    intent: 'Friendship',
    joinDate: '2025-01-28',
    isActive: false,
    isNew: true
  },
  {
    id: '106',
    name: 'Robert Thompson',
    avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126',
    occupation: 'Entrepreneur',
    city: 'Austin',
    intent: 'Business',
    joinDate: '2024-11-15',
    isActive: true,
    isNew: false
  },
  {
    id: '107',
    name: 'Jennifer Smith',
    avatar: 'https://images.unsplash.com/photo-1613145997970-db84a7975fbb',
    occupation: 'Project Manager',
    city: 'Seattle',
    intent: 'Mentorship',
    joinDate: '2024-09-20',
    isActive: true,
    isNew: false
  },
  {
    id: '108',
    name: 'Thomas Clark',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    occupation: 'Web Developer',
    city: 'Portland',
    intent: 'Romance',
    joinDate: '2025-02-03',
    isActive: false,
    isNew: true
  }
];
