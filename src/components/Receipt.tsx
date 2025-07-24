import React from 'react';
import { X, Printer } from 'lucide-react';
import { Order } from '../types';

interface ReceiptProps {
  order: Order;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ order, onClose }) => {
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b print:hidden">
          <h2 className="text-xl font-bold">Order Receipt</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Printer className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 receipt-content">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Baba Jan Fast Food</h1>
            <p className="text-sm text-gray-600">Near Aspire College Girls Campus</p>
            <p className="text-sm text-gray-600">FSD Road, Jhang</p>
            <p className="text-sm text-gray-600">Phone: 03167750842</p>
          </div>
          
          <div className="border-t border-b border-dashed py-3 mb-4">
            <div className="flex justify-between text-sm">
              <span>Order #: {order.orderNumber}</span>
              <span>Date: {order.timestamp.toLocaleDateString()}</span>
            </div>
            <div className="text-sm">
              Time: {order.timestamp.toLocaleTimeString()}
            </div>
          </div>
          
          {/* Items */}
          <div className="space-y-2 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <div className="flex-1">
                  <div>{item.name}</div>
                  <div className="text-gray-600">
                    {item.quantity} x {formatPrice(item.price)}
                  </div>
                </div>
                <div className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-dashed pt-3 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-red-600">{formatPrice(order.total)}</span>
            </div>
          </div>
          
          {/* Best Wishes */}
          <div className="text-center border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">Thank you for choosing Baba Jan Fast Food!</p>
            <p className="text-sm text-red-600 font-medium">May Allah bless you with good health and happiness!</p>
            <p className="text-xs text-gray-500 mt-2">Visit us again soon!</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          
          .receipt-content {
            font-size: 12px;
            line-height: 1.4;
          }
          
          body * {
            visibility: hidden;
          }
          
          .receipt-content, .receipt-content * {
            visibility: visible;
          }
          
          .receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Receipt;