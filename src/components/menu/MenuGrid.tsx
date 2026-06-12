import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MenuGridProps {
  children: ReactNode;
  isSignatureMode?: boolean;
}

export const MenuGrid = ({ children, isSignatureMode }: MenuGridProps) => {
  return (
    <motion.div 
      layout
      className={`grid gap-4 px-4 py-6 pb-24 ${isSignatureMode ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-2'}`}
    >
      {children}
    </motion.div>
  );
};
