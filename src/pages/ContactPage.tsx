import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: 'How does Cash on Delivery (ক্যাশ অন ডেলিভারি) work?',
      a: 'You place your order online without paying any advance money. Our delivery partner (Pathao in Dhaka, Steadfast outside Dhaka) brings the parcel to your doorstep. You can check the exterior parcel, hand over the exact cash amount in BDT, and receive your receipt.'
    },
    {
      q: 'How long does delivery take inside and outside Dhaka?',
      a: 'Deliveries inside Dhaka city are fulfilled within 24 to 48 hours (delivery fee ৳70). Deliveries to sub-Dhaka areas and all other 63 districts take 2 to 4 business days (delivery fee ৳130). Orders over ৳3,500 enjoy 100% Free Nationwide Delivery.'
    },
    {
      q: 'Can I exchange if the size does not fit?',
      a: 'Yes, absolutely! We offer a 7-day hassle-free exchange policy. Simply message our WhatsApp hotline at 01711-889900 with your Order Number and desired replacement size. For Dhaka, our rider can swap the sizes right at your doorstep.'
    },
    {
      q: 'Can I visit your showroom in Dhaka?',
      a: 'Yes! Our flagship showroom is located at House 74, Road 11, Block D, Banani, Dhaka-1213. We are open every day from 11:00 AM to 9:30 PM.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-left">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-widest mb-1">
          <span>Customer Concierge</span>
          <span>·</span>
          <span>Dhaka Atelier</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Get in Touch with Authentix
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-2">
          Have an inquiry regarding styling, custom sizing, wholesale orders, or courier tracking? We're here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Left (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Showroom & Helpline
            </h2>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block text-sm font-semibold">Banani Flagship Showroom</strong>
                  <span className="leading-relaxed block mt-0.5">House 74, Road 11, Block D, Banani, Dhaka-1213, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block text-sm font-semibold">Direct Customer Care</strong>
                  <a href="tel:+8801755025128" className="text-rose-600 hover:underline font-mono text-sm block mt-0.5">
                    +880 1755-025128
                  </a>
                  <span className="text-[11px] text-stone-400">Available Saturday to Thursday (10:00 AM - 10:00 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block text-sm font-semibold">WhatsApp Stylist Hotline</strong>
                  <a
                    href="https://wa.me/8801755025128"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline font-mono text-sm block mt-0.5"
                  >
                    +880 1755-025128 (Instant Chat)
                  </a>
                  <span className="text-[11px] text-stone-400">Average response time: under 5 minutes</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block text-sm font-semibold">Store Opening Hours</strong>
                  <span className="leading-relaxed block mt-0.5">Everyday: 11:00 AM – 9:30 PM (including Friday & Saturday)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form & FAQ Right (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Quick Message Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been sent to our Banani customer care team. We will call or WhatsApp you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Farhana Ahmed"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-rose-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Bangladeshi Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-rose-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">How can we help you?</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about size availability, fabric inquiries, or order status..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-xs shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Frequently Asked Questions Accordion */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Frequently Asked Questions (FAQ)
            </h3>

            <div className="divide-y divide-stone-100">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-stone-900 hover:text-rose-600 transition-colors py-1 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-rose-600' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <p className="text-xs text-stone-600 leading-relaxed mt-2 pt-1 text-left">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
