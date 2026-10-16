import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { SizeGuideModal } from '../components/SizeGuideModal';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Star,
  Check,
  ArrowRight,
  Share2,
  ChevronRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatBDT,
    setActivePage,
    setSelectedCategoryFilter
  } = useShop();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [currentMainImage, setCurrentMainImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const product = products.find((p) => p.id === selectedProduct?.id) || selectedProduct;

  useEffect(() => {
    if (product) {
      setSelectedColorIdx(0);
      const initialImg = product.colors[0]?.imageUrl || product.images[0];
      setCurrentMainImage(initialImg);
      setSelectedSize(product.sizes[0] || 'Standard');
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500 text-sm">No product selected.</p>
        <button
          onClick={() => setActivePage('store')}
          className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    const chosenColor = product.colors[idx];
    if (chosenColor?.imageUrl) {
      setCurrentMainImage(chosenColor.imageUrl);
    } else if (product.images[idx]) {
      setCurrentMainImage(product.images[idx]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, activeColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, activeColor, selectedSize, quantity);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 text-left">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
        <button
          onClick={() => setActivePage('home')}
          className="hover:text-stone-900 cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <button
          onClick={() => {
            setSelectedCategoryFilter(product.category);
            setActivePage('store');
          }}
          className="hover:text-stone-900 cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Sticky Gallery Left, Contiguous Purchase Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/5 w-full bg-stone-100 rounded-2xl overflow-hidden shadow-xs border border-stone-200">
            <img
              src={currentMainImage || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-opacity duration-300"
            />
            {/* Color Indicator Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-stone-200/80 flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-full border border-stone-300"
                style={{ backgroundColor: activeColor.hex }}
              />
              <span className="font-semibold text-stone-900">{activeColor.name}</span>
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full text-stone-700 shadow-md transition-colors cursor-pointer"
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMainImage(img)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentMainImage === img ? 'border-rose-600 ring-2 ring-rose-200 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt="Gallery thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-rose-700 uppercase tracking-widest">{product.category}</span>
                <span>·</span>
                <span className="font-mono">SKU: {product.sku}</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>
            {product.banglaName && (
              <p className="text-xs text-stone-500 mt-1 font-normal">
                {product.banglaName}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Module with Tabular Figures */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900 font-mono tabular-nums">
                {formatBDT(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through font-mono tabular-nums">
                  {formatBDT(product.originalPrice)}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Inclusive of all VAT. Cash on Delivery available across Bangladesh.
            </p>
          </div>

          {/* Color Variant Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-2">
              <span>Color Shade: <strong className="text-stone-900">{activeColor.name}</strong></span>
              <span className="text-[11px] text-rose-600 font-medium">Image updates with color</span>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(idx)}
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer relative flex items-center justify-center ${
                    selectedColorIdx === idx
                      ? 'ring-2 ring-rose-500 ring-offset-2 border-white scale-110 shadow-xs'
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={`${color.name} - Click to see matching dress`}
                >
                  {selectedColorIdx === idx && (
                    <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-2">
              <span>Selected Size: <strong className="text-stone-900">{selectedSize}</strong></span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Bangladesh Size Chart</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    selectedSize === s
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Stock */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs font-medium text-stone-700">Quantity:</span>
            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-bold text-stone-900 font-mono tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
            <span className="text-xs font-medium text-emerald-700">
              {product.inStock ? `In Stock (${product.stockCount} left in Dhaka hub)` : 'Backordered'}
            </span>
          </div>

          {/* Primary Buy CTA Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:bg-stone-300"
            >
              <span>Order with Cash on Delivery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:bg-stone-300"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>
          </div>

          {/* Delivery & Cash on Delivery Assurances */}
          <div className="border-t border-stone-200 pt-4 space-y-2.5 text-xs text-stone-600">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Fast Delivery Across Bangladesh</strong>
                <span>Inside Dhaka: 24 to 48 hours (৳70) · Outside Dhaka: 2 to 4 days (৳130). Free delivery over ৳3,500.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Cash on Delivery with Parcel Check</strong>
                <span>Open parcel in front of the courier delivery executive before completing payment.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <RefreshCw className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">7-Day Easy Exchange Policy</strong>
                <span>Instant size replacement or color change support via WhatsApp.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Craftsmanship Accordion / Table */}
      <div className="mt-16 pt-10 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">Fabric & Craftsmanship Details</h3>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-stone-200/60">
              <span className="text-stone-500">Fabric Composition:</span>
              <span className="font-semibold text-stone-900 text-right">{product.fabric}</span>
            </div>
            {product.workDetails && (
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Embroidery & Work:</span>
                <span className="font-semibold text-stone-900 text-right max-w-xs">{product.workDetails}</span>
              </div>
            )}
            {product.dupattaDetails && (
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Orna / Dupatta:</span>
                <span className="font-semibold text-stone-900 text-right max-w-xs">{product.dupattaDetails}</span>
              </div>
            )}
            {product.bottomDetails && (
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Bottom / Salwar:</span>
                <span className="font-semibold text-stone-900 text-right max-w-xs">{product.bottomDetails}</span>
              </div>
            )}
            <div className="flex justify-between py-1.5">
              <span className="text-stone-500">Wash & Care:</span>
              <span className="font-semibold text-stone-900 text-right">{product.careInstructions}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">Designer's Description</h3>
          <div className="text-xs text-stone-600 leading-relaxed space-y-3">
            <p>{product.description}</p>
            <p>
              Each garment in our atelier is tailored by seasoned master tailors in Dhaka, utilizing reinforced seams, gentle anti-fray edging, and authentic colorfast dyes suited for Bangladesh's weather.
            </p>
            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900 block text-xs">Have questions about fitting?</span>
                <span className="text-[11px] text-stone-500">Our Dhaka stylists are available live on WhatsApp</span>
              </div>
              <a
                href="https://wa.me/8801755025128"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
              >
                Chat on WhatsApp (01755-025128)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              More from {product.category}
            </h2>
            <button
              onClick={() => {
                setSelectedCategoryFilter(product.category);
                setActivePage('store');
              }}
              className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
