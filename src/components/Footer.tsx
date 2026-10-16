import React from 'react';
import { useShop } from '../context/ShopContext';
import { Phone, Mail, MapPin, Truck, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useShop();

  const handleNav = (page: string, category?: string) => {
    setActivePage(page);
    if (category) {
      setSelectedCategoryFilter(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-left">
      {/* 4 Value Proposition Strips */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-rose-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Cash on Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">Nationwide delivery in 64 districts. Pay after receiving parcel.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Authentic Quality</h4>
              <p className="text-xs text-stone-400 mt-0.5">Handpicked premium lawn, organza, and Rajshahi mulberry silk fabrics.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-rose-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Hassle-Free 7 Days Exchange</h4>
              <p className="text-xs text-stone-400 mt-0.5">Size issue? Swift doorstep exchange service across Dhaka.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-rose-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">VIP Styling Support</h4>
              <p className="text-xs text-stone-400 mt-0.5">Direct WhatsApp guidance from our Dhaka fashion consultants.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-serif font-bold text-xl">
              A
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">Authentix Apparel</span>
              <span className="block text-[9px] tracking-widest text-rose-400 uppercase font-semibold">Bangladesh</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
            Elevating modern South Asian modesty and contemporary women's silhouettes. Discover designer three-pieces, graceful western maxi gowns, and luxury silk hijabs made with artisan care in Dhaka.
          </p>
          <div className="text-xs text-stone-400 space-y-1 pt-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>House 74, Road 11, Block D, Banani, Dhaka-1213</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <a href="tel:+8801755025128" className="hover:text-white transition-colors">
                +880 1755-025128 (10 AM - 10 PM)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>orders@authentixapparel.com.bd</span>
            </div>
          </div>
        </div>

        {/* Collections Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Collections</h4>
          <ul className="text-xs space-y-2 text-stone-400">
            <li>
              <button
                onClick={() => handleNav('store', 'Three-Piece')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Three-Piece (থ্রি-পিস)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('store', 'Western Dress')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Western Maxi Dresses
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('store', 'Hijab')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Hijab & Tailored Abayas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('store', 'Kurti & Tunics')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Cotton Kurtis & Tunics
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('store', 'Saree & Festive')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Dhakai Jamdani & Silk Sarees
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Customer Care</h4>
          <ul className="text-xs space-y-2 text-stone-400">
            <li>
              <button
                onClick={() => handleNav('order-track')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Track Your Parcel
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('contact')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Delivery & Shipping Rates
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('about')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Cash on Delivery Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('contact')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Exchange & Return FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Company & Showroom */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Authentix Studio</h4>
          <ul className="text-xs space-y-2 text-stone-400">
            <li>
              <button
                onClick={() => handleNav('about')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                About Our Atelier
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('contact')}
                className="hover:text-rose-400 transition-colors cursor-pointer"
              >
                Banani Flagship Showroom
              </button>
            </li>
            <li>
              <a
                href="https://wa.me/8801755025128"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                WhatsApp Direct: 01755-025128
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Clean copyright and supported payment methods */}
      <div className="border-t border-stone-800/80 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Authentix Apparel Ltd. All rights reserved. Dhaka, Bangladesh.
          </div>

          <div className="flex items-center gap-3 text-stone-400 text-[11px]">
            <span className="font-medium text-stone-300">Accepted Payments:</span>
            <span className="bg-stone-900 px-2 py-0.5 rounded text-rose-300 font-semibold border border-stone-800">
              Cash on Delivery (COD)
            </span>
            <span className="bg-stone-900 px-2 py-0.5 rounded text-pink-400 font-semibold border border-stone-800">
              bKash
            </span>
            <span className="bg-stone-900 px-2 py-0.5 rounded text-orange-400 font-semibold border border-stone-800">
              Nagad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
