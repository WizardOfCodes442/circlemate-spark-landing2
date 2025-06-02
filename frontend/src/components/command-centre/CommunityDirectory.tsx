
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  AlertTriangle,
  Filter,
  X
} from 'lucide-react';
import { mockCommunityData } from '@/data/mockCommunityData';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';

const CommunityDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [viewCommunity, setViewCommunity] = useState(null);
  const [warningCommunity, setWarningCommunity] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    communityType: 'all',
    status: 'all',
    minMembers: 0
  });
  const { toast } = useToast();
  
  const filteredCommunities = mockCommunityData.filter(
    community => {
      // Apply search filter
      const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply other filters
      const matchesType = filterOptions.communityType === 'all' || 
                        community.subscriptionType === filterOptions.communityType;
      const matchesMembers = community.memberCount >= filterOptions.minMembers;
      
      return matchesSearch && matchesType && matchesMembers;
    }
  );

  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Community list has been filtered based on your criteria",
    });
    setShowFilterDialog(false);
  };
  
  const handleViewCommunity = (community) => {
    setViewCommunity(community);
    toast({
      title: "Community Details",
      description: `Now viewing ${community.name} details`,
    });
  };
  
  const handleWarnCommunity = (community) => {
    setWarningCommunity(community);
  };
  
  const sendWarning = () => {
    toast({
      title: "Warning Sent",
      description: `A warning has been issued to ${warningCommunity.name}`,
      variant: "destructive"
    });
    setWarningCommunity(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilterDialog(true)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Community</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommunities.slice(0, 5).map((community) => (
              <TableRow key={community.id}>
                <TableCell className="font-medium">{community.name}</TableCell>
                <TableCell>{community.memberCount}</TableCell>
                <TableCell>
                  <Badge variant={community.subscriptionType === 'Community' ? 'default' : 'outline'}>
                    {community.subscriptionType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewCommunity(community)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-amber-500" 
                      onClick={() => handleWarnCommunity(community)}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Communities</DialogTitle>
            <DialogDescription>
              Set filters to narrow down the community list
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Community Type</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="community" 
                    checked={filterOptions.communityType === 'Community'}
                    onCheckedChange={() => setFilterOptions({...filterOptions, communityType: 'Community'})}
                  />
                  <label htmlFor="community" className="text-sm">Community</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="premium" 
                    checked={filterOptions.communityType === 'Premium'}
                    onCheckedChange={() => setFilterOptions({...filterOptions, communityType: 'Premium'})}
                  />
                  <label htmlFor="premium" className="text-sm">Premium</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="all-types" 
                    checked={filterOptions.communityType === 'all'}
                    onCheckedChange={() => setFilterOptions({...filterOptions, communityType: 'all'})}
                  />
                  <label htmlFor="all-types" className="text-sm">All Types</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Minimum Members</h3>
              <Input
                type="number"
                value={filterOptions.minMembers}
                onChange={(e) => setFilterOptions({...filterOptions, minMembers: parseInt(e.target.value) || 0})}
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>Cancel</Button>
            <Button onClick={handleFilterApply}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Community Dialog */}
      <Dialog open={!!viewCommunity} onOpenChange={() => setViewCommunity(null)}>
        <DialogContent className="max-w-3xl">
          {viewCommunity && (
            <>
              <DialogHeader>
                <DialogTitle>{viewCommunity.name}</DialogTitle>
                <DialogDescription>
                  Community Details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {viewCommunity.bannerImage && (
                  <div 
                    className="h-48 w-full bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${viewCommunity.bannerImage})` }}
                  />
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-gray-600">{viewCommunity.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Subscription Type</h3>
                      <Badge variant={viewCommunity.subscriptionType === 'Community' ? 'default' : 'outline'}>
                        {viewCommunity.subscriptionType}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Members</h3>
                      <p>{viewCommunity.memberCount} members</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-1">Created</h3>
                      <p>May 15, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Edit Community</Button>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Warning Dialog */}
      <Dialog open={!!warningCommunity} onOpenChange={() => setWarningCommunity(null)}>
        <DialogContent>
          {warningCommunity && (
            <>
              <DialogHeader>
                <DialogTitle>Issue Warning</DialogTitle>
                <DialogDescription>
                  Send a warning to {warningCommunity.name} for violating platform standards
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Warning Reason</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="content" />
                      <label htmlFor="content" className="text-sm">Inappropriate Content</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="behavior" />
                      <label htmlFor="behavior" className="text-sm">Member Behavior</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="spam" />
                      <label htmlFor="spam" className="text-sm">Spam/Advertising</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="other" />
                      <label htmlFor="other" className="text-sm">Other</label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setWarningCommunity(null)}>Cancel</Button>
                <Button variant="destructive" onClick={sendWarning}>Send Warning</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityDirectory;
