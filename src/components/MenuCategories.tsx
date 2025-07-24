import React from 'react';
import { Coffee, Pizza, Droplets } from 'lucide-react';

interface MenuCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const MenuCategories: React.FC<MenuCategoriesProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const categories = [
    { id: 'breakfast', name: 'Breakfast', icon: Coffee },
    { id: 'main', name: 'Main Items', icon: Pizza },
    { id: 'beverages', name: 'Beverages', icon: Droplets }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(category => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-red-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-md'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MenuCategories;