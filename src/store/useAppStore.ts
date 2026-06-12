import { create } from 'zustand';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Category, MenuItem, OrderStatus, TableSession } from '../types';

interface AppState {
  menu: MenuItem[];
  categories: Category[];
  myOrders: OrderStatus[];
  isConnecting: boolean;
  currentSession: TableSession | null;
  sessionStatus: 'loading' | 'active' | 'closed' | 'not_found';
  connect: () => void;
  listenToSession: (sessionId: string) => void;
  submitOrder: (orderData: Omit<OrderStatus, 'id' | 'createdAt' | 'status'>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  menu: [],
  categories: [],
  myOrders: [],
  isConnecting: false,
  currentSession: null,
  sessionStatus: 'loading',
  
  connect: () => {
    if (get().isConnecting) return;
    set({ isConnecting: true });

    // Listen to Menu
    onSnapshot(collection(db, 'menu'), (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      set({ menu: menuData });
    });

    // Listen to Orders (In a real app, query by user ID or table ID)
    onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OrderStatus));
      set({ myOrders: ordersData });
    });
  },

  listenToSession: (sessionId: string) => {
    set({ sessionStatus: 'loading' });
    onSnapshot(doc(db, 'sessions', sessionId), (snapshot) => {
      if (snapshot.exists()) {
        const session = { id: snapshot.id, ...snapshot.data() } as TableSession;
        set({ 
          currentSession: session,
          sessionStatus: session.status === 'active' ? 'active' : 'closed' 
        });
      } else {
        set({ currentSession: null, sessionStatus: 'not_found' });
      }
    });
  },

  submitOrder: async (orderData) => {
    const newOrderRef = doc(collection(db, 'orders'));
    await setDoc(newOrderRef, {
      ...orderData,
      status: 'received',
      createdAt: new Date().toISOString()
    });
  }
}));
