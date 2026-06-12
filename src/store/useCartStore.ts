import { create } from 'zustand';

export interface CartItem {
  id: string; // Unique ID for cart item instance (e.g. uuid)
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options: {
    type: 'hot' | 'iced' | 'frappe' | 'none';
    sweetness: number; // 0, 25, 50, 100
    toppings: string[];
  };
}

interface CartState {
  items: CartItem[];
  sessionId: string | null;
  setSessionId: (id: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  sessionId: null,
  
  setSessionId: (id) => set({ sessionId: id }),
  
  addItem: (newItem) => set((state) => {
    // Check if an item with exact same menuId and options exists
    const existingItemIndex = state.items.findIndex(
      (item) => 
        item.menuId === newItem.menuId &&
        item.options.type === newItem.options.type &&
        item.options.sweetness === newItem.options.sweetness &&
        JSON.stringify(item.options.toppings.sort()) === JSON.stringify(newItem.options.toppings.sort())
    );

    if (existingItemIndex > -1) {
      // Increase quantity of existing item
      const newItems = [...state.items];
      newItems[existingItemIndex].quantity += newItem.quantity;
      return { items: newItems };
    }

    // Add as new item
    return { items: [...state.items, newItem] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  clearCart: () => set({ items: [] })
}));
