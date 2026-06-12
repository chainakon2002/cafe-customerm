import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MenuItem } from '../../types';

interface MenuCardProps {
  item: MenuItem;
  onAddClick: (item: MenuItem) => void;
  isSignature?: boolean;
}

export const MenuCard = ({ item, onAddClick, isSignature }: MenuCardProps) => {
  const isAvailable = item.isAvailable !== false; // default true if not specified

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isAvailable ? { y: -5 } : {}}
      whileTap={isAvailable ? { scale: 0.96 } : {}}
      className={`bg-white rounded-3xl p-3 flex flex-col gap-2 h-full justify-between transition-shadow
        ${!isAvailable ? 'opacity-60 grayscale' : ''}
        ${isSignature ? 'shadow-[0_4px_20px_rgba(212,184,149,0.3)] border border-[#D4B895]/50' : 'shadow-sm'}
      `}
    >
      <div>
        <div className={`${isSignature ? 'aspect-[4/3]' : 'aspect-square'} bg-beige rounded-2xl mb-3 overflow-hidden relative`}>
          <motion.img 
            whileHover={isAvailable ? { scale: 1.05 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover mix-blend-multiply origin-center" 
            onError={(e) => {
               (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/F5EBE1/8C6239?text=Coffee';
            }}
          />
          {isSignature && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-yellow-300 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
              <span>✨</span> Signature
            </div>
          )}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl z-20">
              <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>
        <h3 className={`font-bold text-text-main leading-tight mb-1 ${isSignature ? 'text-lg' : 'text-[15px]'}`}>
          {item.name}
        </h3>
        {isSignature && item.description && (
          <p className="text-sm text-text-muted line-clamp-2 mt-1 mb-2">{item.description}</p>
        )}
      </div>
      
      <div className="flex items-end justify-between mt-1">
        <span className={`font-semibold text-text-main ${isSignature ? 'text-base' : 'text-sm'}`}>
          {item.price}.-
        </span>
        <motion.button 
          disabled={!isAvailable}
          whileTap={isAvailable ? { scale: 0.9 } : {}}
          onClick={() => isAvailable && onAddClick(item)}
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            isAvailable 
              ? (isSignature ? 'bg-primary text-cream shadow-md' : 'bg-beige hover:bg-beige-active text-primary') 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Plus size={isSignature ? 18 : 16} strokeWidth={3} />
        </motion.button>
      </div>
    </motion.div>
  );
};
