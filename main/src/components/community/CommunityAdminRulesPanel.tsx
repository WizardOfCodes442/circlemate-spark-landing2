import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CirclePlus, SquarePen, Trash2, X, ChevronDown } from 'lucide-react';

const CommunityAdminRulesPanel = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'Similar Interests',
      description: 'Match members with at least 3 common interests',
      criteria: { field: 'interests', condition: 'contains', value: '3' },
      active: true,
    },
    {
      id: 2,
      name: 'Same Location',
      description: 'Match members who are in the same city or within 30 miles',
      criteria: { field: 'location', condition: 'equals', value: 'city' },
      active: true,
    },
    {
      id: 3,
      name: 'Compatible Personality',
      description: 'Match based on complementary personality traits',
      criteria: { field: 'personality', condition: 'contains', value: 'complementary' },
      active: false,
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    criteriaField: 'interests',
    criteriaCondition: 'contains',
    criteriaValue: '',
  });

  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      description: '',
      criteriaField: 'interests',
      criteriaCondition: 'contains',
      criteriaValue: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (rule) => {
    setCurrentRule(rule);
    setFormData({
      name: rule.name,
      description: rule.description,
      criteriaField: rule.criteria.field,
      criteriaCondition: rule.criteria.condition,
      criteriaValue: rule.criteria.value,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveRule = (isEditMode) => {
    if (isEditMode && currentRule) {
      setRules(
        rules.map((rule) =>
          rule.id === currentRule.id
            ? {
                ...rule,
                name: formData.name,
                description: formData.description,
                criteria: {
                  field: formData.criteriaField,
                  condition: formData.criteriaCondition,
                  value: formData.criteriaValue,
                },
              }
            : rule
        )
      );
      setIsEditDialogOpen(false);
    } else {
      setRules([
        ...rules,
        {
          id: rules.length + 1,
          name: formData.name,
          description: formData.description,
          criteria: {
            field: formData.criteriaField,
            condition: formData.criteriaCondition,
            value: formData.criteriaValue,
          },
          active: true,
        },
      ]);
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const handleToggleRule = (id) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-full">
      <div className="flex flex-col sm:flex-row items-start justify-between space-y-1.5 p-6">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Community Matching Rules</h3>
          <p className="text-sm text-muted-foreground">Configure matching rules and criteria for your community members.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-teal hover:bg-teal/90 text-white"
              onClick={handleOpenAddDialog}
            >
              <CirclePlus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Matching Rule</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="rule-name">
                  Rule Name
                </label>
                <Input
                  id="rule-name"
                  placeholder="e.g., Similar Interests"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="rule-description">
                  Description
                </label>
                <Input
                  id="rule-description"
                  placeholder="Describe what this rule does"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Criteria</label>
                <div className="flex gap-2">
                  <Select
                    value={formData.criteriaField}
                    onValueChange={(value) => setFormData({ ...formData, criteriaField: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interests">Interests</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="personality">Personality</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={formData.criteriaCondition}
                    onValueChange={(value) => setFormData({ ...formData, criteriaCondition: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="equals">Equals</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    className="flex-grow"
                    placeholder="Value"
                    value={formData.criteriaValue}
                    onChange={(e) => setFormData({ ...formData, criteriaValue: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-teal hover:bg-teal/90 text-white"
                onClick={() => handleSaveRule(false)}
              >
                Create Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`border rounded-lg p-4 transition-shadow hover:shadow-sm ${
                rule.active ? 'border-teal/30 bg-teal/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{rule.name}</h4>
                    <Badge className={rule.active ? 'bg-green-500' : 'text-gray-500 border-gray-300'}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">
                      {rule.criteria.field} {rule.criteria.condition} {rule.criteria.value}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`rule-switch-${rule.id}`}
                      checked={rule.active}
                      onCheckedChange={() => handleToggleRule(rule.id)}
                    />
                    <label
                      htmlFor={`rule-switch-${rule.id}`}
                      className="text-sm font-medium"
                    >
                      {rule.active ? 'Active' : 'Inactive'}
                    </label>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEditDialog(rule)}
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Edit Matching Rule</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium" htmlFor="rule-name-edit">
                            Rule Name
                          </label>
                          <Input
                            id="rule-name-edit"
                            placeholder="e.g., Similar Interests"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium" htmlFor="rule-description-edit">
                            Description
                          </label>
                          <Input
                            id="rule-description-edit"
                            placeholder="Describe what this rule does"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Criteria</label>
                          <div className="flex gap-2">
                            <Select
                              value={formData.criteriaField}
                              onValueChange={(value) => setFormData({ ...formData, criteriaField: value })}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="interests">Interests</SelectItem>
                                <SelectItem value="location">Location</SelectItem>
                                <SelectItem value="personality">Personality</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select
                              value={formData.criteriaCondition}
                              onValueChange={(value) => setFormData({ ...formData, criteriaCondition: value })}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="contains">Contains</SelectItem>
                                <SelectItem value="equals">Equals</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              className="flex-grow"
                              placeholder="Value"
                              value={formData.criteriaValue}
                              onChange={(e) => setFormData({ ...formData, criteriaValue: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-teal hover:bg-teal/90 text-white"
                          onClick={() => handleSaveRule(true)}
                        >
                          Update Rule
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityAdminRulesPanel;
