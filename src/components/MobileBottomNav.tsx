import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Layers, Search, ShoppingBag, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/bangladeshData';

export const MobileBottomNav: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setCartDrawerOpen,
    setSearchModalOpen,
    setSelectedCategoryFilter
  } = useShop();

  const handleNav = (page: string) => {
    setActivePage(page);
    if (page === 'store') {
      setSelectedCategoryFilter('All');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-2"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
        {/* 1. Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors ${
            activePage === 'home' ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">Home</span>
        </button>

        {/* 2. Collections */}
        <button
          onClick={() => handleNav('store')}
          className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors ${
            activePage === 'store' ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] mt-1">Shop</span>
        </button>

        {/* 3. Search */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 cursor-pointer text-stone-500 hover:text-rose-600 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-1">Search</span>
        </button>

        {/* 4. Cart Bag - Elevated and visually prominent */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          aria-label="Open Shopping Bag"
          className="relative flex flex-col items-center justify-center py-1 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-rose-600 group-hover:bg-rose-700 flex items-center justify-center text-white shadow-sm transition-transform active:scale-95">
              <ShoppingBag className="w-4 h-4" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-4 h-4 px-1 bg-stone-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-rose-700">
            Bag {cartCount > 0 ? `(${cartCount})` : ''}
          </span>
        </button>

        {/* 5. WhatsApp Hotline */}
        <a
          href={`https://wa.me/88${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Us"
          className="flex flex-col items-center justify-center py-1 cursor-pointer text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 font-medium">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
