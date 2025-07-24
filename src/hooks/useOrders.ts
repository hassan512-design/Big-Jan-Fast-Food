import { useState, useEffect } from 'react';
import { Order, CartItem } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderCounter, setOrderCounter] = useState(1);

  useEffect(() => {
    const savedOrders = localStorage.getItem('bigjan-orders');
    const savedCounter = localStorage.getItem('bigjan-order-counter');
    
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        timestamp: new Date(order.timestamp)
      }));
      setOrders(parsedOrders);
    }
    
    if (savedCounter) {
      setOrderCounter(parseInt(savedCounter));
    }
  }, []);

  const createOrder = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: orderCounter,
      items: [...items],
      total,
      timestamp: new Date(),
      orderNumber: orderCounter.toString().padStart(3, '0')
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    
    const nextCounter = orderCounter + 1;
    setOrderCounter(nextCounter);
    
    // Save to localStorage
    localStorage.setItem('bigjan-orders', JSON.stringify(updatedOrders));
    localStorage.setItem('bigjan-order-counter', nextCounter.toString());

    return newOrder;
  };

  return {
    orders,
    createOrder
  };
};