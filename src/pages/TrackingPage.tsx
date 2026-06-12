import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Coffee } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAppStore } from '../store/useAppStore';
import { BottomNav } from '../components/layout/BottomNav';

export const TrackingPage = () => {
  const navigate = useNavigate();
  const sessionId = useCartStore((state) => state.sessionId);
  const myOrders = useAppStore((state) => state.myOrders);
  const currentSession = useAppStore((state) => state.currentSession);

  const sessionOrders = myOrders.filter(o => o.sessionId === sessionId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestOrder = sessionOrders[0];

  const getStepIndex = (status: string | undefined) => {
    switch (status) {
      case 'received': return 0;
      case 'preparing': return 1;
      case 'served': return 2;
      default: return -1;
    }
  };

  const currentStep = getStepIndex(latestOrder?.status);

  const steps = [
    { id: 0, title: 'Order Received', icon: CheckCircle2 },
    { id: 1, title: 'Preparing', icon: Clock },
    { id: 2, title: 'Served', icon: Coffee },
  ];

  return (
    <div className="min-h-screen bg-cream pb-32">
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm">
        <button onClick={() => navigate(`/${sessionId}`)} className="p-2 -ml-2 text-text-main">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-text-main ml-2">Orders & Tracking</h1>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 text-center">
          <h2 className="text-lg text-text-muted mb-1">Table</h2>
          <div className="text-5xl font-bold text-primary mb-2">{currentSession?.tableNumber || '-'}</div>
          {latestOrder ? (
            <p className="text-sm text-text-muted">Order ID: {latestOrder.id}</p>
          ) : (
            <p className="text-sm text-text-muted">No active orders</p>
          )}
        </div>

        {latestOrder && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-text-main mb-6">Tracking</h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-beige before:to-transparent">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isPast = index < currentStep;
                
                return (
                  <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm transition-colors ${
                      isActive || isPast 
                        ? 'bg-primary border-cream text-cream' 
                        : 'bg-beige border-cream text-text-muted'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0">
                      <h4 className={`font-bold text-lg ${isActive || isPast ? 'text-text-main' : 'text-text-muted'}`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-text-muted">
                        {isActive ? 'Current stage' : isPast ? 'Completed' : 'Pending'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sessionOrders.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-lg text-text-main mb-4">Order History</h3>
            <div className="space-y-4">
              {sessionOrders.map(order => (
                <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-text-muted">Order #{order.id.slice(-6).toUpperCase()}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === 'served' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-beige text-primary'
                    }`}>
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-text-main"><span className="text-text-muted mr-2">{item.quantity}x</span>{item.name}</span>
                        <span className="text-text-main font-semibold">{item.price * item.quantity}.-</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center border-t border-beige pt-3">
                    <span className="font-medium text-sm text-text-muted">Total</span>
                    <span className="font-bold text-text-main">{order.totalAmount}.-</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => navigate(`/${sessionId}`)}
          className="w-full mt-6 bg-beige hover:bg-secondary text-primary font-bold py-4 rounded-2xl transition-colors mb-4"
        >
          Order More
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

