<div class="absolute top-3 right-3 bg-orange text-white text-xs px-2.5 py-1.5 rounded-full">Featured</div>


// src/components/Communities.tsx
import { useState } from "react";
import { CirclePlus, Settings, Search, Users, MapPin, X, CreditCard, Banknote, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { Community, initialCommunities } from "@/data/communityData";

interface PaymentDetails {
  method: "credit_card" | "bank_transfer";
  cardNumber: string;
  expiry: string;
  cvv: string;
  accountNumber: string;
  iban: string;
}

const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>(initialCommunities);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    subscriptionType: "Community",
    image: "",
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: "credit_card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    accountNumber: "",
    iban: "",
  });
  const [paymentStatus, setPaymentStatus] = useState<"processing" | "success" | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  const categories = [
    "All",
    "Alumni",
    "Community",
    "Education",
    "Hobby",
    "Medical",
    "Networking",
    "Professional",
    "Religious",
    "Technology",
  ];

  const filteredCommunities = communities.filter(
    (community) =>
      (selectedCategory === "All" || community.tags.includes(selectedCategory)) &&
      (community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateCommunity = () => {
    if (!newCommunity.name || !newCommunity.description || !newCommunity.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    const newId = (communities.length + 1).toString();
    setCommunities([
      {
        id: newId,
        name: newCommunity.name,
        description: newCommunity.description,
        image: newCommunity.image,
        memberCount: 1,
        tags: ["Community"],
        subscriptionType: newCommunity.subscriptionType === "Community" ? "Admin-Paid" : "Individual-Paid",
        members: [{ id: "user1", name: "Current User", avatar: "/user1.png", lastActive: "2025-06-12", role: "admin" }],
      },
      ...communities,
    ]);
    setNewCommunity({ name: "", description: "", subscriptionType: "Community", image: "" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCommunity({ ...newCommunity, image: imageUrl });
    }
  };

  const handlePayment = () => {
    if (paymentDetails.method === "credit_card") {
      if (!/^\d{16}$/.test(paymentDetails.cardNumber) || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiry) || !/^\d{3,4}$/.test(paymentDetails.cvv)) {
        alert("Invalid credit card details");
        return;
      }
    } else if (paymentDetails.method === "bank_transfer") {
      if (!paymentDetails.accountNumber || !paymentDetails.iban) {
        alert("Invalid bank transfer details");
        return;
      }
    }

    setPaymentStatus("processing");
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 20;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        setPaymentStatus("success");
        if (selectedCommunity) {
          setCommunities(
            communities.map((c) =>
              c.id === selectedCommunity.id ? { ...c, memberCount: c.memberCount + 1 } : c
            )
          );
        }
        setTimeout(() => {
          setPaymentStatus(null);
          setProgress(0);
          setPaymentDetails({ method: "credit_card", cardNumber: "", expiry: "", cvv: "", accountNumber: "", iban: "" });
          setSelectedCommunity(null);
        }, 2000);
      }
    }, 500);
  };
