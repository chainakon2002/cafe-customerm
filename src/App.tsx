import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { TrackingPage } from './pages/TrackingPage';
import { SessionGuard } from './components/layout/SessionGuard';
import { useAppStore } from './store/useAppStore';

function App() {
  const connect = useAppStore(state => state.connect);

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/scan-qr" replace />} />
        <Route element={<SessionGuard />}>
          <Route path="/:sessionId" element={<MenuPage />} />
          <Route path="/:sessionId/cart" element={<CartPage />} />
          <Route path="/:sessionId/tracking" element={<TrackingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
