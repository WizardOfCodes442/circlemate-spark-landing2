import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/DashboardHeader";

const CreateCommunity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rules: "",
    category: "",
    location: {
      city: "",
      state: "",
      country: ""
    },
    isPaid: false,
    subscriptionAmount: 0,
    image: ""
  });

  const categories = [
    "Technology",
    "Education",
    "Health",
    "Business",
    "Arts",
    "Sports",
    "Gaming",
    "Travel",
    "Food",
    "Music"
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate community creation
    toast({
      title: "Community Created",
      description: `${formData.name} has been created successfully!`,
    });

    navigate("/communities");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Create New Community</h1>
            <Button variant="outline" onClick={() => navigate("/community")}>
              ← Back to Communities
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Community Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Community Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter community name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your community"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.location.city}
                      onChange={(e) => handleInputChange("location.city", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.location.state}
                      onChange={(e) => handleInputChange("location.state", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.location.country}
                      onChange={(e) => handleInputChange("location.country", e.target.value)}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="rules">Community Rules</Label>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={(e) => handleInputChange("rules", e.target.value)}
                    placeholder="Set community guidelines and rules"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Community Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paid-membership"
                      checked={formData.isPaid}
                      onCheckedChange={(checked) => handleInputChange("isPaid", checked)}
                    />
                    <Label htmlFor="paid-membership">Paid Membership</Label>
                  </div>
                  
                  {formData.isPaid && (
                    <div>
                      <Label htmlFor="subscription-amount">Monthly Subscription Amount ($)</Label>
                      <Input
                        id="subscription-amount"
                        type="number"
                        value={formData.subscriptionAmount}
                        onChange={(e) => handleInputChange("subscriptionAmount", Number(e.target.value))}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={() => navigate("/communities")} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 text-white">
                    Create Community
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateCommunity;
