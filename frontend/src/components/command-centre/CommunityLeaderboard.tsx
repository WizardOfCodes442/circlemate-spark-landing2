
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Medal, Users, CalendarDays, Star, Trophy } from 'lucide-react';
import { mockCommunityData } from '@/data/mockCommunityData';
import { Badge } from '@/components/ui/badge';

const CommunityLeaderboard = () => {
  // Sort communities by member count for the leaderboard
  const sortedCommunities = [...mockCommunityData].sort((a, b) => b.memberCount - a.memberCount).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Top Communities</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-gray-50">By Members</Badge>
          <Badge variant="outline" className="bg-gray-50">By Events</Badge>
          <Badge variant="outline" className="bg-gray-50">By Engagement</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {sortedCommunities.map((community, index) => (
              <div key={community.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {index === 0 && <Medal className="h-8 w-8 text-yellow-500" />}
                    {index === 1 && <Medal className="h-8 w-8 text-gray-400" />}
                    {index === 2 && <Medal className="h-8 w-8 text-amber-700" />}
                    {index > 2 && <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center font-bold">{index + 1}</div>}
                  </div>
                  <div>
                    <h4 className="font-medium">{community.name}</h4>
                    <p className="text-sm text-gray-500">Created {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">Members</span>
                    </div>
                    <span className="font-bold">{community.memberCount}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span className="text-sm">Events</span>
                    </div>
                    <span className="font-bold">{Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="text-sm">Rating</span>
                    </div>
                    <span className="font-bold">{(4 + Math.random()).toFixed(1)}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Community Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Trophy className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">{sortedCommunities[0]?.name || "Top Community"}</p>
                <p className="text-sm text-gray-500">Most Active This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Rising Star</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{sortedCommunities[1]?.name || "Rising Community"}</p>
                <p className="text-sm text-gray-500">Fastest Growing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Best Rated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{sortedCommunities[2]?.name || "Top Rated"}</p>
                <p className="text-sm text-gray-500">Highest Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
