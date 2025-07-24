import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, RotateCcw } from 'lucide-react';
import { MenuItem, MenuFormData } from '../types';

interface MenuManagementProps {
  menuItems: MenuItem[];
  onAddItem: (item: Omit<MenuItem, 'id'>) => void;
  onUpdateItem: (id: string, item: Omit<MenuItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  onResetToDefault: () => void;
}

const MenuManagement: React.FC<MenuManagementProps> = ({
  menuItems,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onResetToDefault
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuFormData>({
    name: '',
    price: 0,
    category: 'main',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category: 'main',
      description: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || formData.price <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    if (editingItem) {
      onUpdateItem(editingItem.id, formData);
    } else {
      onAddItem(formData);
    }
    
    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDeleteItem(id);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset the menu to default items? This will remove all custom items.')) {
      onResetToDefault();
    }
  };

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const categoryGroups = {
    breakfast: menuItems.filter(item => item.category === 'breakfast'),
    main: menuItems.filter(item => item.category === 'main'),
    beverages: menuItems.filter(item => item.category === 'beverages')
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleResetToDefault}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Default</span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (PKR) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter price"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'breakfast' | 'main' | 'beverages' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="breakfast">Breakfast</option>
                <option value="main">Main Items</option>
                <option value="beverages">Beverages</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter item description (optional)"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{editingItem ? 'Update Item' : 'Add Item'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items by Category */}
      {Object.entries(categoryGroups).map(([category, items]) => (
        <div key={category} className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 capitalize text-gray-800">
            {category === 'main' ? 'Main Items' : category} ({items.length} items)
          </h3>
          
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No items in this category</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <span className="text-red-600 font-bold">{formatPrice(item.price)}</span>
                  </div>
                  
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  )}
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit item"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuManagement;