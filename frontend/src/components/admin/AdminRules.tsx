
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const initialRules = [
  {
    id: '1',
    name: 'Similar Interests',
    description: 'Match members with at least 3 common interests',
    criteria: [
      {
        attribute: 'interests',
        condition: 'contains',
        value: '3',
      }
    ],
    isActive: true,
  },
  {
    id: '2',
    name: 'Same Location',
    description: 'Match members who are in the same city or within 30 miles',
    criteria: [
      {
        attribute: 'location',
        condition: 'equals',
        value: 'city',
      }
    ],
    isActive: true,
  },
  {
    id: '3',
    name: 'Compatible Personality',
    description: 'Match based on complementary personality traits',
    criteria: [
      {
        attribute: 'personality',
        condition: 'contains',
        value: 'complementary',
      }
    ],
    isActive: false,
  }
];

const AdminRules: React.FC = () => {
  const [rules, setRules] = useState(initialRules);
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [attribute, setAttribute] = useState('interests');
  const [condition, setCondition] = useState('contains');
  const [value, setValue] = useState('');
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
    
    const rule = rules.find(r => r.id === id);
    toast({
      title: `Rule ${rule?.isActive ? 'Disabled' : 'Enabled'}`,
      description: `"${rule?.name}" has been ${rule?.isActive ? 'disabled' : 'enabled'}.`,
      duration: 3000,
    });
  };

  const handleDeleteRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule Deleted",
      description: `"${rule?.name}" has been removed.`,
      variant: "destructive",
      duration: 3000,
    });
  };

  const handleSaveRule = () => {
    if (!ruleName || !ruleDescription || !attribute || !condition || !value) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (editingRuleId) {
      // Update existing rule
      setRules(rules.map(rule => 
        rule.id === editingRuleId 
          ? { 
              ...rule, 
              name: ruleName, 
              description: ruleDescription,
              criteria: [{ attribute, condition, value }],
            } 
          : rule
      ));
      toast({
        title: "Rule Updated",
        description: `"${ruleName}" has been updated.`,
        duration: 3000,
      });
    } else {
      // Create new rule
      setRules([
        ...rules,
        {
          id: Date.now().toString(),
          name: ruleName,
          description: ruleDescription,
          criteria: [{ attribute, condition, value }],
          isActive: true,
        }
      ]);
      toast({
        title: "Rule Created",
        description: `"${ruleName}" has been added.`,
        duration: 3000,
      });
    }
    
    // Reset form
    setRuleName('');
    setRuleDescription('');
    setAttribute('interests');
    setCondition('contains');
    setValue('');
    setEditingRuleId(null);
  };

  const handleEdit = (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      setRuleName(rule.name);
      setRuleDescription(rule.description);
      setAttribute(rule.criteria[0].attribute);
      setCondition(rule.criteria[0].condition);
      setValue(rule.criteria[0].value);
      setEditingRuleId(id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Community Matching Rules</CardTitle>
          <CardDescription>
            Configure matching rules and criteria for your community members.
          </CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-teal hover:bg-teal/90 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingRuleId ? 'Edit' : 'Create'} Matching Rule</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input
                  id="rule-name"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g., Similar Interests"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rule-description">Description</Label>
                <Input
                  id="rule-description"
                  value={ruleDescription}
                  onChange={(e) => setRuleDescription(e.target.value)}
                  placeholder="Describe what this rule does"
                />
              </div>
              <div className="grid gap-2">
                <Label>Criteria</Label>
                <div className="flex gap-2">
                  <Select value={attribute} onValueChange={setAttribute}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Attribute" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interests">Interests</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="personality">Personality</SelectItem>
                      <SelectItem value="age">Age</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="not_equals">Not Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="not_contains">Not Contains</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Value"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setRuleName('');
                setRuleDescription('');
                setAttribute('interests');
                setCondition('contains');
                setValue('');
                setEditingRuleId(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveRule} className="bg-teal hover:bg-teal/90 text-white">
                {editingRuleId ? 'Update' : 'Create'} Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules.map((rule) => (
            <div 
              key={rule.id} 
              className={`border rounded-lg p-4 transition-shadow hover:shadow-sm ${rule.isActive ? 'border-teal/30 bg-teal/5' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{rule.name}</h4>
                    {rule.isActive ? (
                      <Badge className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500 border-gray-300">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                  <div className="mt-2 flex gap-2">
                    {rule.criteria.map((criterion, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-100 border-gray-300">
                        {criterion.attribute} {criterion.condition} {criterion.value}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={rule.isActive} 
                      onCheckedChange={() => handleToggleRule(rule.id)}
                      id={`rule-switch-${rule.id}`}
                    />
                    <Label htmlFor={`rule-switch-${rule.id}`}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(rule.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{editingRuleId ? 'Edit' : 'Create'} Matching Rule</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="rule-name-edit">Rule Name</Label>
                          <Input
                            id="rule-name-edit"
                            value={ruleName}
                            onChange={(e) => setRuleName(e.target.value)}
                            placeholder="e.g., Similar Interests"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="rule-description-edit">Description</Label>
                          <Input
                            id="rule-description-edit"
                            value={ruleDescription}
                            onChange={(e) => setRuleDescription(e.target.value)}
                            placeholder="Describe what this rule does"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Criteria</Label>
                          <div className="flex gap-2">
                            <Select value={attribute} onValueChange={setAttribute}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Attribute" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="interests">Interests</SelectItem>
                                <SelectItem value="location">Location</SelectItem>
                                <SelectItem value="personality">Personality</SelectItem>
                                <SelectItem value="age">Age</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select value={condition} onValueChange={setCondition}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="not_equals">Not Equals</SelectItem>
                                <SelectItem value="contains">Contains</SelectItem>
                                <SelectItem value="not_contains">Not Contains</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              placeholder="Value"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {
                          setRuleName('');
                          setRuleDescription('');
                          setAttribute('interests');
                          setCondition('contains');
                          setValue('');
                          setEditingRuleId(null);
                        }}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveRule} className="bg-teal hover:bg-teal/90 text-white">
                          {editingRuleId ? 'Update' : 'Create'} Rule
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {rules.length === 0 && (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">No matching rules configured yet</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-teal hover:bg-teal/90 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create First Rule
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create Matching Rule</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="rule-name-first">Rule Name</Label>
                      <Input
                        id="rule-name-first"
                        value={ruleName}
                        onChange={(e) => setRuleName(e.target.value)}
                        placeholder="e.g., Similar Interests"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rule-description-first">Description</Label>
                      <Input
                        id="rule-description-first"
                        value={ruleDescription}
                        onChange={(e) => setRuleDescription(e.target.value)}
                        placeholder="Describe what this rule does"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Criteria</Label>
                      <div className="flex gap-2">
                        <Select value={attribute} onValueChange={setAttribute}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Attribute" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interests">Interests</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                            <SelectItem value="personality">Personality</SelectItem>
                            <SelectItem value="age">Age</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select value={condition} onValueChange={setCondition}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="not_equals">Not Equals</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="not_contains">Not Contains</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Input
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="Value"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setRuleName('');
                      setRuleDescription('');
                      setAttribute('interests');
                      setCondition('contains');
                      setValue('');
                      setEditingRuleId(null);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveRule} className="bg-teal hover:bg-teal/90 text-white">
                      Create Rule
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

export default AdminRules;
