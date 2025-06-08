import {  Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {Button } from "@/components/ui/button";


interface Match {
  id: string;
  name: string;
  role: string;
  interests: string[];
  image: string;
}

interface RecentMatchesProps {
  matches: Match[];
  onViewProfile: (matchId: string) => void;
  onConnect: (matchId: string) => void;
  onViewAll: () => void;
  showAll?: boolean;
}

const RecentMatches = ({ matches, onViewProfile, onConnect, onViewAll, showAll = false }: RecentMatchesProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{showAll ? "All Matches" : "Recent Matches"}</h2>
        <Button variant="link" className="text-teal-500" onClick={onViewAll}>
          {showAll ? (
            <>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </>
          ) : (
            <>
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {matches.slice(0, showAll ? undefined : 4).map((match) => (
          <Card key={match.id} className="bg-white rounded-lg shadow-sm p-4 w-full min-w-[200px]">
            <CardHeader className="p-0">
              <img src={match.image} alt={match.name} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <h3 className="font-semibold">{match.name}</h3>
              <p className="text-sm text-gray-500">{match.role} | Lagos Tech Circle</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {match.interests.map((interest, index) => (
                  <span key={index} className="text-xs bg-teal-100 text-teal-500 px-2 py-1 rounded-full">{interest}</span>
                ))}
              </div>
              <div className="flex justify-between mt-4 gap-2">
                <Button
                  variant="ghost"
                  className="text-gray-600 border border-gray-200 bg-gray-200 rounded-full px-3 py-1 flex-1 text-sm min-w-0 truncate"
                  onClick={() => onViewProfile(match.id)}
                >
                  View Profile
                </Button>
                <Button
                  className="bg-teal-500 text-white rounded-full px-3 py-1 flex-1 text-sm min-w-0 truncate"
                  onClick={() => onConnect(match.id)}
                >
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default RecentMatches;