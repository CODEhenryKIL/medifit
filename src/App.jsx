import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import Register from './pages/Register';
import HealthResult from './pages/HealthResult';
import MenuRecommendation from './pages/MenuRecommendation';
import MenuDetail from './pages/MenuDetail';
import OrderComplete from './pages/OrderComplete';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/result" element={<HealthResult />} />
        <Route path="/recommendation" element={<MenuRecommendation />} />
        <Route path="/menu/:id" element={<MenuDetail />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
