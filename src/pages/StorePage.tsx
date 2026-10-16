import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';
import { ProductCategory } from '../types';

export const StorePage: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    formatBDT
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(8500);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Three-Piece',
    'Western Dress',
    'Hijab',
    'Kurti & Tunics',
    'Saree & Festive'
  ];

  const sizes = ['36', '38', '40', '42', '44', '46', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) {
          return false;
        }
        // Price
        if (p.price > maxPrice) {
          return false;
        }
        // In stock
        if (inStockOnly && !p.inStock) {
          return false;
        }
        // Size
        if (selectedSize && !p.sizes.includes(selectedSize)) {
          return false;
        }
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBangla = p.banglaName && p.banglaName.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          if (!matchName && !matchBangla && !matchFabric) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategoryFilter, maxPrice, selectedSize, inStockOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategoryFilter('All');
    setMaxPrice(8500);
    setSelectedSize(null);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategoryFilter !== 'All' ||
    maxPrice < 8500 ||
    selectedSize !== null ||
    inStockOnly ||
    searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-left">
      {/* Top Banner & Header */}
      <div className="border-b border-stone-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-widest mb-1">
            <span>Online Catalog</span>
            <span>·</span>
            <span>Bangladesh Women's Wardrobe</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            {selectedCategoryFilter === 'All' ? 'Complete Collection' : selectedCategoryFilter}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Showing <strong className="text-stone-900 font-mono tabular-nums">{filteredProducts.length}</strong> of {products.length} products with Cash on Delivery
          </p>
        </div>

        {/* Controls: Search, Sort & Mobile Filter Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, fabric..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-rose-500"
            />
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-700 font-medium focus:outline-rose-500 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
            <option value="newest">New Arrivals</option>
          </select>

          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:block ${
            mobileFilterOpen ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'
          } lg:relative lg:p-0 space-y-6 text-left`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 lg:hidden">
              <h3 className="font-serif font-bold text-lg text-stone-900">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Active filters clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg border border-rose-100">
              <span className="text-xs font-semibold text-rose-800">Filters Applied</span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}

          {/* Department / Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Departments
            </h4>
            <div className="space-y-1">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? products.length
                    : products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategoryFilter(cat);
                      if (mobileFilterOpen) setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[11px] font-mono ${selectedCategoryFilter === cat ? 'text-rose-300' : 'text-stone-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider in BDT */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold uppercase tracking-wider text-stone-900">Price Range</h4>
              <span className="font-mono font-bold text-rose-700 tabular-nums">Up to {formatBDT(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="8500"
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
              <span>৳1,000</span>
              <span>৳8,500</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold uppercase tracking-wider text-stone-900">Size Filter</h4>
              {selectedSize && (
                <button
                  onClick={() => setSelectedSize(null)}
                  className="text-[11px] text-rose-600 font-semibold hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    selectedSize === s
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-4 border-t border-stone-200">
            <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-stone-300"
              />
              <span className="font-medium">In Stock Only (Ready to Dispatch)</span>
            </label>
          </div>

          {mobileFilterOpen && (
            <div className="pt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-stone-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          )}
        </aside>

        {/* Product Grid Area (3 Cols Desktop) */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200">
              <p className="font-serif font-bold text-lg text-stone-800">No products match your filters</p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try widening your price range or clearing selected sizes to see more items.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-stone-900 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
