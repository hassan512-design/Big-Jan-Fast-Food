import { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { menuItems as defaultMenuItems } from '../data/menuItems';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const savedMenu = localStorage.getItem('bigjan-menu');
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    } else {
      setMenuItems(defaultMenuItems);
      localStorage.setItem('bigjan-menu', JSON.stringify(defaultMenuItems));
    }
  }, []);

  const saveMenu = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem('bigjan-menu', JSON.stringify(items));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newId = 'custom_' + Date.now();
    const newItem: MenuItem = { ...item, id: newId };
    const updatedItems = [...menuItems, newItem];
    saveMenu(updatedItems);
  };

  const updateMenuItem = (id: string, updatedItem: Omit<MenuItem, 'id'>) => {
    const updatedItems = menuItems.map(item =>
      item.id === id ? { ...updatedItem, id } : item
    );
    saveMenu(updatedItems);
  };

  const deleteMenuItem = (id: string) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    saveMenu(updatedItems);
  };

  const resetToDefault = () => {
    saveMenu(defaultMenuItems);
  };

  return {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    resetToDefault
  };
};