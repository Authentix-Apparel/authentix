import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BD_64_DISTRICTS, DELIVERY_FEES, BKASH_MERCHANT_NUMBER, NAGAD_MERCHANT_NUMBER, WHATSAPP_NUMBER } from '../data/bangladeshData';
import { DeliveryZone, PaymentMethod, ShippingAddress } from '../types';
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle, ShoppingBag, MapPin, User, Phone, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    couponDiscount,
    placeOrder,
    formatBDT,
    setActivePage
  } = useShop();

  // Form states specifically tailored to Bangladesh requirements:
  // 1. Customer's Name (Required)
  // 2. Phone Number (Required)
  // 3. District (All 64 districts)
  // 4. Detail house and street address (Required)
  // No division, no thana/upazila needed.
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [fullAddress, setFullAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('dhaka');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [trxId, setTrxId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically update delivery zone based on chosen district
  const handleDistrictChange = (distName: string) => {
    setDistrict(distName);
    if (distName === 'Dhaka') {
      setDeliveryZone('dhaka');
    } else {
      setDeliveryZone('outside-dhaka');
    }
  };

  // Pricing calculations
  const deliveryFee =
    cartSubtotal >= DELIVERY_FEES.freeThreshold
      ? 0
      : deliveryZone === 'dhaka'
      ? DELIVERY_FEES.dhaka
      : DELIVERY_FEES.outsideDhaka;

  const grandTotal = Math.max(0, cartSubtotal + deliveryFee - couponDiscount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Customer Name validation
    if (!fullName.trim()) {
      setErrorMsg('Customer name is required. Please input your full name.');
      return;
    }

    // Bangladeshi phone validation (Required)
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^(\+88)/, '');
    if (!cleanPhone || !/^01[3-9]\d{8}$/.test(cleanPhone)) {
      setErrorMsg('A valid 11-digit Bangladeshi mobile number is required (e.g. 01711234567).');
      return;
    }

    // Detail house and street address (Required)
    if (!fullAddress.trim()) {
      setErrorMsg('Detail house and street address is required. Please provide your house no, road no, and area.');
      return;
    }

    // Payment validation
    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
      setErrorMsg(`Please enter your ${paymentMethod.toUpperCase()} Transaction ID (TrxID) after payment.`);
      return;
    }

    setIsSubmitting(true);

    try {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      const shipping: ShippingAddress = {
        fullName: fullName.trim(),
        phone: cleanPhone,
        district: district,
        fullAddress: fullAddress.trim(),
        email: email.trim() || undefined,
        deliveryNotes: deliveryNotes.trim() || undefined
      };

      placeOrder(shipping, deliveryZone, paymentMethod, trxId.trim());
    } catch {
      setErrorMsg('Failed to process order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-left">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-stone-200 shadow-xs text-center">
          <ShoppingBag className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-serif font-bold text-stone-900">Your Cart is Empty</h2>
          <p className="text-xs text-stone-500 mt-1">Please add items to your cart before proceeding to checkout.</p>
          <button
            onClick={() => setActivePage('store')}
            className="mt-5 px-5 py-2.5 bg-stone-900 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Browse Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-left">
      <div className="pb-6 mb-8 border-b border-stone-200">
        <button
          onClick={() => setActivePage('cart')}
          className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </button>
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Shipping Address in Bangladesh
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Fast nationwide delivery across all 64 districts · 100% Cash on Delivery
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shipping Address & Payment (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address in Bangladesh Card */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                <h2 className="text-base font-serif font-bold text-stone-900">
                  Shipping Address in Bangladesh
                </h2>
              </div>
              <span className="text-[11px] text-stone-500">All 64 districts supported</span>
            </div>

            {/* 1. Customer's Name (Required) */}
            <div>
              <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>Customer's Full Name (আপনার নাম)</span>
                <span className="text-rose-600 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Input your full name (e.g. Nusrat Jahan / ফারহানা আহমেদ)"
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-rose-500 focus:bg-white transition-colors"
              />
            </div>

            {/* 2. Phone Number (Required) */}
            <div>
              <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>Phone Number (মোবাইল নম্বর)</span>
                <span className="text-rose-600 font-bold">* (Required)</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX (11 digits e.g. 01711234567)"
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-rose-500 focus:bg-white transition-colors font-mono"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Required for parcel delivery confirmation call & SMS
              </span>
            </div>

            {/* 3. District (All 64 Districts) */}
            <div>
              <label className="text-xs font-semibold text-stone-800 flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>District (জেলা)</span>
                  <span className="text-rose-600 font-bold">*</span>
                </span>
                <span className="text-[11px] text-rose-600 font-medium">64 Districts Available</span>
              </label>
              <select
                required
                value={district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-rose-500 focus:bg-white transition-colors cursor-pointer font-medium text-stone-800"
              >
                {BD_64_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist} {dist === 'Dhaka' ? '(Inside Dhaka City - ৳70 Delivery)' : '(Outside Dhaka - ৳130 Delivery)'}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Detail house and street address (Must be required) */}
            <div>
              <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5 mb-1.5">
                <Home className="w-3.5 h-3.5 text-stone-400" />
                <span>Detail House and Street Address (সম্পূর্ণ বিস্তারিত ঠিকানা)</span>
                <span className="text-rose-600 font-bold">* (Must be required)</span>
              </label>
              <textarea
                required
                rows={3}
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="House number, road number, flat/holding number, area/moholla, landmarks... (e.g. House 42, Road 11, Block D, Banani)"
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-rose-500 focus:bg-white transition-colors leading-relaxed"
              />
            </div>

            {/* Optional Delivery Note & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Delivery Note (Optional)
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Ring bell on 3rd floor / Call before delivery"
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For digital invoice copy"
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
            <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Payment Method
            </h2>

            <div className="space-y-3">
              {/* Option 1: Cash on Delivery (Highlight) */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-rose-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">
                      Cash on Delivery (ক্যাশ অন ডেলিভারি)
                    </span>
                    <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded uppercase">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Pay with cash directly to the courier delivery executive upon receiving and inspecting your parcel at home.
                  </p>
                </div>
              </label>

              {/* Option 2: bKash */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'bkash'
                    ? 'border-pink-600 bg-pink-50/50 ring-1 ring-pink-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="mt-1 text-pink-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-stone-900">bKash Payment</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Send Money to Authentix Merchant bKash: <strong>{BKASH_MERCHANT_NUMBER}</strong>
                  </p>
                  {paymentMethod === 'bkash' && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-pink-200 space-y-2">
                      <span className="text-[11px] text-stone-600 block">
                        Send total <strong>{formatBDT(grandTotal)}</strong> to bKash number <strong>{BKASH_MERCHANT_NUMBER}</strong> and paste the Transaction ID below:
                      </span>
                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. 9BK208492019"
                        className="w-full p-2 text-xs border border-pink-300 rounded uppercase font-mono"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Option 3: Nagad */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'nagad'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="mt-1 text-orange-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-stone-900">Nagad Payment</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Send Money to Authentix Nagad Merchant: <strong>{NAGAD_MERCHANT_NUMBER}</strong>
                  </p>
                  {paymentMethod === 'nagad' && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-orange-200 space-y-2">
                      <span className="text-[11px] text-stone-600 block">
                        Enter Transaction ID from Nagad:
                      </span>
                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. 7NG8910471"
                        className="w-full p-2 text-xs border border-orange-300 rounded uppercase font-mono"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Confirm (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 space-y-4 shadow-xs sticky top-28">
          <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
            Order Summary ({cart.length} Ensembles)
          </h2>

          <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.selectedColor.imageUrl || item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover object-top rounded-md border border-stone-200 shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-stone-900 line-clamp-1">{item.product.name}</h4>
                    <span className="text-stone-500 text-[11px]">
                      {item.selectedSize} · {item.selectedColor.name} · Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-bold text-stone-900 shrink-0">
                  {formatBDT(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-mono tabular-nums font-semibold">{formatBDT(cartSubtotal)}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({appliedCoupon})</span>
                <span className="font-mono tabular-nums font-semibold">-{formatBDT(couponDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee ({district === 'Dhaka' ? 'Inside Dhaka' : `Outside Dhaka - ${district}`})</span>
              <span className="font-mono tabular-nums font-semibold">
                {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatBDT(deliveryFee)}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
              <span>Total Payable</span>
              <span className="font-mono tabular-nums text-2xl text-rose-700">
                {formatBDT(grandTotal)}
              </span>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:bg-stone-400"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm Order (ক্যাশ অন ডেলিভারিতে অর্ডার করুন)</span>
            </button>
          </div>

          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="flex items-center gap-2 text-stone-900 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Authentix Delivery Guarantee</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              100% Cash on Delivery across all 64 districts in Bangladesh. You inspect your parcel at your doorstep before paying the courier.
            </p>
            <p className="text-[10px] text-stone-400 pt-1">
              Questions? Call or WhatsApp us at <strong>{WHATSAPP_NUMBER}</strong>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
