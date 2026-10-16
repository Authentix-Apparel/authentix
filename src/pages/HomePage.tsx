import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { ArrowRight, Sparkles, CheckCircle2, Truck, ShieldCheck, HeartHandshake, Star } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/products';

export const HomePage: React.FC = () => {
  const {
    products,
    setActivePage,
    setSelectedCategoryFilter,
    viewProductDetails,
    formatBDT
  } = useShop();

  const [activeTab, setActiveTab] = useState<'featured' | 'bestseller' | 'new'>('featured');

  const filteredCollection = products.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'new') return p.isNew;
    return p.isFeatured || p.isBestSeller;
  }).slice(0, 8);

  const categories = [
    {
      name: 'Three-Piece',
      bangla: 'লাক্সারি থ্রি-পিস',
      count: '10+ Ensembles',
      image: '/src/assets/images/threepiece_collection_1792172508454.jpg',
      tag: 'Festive & Lawn'
    },
    {
      name: 'Western Dress',
      bangla: 'মডেস্ট ওয়েস্টার্ন গাউন',
      count: '8+ Silhouettes',
      image: '/src/assets/images/western_collection_1792172508166.jpg',
      tag: 'Maxi & Co-ords'
    },
    {
      name: 'Hijab',
      bangla: 'প্রিমিয়াম হিজাব ও আবায়া',
      count: '7+ Essentials',
      image: '/src/assets/images/hijab_collection_1792172508870.jpg',
      tag: 'Silk & Georgette'
    },
    {
      name: 'Kurti & Tunics',
      bangla: 'কটন কুর্তি ও টিউনিকে',
      count: '5+ Styles',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      tag: 'Daily Comfort'
    },
    {
      name: 'Saree & Festive',
      bangla: 'ঐতিহ্যবাহী জামদানি ও কাতান',
      count: '4+ Heirlooms',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      tag: 'Heritage Weave'
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActivePage('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16 text-left">
      {/* 1. Hero Section (Split-screen Campaign Focal Point) */}
      <section className="relative bg-gradient-to-b from-rose-50/60 via-stone-50/40 to-white pt-6 pb-12 sm:pt-10 sm:pb-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet Kicker (Zero pill, clean text) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 tracking-widest uppercase">
                <span>Authentix Signature Collection 2026</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Artisan Handcrafted</span>
              </div>

              {/* Refined Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1] text-balance">
                Elegance Tailored for the Bangladeshi Woman
              </h1>

              {/* Body Prose */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
                Discover artisan-embroidered Three-Piece sets, graceful modest western maxi dresses, and cloud-soft georgette hijabs. Delivered safely with Cash on Delivery nationwide.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('All');
                    setActivePage('store');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore 30+ Styles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Three-Piece');
                    setActivePage('store');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-900 text-xs sm:text-sm font-semibold rounded-xl border border-stone-300 transition-colors cursor-pointer"
                >
                  Shop Three-Piece
                </button>
              </div>

              {/* Regional Trust Strip */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs text-stone-600">
                <div>
                  <span className="font-mono font-bold text-stone-900 text-sm block">100% COD</span>
                  <span className="text-[11px] text-stone-500">Pay upon parcel inspection</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-stone-900 text-sm block">Express Delivery</span>
                  <span className="text-[11px] text-stone-500">24-48h home dispatch</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-stone-900 text-sm block">Pure Fabrics</span>
                  <span className="text-[11px] text-stone-500">Lawn, Organza & Silk</span>
                </div>
              </div>
            </div>

            {/* Right Hero Model Image (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-rose-50">
                <img
                  src="/src/assets/images/hero_fashion_model_1792172507098.jpg"
                  alt="Authentix Apparel Model wearing Luxury Pink Embroidered Three-Piece"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />

                {/* Floating Product Highlight Tag */}
                <div 
                  onClick={() => {
                    const heroItem = products.find((p) => p.id === 'tp-01');
                    if (heroItem) viewProductDetails(heroItem);
                  }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-stone-100 flex items-center justify-between cursor-pointer hover:bg-white transition-colors"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-600 tracking-wider">Spotlight Ensemble</span>
                    <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">Gul-E-Gulab Organza Three-Piece</h4>
                    <span className="text-xs font-bold text-stone-900 font-mono tabular-nums">৳4,950 BDT</span>
                  </div>
                  <span className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded-lg shrink-0">
                    Order Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Cards with Models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
              <span>Curated Departments</span>
              <span>·</span>
              <span>Women's Apparel</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Explore by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter('All');
              setActivePage('store');
            }}
            className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All 30+ Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative flex flex-col bg-stone-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden bg-stone-200">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-rose-300 font-semibold uppercase tracking-wider block">
                    {cat.tag}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight mt-0.5">{cat.name}</h3>
                  <span className="text-[11px] text-stone-300 block">{cat.bangla}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Collection Grid with Segmented Control */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Trending Designs
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Handcrafted in limited batches with bespoke embellishments
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons allowed per constitution) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'featured'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Featured Picks
            </button>
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'bestseller'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dhaka Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* 4-column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCollection.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategoryFilter('All');
              setActivePage('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span>View Full Catalog (30+ Products)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Editorial Craftsmanship & Fabric Story Banner */}
      <section className="bg-stone-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Double Frame */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-3/4 rounded-xl overflow-hidden shadow-lg border border-stone-800">
                <img
                  src="/src/assets/images/western_collection_1792172508166.jpg"
                  alt="Modest Western Maxi Dress"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="aspect-3/4 rounded-xl overflow-hidden shadow-lg border border-stone-800 mt-6">
                <img
                  src="/src/assets/images/threepiece_collection_1792172508454.jpg"
                  alt="Embroidered Three-Piece Suit"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-widest">
                <span>Ethical Craftsmanship</span>
                <span>·</span>
                <span>Banani, Dhaka</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Honoring South Asian Heritage with Modern Modesty
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                At Authentix Apparel, every three-piece kameez, modest western gown, and premium hijab is designed with the modern Bangladeshi lifestyle in mind. From breathable combed lawn that withstands tropical humidity, to rich Banarasi zari weaves crafted for festive wedding soirees.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-900/50 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-stone-300">
                    <strong className="text-white block text-sm">Flattering Modest Cuts</strong>
                    Full sleeves, non-transparent linings, and comfortable silhouettes that flatter every body shape.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-900/50 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-stone-300">
                    <strong className="text-white block text-sm">No-Hassle Cash on Delivery</strong>
                    Order with zero risk. You only pay our courier driver when you receive your parcel at your doorstep.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Read Our Studio Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Real Bangladeshi Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-2">
            <span>Verified Customer Love</span>
            <span>·</span>
            <span>Across Bangladesh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Trusted by 10,000+ Women
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">"{rev.title}"</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-900 block">{rev.userName}</span>
                  <span className="text-[11px] text-stone-500">{rev.location}</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
