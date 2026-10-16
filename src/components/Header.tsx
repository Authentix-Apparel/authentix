import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Truck,
  Phone,
  ChevronDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/bangladeshData';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    cartSubtotal,
    setCartDrawerOpen,
    wishlist,
    setSearchModalOpen,
    formatBDT,
    setSelectedCategoryFilter
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleNavClick = (page: string, category?: string) => {
    setActivePage(page);
    if (category) {
      setSelectedCategoryFilter(category);
    } else if (page === 'store') {
      setSelectedCategoryFilter('All');
    }
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    return () => {
      if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Announcement Bar - No Dhaka word */}
      <div className="bg-rose-950 text-rose-100 text-xs py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs tracking-wide">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
            <span>Free Delivery nationwide over ৳3,500</span>
            <span className="hidden md:inline text-rose-400">|</span>
            <span className="hidden md:inline font-medium text-rose-200">
              100% Cash on Delivery (ক্যাশ অন ডেলিভারি)
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-stone-300 text-[10px] sm:text-xs">
            <button
              onClick={() => handleNavClick('order-track')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Track Order</span>
            </button>
            <span className="text-stone-600">·</span>
            <a
              href={`https://wa.me/88${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 font-mono font-medium text-rose-300"
            >
              <Phone className="w-3 h-3 text-rose-400" />
              <span>WhatsApp: {WHATSAPP_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1 sm:gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark (No Dhaka word) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink min-w-0">
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-1.5 sm:gap-2.5 text-left cursor-pointer focus:outline-hidden min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-xs group-hover:bg-rose-700 transition-colors shrink-0">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tighter">A</span>
            </div>
            <div className="min-w-0">
              <span className="block text-lg sm:text-2xl font-serif font-bold text-stone-900 tracking-tight leading-none truncate">
                Authentix
              </span>
              <span className="block text-[8px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] text-rose-600 font-semibold uppercase mt-0.5 truncate">
                Apparel · Bangladesh
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links: exactly Home, All Collections (Mega Menu), About, Contact */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-rose-600 ${
              activePage === 'home' ? 'text-rose-600 font-semibold border-b-2 border-rose-600' : ''
            }`}
          >
            Home
          </button>

          {/* 2. All Collections with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleNavClick('store', 'All')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-rose-600 flex items-center gap-1 ${
                activePage === 'store' ? 'text-rose-600 font-semibold border-b-2 border-rose-600' : ''
              }`}
            >
              <span>All Collections</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  megaMenuOpen ? 'rotate-180 text-rose-600' : 'text-stone-400'
                }`}
              />
            </button>

            {/* Mega Menu Dropdown */}
            {megaMenuOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[850px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-7 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="grid grid-cols-12 gap-8">
                  {/* Category 1: Three-Piece (3 cols) */}
                  <div className="col-span-3 space-y-3">
                    <div className="flex items-center gap-1.5 pb-1 border-b border-rose-100">
                      <span className="font-serif font-bold text-stone-900 text-sm">Three-Piece</span>
                      <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">থ্রি-পিস</span>
                    </div>
                    <ul className="text-xs space-y-2 text-stone-600">
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Three-Piece')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Luxury Organza Festive Sets
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Three-Piece')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Zomorrod Emerald Silk Sets
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Three-Piece')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Chikankari Combed Lawn
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Three-Piece')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Tangail Cotton Malmal Orna
                        </button>
                      </li>
                    </ul>
                    <button
                      onClick={() => handleNavClick('store', 'Three-Piece')}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 pt-1"
                    >
                      <span>View All Three-Piece</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Category 2: Western Dress (3 cols) */}
                  <div className="col-span-3 space-y-3">
                    <div className="flex items-center gap-1.5 pb-1 border-b border-rose-100">
                      <span className="font-serif font-bold text-stone-900 text-sm">Western Dress</span>
                      <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">ওয়েস্টার্ন</span>
                    </div>
                    <ul className="text-xs space-y-2 text-stone-600">
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Western Dress')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Sorrento Tiered Belted Maxi
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Western Dress')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Pleated Metallic Midi Gowns
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Western Dress')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Floral Chiffon Modest Wrap
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Western Dress')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Tailored Blazer Gowns & Sets
                        </button>
                      </li>
                    </ul>
                    <button
                      onClick={() => handleNavClick('store', 'Western Dress')}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 pt-1"
                    >
                      <span>View All Western</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Category 3: Hijab & Abaya (3 cols) */}
                  <div className="col-span-3 space-y-3">
                    <div className="flex items-center gap-1.5 pb-1 border-b border-rose-100">
                      <span className="font-serif font-bold text-stone-900 text-sm">Hijab & Abaya</span>
                      <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">হিজাব</span>
                    </div>
                    <ul className="text-xs space-y-2 text-stone-600">
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Hijab')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Premium Bubble Georgette
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Hijab')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Madina Bamboo Modal Silk
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Hijab')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Tailored Pastel Abaya Coats
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('store', 'Hijab')}
                          className="hover:text-rose-600 transition-colors text-left"
                        >
                          Magnetic Hijab Pins Sets
                        </button>
                      </li>
                    </ul>
                    <button
                      onClick={() => handleNavClick('store', 'Hijab')}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 pt-1"
                    >
                      <span>View All Hijab & Abaya</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Feature Visual Card (3 cols) */}
                  <div className="col-span-3 bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 flex flex-col justify-between">
                    <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-stone-200 mb-2">
                      <img
                        src="/src/assets/images/hero_fashion_model_1792172507098.jpg"
                        alt="Authentix Rose Collection"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        New In
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">30+ Exclusive Styles</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">Cash on Delivery across Bangladesh</p>
                    </div>
                    <button
                      onClick={() => handleNavClick('store', 'All')}
                      className="mt-3 w-full py-2 bg-stone-900 hover:bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Shop Full Store
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. About */}
          <button
            onClick={() => handleNavClick('about')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-rose-600 ${
              activePage === 'about' ? 'text-rose-600 font-semibold border-b-2 border-rose-600' : ''
            }`}
          >
            About
          </button>

          {/* 4. Contact */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-rose-600 ${
              activePage === 'contact' ? 'text-rose-600 font-semibold border-b-2 border-rose-600' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Guaranteed mobile fit) */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            aria-label="Search clothing"
            className="p-1.5 sm:p-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist Trigger - Hidden on narrow mobile to guarantee room for Bag & Menu */}
          <button
            onClick={() => handleNavClick('store')}
            aria-label="Wishlist"
            className="hidden sm:flex relative p-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Saved items"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Trigger - Always 100% visible on mobile and desktop */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            aria-label={`Shopping Cart Bag (${cartCount} items)`}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-stone-900 text-white rounded-lg hover:bg-rose-600 transition-colors cursor-pointer shadow-xs font-medium shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-rose-300 shrink-0" />
            <span className="text-xs font-semibold whitespace-nowrap">
              Bag
            </span>
            {cartCount > 0 ? (
              <span className="bg-rose-600 text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {cartCount}
              </span>
            ) : null}
            {cartCount > 0 && (
              <span className="text-xs font-bold text-rose-300 hidden md:inline ml-1 font-mono">
                {formatBDT(cartSubtotal)}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle - Distinct button with clear border and icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center border ${
              mobileMenuOpen
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border-stone-200'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            title={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5 text-stone-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150 text-left">
          <div className="space-y-1 pb-3 border-b border-stone-100">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'home' ? 'bg-rose-50 text-rose-700' : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              Home
            </button>

            {/* 2. All Collections Accordion */}
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-stone-50">
                <button
                  onClick={() => handleNavClick('store', 'All')}
                  className={`text-sm font-semibold transition-colors text-left flex-1 ${
                    activePage === 'store' ? 'text-rose-700' : 'text-stone-800'
                  }`}
                >
                  All Collections
                </button>
                <button
                  onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
                  className="p-1 text-stone-500 hover:text-rose-600 cursor-pointer"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileCollectionsExpanded ? 'rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileCollectionsExpanded && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-stone-50/80 rounded-lg border border-stone-100">
                  <button
                    onClick={() => handleNavClick('store', 'Three-Piece')}
                    className="w-full text-left py-1.5 px-3 text-xs font-medium text-stone-700 hover:text-rose-600 flex items-center justify-between"
                  >
                    <span>Three-Piece (থ্রি-পিস)</span>
                    <span className="text-[10px] text-rose-600 font-mono">10+</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('store', 'Western Dress')}
                    className="w-full text-left py-1.5 px-3 text-xs font-medium text-stone-700 hover:text-rose-600 flex items-center justify-between"
                  >
                    <span>Western Dress (ম্যাক্সি গাউন)</span>
                    <span className="text-[10px] text-rose-600 font-mono">8+</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('store', 'Hijab')}
                    className="w-full text-left py-1.5 px-3 text-xs font-medium text-stone-700 hover:text-rose-600 flex items-center justify-between"
                  >
                    <span>Hijab & Abaya (হিজাব ও আবায়া)</span>
                    <span className="text-[10px] text-rose-600 font-mono">7+</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('store', 'Kurti & Tunics')}
                    className="w-full text-left py-1.5 px-3 text-xs font-medium text-stone-700 hover:text-rose-600 flex items-center justify-between"
                  >
                    <span>Kurti & Tunics (কুর্তি)</span>
                    <span className="text-[10px] text-rose-600 font-mono">5+</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('store', 'Saree & Festive')}
                    className="w-full text-left py-1.5 px-3 text-xs font-medium text-stone-700 hover:text-rose-600 flex items-center justify-between"
                  >
                    <span>Saree & Festive (জামদানি ও সিল্ক)</span>
                    <span className="text-[10px] text-rose-600 font-mono">4+</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('store', 'All')}
                    className="w-full text-left py-1.5 px-3 text-xs font-bold text-rose-700 border-t border-stone-200 mt-1"
                  >
                    Browse Entire Catalog (34 Items) →
                  </button>
                </div>
              )}
            </div>

            {/* 3. About */}
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'about' ? 'bg-rose-50 text-rose-700' : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              About
            </button>

            {/* 4. Contact */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'contact' ? 'bg-rose-50 text-rose-700' : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Quick Actions & WhatsApp */}
          <div className="pt-2 space-y-2">
            {/* Direct Shopping Bag button in mobile drawer */}
            <button
              onClick={() => {
                setCartDrawerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-stone-900 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-rose-300" />
                <span>View Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
              </div>
              <span className="font-mono text-rose-300 font-bold">{formatBDT(cartSubtotal)} →</span>
            </button>

            <a
              href={`https://wa.me/88${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: {WHATSAPP_NUMBER}</span>
            </a>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => handleNavClick('order-track')}
                className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5 text-rose-600" />
                <span>Track My Parcel</span>
              </button>
              <button
                onClick={() => handleNavClick('store')}
                className="text-xs text-rose-700 hover:text-rose-800 font-semibold cursor-pointer"
              >
                Browse All Products →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
