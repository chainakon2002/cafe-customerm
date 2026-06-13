export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  isPopular?: boolean;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface OrderItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  options: {
    type: 'hot' | 'iced' | 'frappe' | 'none';
    sweetness: number;
    toppings: string[];
  };
}

export interface OrderStatus {
  id: string;
  status: 'received' | 'preparing' | 'served' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  tableId: string;
  sessionId?: string;
  createdAt: string;
}

export interface TableSession {
  id: string;
  tableNumber: string;
  status: 'active' | 'closed';
  createdAt: string;
}
