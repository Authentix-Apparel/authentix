import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="text-left pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-rose-50/70 via-stone-50/30 to-white py-16 sm:py-20 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-widest">
            <span>Our Heritage</span>
            <span>·</span>
            <span>Dhaka, Bangladesh</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Crafting Grace for the Modern Bangladeshi Woman
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Authentix Apparel was born out of a desire for authentic, unapologetically graceful fashion that bridges rich South Asian tailoring traditions with contemporary modest aesthetics.
          </p>
        </div>
      </div>

      {/* Main Story Narrative */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
            <img
              src="/src/assets/images/threepiece_collection_1792172508454.jpg"
              alt="Authentix Artisan Atelier"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              The Authentix Philosophy
            </h2>
            <p>
              In a market crowded with synthetic fabrics and rushed mass production, Authentix Apparel stands for intentional fashion. Every three-piece, western dress, and hijab is sampled, draped, and stress-tested in our Banani design studio before reaching your hands.
            </p>
            <p>
              We source organic combed lawn from trusted regional mills, hand-woven Jamdani weaves from Demra, and non-slip bubble georgette designed to stay flawless through busy Dhaka traffic, office meetings, and festive wedding dinners.
            </p>
            <div className="pt-2">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block text-xs">Our Commitment:</span>
                <p className="text-xs text-stone-600">
                  Fair living wages for 40+ female artisans, transparent fabric sourcing, and a 100% risk-free Cash on Delivery policy so every customer in Bangladesh shops with absolute peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Bespoke Embellishments</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              From delicate Resham threads to foil mirror work and scalloped organza borders, every detail is refined by seasoned craftsmen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Empowering Artisans</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We partner directly with female embroidery circles in Tangail, Narayanganj, and Dhaka, providing dignity and sustainable livelihoods.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Doorstep Trust</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We believe in our craft so firmly that we offer parcel inspection upon delivery in all 64 districts of Bangladesh.
            </p>
          </div>
        </div>

        {/* Showroom CTA */}
        <div className="p-8 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Dhaka Flagship Showroom</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Visit Us in Banani Road 11</h3>
            <p className="text-xs text-stone-400 max-w-md">
              Experience the fabrics in person, try on different sizes, and consult with our private styling advisors.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Showroom Directions
          </button>
        </div>
      </div>
    </div>
  );
};
