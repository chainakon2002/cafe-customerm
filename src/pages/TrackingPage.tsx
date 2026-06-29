import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useAppStore } from '../store/useAppStore';
import { BottomNav } from '../components/layout/BottomNav';

const BrewingCoffeeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || "w-full h-full"}
  >
    {/* Steam */}
    <motion.path
      d="M6 3v2"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], y: [-1, -4, -6] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
    />
    <motion.path
      d="M10 3v2"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], y: [-1, -4, -6] }}
      transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: "easeOut" }}
    />

    {/* Splashes */}
    <motion.circle
      cx="10" cy="8" r="1" fill="currentColor" stroke="none"
      animate={{ y: [0, -5, -2], x: [0, -4, -6], opacity: [0, 1, 0], scale: [0.5, 1.5, 0] }}
      transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
    />
    <motion.circle
      cx="10" cy="8" r="1.5" fill="currentColor" stroke="none"
      animate={{ y: [0, -4, -1], x: [0, 5, 8], opacity: [0, 1, 0], scale: [0.5, 1.2, 0] }}
      transition={{ repeat: Infinity, duration: 1.2, delay: 0.9 }}
    />

    {/* The Stirring Spoon */}
    <motion.g
      animate={{ rotate: [-25, 25, -25], x: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      style={{ transformOrigin: '10px 8px' }}
    >
      <path d="M10 8 L13 1" strokeWidth="2" strokeLinecap="round" />
      <circle cx="13" cy="1" r="1.5" fill="currentColor" stroke="none" />
    </motion.g>

    {/* The Cup */}
    <motion.g
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      style={{ transformOrigin: '50% 60%' }}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    </motion.g>
  </svg>
);

const HeroStatus = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 mb-2">
      <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-lg mb-6">
        <motion.div
          className="absolute inset-0 border-4 border-primary/20 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-4 border-4 border-primary/40 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-primary flex items-center justify-center w-full h-full">
          {currentStep === 0 && (
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <CheckCircle2 size={64} />
            </motion.div>
          )}
          {currentStep === 1 && (
            <BrewingCoffeeIcon className="w-20 h-20" />
          )}
          {currentStep === 2 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Coffee size={64} />
            </motion.div>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text-main text-center flex flex-col">
        <span>{currentStep === 0 ? "รับออเดอร์แล้ว!" : currentStep === 1 ? "กำลังชงเครื่องดื่ม..." : "พร้อมเสิร์ฟ!"}</span>
        <span className="text-sm font-normal text-text-muted mt-1">{currentStep === 0 ? "Order Received!" : currentStep === 1 ? "Brewing Your Drink..." : "Ready to Serve!"}</span>
      </h2>
      <p className="text-text-muted mt-3 text-center text-sm px-4 flex flex-col">
        <span>{currentStep === 0 ? "เราได้รับออเดอร์ของคุณแล้วและจะเริ่มเตรียมเร็วๆ นี้" : currentStep === 1 ? "บาริสต้ากำลังตั้งใจชงเครื่องดื่มให้คุณอย่างพิถีพิถัน" : "เครื่องดื่มของคุณกำลังนำไปเสิร์ฟที่โต๊ะ"}</span>
        <span className="text-xs text-text-muted/70 mt-1">{currentStep === 0 ? "We've got your order and will start soon." : currentStep === 1 ? "Our barista is crafting your beverage carefully." : "Your drink is on the way to your table."}</span>
      </p>
    </div>
  );
};

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
    { id: 0, titleTh: 'รับออเดอร์', titleEn: 'Order Received', icon: CheckCircle2 },
    { id: 1, titleTh: 'กำลังเตรียม', titleEn: 'Preparing', icon: Clock },
    { id: 2, titleTh: 'พร้อมเสิร์ฟ', titleEn: 'Served', icon: Coffee },
  ];

  return (
    <div className="min-h-screen bg-cream pb-32">
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm">
        <button onClick={() => navigate(`/${sessionId}`)} className="p-2 -ml-2 text-text-main">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-text-main ml-3 flex flex-col">
          <span>ออเดอร์และการติดตาม</span>
          <span className="text-xs font-normal text-text-muted">Orders & Tracking</span>
        </h1>
      </div>

      <div className="p-6">
        {latestOrder ? (
          <>
            <HeroStatus currentStep={currentStep} />

            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-text-muted mb-1 flex flex-col"><span>โต๊ะ</span><span className="text-xs text-text-muted/70">Table</span></p>
                <p className="text-3xl font-bold text-primary">{currentSession?.tableNumber || '-'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted mb-1 flex flex-col items-end"><span>หมายเลขออเดอร์</span><span className="text-xs text-text-muted/70">Order ID</span></p>
                <p className="text-xl font-bold text-text-main">#{latestOrder.id.slice(-6).toUpperCase()}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <h3 className="font-bold text-lg text-text-main mb-6 flex items-baseline gap-2">สถานะปัจจุบัน <span className="text-sm font-normal text-text-muted">Tracking</span></h3>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-beige before:to-transparent">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isPast = index < currentStep;

                  return (
                    <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="relative md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        {isActive && (
                          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-25"></div>
                        )}
                        <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 shadow-sm transition-all duration-500 ${isActive || isPast
                          ? 'bg-primary border-cream text-cream'
                          : 'bg-beige border-cream text-text-muted'
                          } ${isActive ? 'scale-110 shadow-md' : ''}`}>
                          {isActive && step.id === 1 ? (
                            <BrewingCoffeeIcon className="w-[18px] h-[18px]" />
                          ) : (
                            <Icon size={18} className={isActive ? 'animate-pulse' : ''} />
                          )}
                        </div>
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0">
                        <h4 className={`font-bold text-lg flex flex-col ${isActive || isPast ? 'text-text-main' : 'text-text-muted'}`}>
                          <span>{step.titleTh}</span>
                          <span className="text-sm font-normal opacity-70">{step.titleEn}</span>
                        </h4>
                        <p className="text-sm text-text-muted mt-1 flex gap-1">
                          {isActive ? 'กำลังดำเนินการ (Current)' : isPast ? 'เสร็จสิ้น (Completed)' : 'รอดำเนินการ (Pending)'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 text-center mt-10">
            <h2 className="text-lg text-text-muted mb-1 flex flex-col"><span>โต๊ะ</span><span className="text-xs text-text-muted/70">Table</span></h2>
            <div className="text-5xl font-bold text-primary mb-2">{currentSession?.tableNumber || '-'}</div>
            <p className="text-sm text-text-muted flex flex-col mt-4"><span>ไม่มีออเดอร์ที่กำลังดำเนินการ</span><span className="text-xs opacity-70 mt-1">No active orders</span></p>
          </div>
        )}

        {sessionOrders.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-lg text-text-main mb-4 flex items-baseline gap-2">ประวัติออเดอร์ <span className="text-sm font-normal text-text-muted">Order History</span></h3>
            <div className="space-y-4">
              {sessionOrders.map(order => (
                <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-text-muted">ออเดอร์ (Order) #{order.id.slice(-6).toUpperCase()}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.status === 'served' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-beige text-primary'
                      }`}>
                      <span className="capitalize">{order.status === 'received' ? 'รับออเดอร์' : order.status === 'preparing' ? 'กำลังเตรียม' : order.status === 'served' ? 'เสิร์ฟแล้ว' : order.status === 'cancelled' ? 'ยกเลิก' : order.status}</span>
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
                    <span className="font-medium text-sm text-text-muted flex gap-1">ยอดรวม <span className="text-xs opacity-70">(Total)</span></span>
                    <span className="font-bold text-text-main">{order.totalAmount}.-</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate(`/${sessionId}`)}
          className="w-full mt-6 bg-beige hover:bg-secondary text-primary font-bold py-4 rounded-2xl transition-colors mb-4 flex flex-col items-center justify-center gap-1"
        >
          <span>สั่งอาหารเพิ่ม</span>
          <span className="text-xs font-normal opacity-80">Order More</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

