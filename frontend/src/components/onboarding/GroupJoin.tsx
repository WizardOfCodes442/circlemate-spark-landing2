
import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GroupJoinProps {
  onNext: (groupId: string) => void;
}

const exampleGroups = [
  { id: '1', name: 'Lagos Tech Circle', members: 534, type: 'Professional' },
  { id: '2', name: 'First Baptist Fellowship', members: 213, type: 'Religious' },
  { id: '3', name: 'UNN Alumni Association', members: 1204, type: 'Alumni' },
  { id: '4', name: 'Design Lagos', members: 189, type: 'Professional' },
  { id: '5', name: 'Health & Wellness Club', members: 342, type: 'Lifestyle' },
];

const GroupJoin: React.FC<GroupJoinProps> = ({ onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredGroups = exampleGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedGroup) {
      onNext(selectedGroup);
    } else if (groupCode.trim()) {
      // In a real app, we would validate the code here
      onNext(groupCode);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Find Your Community</h1>
        <p className="text-gray-600">
          Join a trusted circle where you'll connect with like-minded individuals.
        </p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="search">Search Groups</TabsTrigger>
          <TabsTrigger value="code">Enter Group Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search groups..."
              className="pl-10 input-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm max-h-60 overflow-y-auto">
            {filteredGroups.length > 0 ? (
              filteredGroups.map(group => (
                <div 
                  key={group.id}
                  className={`p-4 border-b last:border-b-0 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors ${selectedGroup === group.id ? 'bg-teal/10' : ''}`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.members} members · {group.type}</p>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0 flex items-center justify-center">
                    {selectedGroup === group.id && (
                      <div className="h-3 w-3 bg-teal rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No groups found matching "{searchTerm}"
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your group's invitation code"
            className="input-primary"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <p className="text-sm text-gray-500 italic">
            Group codes are provided by group administrators. If you don't have a code, you can search for public groups.
          </p>
        </TabsContent>
      </Tabs>

      <Button 
        className="w-full btn-primary gap-2"
        disabled={!selectedGroup && !groupCode.trim()}
        onClick={handleContinue}
      >
        Continue <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default GroupJoin;
