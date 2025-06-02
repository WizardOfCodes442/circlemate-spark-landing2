
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bell, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const mockReportedItems = [
  { 
    id: 'rep-1', 
    type: 'User', 
    target: 'Thomas Wilson', 
    reason: 'Inappropriate messages', 
    reportedBy: 'Sarah Mitchell', 
    date: '2025-06-01', 
    status: 'pending' 
  },
  { 
    id: 'rep-2', 
    type: 'Content', 
    target: 'Tech Meetup Announcement', 
    reason: 'Misleading information', 
    reportedBy: 'David Johnson', 
    date: '2025-05-31', 
    status: 'pending' 
  },
  { 
    id: 'rep-3', 
    type: 'Community', 
    target: 'Crypto Trading Group', 
    reason: 'Promoting scams', 
    reportedBy: 'Emma Thompson', 
    date: '2025-05-30', 
    status: 'pending' 
  },
  { 
    id: 'rep-4', 
    type: 'Event', 
    target: 'Investment Workshop', 
    reason: 'Suspicious activity', 
    reportedBy: 'Michael Brown', 
    date: '2025-05-29', 
    status: 'resolved' 
  }
];

const ModeratorTools = () => {
  const [reportItems, setReportItems] = useState(mockReportedItems);
  const [approveItem, setApproveItem] = useState(null);
  const [rejectItem, setRejectItem] = useState(null);
  const { toast } = useToast();

  const handleApproveReport = (item) => {
    setApproveItem(item);
  };

  const handleRejectReport = (item) => {
    setRejectItem(item);
  };

  const confirmApprove = () => {
    if (!approveItem) return;
    
    // Update the status of the item
    const updatedItems = reportItems.map(item => 
      item.id === approveItem.id ? {...item, status: 'resolved'} : item
    );
    
    setReportItems(updatedItems);
    toast({
      title: "Report Approved",
      description: `Action taken on ${approveItem.type.toLowerCase()} report for ${approveItem.target}`,
      variant: "default"
    });
    
    setApproveItem(null);
  };

  const confirmReject = () => {
    if (!rejectItem) return;
    
    // Update the status of the item
    const updatedItems = reportItems.map(item => 
      item.id === rejectItem.id ? {...item, status: 'resolved'} : item
    );
    
    setReportItems(updatedItems);
    toast({
      title: "Report Dismissed",
      description: `Report for ${rejectItem.target} has been dismissed`,
      variant: "default"
    });
    
    setRejectItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Reported Items</h3>
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex gap-1 items-center">
          <Bell className="h-3.5 w-3.5" />
          <span>3 New Reports</span>
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-50">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.target}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>{item.reportedBy}</TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {item.status === 'pending' ? (
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600"
                          onClick={() => handleApproveReport(item)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleRejectReport(item)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Resolved
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Platform Blacklist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-gray-500">Blacklisted users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Content Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">18</p>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">43</p>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Approve Dialog */}
      <Dialog open={!!approveItem} onOpenChange={(open) => !open && setApproveItem(null)}>
        <DialogContent>
          {approveItem && (
            <>
              <DialogHeader>
                <DialogTitle>Approve Report Action</DialogTitle>
                <DialogDescription>
                  Take action on the report against {approveItem.target}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Report Details</h3>
                  <p className="text-sm text-gray-600">
                    Type: <span className="font-medium">{approveItem.type}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Reason: <span className="font-medium">{approveItem.reason}</span>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Admin Notes</h3>
                  <Textarea placeholder="Add your notes about this action..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setApproveItem(null)}>Cancel</Button>
                <Button variant="default" onClick={confirmApprove}>
                  Approve Report
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectItem} onOpenChange={(open) => !open && setRejectItem(null)}>
        <DialogContent>
          {rejectItem && (
            <>
              <DialogHeader>
                <DialogTitle>Dismiss Report</DialogTitle>
                <DialogDescription>
                  Dismiss the report against {rejectItem.target}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Dismissal Reason</h3>
                  <Textarea placeholder="Explain why this report is being dismissed..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRejectItem(null)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmReject}>
                  Dismiss Report
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModeratorTools;
