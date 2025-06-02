
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CommunityHeader from '../components/community/CommunityHeader';
import MemberDirectory from '../components/community/MemberDirectory';
import CommunityStats from '../components/community/CommunityStats';
import CommunityDescription from '../components/community/CommunityDescription';
import { useCommunity } from '../hooks/useCommunity';

const CommunityProfile: React.FC = () => {
  const { id } = useParams();
  const { community, isLoading, error } = useCommunity(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </Layout>
    );
  }

  if (error || !community) {
    return (
      <Layout>
        <div className="container-custom py-8 text-center">
          <h1 className="text-2xl font-bold">Community not found</h1>
          <p className="mt-4">The community you're looking for doesn't exist or is not available.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <CommunityHeader community={community} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <CommunityDescription community={community} />
            <MemberDirectory communityId={community.id} />
          </div>
          <div>
            <CommunityStats community={community} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityProfile;