// Add these state variables at the top of your component
const [mainDialogOpen, setMainDialogOpen] = useState(false);
const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex-grow pt-20">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-navy mb-2">Find Your Community</h1>
              <p className="text-gray-600 text-sm">Discover communities where you can connect with like-minded individuals</p>
            </div>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-teal-500 hover:bg-teal-500/90 text-white inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md">
                    <CirclePlus className="h-4 w-4" />
                    Create Community
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create New Community</DialogTitle>
                    <p className="text-sm text-muted-foreground">Fill in the details below to create a new community.</p>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="community-name">Community Name</Label>
                      <Input
                        id="community-name"
                        placeholder="Enter community name"
                        value={newCommunity.name}
                        onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        placeholder="Describe your community and its purpose"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        rows={3}
                        value={newCommunity.description}
                        onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Community Photo</Label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="w-full border rounded-md p-2"
                        onChange={handleImageUpload}
                      />
                      {newCommunity.image && (
                        <img src={newCommunity.image} alt="Community preview" className="w-full h-32 object-cover rounded-md mt-2" />
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label>Subscription Type</Label>
                      <div className="grid gap-3">
                        <div className="flex items-start space-x-3 border p-4 rounded-lg">
                          <input
                            type="radio"
                            id="community"
                            value="Community"
                            checked={newCommunity.subscriptionType === "Community"}
                            onChange={() => setNewCommunity({ ...newCommunity, subscriptionType: "Community" })}
                            className="h-4 w-4 rounded-full border border-primary"
                          />
                          <div className="grid gap-1.5">
                            <Label htmlFor="community" className="font-medium">Community Plan</Label>
                            <p className="text-sm text-muted-foreground">You as the admin pay monthly for all members. Free for your first community.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 border p-4 rounded-lg">
                          <input
                            type="radio"
                            id="individual"
                            value="Individual"
                            checked={newCommunity.subscriptionType === "Individual"}
                            onChange={() => setNewCommunity({ ...newCommunity, subscriptionType: "Individual" })}
                            className="h-4 w-4 rounded-full border border-primary"
                          />
                          <div className="grid gap-1.5">
                            <Label htmlFor="individual" className="font-medium">Individual Plan</Label>
                            <p className="text-sm text-muted-foreground">Each member pays separately to join the community.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewCommunity({ name: "", description: "", subscriptionType: "Community", image: "" })}>
                      Cancel
                    </Button>
                    <Button className="bg-teal-500 hover:bg-teal-500/90 text-white" onClick={handleCreateCommunity}>
                      Create Community
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link to="/community-admin">
                <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md">
                  <Settings className="h-4 w-4" />
                  Manage Community
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-teal"
                  placeholder="Search for communities by name or description"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    className={`h-10 px-4 py-2 text-sm font-medium ${
                      selectedCategory === category
                        ? "bg-teal-500 hover:bg-teal-500/90 text-white"
                        : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    } inline-flex items-center gap-2 whitespace-nowrap rounded-md`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <Link to={`/community/${community.id}`} key={community.id}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="h-48 bg-gray-200 relative">
                      <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                      {community.isFeatured && (
                        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2.5 py-1.5 rounded-full z-10">Featured</div>
                      )}
                     <div className="absolute top-3 left-3 bg-white text-blue-900 text-xs px-2.5 py-1.5 rounded-full z-10">
                        {community.subscriptionType}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-navy">{community.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 mb-3">{community.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {community.tags.map((tag) => (
                          <span key={tag} className="bg-teal-500/10 text-teal text-xs px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{community.memberCount} members</span>
                        // Your dialog JSX with the fixes:
                        <Dialog open={mainDialogOpen} onOpenChange={setMainDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-teal-500 hover:bg-teal-500/90 text-white inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-9 px-3 rounded-md"
                                    onClick={(e) => {
                                    e.preventDefault(); // Prevent Link navigation
                                    e.stopPropagation(); // Stop event bubbling to Link
                                    setSelectedCommunity(community);
                                    setMainDialogOpen(true); // Open main dialog
                                    }}
                                >
                                    Join Community
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white p-6 rounded-lg max-w-lg">
                                <DialogHeader>
                                <DialogTitle>Join {community.name}</DialogTitle>
                                    <p className="text-sm text-muted-foreground">
                                         This community requires individual subscriptions. Members must have a Basic or Premium plan.
                                    </p>
                                </DialogHeader>
                                <div className="py-4">
                                    <p className="mb-4">
                                         Subscription type: <span className="font-medium">{community.subscriptionType}</span>
                                    </p>
                                    {community.subscriptionType === "Individual-Paid" && (
                                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                                    <p className="text-amber-800 text-sm">
                                    This community requires each member to have an active Basic or Premium subscription.
                                </p>
                                </div>
      )}
      {community.subscriptionType === "Individual-Paid" ? (
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-teal-500 hover:bg-teal-500/90 text-white inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md">
              Subscribe & Join
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white p-6 rounded-lg max-w-lg">
            <DialogHeader>
              <DialogTitle>Payment for {community.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Payment Method</Label>
                <Select
                  value={paymentDetails.method}
                  onValueChange={(value) =>
                    setPaymentDetails({ ...paymentDetails, method: value as "credit_card" | "bank_transfer" })
                  }
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
              {paymentDetails.method === "credit_card" ? (
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
              {paymentStatus === "processing" && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-teal-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              {paymentStatus === "success" && (
                <div className="text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Payment Successful!
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                className="bg-teal-500 hover:bg-teal-500/90 text-white inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md"
                onClick={async () => {
                  await handlePayment();
                  // Close both dialogs after successful payment
                  if (paymentStatus === "success") {
                    setPaymentDialogOpen(false);
                    setMainDialogOpen(false);
                  }
                }}
                disabled={paymentStatus === "processing"}
              >
                {paymentStatus === "processing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          className="w-full bg-teal-500 hover:bg-teal-500/90 text-white inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md"
          onClick={() => {
            setCommunities(
              communities.map((c) =>
                c.id === community.id ? { ...c, memberCount: c.memberCount + 1 } : c
              )
            );
            setMainDialogOpen(false); // Close the main dialog
          }}
        >
          Join Community
        </Button>
      )}
    </div>
  </DialogContent>
</Dialog>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-navy/5 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-navy mb-3">Don't see your community?</h2>
            <p className="text-gray-600 text-sm mb-4">Create your own community or contact us for more information</p>
            <div className="flex gap-3 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-teal-500 hover:bg-teal-500/90 text-white inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md">
                    Create Community
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg max-w-lg">
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="community-name">Community Name</Label>
                      <input
                        id="community-name" input
                        placeholder="text" type="Enter community name"
                        value={newCommunity.name}
                        onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label for="description">Description</Label>
                      <textarea
                        id="description"
                        placeholder="Describe your community and its purpose"
                        className="w-full rounded-md border rounded-full h-2.5 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus:ring-2 focus:ring-teal focus-visible:ring-offset-2"
                        rows={3}
                        value={newCommunity.description}
                        onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label for="image">Community Photo</Label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="w-full border rounded-md p-2"
                        onChange={handleImageUpload}
                      />
                      {newCommunity.image && (
                        <img src={newCommunity.image} alt="Community preview" className="w-full h-32 object-cover rounded-md mt-2" />}
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label>Subscriptions</Label>
                      <div className="grid gap-3">
                        <div className="flex items-start space-x-3 border p-4 rounded-lg">
                          <input
                            type="radio"
                            id="community"
                            value="Community"
                            checked={newCommunity.subscriptionType === "Community"}
                            onChange={() => setNewCommunity({ ...newCommunity, subscriptionType: "Community" })}
                            className="h-4 w-4 rounded-full border border-primary"
                          />
                          <div className="grid gap-1.5">
                            <Label htmlFor="community" className="font-medium">Community Plan</Label>
                            <p className="text-sm text-muted-foreground">You as the admin pay monthly for all members. Free for your first community.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 border p-4 rounded-lg">
                          <input
                            type="radio"
                            id="individual"
                            value="Individual"
                            checked={newCommunity.subscriptionType === "Individual"}
                            onChange={() => setNewCommunity({ ...newCommunity, subscriptionType: "Individual" })}
                            className="h-4 w-4 rounded-full border border-primary"
                          />
                          <div className="grid gap-1.5">
                            <Label htmlFor="individual" className="font-medium">Individual Plan</Label>
                            <p className="text-sm text-muted-foreground">Each member pays separately to join the community.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewCommunity({ name: "", description: "", subscriptionType: "Community", image: "" })}>
                      Cancel
                    </Button>
                    <Button className="bg-teal-500 hover:bg-teal-500/90 text-white" onClick={handleCreateCommunity}>
                      Create Community
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link to="/contact">
                <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium h-10 px-4 rounded-md">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Communities;
