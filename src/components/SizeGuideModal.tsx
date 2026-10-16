import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Authentix Apparel Size Chart (বাংলাদেশ স্ট্যান্ডার্ড)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-left">
          {/* Three-Piece / Salwar Kameez Measurements */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-700 mb-2">
              Three-Piece & Salwar Kameez (Inches)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                    <th className="py-2.5 px-3">Size Tag</th>
                    <th className="py-2.5 px-3">Kameez Chest (Bust)</th>
                    <th className="py-2.5 px-3">Waist</th>
                    <th className="py-2.5 px-3">Hip</th>
                    <th className="py-2.5 px-3">Kameez Length</th>
                    <th className="py-2.5 px-3">Trouser Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums">
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">36 (XS)</td>
                    <td className="py-2 px-3">36"</td>
                    <td className="py-2 px-3">32"</td>
                    <td className="py-2 px-3">38"</td>
                    <td className="py-2 px-3">44"</td>
                    <td className="py-2 px-3">38"</td>
                  </tr>
                  <tr className="hover:bg-stone-50 bg-rose-50/30">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">38 (S)</td>
                    <td className="py-2 px-3">38"</td>
                    <td className="py-2 px-3">34"</td>
                    <td className="py-2 px-3">40"</td>
                    <td className="py-2 px-3">44" - 45"</td>
                    <td className="py-2 px-3">38" - 39"</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">40 (M)</td>
                    <td className="py-2 px-3">40"</td>
                    <td className="py-2 px-3">36"</td>
                    <td className="py-2 px-3">42"</td>
                    <td className="py-2 px-3">45"</td>
                    <td className="py-2 px-3">39"</td>
                  </tr>
                  <tr className="hover:bg-stone-50 bg-rose-50/30">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">42 (L)</td>
                    <td className="py-2 px-3">42"</td>
                    <td className="py-2 px-3">38"</td>
                    <td className="py-2 px-3">44"</td>
                    <td className="py-2 px-3">45" - 46"</td>
                    <td className="py-2 px-3">40"</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">44 (XL)</td>
                    <td className="py-2 px-3">44"</td>
                    <td className="py-2 px-3">40"</td>
                    <td className="py-2 px-3">46"</td>
                    <td className="py-2 px-3">46"</td>
                    <td className="py-2 px-3">40"</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">46 (XXL)</td>
                    <td className="py-2 px-3">46"</td>
                    <td className="py-2 px-3">42"</td>
                    <td className="py-2 px-3">48"</td>
                    <td className="py-2 px-3">46"</td>
                    <td className="py-2 px-3">40"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-stone-500 mt-1.5">
              * Note: Orna / Dupatta across all three-pieces is standard 2.5 meters (5 Haat).
            </p>
          </div>

          {/* Western Dress Measurements */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-700 mb-2">
              Western Dresses & Co-ords (Inches)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Bust</th>
                    <th className="py-2.5 px-3">Waist (Elastic)</th>
                    <th className="py-2.5 px-3">Shoulder</th>
                    <th className="py-2.5 px-3">Maxi Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums">
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">Small (S)</td>
                    <td className="py-2 px-3">36"</td>
                    <td className="py-2 px-3">28" - 30"</td>
                    <td className="py-2 px-3">14.5"</td>
                    <td className="py-2 px-3">52"</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">Medium (M)</td>
                    <td className="py-2 px-3">38" - 40"</td>
                    <td className="py-2 px-3">31" - 33"</td>
                    <td className="py-2 px-3">15.0"</td>
                    <td className="py-2 px-3">53"</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">Large (L)</td>
                    <td className="py-2 px-3">41" - 42"</td>
                    <td className="py-2 px-3">34" - 36"</td>
                    <td className="py-2 px-3">15.5"</td>
                    <td className="py-2 px-3">54"</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">X-Large (XL)</td>
                    <td className="py-2 px-3">43" - 44"</td>
                    <td className="py-2 px-3">37" - 39"</td>
                    <td className="py-2 px-3">16.0"</td>
                    <td className="py-2 px-3">54"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Abaya & Hijab Height Reference */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-1">
              Abaya Height Guide (দুবাই ও তুর্কি আবায়া)
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs text-stone-700 mt-2">
              <div className="bg-white p-2.5 rounded-lg border border-rose-100">
                <span className="font-bold text-stone-900 block">Size 52</span>
                <span className="text-stone-500 text-[11px]">Recommended for height 5'0" – 5'2"</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-rose-100">
                <span className="font-bold text-stone-900 block">Size 54</span>
                <span className="text-stone-500 text-[11px]">Recommended for height 5'3" – 5'5"</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-rose-100">
                <span className="font-bold text-stone-900 block">Size 56</span>
                <span className="text-stone-500 text-[11px]">Recommended for height 5'6" – 5'8"</span>
              </div>
            </div>
          </div>

          {/* Sizing Assistance */}
          <div className="text-xs text-stone-500 flex items-center justify-between pt-2 border-t border-stone-200">
            <span>Need personalized tailoring or custom alterations?</span>
            <a
              href="https://wa.me/8801755025128"
              target="_blank"
              rel="noreferrer"
              className="text-rose-600 hover:text-rose-700 font-semibold"
            >
              WhatsApp Us: 01755-025128
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
