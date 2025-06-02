
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const groups = [
  {
    id: '1',
    name: 'Lagos Tech Circle',
    description: 'For tech professionals and enthusiasts in Lagos',
    memberCount: 534,
    image: 'https://images.unsplash.com/photo-1558403194-611308249627',
    categories: ['Technology', 'Professional'],
    subscriptionType: 'Community',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Church of Grace Fellowship',
    description: 'A spiritual community focused on growth and service',
    memberCount: 328,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    categories: ['Religious', 'Community'],
    subscriptionType: 'Individual',
    isFeatured: false
  },
  {
    id: '3',
    name: 'University of Lagos Alumni',
    description: 'Graduates from University of Lagos across all years',
    memberCount: 742,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
    categories: ['Education', 'Alumni'],
    subscriptionType: 'Community',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Lagos Young Professionals',
    description: 'Network of ambitious professionals under 35',
    memberCount: 621,
    image: 'https://images.unsplash.com/photo-1541746972996-4fc1d4ee96f0',
    categories: ['Professional', 'Networking'],
    subscriptionType: 'Individual',
    isFeatured: false
  },
  {
    id: '5',
    name: 'Lagos Book Club',
    description: 'For avid readers who enjoy discussing literature',
    memberCount: 156,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
    categories: ['Hobby', 'Education'],
    subscriptionType: 'Community',
    isFeatured: false
  },
  {
    id: '6',
    name: 'Nigerian Medical Association',
    description: 'For healthcare professionals across Nigeria',
    memberCount: 412,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    categories: ['Professional', 'Medical'],
    subscriptionType: 'Individual',
    isFeatured: true
  },
];

const FindGroups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('Community');
  const { toast } = useToast();
  
  const categories = Array.from(
    new Set(groups.flatMap(group => group.categories))
  ).sort();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterGroups(term, selectedCategory);
  };
  
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    filterGroups(searchTerm, category);
  };
  
  const filterGroups = (term: string, category: string | null) => {
    let filtered = groups;
    
    if (term) {
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(term.toLowerCase()) || 
        group.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(group => 
        group.categories.includes(category)
      );
    }
    
    setFilteredGroups(filtered);
  };

  const handleCreateCommunity = () => {
    toast({
      title: "Community Created",
      description: `Your community "${communityName}" has been created with ${subscriptionType} subscription model.`,
      duration: 5000,
    });
    
    // Reset the form
    setCommunityName('');
    setCommunityDescription('');
    setSubscriptionType('Community');
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Find Your Community</h1>
            <p className="text-gray-600">
              Discover communities where you can connect with like-minded individuals
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-teal hover:bg-teal/90 text-white flex items-center gap-2">
                  <PlusCircle size={18} />
                  Create Community
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Community</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new community.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="community-name">Community Name</Label>
                    <Input 
                      id="community-name"
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)} 
                      placeholder="Enter community name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Community Description</Label>
                    <Textarea 
                      id="description"
                      value={communityDescription}
                      onChange={(e) => setCommunityDescription(e.target.value)} 
                      placeholder="Describe your community and its purpose"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Subscription Type</Label>
                    <RadioGroup 
                      value={subscriptionType} 
                      onValueChange={setSubscriptionType}
                      className="grid gap-3"
                    >
                      <div className="flex items-start space-x-3 space-y-0 border p-4 rounded-lg">
                        <RadioGroupItem value="Community" id="community" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="community" className="font-medium">Community Plan</Label>
                          <p className="text-sm text-muted-foreground">
                            You as the admin pay monthly for all members. Free for your first community.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 space-y-0 border p-4 rounded-lg">
                        <RadioGroupItem value="Individual" id="individual" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="individual" className="font-medium">Individual Plan</Label>
                          <p className="text-sm text-muted-foreground">
                            Each member pays separately to join the community.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    type="submit" 
                    className="bg-teal hover:bg-teal/90 text-white"
                    onClick={handleCreateCommunity}
                  >
                    Create Community
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline"
              asChild
            >
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                <Settings size={18} />
                Manage Community
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for communities by name or description"
                className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-teal"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                className={selectedCategory === null ? "bg-teal hover:bg-teal/90 text-white" : ""}
                onClick={() => handleCategoryFilter(null)}
              >
                All
              </Button>
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-teal hover:bg-teal/90 text-white" : ""}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <div key={group.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={group.image} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  {group.isFeatured && (
                    <div className="absolute top-3 right-3 bg-orange text-white text-xs px-2.5 py-1.5 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white text-navy text-xs px-2.5 py-1.5 rounded-full">
                    {group.subscriptionType === 'Community' ? 'Admin-Paid' : 'Individual-Paid'}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-navy">{group.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 mb-3">
                    {group.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.categories.map(category => (
                      <span 
                        key={category} 
                        className="bg-teal/10 text-teal text-xs px-2.5 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {group.memberCount} members
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          className="bg-teal hover:bg-teal/90 text-white"
                        >
                          Join Community
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join {group.name}</DialogTitle>
                          <DialogDescription>
                            {group.subscriptionType === 'Community'
                              ? "This community has an Admin-Paid subscription. You can join for free if you haven't joined another free group."
                              : "This community requires individual subscriptions. Members must have a Basic or Premium plan."}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="mb-4">Subscription type: <span className="font-medium">{group.subscriptionType === 'Community' ? 'Admin-Paid' : 'Individual-Paid'}</span></p>
                          
                          {group.subscriptionType === 'Individual' && (
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                              <p className="text-amber-800 text-sm">
                                This community requires each member to have an active Basic or Premium subscription.
                              </p>
                            </div>
                          )}
                          
                          <Button className="w-full bg-teal hover:bg-teal/90 text-white">
                            {group.subscriptionType === 'Community' 
                              ? "Join Now" 
                              : "Subscribe & Join"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredGroups.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No communities found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setFilteredGroups(groups);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-navy/5 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-navy mb-3">Don't see your community?</h2>
          <p className="text-gray-600 mb-4">
            Create your own community or contact us for more information
          </p>
          <div className="flex gap-3 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-teal hover:bg-teal/90 text-white">Create Community</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Community</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new community.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="community-name-2">Community Name</Label>
                    <Input 
                      id="community-name-2"
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)} 
                      placeholder="Enter community name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description-2">Community Description</Label>
                    <Textarea 
                      id="description-2"
                      value={communityDescription}
                      onChange={(e) => setCommunityDescription(e.target.value)} 
                      placeholder="Describe your community and its purpose"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Subscription Type</Label>
                    <RadioGroup 
                      value={subscriptionType} 
                      onValueChange={setSubscriptionType}
                      className="grid gap-3"
                    >
                      <div className="flex items-start space-x-3 space-y-0 border p-4 rounded-lg">
                        <RadioGroupItem value="Community" id="community-2" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="community-2" className="font-medium">Community Plan</Label>
                          <p className="text-sm text-muted-foreground">
                            You as the admin pay monthly for all members. Free for your first community.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 space-y-0 border p-4 rounded-lg">
                        <RadioGroupItem value="Individual" id="individual-2" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="individual-2" className="font-medium">Individual Plan</Label>
                          <p className="text-sm text-muted-foreground">
                            Each member pays separately to join the community.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    type="submit" 
                    className="bg-teal hover:bg-teal/90 text-white"
                    onClick={handleCreateCommunity}
                  >
                    Create Community
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindGroups;
