import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onProcessOrder: () => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onProcessOrder,
  total
}) => {
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <ShoppingCart className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-800">Cart</h2>
        </div>
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <ShoppingCart className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-bold text-gray-800">Cart ({cart.length})</h2>
      </div>
      
      <div className="space-y-3 mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{item.name}</h4>
              <p className="text-red-600 font-semibold">{formatPrice(item.price)}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
        </div>
        
        <button
          onClick={onProcessOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200"
        >
          Process Order
        </button>
      </div>
    </div>
  );
};

export default Cart;