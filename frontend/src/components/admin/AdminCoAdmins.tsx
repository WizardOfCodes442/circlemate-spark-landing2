
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, PlusCircle, Shield, ShieldCheck, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

// Mock Data
const INITIAL_ADMINS = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: 'alex@example.com',
    role: 'SuperAdmin',
    permissions: [
      'manage_members',
      'approve_requests',
      'manage_events',
      'send_announcements',
      'manage_settings',
      'manage_subscriptions',
      'manage_blacklist',
    ],
  },
  {
    id: '2',
    name: 'Sophia Chen',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'sophia@example.com',
    role: 'CoAdmin',
    permissions: [
      'manage_members',
      'approve_requests',
      'manage_events',
      'send_announcements',
    ],
  }
];

const COMMUNITY_MEMBERS = [
  {
    id: '3',
    name: 'Marcus Williams',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'marcus@example.com',
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    email: 'emma@example.com',
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    email: 'david@example.com',
  }
];

const PERMISSION_OPTIONS = [
  { id: 'manage_members', label: 'Manage Members' },
  { id: 'approve_requests', label: 'Approve Join Requests' },
  { id: 'manage_events', label: 'Manage Events' },
  { id: 'send_announcements', label: 'Send Announcements' },
  { id: 'manage_settings', label: 'Manage Settings' },
  { id: 'manage_blacklist', label: 'Manage Blacklist' },
];

