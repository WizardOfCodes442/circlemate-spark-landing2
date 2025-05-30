
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockAnalyticsData = [
  { region: 'North', successRate: 78, rejections: 22, noShows: 8 },
  { region: 'South', successRate: 65, rejections: 35, noShows: 12 },
  { region: 'East', successRate: 82, rejections: 18, noShows: 5 },
  { region: 'West', successRate: 71, rejections: 29, noShows: 10 },
  { region: 'Central', successRate: 76, rejections: 24, noShows: 7 },
];

const topRejectionReasons = [
  { reason: 'Schedule Conflict', percentage: 42 },
  { reason: 'Different Interests', percentage: 28 },
  { reason: 'Location Distance', percentage: 18 },
  { reason: 'Communication Issues', percentage: 12 },
];

const chartConfig = {
  successRate: { 
    color: '#1FBAB4',
    label: 'Success Rate %'
  },
  rejections: { 
    color: '#FF9500',
    label: 'Rejections %'
  },
  noShows: { 
    color: '#f87171',
    label: 'No-Shows %'
  }
};

const MatchAnalytics = () => {
  const { toast } = useToast();

  const handleExportReports = (format: 'csv' | 'pdf') => {
    toast({
      title: `Report Exported`,
      description: `Match analytics report has been exported as ${format.toUpperCase()}`,
    });
    
    if (format === 'csv') {
      downloadCSV();
    } else {
      downloadPDF();
    }
  };
  
  const downloadCSV = () => {
    // Create CSV content from mockAnalyticsData
    let csvContent = "Region,Success Rate,Rejections,No-Shows\n";
    
    mockAnalyticsData.forEach(row => {
      csvContent += `${row.region},${row.successRate},${row.rejections},${row.noShows}\n`;
    });
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'match_analytics.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const downloadPDF = () => {
    // In a real app, you would generate a PDF here
    // For this demo, we'll simulate it
    toast({
      title: "PDF Generated",
      description: "PDF generation would require a PDF library in a real application",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Match Performance</h3>
        <div className="flex gap-2">
          <Button 
            onClick={() => handleExportReports('csv')}
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button 
            onClick={() => handleExportReports('pdf')}
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match Success by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="successRate" name="Success Rate %" fill="#1FBAB4" />
                  <Bar dataKey="rejections" name="Rejections %" fill="#FF9500" />
                  <Bar dataKey="noShows" name="No-Shows %" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Rejection Reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRejectionReasons.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-teal h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-32 flex-shrink-0">
                    {item.reason} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Match Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Average Match Quality Rating</h4>
                <p className="text-2xl font-bold">4.3/5.0</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Average Time to First Meetup</h4>
                <p className="text-2xl font-bold">6.2 days</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Follow-up Rate</h4>
                <p className="text-2xl font-bold">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchAnalytics;
