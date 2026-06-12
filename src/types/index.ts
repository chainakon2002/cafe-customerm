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

export interface OrderStatus {
  id: string;
  status: 'received' | 'preparing' | 'served' | 'cancelled';
  items: string[]; // item IDs
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
