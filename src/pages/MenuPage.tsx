import { useState, useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Topbar } from '../components/layout/Topbar';
import { FloatingCart } from '../components/layout/FloatingCart';
import { BottomNav } from '../components/layout/BottomNav';
import { CategoryFeed } from '../components/menu/CategoryFeed';
import { MenuGrid } from '../components/menu/MenuGrid';
import { MenuCard } from '../components/menu/MenuCard';
import { ItemBottomSheet } from '../components/menu/ItemBottomSheet';
import type { Category, MenuItem } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

// Mock Categories since they aren't fully dynamic yet
const MOCK_CATEGORIES: Category[] = [
  { id: 'popular', name: 'เมนูขายดี' },
  { id: 'c4', name: 'Signature' },
  { id: 'c1', name: 'Coffee' },
  { id: 'c2', name: 'Non-Coffee' },
  { id: 'c3', name: 'Bakery' }
];

export const MenuPage = () => {
  const { menu, myOrders } = useAppStore();
  
  const [activeCategory, setActiveCategory] = useState(MOCK_CATEGORIES[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Calculate top 2 popular items based on orders
  const popularItemIds = useMemo(() => {
    const counts: Record<string, number> = {};
    myOrders.forEach(order => {
      if (order.status !== 'cancelled') {
        const orderItems = order.items as any as Array<{ menuId: string, quantity: number }>;
        orderItems.forEach(item => {
          if (item && item.menuId) {
            counts[item.menuId] = (counts[item.menuId] || 0) + (item.quantity || 1);
          }
        });
      }
    });
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 2).map(entry => entry[0]);
  }, [myOrders]);

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'popular') {
      if (popularItemIds.length > 0) {
        const items = menu.filter(item => popularItemIds.includes(item.id));
        return items.sort((a, b) => popularItemIds.indexOf(a.id) - popularItemIds.indexOf(b.id));
      } else {
        return menu.slice(0, 2);
      }
    }
    return menu.filter(item => item.categoryId === activeCategory);
  }, [menu, activeCategory, popularItemIds]);

  const isSignatureMode = activeCategory === 'c4';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-cream pb-32"
    >
      <Topbar />
      
      <CategoryFeed 
        categories={MOCK_CATEGORIES} 
        activeCategoryId={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <MenuGrid isSignatureMode={isSignatureMode}>
        <AnimatePresence mode="popLayout">
          {filteredMenu.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <MenuCard 
                item={item} 
                onAddClick={() => setSelectedItem(item)} 
                isSignature={isSignatureMode}
              />
            </motion.div>
          ))}
          {filteredMenu.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="col-span-2 text-center text-gray-500 py-10"
             >
               Loading menu or no items found...
             </motion.div>
          )}
        </AnimatePresence>
      </MenuGrid>

      <FloatingCart />
      <BottomNav />

      <ItemBottomSheet 
        item={selectedItem} 
        isOpen={selectedItem !== null} 
        onClose={() => setSelectedItem(null)} 
      />
    </motion.div>
  );
};

