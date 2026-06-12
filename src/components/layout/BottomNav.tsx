import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BookOpen, ShoppingBag, ListOrdered } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const cartSessionId = useCartStore((state) => state.sessionId);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const currentSessionId = sessionId || cartSessionId || 'table-1';
  
  const isMenu = pathname === `/${currentSessionId}`;
  const isCart = pathname === `/${currentSessionId}/cart`;
  const isOrders = pathname === `/${currentSessionId}/tracking`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cream/90 backdrop-blur-md border-t border-beige pb-safe pt-1 px-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto h-14">
        <button
          onClick={() => navigate(`/${currentSessionId}`)}
          className={`flex flex-col items-center justify-center flex-1 transition-colors ${
            isMenu ? 'text-primary' : 'text-text-muted hover:text-primary/70'
          }`}
        >
          <div className={`p-1.5 rounded-full mb-0.5 transition-colors ${isMenu ? 'bg-beige' : ''}`}>
            <BookOpen size={20} />
          </div>
          <span className="text-[10px] font-semibold">Menu</span>
        </button>

        <button
          onClick={() => navigate(`/${currentSessionId}/cart`)}
          className={`flex flex-col items-center justify-center flex-1 transition-colors relative ${
            isCart ? 'text-primary' : 'text-text-muted hover:text-primary/70'
          }`}
        >
          <div className={`p-1.5 rounded-full mb-0.5 transition-colors ${isCart ? 'bg-beige' : ''}`}>
            <ShoppingBag size={20} />
            {!isCart && totalItems > 0 && (
              <span className="absolute top-0.5 right-[30%] bg-primary text-cream text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-cream">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Cart</span>
        </button>

        <button
          onClick={() => navigate(`/${currentSessionId}/tracking`)}
          className={`flex flex-col items-center justify-center flex-1 transition-colors ${
            isOrders ? 'text-primary' : 'text-text-muted hover:text-primary/70'
          }`}
        >
          <div className={`p-1.5 rounded-full mb-0.5 transition-colors ${isOrders ? 'bg-beige' : ''}`}>
            <ListOrdered size={20} />
          </div>
          <span className="text-[10px] font-semibold">Orders</span>
        </button>
      </div>
    </div>
  );
};
