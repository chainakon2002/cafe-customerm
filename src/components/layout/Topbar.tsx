import { Coffee } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Topbar = () => {
  const currentSession = useAppStore((state) => state.currentSession);
  const tableNumber = currentSession?.tableNumber || '01';
  const displayTable = tableNumber.padStart(2, '0');

  return (
    <div className="sticky top-0 z-50 bg-cream px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-primary bg-transparent">
          <Coffee size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-text-main font-bold text-xl leading-none tracking-tight">Brew & Bloom</h1>
      </div>
      <div className="bg-beige px-3 py-1 rounded-full flex items-center justify-center">
        <span className="text-text-main text-xs font-semibold">Table {displayTable}</span>
      </div>
    </div>
  );
};
