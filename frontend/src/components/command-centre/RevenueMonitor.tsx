
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { DollarSign, ArrowUpRight } from 'lucide-react';

const mockRevenueData = {
  totalRevenue: 42869.50,
  commissionEarned: 4286.95,
  revenueBySource: [
    { source: 'Community Subscriptions', amount: 25750.00, percentage: 60 },
    { source: 'Individual Upgrades', amount: 9875.25, percentage: 23 },
    { source: 'Event Ticket Sales', amount: 7244.25, percentage: 17 }
  ],
  recentTransactions: [
    { id: 'tx-1', description: 'Tech Networking Mixer Tickets (10%)', amount: 67.50, date: '2025-06-02' },
    { id: 'tx-2', description: 'Mindful Living Circle Subscription', amount: 149.00, date: '2025-06-01' },
    { id: 'tx-3', description: 'Business Strategy Seminar Tickets (10%)', amount: 125.00, date: '2025-05-31' },
    { id: 'tx-4', description: 'Premium User Upgrade - John Smith', amount: 59.99, date: '2025-05-30' }
  ]
};

const RevenueMonitor = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h4 className="text-2xl font-bold">${mockRevenueData.totalRevenue.toLocaleString()}</h4>
              </div>
              <div className="bg-teal/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Platform Commission</p>
                <h4 className="text-2xl font-bold">${mockRevenueData.commissionEarned.toLocaleString()}</h4>
              </div>
              <div className="bg-orange/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-orange" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">10% of all transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                <h4 className="text-2xl font-bold">+12.4%</h4>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">Compared to last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRevenueData.revenueBySource.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{item.source}</p>
                    <p className="text-sm font-medium">${item.amount.toLocaleString()}</p>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <p className="text-xs text-gray-500 text-right">{item.percentage}% of total</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRevenueData.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">${transaction.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueMonitor;
