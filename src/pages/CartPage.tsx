import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';
import { DELIVERY_FEES } from '../data/bangladeshData';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    formatBDT,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    setActivePage
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const freeDeliveryThreshold = DELIVERY_FEES.freeThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleProceed = () => {
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-left">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-stone-200 shadow-xs text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-stone-500 mt-2">
            You haven't added any products to your bag yet. Explore our latest Three-Piece and Western collections.
          </p>
          <button
            onClick={() => setActivePage('store')}
            className="mt-6 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Explore Authentix Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-left">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
        <div>
          <button
            onClick={() => setActivePage('store')}
            className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-rose-600 font-medium cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items list (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert Bar */}
          <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-100 text-xs">
            {remainingForFreeDelivery === 0 ? (
              <div className="text-emerald-800 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>You qualify for <strong>FREE Delivery</strong> anywhere in Bangladesh!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-stone-700">
                  <span>Add <strong className="text-rose-700 font-mono tabular-nums">{formatBDT(remainingForFreeDelivery)}</strong> more to get Free Delivery</span>
                  <span className="font-mono text-stone-500">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white divide-y divide-stone-100">
            {cart.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-top rounded-xl border border-stone-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-rose-700 tracking-wider">
                      {item.product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-stone-900 mt-0.5">{item.product.name}</h3>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-500">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-stone-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </span>
                      <span>·</span>
                      <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                    </div>

                    <span className="text-xs font-bold text-stone-900 font-mono tabular-nums block mt-2 sm:hidden">
                      {formatBDT(item.price)}
                    </span>
                  </div>
                </div>

                {/* Right: Quantity Stepper & Subtotal */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-xs font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-stone-900 font-mono tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm font-bold text-stone-900 font-mono tabular-nums hidden sm:inline">
                    {formatBDT(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary Box (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-serif font-bold text-stone-900">Order Summary</h2>

          {/* Coupon Input Form */}
          <form onSubmit={handleApply} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                placeholder="Discount Code"
                className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg uppercase tracking-wider focus:outline-rose-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Apply
            </button>
          </form>

          {couponFeedback && (
            <div
              className={`text-[11px] p-2.5 rounded-lg ${
                couponFeedback.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
              }`}
            >
              {couponFeedback.message}
            </div>
          )}

          {appliedCoupon && (
            <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
              <span>Code <strong>{appliedCoupon}</strong> active</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold">-{formatBDT(couponDiscount)}</span>
                <button
                  onClick={removeCoupon}
                  className="text-stone-400 hover:text-stone-700 text-[11px] underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="space-y-2.5 text-xs pt-2 border-t border-stone-100">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums font-semibold">{formatBDT(cartSubtotal)}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span className="font-mono tabular-nums font-semibold">-{formatBDT(couponDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee (Bangladesh)</span>
              <span className="font-mono tabular-nums text-stone-500">
                {cartSubtotal >= freeDeliveryThreshold ? 'FREE' : '৳70 / ৳130 (At checkout)'}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
              <span>Grand Total</span>
              <span className="font-mono tabular-nums text-xl text-rose-700">
                {formatBDT(Math.max(0, cartSubtotal - couponDiscount))}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="pt-2">
            <button
              onClick={handleProceed}
              className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Cash on Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cash on Delivery with Parcel Check Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
