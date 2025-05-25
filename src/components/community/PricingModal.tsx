<<<<<<< HEAD
=======

>>>>>>> 420ff46e3538fbe1432ac5f4791bc2fa900c5df4
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  subscriptionAmount: number;
  onPaymentSuccess: () => void;
}

export const PricingModal = ({ isOpen, onClose, communityName, subscriptionAmount, onPaymentSuccess }: PricingModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
      toast({
        title: "Payment Successful",
        description: `You have successfully joined ${communityName}!`,
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join {communityName}</DialogTitle>
          <DialogDescription>
            Choose your subscription plan to join this premium community
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Monthly Plan
                <span className="text-2xl font-bold">${subscriptionAmount}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Access to all community content</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Participate in discussions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Access to exclusive events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Direct messaging with members</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Processing..." : `Pay $${subscriptionAmount}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
