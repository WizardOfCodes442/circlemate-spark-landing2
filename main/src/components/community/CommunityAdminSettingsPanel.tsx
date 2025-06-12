import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@radix-ui/react-dialog';
import { Settings, CirclePlus, ShieldCheck, Shield, X, CreditCard, Banknote, CheckCircle, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const CommunityAdminSettingsPanel = () => {
  // State for settings
  const [communityName, setCommunityName] = useState('Tech Circle');
  const [description, setDescription] = useState('A community for tech enthusiasts.');

  // State for co-admins
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Super Admin',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      permissions: ['Manage Members', 'Approve Join Requests', 'Manage Events', 'Send Announcements', 'Manage Settings', 'manage_subscriptions', 'Manage Blacklist'],
    },
    {
      id: 2,
      name: 'Sophia Chen',
      email: 'sophia@example.com',
      role: 'Co-Admin',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      permissions: ['Manage Members', 'Approve Join Requests', 'Manage Events', 'Send Announcements'],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Co-Admin', permissions: [] });
  const [editAdmin, setEditAdmin] = useState(null);

  // State for subscriptions
  const [currentPlan, setCurrentPlan] = useState('Free');
  const [subscriptionPlans] = useState([
    { name: 'Free', price: 0, features: ['Basic features', 'Up to 50 members', '1 admin'], billingCycle: 'Free' },
    { name: 'Basic', price: 10, features: ['All Free features', 'Up to 200 members', '3 admins', 'Email support'], billingCycle: 'Monthly' },
    { name: 'Pro', price: 25, features: ['All Basic features', 'Up to 500 members', '5 admins', 'Priority support', 'Analytics'], billingCycle: 'Monthly' },
    { name: 'Enterprise', price: 50, features: ['All Pro features', 'Unlimited members', 'Unlimited admins', 'Dedicated support', 'Custom branding'], billingCycle: 'Monthly' },
  ]);
  const [paymentDetails, setPaymentDetails] = useState({ method: 'credit_card', cardNumber: '', expiry: '', cvv: '', accountNumber: '', iban: '' });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Handle settings save
  const handleSaveSettings = () => {
    alert(`Settings saved: ${communityName}, ${description}`);
  };

  // Handle co-admin search
  const filteredAdmins = admins.filter(
    (admin) => admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle add co-admin
  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) return;
    setAdmins([...admins, { ...newAdmin, id: admins.length + 1, avatar: `https://randomuser.me/api/portraits/men/${admins.length + 1}.jpg` }]);
    setNewAdmin({ name: '', email: '', role: 'Co-Admin', permissions: [] });
  };

  // Handle edit permissions
  const handleEditPermissions = (admin) => {
    setEditAdmin(admin);
  };

  // Handle save permissions
  const handleSavePermissions = () => {
    setAdmins(admins.map((a) => (a.id === editAdmin.id ? editAdmin : a)));
    setEditAdmin(null);
  };

  // Handle remove admin
  const handleRemoveAdmin = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  // Handle payment submission
  const handlePayment = () => {
    if (paymentDetails.method === 'credit_card') {
      if (!/^\d{16}$/.test(paymentDetails.cardNumber) || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiry) || !/^\d{3,4}$/.test(paymentDetails.cvv)) {
        alert('Invalid credit card details');
        return;
      }
    } else if (paymentDetails.method === 'bank_transfer') {
      if (!paymentDetails.accountNumber || !paymentDetails.iban) {
        alert('Invalid bank transfer details');
        return;
      }
    }

    setPaymentStatus('processing');
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 20;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        setPaymentStatus('success');
        setCurrentPlan(selectedPlan.name);
        setTimeout(() => {
          setPaymentStatus(null);
          setProgress(0);
          setPaymentDetails({ method: 'credit_card', cardNumber: '', expiry: '', cvv: '', accountNumber: '', iban: '' });
          setSelectedPlan(null);
        }, 2000);
      }
    }, 500);
  };

  // Handle unsubscribe
  const handleUnsubscribe = () => {
    if (!cancelReason) {
      alert('Please provide a reason for cancellation');
      return;
    }
    setCurrentPlan('Free');
    setCancelReason('');
    setIsCancelDialogOpen(false);
    alert(`Subscription cancelled for reason: ${cancelReason}`);
  };

  // Permissions options
  const permissionOptions = [
    'Manage Members',
    'Approve Join Requests',
    'Manage Events',
    'Send Announcements',
    'Manage Settings',
    'manage_subscriptions',
    'Manage Blacklist',
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Settings Management</h3>
        <p className="text-sm text-muted-foreground">Configure community settings and manage admins and subscriptions.</p>
      </div>
      <div className="p-6 pt-0 space-y-6">
        {/* Settings Management */}
        <div className="grid gap-4">
          <div>
            <Label className="text-sm font-medium">Community Name</Label>
            <Input
              placeholder="Enter community name..."
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Description</Label>
            <Input
              placeholder="Enter community description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            className="mt-4 bg-teal-500 hover:bg-teal-600 text-white w-full inline-flex items-center gap-2 whitespace-nowrap flex-nowrap rounded-md text-sm"
            onClick={handleSaveSettings}
          >
            <Settings className="h-4 w-4" />
            Save Settings
          </Button>
        </div>

        {/* Co-Admin Management */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Co-Admin Management</h3>
            <p className="text-sm text-muted-foreground">Assign or remove co-admins for your community</p>
          </div>
          <div className="p-6 pt-0">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 pt-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="relative flex-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <Input
                      className="pl-10 w-full"
                      placeholder="Search admins by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white w-full md:w-auto inline-flex items-center gap-2 whitespace-nowrap flex-nowrap rounded-md text-sm">
                        <CirclePlus className="h-4 w-4" />
                        Add Co-Admin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Co-Admin</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={newAdmin.name}
                            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={newAdmin.email}
                            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                            placeholder="Enter email"
                          />
                        </div>
                        <div>
                          <Label>Role</Label>
                          <Select
                            value={newAdmin.role}
                            onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Co-Admin">Co-Admin</SelectItem>
                              <SelectItem value="Super Admin">Super Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Permissions</Label>
                          <div className="flex flex-wrap gap-2">
                            {permissionOptions.map((perm) => (
                              <label key={perm} className="flex items-center gap-1">
                                <input
                                  type="checkbox"
                                  checked={newAdmin.permissions.includes(perm)}
                                  onChange={(e) => {
                                    const updated = e.target.checked
                                      ? [...newAdmin.permissions, perm]
                                      : newAdmin.permissions.filter((p) => p !== perm);
                                    setNewAdmin({ ...newAdmin, permissions: updated });
                                  }}
                                />
                                {perm}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddAdmin}>Add</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-4">
                  {filteredAdmins.map((admin, index) => (
                    <div key={admin.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <img className="aspect-square h-full w-full alt="img" src={admin.avatar} />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{admin.name}</h3>
                              <div
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-white ${
                                  admin.role === 'Super Admin' ? 'bg-blue-600' : 'bg-gray-500'
                                }`}
                              >
                                <div className="flex items-center gap-1">
                                  {admin.role === 'Super Admin' ? (
                                    <ShieldCheck className="h-3 w-3" />
                                  ) : (
                                    <Shield className="h-3 w-3" />
                                  )}
                                  <span>{admin.role}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">{admin.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="inline-flex items-center gap-2 whitespace-nowrap flex-nowrap rounded-md text-sm"
                                onClick={() => handleEditPermissions(admin)}
                              >
                                Edit Permissions
                              </Button>
                            </DialogTrigger>
                            {editAdmin && (
                              <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Edit Permissions for {editAdmin.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label>Permissions</Label>
                                    <div className="flex flex-wrap gap-2">
                                      {permissionOptions.map((perm) => (
                                        <label key={perm} className="flex items-center gap-1">
                                          <input
                                            type="checkbox"
                                            checked={editAdmin.permissions.includes(perm)}
                                            onChange={(e) => {
                                              const updated = e.target.checked
                                                ? [...editAdmin.permissions, perm]
                                                : editAdmin.permissions.filter((p) => p !== perm);
                                              setEditAdmin({ ...editAdmin, permissions: updated });
                                            }}
                                          />
                                          {perm}
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={handleSavePermissions}>Save</Button>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="inline-flex items-center gap-2 whitespace-nowrap flex-nowrap rounded-md text-sm border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                                Remove
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                              <DialogHeader>
                                <DialogTitle>Confirm Removal</DialogTitle>
                              </DialogHeader>
                              <p>Are you sure you want to remove {admin.name} as an admin?</p>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => {}}>
                                  Cancel
                                </Button>
                                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleRemoveAdmin(admin.id)}>
                                  Remove
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t">
                        <p className="text-sm text-gray-600 mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-2">
                          {admin.permissions.map((perm) => (
                            <div
                              key={perm}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100"
                            >
                              {perm}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Management */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Subscription Management</h3>
            <p className="text-sm text-muted-foreground">Manage your community subscription plan</p>
          </div>
          <div className="p-6 pt-0">
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Current Plan: {currentPlan}</h4>
              <p className="text-sm text-gray-600">
                You are currently on the {currentPlan} plan. {currentPlan !== 'Free' ? 'Manage your subscription below.' : 'Upgrade to unlock more features.'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subscriptionPlans.map((plan) => (
                <div key={plan.name} className="border rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{plan.name}</h4>
                    <p className="text-2xl font-bold">${plan.price}<span className="text-sm font-normal">/{plan.billingCycle}</span></p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-teal-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    {currentPlan === plan.name ? (
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white inline-flex items-center gap-2 whitespace-nowrap flex-nowrap rounded-md text-sm"
                        onClick={() => setIsCancelDialogOpen(true)}
                      >
                        Unsubscribe
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white inline-flex items-center gap-2 whitespace-nowrap flex-nowrap rounded-md text-sm"
                            onClick={() => setSelectedPlan(plan)}
                          >
                            Select Plan
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                          <DialogHeader>
                            <DialogTitle>Payment for {selectedPlan?.name} Plan</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Payment Method</Label>
                              <Select
                                value={paymentDetails.method}
                                onValueChange={(value) => setPaymentDetails({ ...paymentDetails, method: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="credit_card">Credit Card</SelectItem>
                                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {paymentDetails.method === 'credit_card' ? (
                              <>
                                <div>
                                  <Label>Card Number</Label>
                                  <Input
                                    value={paymentDetails.cardNumber}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                                    placeholder="1234 5678 9012 3456"
                                  />
                                </div>
                                <div className="flex gap-4">
                                  <div>
                                    <Label>Expiry (MM/YY)</Label>
                                    <Input
                                      value={paymentDetails.expiry}
                                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                                      placeholder="MM/YY"
                                    />
                                  </div>
                                  <div>
                                    <Label>CVV</Label>
                                    <Input
                                      value={paymentDetails.cvv}
                                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                                      placeholder="123"
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <Label>Account Number</Label>
                                  <Input
                                    value={paymentDetails.accountNumber}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                                    placeholder="Enter account number"
                                  />
                                </div>
                                <div>
                                  <Label>IBAN</Label>
                                  <Input
                                    value={paymentDetails.iban}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, iban: e.target.value })}
                                    placeholder="Enter IBAN"
                                  />
                                </div>
                              </>
                            )}
                            {paymentStatus === 'processing' && (
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-teal-500 h-2.5 rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            )}
                            {paymentStatus === 'success' && (
                              <div className="text-green-600 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Payment Successful!
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              className="bg-teal-500 hover:bg-teal-600 text-white"
                              onClick={handlePayment}
                              disabled={paymentStatus === 'processing'}
                            >
                              {paymentStatus === 'processing' ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  Processing...
                                </>
                              ) : (
                                'Confirm Payment'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
              <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                <DialogHeader>
                  <DialogTitle>Unsubscribe from {currentPlan} Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Reason for Cancellation</Label>
                    <Textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Please tell us why you are cancelling..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleUnsubscribe}>
                    Confirm Unsubscribe
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAdminSettingsPanel;
