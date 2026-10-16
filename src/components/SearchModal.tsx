import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    products,
    searchModalOpen,
    setSearchModalOpen,
    viewProductDetails,
    formatBDT,
    setSelectedCategoryFilter,
    setActivePage
  } = useShop();

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.banglaName && p.banglaName.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (!searchModalOpen) return null;

  const handleSelectProduct = (prod: any) => {
    setSearchModalOpen(false);
    viewProductDetails(prod);
  };

  const handleQuickCategory = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setActivePage('store');
    setSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Three-Piece, Western dresses, hijabs, cotton, silk..."
            className="w-full bg-transparent text-sm md:text-base text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-2 py-1 rounded cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Categories */}
        {!query && (
          <div className="p-5 space-y-4">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Three-Piece', 'Western Dress', 'Hijab', 'Kurti & Tunics', 'Saree & Festive', 'Organza', 'Chikankari Lawn'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (['Three-Piece', 'Western Dress', 'Hijab', 'Kurti & Tunics', 'Saree & Festive'].includes(item)) {
                      handleQuickCategory(item);
                    } else {
                      setQuery(item);
                    }
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-xs text-stone-700 rounded-lg transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto divide-y divide-stone-100 p-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-stone-500 text-sm">
                No products found matching "{query}". Try searching for "Lawn", "Three-Piece", or "Dress".
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item)}
                  className="p-3 hover:bg-stone-50 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover object-top rounded-md border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-rose-700">{item.category}</span>
                        {item.banglaName && (
                          <span className="text-[11px] text-stone-400">· {item.banglaName}</span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.fabric}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs sm:text-sm font-bold text-stone-900 font-mono tabular-nums block">
                      {formatBDT(item.price)}
                    </span>
                    <span className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 justify-end mt-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
