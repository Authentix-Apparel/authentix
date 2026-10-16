import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Truck, CheckCircle2, Clock, Package, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const OrderTrackPage: React.FC = () => {
  const { orders, trackOrderNumber, setTrackOrderNumber, formatBDT, setActivePage } = useShop();
  const [searchInput, setSearchInput] = useState(trackOrderNumber || '');
  const [searched, setSearched] = useState(!!trackOrderNumber);

  const foundOrder = orders.find(
    (o) =>
      o.orderNumber.toLowerCase() === searchInput.trim().toLowerCase() ||
      o.customer.phone === searchInput.trim()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setTrackOrderNumber(searchInput.trim());
    setSearched(true);
  };

  const steps = [
    { key: 'pending', title: 'Order Placed', desc: 'Received in Authentix system' },
    { key: 'confirmed', title: 'Order Confirmed', desc: 'Verified via telephone call' },
    { key: 'processing', title: 'Quality & Packaging', desc: 'Inspected and packed in rose box' },
    { key: 'shipped', title: 'Dispatched with Courier', desc: 'Handed to Steadfast / Pathao' },
    { key: 'delivered', title: 'Delivered & Paid', desc: 'Completed at customer doorstep' }
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderRanks: Record<string, number> = {
      pending: 1,
      confirmed: 2,
      processing: 3,
      shipped: 4,
      delivered: 5,
      cancelled: 0
    };

    const currentRank = orderRanks[currentStatus] || 1;
    const stepRank = orderRanks[stepKey] || 1;

    if (currentStatus === 'cancelled') return 'cancelled';
    if (currentRank > stepRank) return 'completed';
    if (currentRank === stepRank) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-left">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Track Your Delivery
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Enter your Authentix Order ID (e.g. AA-8921) or your 11-digit mobile number
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. AA-8921 or 01711234567"
              className="w-full pl-9 pr-3 py-3 text-xs bg-white border border-stone-200 rounded-xl focus:outline-rose-500 shadow-xs uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Track
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-stone-400">
          <span>Try sample orders:</span>
          <button
            onClick={() => {
              setSearchInput('AA-8921');
              setSearched(true);
            }}
            className="text-rose-600 hover:underline font-mono"
          >
            AA-8921
          </button>
          <span>·</span>
          <button
            onClick={() => {
              setSearchInput('AA-8922');
              setSearched(true);
            }}
            className="text-rose-600 hover:underline font-mono"
          >
            AA-8922
          </button>
        </div>
      </div>

      {/* Results View */}
      {searched && (
        foundOrder ? (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs space-y-6">
            {/* Header */}
            <div className="p-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-stone-900">{foundOrder.orderNumber}</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded uppercase bg-rose-100 text-rose-800">
                    {foundOrder.orderStatus.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Recipient: <strong className="text-stone-800">{foundOrder.customer.fullName}</strong> ({foundOrder.customer.phone})
                </p>
              </div>

              <div className="text-left sm:text-right text-xs">
                <span className="text-stone-500 block">Courier Tracking:</span>
                <span className="font-mono font-bold text-stone-900">{foundOrder.courier || 'Steadfast'} · {foundOrder.trackingCode || 'Pending'}</span>
              </div>
            </div>

            {/* Visual Step Progress Timeline */}
            <div className="px-6 py-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-6">
                Shipment Status Timeline
              </h3>

              <div className="relative border-l-2 border-stone-200 ml-4 space-y-8 pb-4">
                {steps.map((st) => {
                  const status = getStepStatus(st.key, foundOrder.orderStatus);
                  const isDone = status === 'completed';
                  const isCurrent = status === 'current';

                  return (
                    <div key={st.key} className="relative pl-6">
                      {/* Step Indicator Dot */}
                      <div
                        className={`absolute -left-[11px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-rose-600 text-white ring-4 ring-rose-100'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>

                      <div>
                        <h4
                          className={`text-sm font-bold ${
                            isCurrent
                              ? 'text-rose-700'
                              : isDone
                              ? 'text-stone-900'
                              : 'text-stone-400'
                          }`}
                        >
                          {st.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination & Ordered Items */}
            <div className="p-6 bg-stone-50 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-2">Delivery Address</h4>
                <p className="text-stone-700 leading-relaxed">
                  {foundOrder.customer.fullAddress}, {foundOrder.customer.district}
                </p>
                <p className="text-stone-500 mt-1">Zone: {foundOrder.deliveryZone === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}</p>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-2">Order Value</h4>
                <div className="flex justify-between text-stone-600 mb-1">
                  <span>Payment Type:</span>
                  <span className="font-semibold text-stone-900 uppercase">{foundOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                  <span>Total Payable:</span>
                  <span className="font-mono text-rose-700">{formatBDT(foundOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
            <p className="text-base font-serif font-bold text-stone-800">No order found</p>
            <p className="text-xs text-stone-500 mt-1">
              Could not find any parcel matching "{searchInput}". Please double check your order number or phone number.
            </p>
          </div>
        )
      )}
    </div>
  );
};
