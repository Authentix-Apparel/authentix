import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Truck, Printer, ArrowRight, MapPin, Phone, ShieldCheck, ShoppingBag } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { latestOrder, setActivePage, formatBDT, setTrackOrderNumber } = useShop();

  if (!latestOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-left">
        <p className="text-stone-500 text-sm">No recent order found.</p>
        <button
          onClick={() => setActivePage('store')}
          className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const order = latestOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleTrack = () => {
    setTrackOrderNumber(order.orderNumber);
    setActivePage('order-track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-left">
      {/* Success Badge */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Order Confirmed</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          ধন্যবাদ! Thank You for Your Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Your order has been recorded. Our Dhaka representative will call your number{' '}
          <strong className="text-stone-900 font-mono">{order.customer.phone}</strong> shortly to confirm.
        </p>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs print:shadow-none print:border-none">
        {/* Header Strip */}
        <div className="p-6 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg">Authentix Apparel</span>
              <span className="text-[10px] bg-rose-600 px-2 py-0.5 rounded uppercase font-semibold">Bangladesh</span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">Order Invoice #{order.orderNumber}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer print:hidden"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={handleTrack}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer print:hidden"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Parcel</span>
            </button>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="p-6 border-b border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-600">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-2">Delivery Destination</h4>
            <div className="space-y-1">
              <p className="font-semibold text-stone-900 text-sm">{order.customer.fullName}</p>
              <p className="flex items-center gap-1.5 font-mono text-stone-800">
                <Phone className="w-3 h-3 text-stone-400" />
                <span>{order.customer.phone}</span>
              </p>
              <p className="flex items-start gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>{order.customer.fullAddress}, {order.customer.district}</span>
              </p>
              {order.customer.deliveryNotes && (
                <p className="text-[11px] text-stone-500 italic mt-1">Note: "{order.customer.deliveryNotes}"</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-2">Order Information</h4>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-mono text-stone-900 font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Type:</span>
              <span className="font-semibold text-stone-900 uppercase">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : `bKash (${order.trxId || 'Verified'})`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Partner:</span>
              <span className="text-stone-900 font-medium">{order.courier || 'Steadfast Courier'}</span>
            </div>
            <div className="flex justify-between">
              <span>Tracking Code:</span>
              <span className="font-mono text-stone-900 font-bold bg-stone-100 px-1.5 py-0.5 rounded">
                {order.trackingCode}
              </span>
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="p-6">
          <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-3 text-xs">Ordered Ensembles</h4>
          <div className="divide-y divide-stone-100 text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover object-top rounded-md border border-stone-200"
                  />
                  <div>
                    <h5 className="font-semibold text-stone-900">{item.product.name}</h5>
                    <p className="text-stone-500 text-[11px]">
                      Size: {item.selectedSize} · Color: {item.selectedColor.name} · Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-bold text-stone-900">
                  {formatBDT(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-stone-200 mt-4 pt-4 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="font-mono font-medium">{formatBDT(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount:</span>
                <span className="font-mono font-medium">-{formatBDT(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Shipping Fee:</span>
              <span className="font-mono font-medium">
                {order.deliveryFee === 0 ? 'FREE' : formatBDT(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Payable at Doorstep:</span>
              <span className="font-mono text-xl text-rose-700 tabular-nums">
                {formatBDT(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Assurance */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Open parcel in front of the delivery executive before paying cash.</span>
          </div>
          <span className="font-medium text-stone-700">Hotline: 01755-025128</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 print:hidden">
        <button
          onClick={() => {
            setActivePage('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <button
          onClick={handleTrack}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>Track Order Status</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
