
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AdminCoAdmins from './AdminCoAdmins';

const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Co-Admin Management</CardTitle>
          <CardDescription>Assign or remove co-admins for your community</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminCoAdmins />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>Manage your community subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="plan">
              <AccordionTrigger>Current Plan</AccordionTrigger>
              <AccordionContent>
                <div className="p-4 border rounded-md">
                  <p className="font-medium">Community Starter</p>
                  <p className="text-sm text-muted-foreground">Up to 50 members</p>
                  <p className="text-sm text-muted-foreground mt-2">Next billing date: June 23, 2025</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing">
              <AccordionTrigger>Billing History</AccordionTrigger>
              <AccordionContent>
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Billing history will appear here</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="upgrade">
              <AccordionTrigger>Upgrade Plan</AccordionTrigger>
              <AccordionContent>
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Plan upgrade options will appear here</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
