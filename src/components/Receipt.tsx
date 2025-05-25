
import React from 'react';

interface ReceiptProps {
  amount: string;
  transactionType: string;
  recipient: string;
  recipientId: string;
  transactionId: string;
  referenceId: string;
  transactionDate: string;
  payer: string;
  payerCard: string;
  paymentMethod: string;
  paymentStatus: string;
}

export const Receipt = ({
  amount = "N23,000.00",
  transactionType = "Appointment Booking",
  recipient = "Chastain Park Hospital",
  recipientId = "GLB | 1234567898",
  transactionId = "1234567892",
  referenceId = "1233ewn633998",
  transactionDate = "12th December, 2024",
  payer = "Grace Jennifer Williams",
  payerCard = "**** **** **** 2345",
  paymentMethod = "Card",
  paymentStatus = "Successful"
}: ReceiptProps) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-t-lg shadow-lg overflow-hidden">
      {/* Header with logo */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
          <span className="text-sm font-medium text-gray-700">COSMICFORGE</span>
          <span className="text-xs text-gray-500">DIGITAL SOLUTION</span>
        </div>
      </div>

      {/* Amount and status */}
      <div className="px-6 py-6 text-center border-b">
        <div className="text-3xl font-bold text-gray-900 mb-2">{amount}</div>
        <div className="text-green-600 font-semibold mb-1">Successful Transaction</div>
        <div className="text-gray-500 text-sm">{transactionDate}</div>
      </div>

      {/* Transaction details */}
      <div className="px-6 py-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Transaction Type:</span>
          <span className="font-medium text-sm">{transactionType}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Amount:</span>
          <span className="font-medium text-sm">{amount}</span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-gray-600 text-sm">Recipient:</span>
          <div className="text-right">
            <div className="font-medium text-sm">{recipient}</div>
            <div className="text-gray-500 text-xs">{recipientId}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Transaction Id:</span>
          <span className="font-medium text-sm">{transactionId}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Reference Id:</span>
          <span className="font-medium text-sm">{referenceId}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Transaction Date:</span>
          <span className="font-medium text-sm">{transactionDate}</span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-gray-600 text-sm">Payer:</span>
          <div className="text-right">
            <div className="font-medium text-sm">{payer}</div>
            <div className="text-gray-500 text-xs">{payerCard}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Payment Method:</span>
          <span className="font-medium text-sm">{paymentMethod}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Payment Status:</span>
          <span className="font-medium text-sm text-green-600">{paymentStatus}</span>
        </div>
      </div>

      {/* Scalloped bottom edge */}
      <div className="relative h-6 bg-white">
        <div className="absolute bottom-0 left-0 right-0 h-6">
          <svg
            viewBox="0 0 400 24"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q10,24 20,0 Q30,24 40,0 Q50,24 60,0 Q70,24 80,0 Q90,24 100,0 Q110,24 120,0 Q130,24 140,0 Q150,24 160,0 Q170,24 180,0 Q190,24 200,0 Q210,24 220,0 Q230,24 240,0 Q250,24 260,0 Q270,24 280,0 Q290,24 300,0 Q310,24 320,0 Q330,24 340,0 Q350,24 360,0 Q370,24 380,0 Q390,24 400,0 L400,24 L0,24 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