const AdminCoAdmins: React.FC = () => {
  const [admins, setAdmins] = useState(INITIAL_ADMINS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [isEditAdminDialogOpen, setIsEditAdminDialogOpen] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = COMMUNITY_MEMBERS.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = () => {
    if (!selectedMember) {
      toast({
        title: "Error",
        description: "Please select a member to add as co-admin.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (selectedPermissions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one permission for the co-admin.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Check if member is already an admin
    const isAlreadyAdmin = admins.some(admin => admin.id === selectedMember.id);
    if (isAlreadyAdmin) {
      toast({
        title: "Error",
        description: "This member is already an admin.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const newAdmin = {
      id: selectedMember.id,
      name: selectedMember.name,
      avatar: selectedMember.avatar,
      email: selectedMember.email,
      role: 'CoAdmin',
      permissions: selectedPermissions,
    };

    setAdmins([...admins, newAdmin]);
    setSelectedMember(null);
    setSelectedPermissions([]);
    setIsAddAdminDialogOpen(false);

    toast({
      title: "Co-Admin Added",
      description: `${selectedMember.name} has been added as a co-admin.`,
      duration: 3000,
    });
  };

  const handleEditAdmin = () => {
    if (!editingAdminId || selectedPermissions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one permission.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setAdmins(admins.map(admin =>
      admin.id === editingAdminId
        ? { ...admin, permissions: selectedPermissions }
        : admin
    ));

    toast({
      title: "Permissions Updated",
      description: "The co-admin's permissions have been updated.",
      duration: 3000,
    });

    setEditingAdminId(null);
    setSelectedPermissions([]);
    setIsEditAdminDialogOpen(false);
  };

  const handleRemoveAdmin = (id: string) => {
    // Cannot remove SuperAdmin
    const adminToRemove = admins.find(admin => admin.id === id);
    if (adminToRemove?.role === 'SuperAdmin') {
      toast({
        title: "Cannot Remove",
        description: "The super admin cannot be removed.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setAdmins(admins.filter(admin => admin.id !== id));
    toast({
      title: "Co-Admin Removed",
      description: `${adminToRemove?.name} has been removed as a co-admin.`,
      duration: 3000,
    });
  };

  const handleOpenEditDialog = (admin: any) => {
    setEditingAdminId(admin.id);
    setSelectedPermissions(admin.permissions);
    setIsEditAdminDialogOpen(true);
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(current =>
      current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId]
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search admins by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal hover:bg-teal/90 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Co-Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Co-Admin</DialogTitle>
                <DialogDescription>
                  Select a member to add as a co-admin and assign permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label className="block mb-2">Select Member</Label>
                <div className="border rounded-md max-h-48 overflow-y-auto">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map(member => (
                      <div 
                        key={member.id} 
                        className={`flex items-center p-3 border-b last:border-0 transition-colors cursor-pointer ${selectedMember?.id === member.id ? 'bg-teal/10' : 'hover:bg-gray-50'}`}
                        onClick={() => setSelectedMember(member)}
                      >
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-center text-sm text-gray-500">No members found</p>
                  )}
                </div>

                <div className="mt-6">
                  <Label className="block mb-2">Assign Permissions</Label>
                  <div className="space-y-2">
                    {PERMISSION_OPTIONS.map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`add-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <label
                          htmlFor={`add-${permission.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddAdminDialogOpen(false);
                    setSelectedMember(null);
                    setSelectedPermissions([]);
                  }}
                >
                  Cancel
                </Button>
                <Button className="bg-teal hover:bg-teal/90 text-white" onClick={handleAddAdmin}>
                  Add Co-Admin
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {filteredAdmins.map(admin => (
            <div key={admin.id} className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={admin.avatar} alt={admin.name} />
                    <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{admin.name}</h3>
                      <Badge className={admin.role === 'SuperAdmin' ? 'bg-blue-600' : 'bg-teal'}>
                        {admin.role === 'SuperAdmin' ? (
                          <div className="flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Super Admin</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>Co-Admin</span>
                          </div>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {admin.role !== 'SuperAdmin' && (
                    <>
                      <Dialog open={isEditAdminDialogOpen && editingAdminId === admin.id} onOpenChange={(open) => {
                        if (!open) {
                          setEditingAdminId(null);
                          setSelectedPermissions([]);
                        }
                        setIsEditAdminDialogOpen(open);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleOpenEditDialog(admin)}
                          >
                            Edit Permissions
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Permissions</DialogTitle>
                            <DialogDescription>
                              Modify the permissions for {admin.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="space-y-2">
                              {PERMISSION_OPTIONS.map(permission => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`edit-${permission.id}`}
                                    checked={selectedPermissions.includes(permission.id)}
                                    onCheckedChange={() => togglePermission(permission.id)}
                                  />
                                  <label
                                    htmlFor={`edit-${permission.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {permission.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setIsEditAdminDialogOpen(false);
                                setEditingAdminId(null);
                                setSelectedPermissions([]);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button className="bg-teal hover:bg-teal/90 text-white" onClick={handleEditAdmin}>
                              Update Permissions
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleRemoveAdmin(admin.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <p className="text-sm text-gray-600 mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {admin.permissions.map(permission => {
                    const permLabel = PERMISSION_OPTIONS.find(p => p.id === permission)?.label || permission;
                    return (
                      <Badge key={permission} variant="outline" className="bg-gray-100">
                        {permLabel}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {filteredAdmins.length === 0 && (
            <div className="text-center py-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">No administrators found</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-teal hover:bg-teal/90 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Your First Co-Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Co-Admin</DialogTitle>
                    <DialogDescription>
                      Select a member to add as a co-admin and assign permissions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label className="block mb-2">Select Member</Label>
                    <div className="border rounded-md max-h-48 overflow-y-auto">
                      {COMMUNITY_MEMBERS.map(member => (
                        <div 
                          key={member.id} 
                          className={`flex items-center p-3 border-b last:border-0 transition-colors cursor-pointer ${selectedMember?.id === member.id ? 'bg-teal/10' : 'hover:bg-gray-50'}`}
                          onClick={() => setSelectedMember(member)}
                        >
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Label className="block mb-2">Assign Permissions</Label>
                      <div className="space-y-2">
                        {PERMISSION_OPTIONS.map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`first-${permission.id}`}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <label
                              htmlFor={`first-${permission.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-teal hover:bg-teal/90 text-white" onClick={handleAddAdmin}>
                      Add Co-Admin
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCoAdmins;
