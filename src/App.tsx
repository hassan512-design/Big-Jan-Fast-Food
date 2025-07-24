import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Header from './components/Header';
import MenuCategories from './components/MenuCategories';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import Receipt from './components/Receipt';
import MenuManagement from './components/MenuManagement';
import { useCart } from './hooks/useCart';
import { useOrders } from './hooks/useOrders';
import { useMenu } from './hooks/useMenu';
import { Order } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [showManagement, setShowManagement] = useState(false);
  
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const { createOrder } = useOrders();
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, resetToDefault } = useMenu();

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const handleProcessOrder = () => {
    if (cart.length === 0) return;
    
    const order = createOrder(cart);
    setCurrentOrder(order);
    setShowReceipt(true);
    clearCart();
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setCurrentOrder(null);
  };

  if (showManagement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setShowManagement(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <span>← Back to POS</span>
            </button>
          </div>
          
          <MenuManagement
            menuItems={menuItems}
            onAddItem={addMenuItem}
            onUpdateItem={updateMenuItem}
            onDeleteItem={deleteMenuItem}
            onResetToDefault={resetToDefault}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Management Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowManagement(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Menu Management</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Menu</h2>
              <MenuCategories
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
          
          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Cart
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onProcessOrder={handleProcessOrder}
                total={getTotal()}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Receipt Modal */}
      {showReceipt && currentOrder && (
        <Receipt
          order={currentOrder}
          onClose={handleCloseReceipt}
        />
      )}
    </div>
  );
}

export default App;