export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'breakfast' | 'main' | 'beverages';
  description?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  timestamp: Date;
  orderNumber: string;
}

export interface MenuFormData {
  name: string;
  price: number;
  category: 'breakfast' | 'main' | 'beverages';
  description: string;
}