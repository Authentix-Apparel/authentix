/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { MobileBottomNav } from './components/MobileBottomNav';

// Pages
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackPage } from './pages/OrderTrackPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { activePage, setActivePage } = useShop();

  // Sync hash with activePage for true multi-page navigation
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'store', 'cart', 'checkout', 'about', 'contact', 'order-track'].includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setActivePage]);

  React.useEffect(() => {
    if (activePage && window.location.hash !== `#/${activePage}`) {
      window.location.hash = `#/${activePage}`;
    }
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF9] text-stone-800 font-sans">
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {activePage === 'home' && <HomePage />}
        {activePage === 'store' && <StorePage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'order-success' && <OrderSuccessPage />}
        {activePage === 'order-track' && <OrderTrackPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Mobile Sticky Bottom Bar: Guarantees Bag is always visible on mobile */}
      <MobileBottomNav />

      {/* Global Interactive Overlays */}
      <QuickViewModal />
      <CartDrawer />
      <SearchModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
