
import { useState, useEffect } from 'react';
import { Community } from '@/types/community';
import { mockCommunityData } from '@/data/mockCommunityData';

export function useCommunity(communityId?: string) {
  const [community, setCommunity] = useState<Community | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunity() {
      // In a real application, this would be an API call
      // For now, we'll use mock data
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!communityId) {
          throw new Error("Community ID is required");
        }
        
        const foundCommunity = mockCommunityData.find(c => c.id === communityId);
        
        if (!foundCommunity) {
          throw new Error("Community not found");
        }
        
        setCommunity(foundCommunity);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load community");
        setCommunity(null);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCommunity();
  }, [communityId]);
  
  return { community, isLoading, error };
}
