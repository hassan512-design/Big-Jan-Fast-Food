import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
          <span className="text-red-600 font-bold text-lg">{formatPrice(item.price)}</span>
        </div>
        
        {item.description && (
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        )}
        
        <button
          onClick={() => onAddToCart(item)}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItem;