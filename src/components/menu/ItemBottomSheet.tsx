import { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItem } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import type { CartItem } from '../../store/useCartStore';

interface ItemBottomSheetProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemBottomSheet = ({ item, isOpen, onClose }: ItemBottomSheetProps) => {
  const [type, setType] = useState<'hot' | 'iced' | 'frappe' | 'none'>('iced');
  const [sweetness, setSweetness] = useState<number>(50);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (isOpen) {
      setType('iced');
      setSweetness(50);
      setQuantity(1);
    }
  }, [isOpen, item]);

  const handleAddToCart = () => {
    if (!item) return;
    const cartItem: CartItem = {
      id: crypto.randomUUID(),
      menuId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      options: {
        type,
        sweetness,
        toppings: [],
      }
    };
    addItem(cartItem);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-cream rounded-t-3xl z-[70] max-h-[90vh] overflow-y-auto pb-28"
          >
            
            <div className="relative w-full aspect-square bg-beige">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-cream/80 backdrop-blur-sm text-text-main rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 pt-5 pb-8 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-xl font-bold text-text-main leading-tight">{item.name}</h2>
                  <span className="text-lg font-bold text-text-main">{item.price}.-</span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Serving Style</h3>
                <div className="flex gap-2">
                  {(['hot', 'iced', 'frappe'] as const).map((t) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-2.5 rounded-xl border capitalize font-semibold text-sm transition-colors ${
                        type === t 
                          ? 'border-transparent bg-beige-active text-primary' 
                          : 'border-beige text-text-muted hover:border-secondary'
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Sweetness</h3>
                <div className="flex gap-2">
                  {[0, 25, 50, 100].map((level) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={level}
                      onClick={() => setSweetness(level)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                        sweetness === level
                          ? 'border-transparent bg-primary text-cream'
                          : 'border-beige bg-transparent text-text-main hover:bg-beige/50'
                      }`}
                    >
                      {level}%
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-cream border-t border-beige/50 p-4 pb-safe-bottom z-[80] flex gap-3"
            >
              <div className="flex items-center bg-beige rounded-2xl p-1 h-12">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-text-main"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </motion.button>
                <span className="w-6 text-center font-bold text-text-main">{quantity}</span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-text-main"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </motion.button>
              </div>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-cream rounded-2xl font-bold text-base h-12 flex items-center justify-center gap-2"
              >
                <span>Add to Cart</span>
                <span>{item.price * quantity}.-</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
