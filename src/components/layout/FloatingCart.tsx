import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCart = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const sessionId = useCartStore((state) => state.sessionId);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 left-1/2 w-[calc(100%-2.5rem)] max-w-md z-40"
        >
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/${sessionId}/cart`)}
            className="w-full bg-primary hover:bg-primary/90 text-cream px-5 py-3.5 rounded-full shadow-lg flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="bg-cream/20 p-1.5 rounded-md relative flex items-center justify-center">
                <ShoppingBag size={18} strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-sm">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <span className="font-bold text-sm tracking-wide">
              Confirm Order • {totalPrice}.-
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
