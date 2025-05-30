
import { useState, useEffect } from 'react';
import { CommunityMember } from '@/types/community';
import { mockCommunityMembers } from '@/data/mockCommunityData';

export function useCommunityMembers(communityId: string) {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Filter members by community ID in a real application
        // For now, just return the mock data
        setMembers(mockCommunityMembers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load members");
        setMembers([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMembers();
  }, [communityId]);
  
  return { members, isLoading, error };
}
