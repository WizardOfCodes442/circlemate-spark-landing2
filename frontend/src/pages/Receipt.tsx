
import React from 'react';
import { Receipt as ReceiptComponent } from '@/components/Receipt';

const ReceiptPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">Transaction Receipt</h1>
        <ReceiptComponent />
      </div>
    </div>
  );
};

export default ReceiptPage;
