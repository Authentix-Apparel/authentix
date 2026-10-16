import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    viewProductDetails,
    openQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatBDT
  } = useShop();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isWishlisted = isInWishlist(product.id);

  const displayImage = 
    imageHovered && product.images[1] ? product.images[1] : (activeColor.imageUrl || product.images[0]);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first size (e.g. '38' or 'M')
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, activeColor, defaultSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onClick={() => viewProductDetails(product)}
      className="group relative flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
    >
      {/* Visual Image Container (65-75% height) */}
      <div 
        className="relative aspect-3/4 w-full bg-stone-100 overflow-hidden"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        {!imageError ? (
          <img
            src={displayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Robust Fallback Container (Zero Broken Images) */
          <div className="w-full h-full flex flex-col items-center justify-center bg-rose-50/50 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">{product.category}</span>
            <span className="text-sm font-medium text-stone-700 mt-1 line-clamp-2">{product.name}</span>
          </div>
        )}

        {/* Quiet Kicker Tag (Maximum 1 subtle tag, never pill sandwich) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-stone-900/90 text-white text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm backdrop-blur-xs">
              New Arrival
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-rose-600/90 text-white text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm backdrop-blur-xs">
              Best Seller
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && !product.isNew && !product.isBestSeller && (
            <span className="bg-stone-800/80 text-rose-300 text-[11px] font-semibold px-2 py-0.5 rounded-sm backdrop-blur-xs">
              Save {product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Always accessible top right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-150 z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/80 backdrop-blur-xs text-stone-700 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick Actions Hover Strip */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            aria-label="Add to cart"
            className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer disabled:bg-stone-300"
            title={product.inStock ? "Quick Add" : "Out of Stock"}
          >
            {addedAnimation ? <Check className="w-4 h-4 text-white" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content & Metadata Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span className="font-semibold text-rose-700 uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{product.sizes.length} Sizes</span>
            {product.banglaName && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-[11px] text-stone-400 font-normal truncate max-w-[90px]">
                  {product.banglaName}
                </span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div 
              className="flex items-center gap-1.5 mt-2.5"
              onClick={(e) => e.stopPropagation()}
            >
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColorIndex(idx);
                    setImageHovered(false);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColorIndex === idx 
                      ? 'ring-2 ring-rose-500 ring-offset-1 border-stone-300 scale-110' 
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
              <span className="text-[11px] text-stone-500 ml-1">
                {activeColor.name}
              </span>
            </div>
          )}
        </div>

        {/* Pricing Baseline with Tabular Figures */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 font-mono tabular-nums">
              {formatBDT(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                {formatBDT(product.originalPrice)}
              </span>
            )}
          </div>

          <span className={`text-[11px] font-medium ${product.inStock ? 'text-emerald-700' : 'text-stone-400'}`}>
            {product.inStock ? 'In Stock (Fast Delivery)' : 'Pre-order'}
          </span>
        </div>
      </div>
    </div>
  );
};
