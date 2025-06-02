
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, FileText, Calendar, Users, CreditCard, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const reportTypes = [
  { name: 'Community Activity', icon: Users, format: ['CSV', 'PDF'] },
  { name: 'Revenue & Transactions', icon: CreditCard, format: ['CSV', 'PDF'] },
  { name: 'User Engagement', icon: Users, format: ['CSV', 'PDF'] },
  { name: 'Moderation Issues', icon: AlertTriangle, format: ['CSV', 'PDF'] },
  { name: 'Event Analytics', icon: Calendar, format: ['CSV', 'PDF'] },
];

const ReportsPanel = () => {
  const [reportType, setReportType] = useState("community");
  const [dateRange, setDateRange] = useState("30days");
  const [format, setFormat] = useState("csv");
  const [showGeneratingDialog, setShowGeneratingDialog] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = () => {
    setShowGeneratingDialog(true);
    
    // Simulate report generation
    setTimeout(() => {
      setDownloadReady(true);
    }, 1500);
  };
  
  const handleDownload = (reportName, fileFormat) => {
    toast({
      title: `Report Downloaded`,
      description: `${reportName} has been downloaded as ${fileFormat}`,
    });
    
    // Create and trigger a download based on the format
    if (fileFormat === 'CSV') {
      downloadCSV(reportName);
    } else {
      downloadPDF(reportName);
    }
  };
  
  const downloadCSV = (reportName) => {
    // Create sample CSV content
    let csvContent = `"Date","Category","Value"\n`;
    csvContent += `"2025-05-01","Users","1245"\n`;
    csvContent += `"2025-05-08","Users","1389"\n`;
    csvContent += `"2025-05-15","Users","1502"\n`;
    csvContent += `"2025-05-22","Users","1687"\n`;
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportName.replace(/\s/g, '_')}_report.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const downloadPDF = (reportName) => {
    // In a real app, you would generate a PDF here
    // For this demo, we'll just simulate the download
    toast({
      title: "PDF Generated",
      description: "PDF generation would require a PDF library in a real application",
    });
  };

  const closeGeneratingDialog = () => {
    setShowGeneratingDialog(false);
    setDownloadReady(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community Activity</SelectItem>
                    <SelectItem value="revenue">Revenue & Transactions</SelectItem>
                    <SelectItem value="users">User Engagement</SelectItem>
                    <SelectItem value="moderation">Moderation Issues</SelectItem>
                    <SelectItem value="events">Event Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="flex items-center gap-2" onClick={handleGenerateReport}>
                <Download className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportTypes.map((report, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <report.icon className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-xs text-gray-500">Generated on May 22, 2025</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {report.format.includes('CSV') && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(report.name, 'CSV')}
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      CSV
                    </Button>
                  )}
                  {report.format.includes('PDF') && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(report.name, 'PDF')}
                    >
                      <FileText className="h-4 w-4" />
                      PDF
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Generating Dialog */}
      <Dialog open={showGeneratingDialog} onOpenChange={closeGeneratingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {downloadReady ? "Report Ready" : "Generating Report"}
            </DialogTitle>
            <DialogDescription>
              {downloadReady 
                ? "Your report has been generated and is ready to download" 
                : "Please wait while we generate your report..."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            {!downloadReady ? (
              <div className="flex flex-col items-center">
                <div className="animate-pulse flex space-x-4 mb-4">
                  <div className="h-12 w-12 bg-teal/30 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Report successfully generated</span>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                      const reportName = reportTypes.find(r => r.name.toLowerCase().includes(reportType))?.name || 'Report';
                      handleDownload(reportName, 'CSV');
                      closeGeneratingDialog();
                    }}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    Download CSV
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                      const reportName = reportTypes.find(r => r.name.toLowerCase().includes(reportType))?.name || 'Report';
                      handleDownload(reportName, 'PDF');
                      closeGeneratingDialog();
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {downloadReady && (
              <Button onClick={closeGeneratingDialog}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsPanel;
