import { motion } from 'framer-motion';
import type { Category } from '../../types';

interface CategoryFeedProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryFeed = ({ categories, activeCategoryId, onSelectCategory }: CategoryFeedProps) => {
  return (
    <div className="overflow-x-auto no-scrollbar py-2 px-4 sticky top-[68px] bg-cream z-40">
      <div className="flex gap-2">
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`relative whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-text-muted hover:bg-beige/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-beige-active rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
