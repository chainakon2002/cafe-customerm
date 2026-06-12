import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAppStore } from '../store/useAppStore';
import { Topbar } from '../components/layout/Topbar';
import { BottomNav } from '../components/layout/BottomNav';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, sessionId, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { submitOrder, currentSession } = useAppStore();

  const handleCheckout = () => {
    if (!sessionId || !currentSession) return;
    
    submitOrder({
      items: items.map(item => ({
        menuId: item.menuId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        options: item.options
      })) as any,
      totalAmount: total,
      tableId: currentSession.tableNumber,
      sessionId: sessionId
    });

    clearCart();
    navigate(`/${sessionId}/tracking`);
  };

  const subtotal = getTotalPrice();
  const total = subtotal;

  return (
    <div className="min-h-screen bg-cream pb-48">
      <Topbar />

      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-main mb-6">Order Summary</h1>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm flex gap-4 items-center relative">
                <div className="w-16 h-16 bg-beige rounded-2xl overflow-hidden shrink-0 relative">
                  <img 
                    src={item.image || 'https://placehold.co/400x400/F5EBE1/8C6239?text=Coffee'} 
                    alt={item.name} 
                    className="w-full h-full object-cover mix-blend-multiply" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/F5EBE1/8C6239?text=Coffee';
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0 pr-10">
                  <h3 className="font-bold text-text-main leading-tight truncate">{item.name}</h3>
                  <p className="text-xs text-text-muted mt-1 truncate">
                    {item.options.type !== 'none' && <span className="capitalize">{item.options.type}, </span>}
                    {item.options.sweetness}% Sweet
                  </p>
                  <p className="font-bold text-text-main text-sm mt-1">{item.price}.-</p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 text-text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex flex-col items-center bg-beige rounded-full py-1 mt-6">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-text-main"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-text-main">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-text-main"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {items.length > 0 && (
        <div className="px-6 py-6">
          <div className="space-y-3 border-b border-beige pb-4 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted font-medium">Subtotal</span>
              <span className="text-text-main font-semibold">{subtotal}.-</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-text-main font-bold text-lg">Total</span>
            <span className="text-text-main font-black text-xl">{total}.-</span>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full bg-primary hover:bg-primary/90 text-cream py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] shadow-lg mb-8"
          >
            Place Order • {total}.-
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
