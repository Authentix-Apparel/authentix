import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Ruler, ArrowRight, Check } from 'lucide-react';
import { SizeGuideModal } from './SizeGuideModal';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    products,
    closeQuickView,
    addToCart,
    viewProductDetails,
    toggleWishlist,
    isInWishlist,
    formatBDT,
    setActivePage
  } = useShop();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const product = products.find((p) => p.id === quickViewProduct?.id) || quickViewProduct;

  useEffect(() => {
    if (product) {
      setSelectedColorIdx(0);
      const initialImg = product.colors[0]?.imageUrl || product.images[0];
      setCurrentImage(initialImg);
      setSelectedSize(product.sizes[0] || 'Standard');
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) return null;

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const isWishlisted = isInWishlist(product.id);

  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    const chosenColor = product.colors[idx];
    if (chosenColor?.imageUrl) {
      setCurrentImage(chosenColor.imageUrl);
    } else if (product.images[idx]) {
      setCurrentImage(product.images[idx]);
    }
  };

  const handleAdd = () => {
    addToCart(product, activeColor, selectedSize, quantity);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(product, activeColor, selectedSize, quantity);
    closeQuickView();
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={closeQuickView}
      >
        <div
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 bg-white/80 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
            {/* Gallery Left */}
            <div className="bg-stone-50 p-6 flex flex-col justify-between">
              <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-white shadow-xs">
                <img
                  src={currentImage || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-all duration-200"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-stone-700 hover:text-rose-600 transition-colors cursor-pointer shadow-xs"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                {/* Selected Color Chip overlay */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs border border-stone-200 flex items-center gap-1.5 text-[11px]">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-stone-300"
                    style={{ backgroundColor: activeColor.hex }}
                  />
                  <span className="font-semibold text-stone-800">{activeColor.name}</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 mt-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(img)}
                      className={`relative w-16 h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                        currentImage === img ? 'border-rose-600 ring-2 ring-rose-200 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contiguous Purchase Module Right */}
            <div className="p-6 md:p-8 flex flex-col justify-between text-left">
              <div>
                {/* Category & Status */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                  <span className="font-semibold text-rose-700 uppercase tracking-wider">{product.category}</span>
                  <span>·</span>
                  <span className="text-stone-400">SKU: {product.sku}</span>
                  {product.banglaName && (
                    <>
                      <span>·</span>
                      <span className="text-stone-500">{product.banglaName}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900 leading-tight">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                    {formatBDT(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                      {formatBDT(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Fabric Callout */}
                <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200/80 text-xs space-y-1">
                  <div className="text-stone-800">
                    <span className="font-semibold text-stone-900">Fabric:</span> {product.fabric}
                  </div>
                  {product.workDetails && (
                    <div className="text-stone-700">
                      <span className="font-semibold text-stone-900">Work:</span> {product.workDetails}
                    </div>
                  )}
                </div>

                {/* Color Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-2">
                    <span>Select Color: <strong className="text-stone-900">{activeColor.name}</strong></span>
                    <span className="text-[11px] text-rose-600 font-medium">Image updates with color</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorChange(idx)}
                        className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center relative ${
                          selectedColorIdx === idx
                            ? 'ring-2 ring-rose-500 ring-offset-2 border-white scale-105'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} - View matching photo`}
                      >
                        {selectedColorIdx === idx && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-md stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-2">
                    <span>Select Size</span>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-xs font-medium text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-stone-900 font-mono tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {product.inStock ? `In Stock (${product.stockCount} units available)` : 'Low Stock'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-stone-100 space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={!product.inStock}
                    className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Cash on Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    <span>Dhaka 24h / BD 2-3 Days</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                    <span>Check parcel before paying</span>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <button
                    onClick={() => {
                      closeQuickView();
                      viewProductDetails(product);
                    }}
                    className="text-xs text-rose-700 hover:text-rose-800 font-medium underline underline-offset-2 cursor-pointer"
                  >
                    View Full Specifications & Tailoring Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
    </>
  );
};
