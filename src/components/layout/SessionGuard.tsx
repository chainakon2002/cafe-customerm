import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { useCartStore } from '../../store/useCartStore';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const SessionGuard = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { sessionStatus, listenToSession } = useAppStore();
  const setSessionId = useCartStore(state => state.setSessionId);

  useEffect(() => {
    if (sessionId) {
      setSessionId(sessionId);
      listenToSession(sessionId);
    }
  }, [sessionId, setSessionId, listenToSession]);

  if (sessionStatus === 'loading') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">กำลังตรวจสอบข้อมูลโต๊ะ...</p>
      </div>
    );
  }

  if (sessionStatus === 'closed' || sessionStatus === 'not_found') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center"
      >
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">
          {sessionStatus === 'closed' ? 'โต๊ะถูกปิดแล้ว' : 'ไม่พบโต๊ะ'}
        </h1>
        <p className="text-text-muted">ไม่สามารถสั่งอาหารได้ กรุณาติดต่อพนักงานหากมีข้อสงสัย หรือสแกนคิวอาร์โค้ดใหม่อีกครั้ง</p>
      </motion.div>
    );
  }

  return <Outlet />;
};
