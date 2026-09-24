import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShoppingBag, ArrowRight, Zap, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface TodaysDealsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const TodaysDeals: React.FC<TodaysDealsProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const dealProducts = products.filter((p) => p.isDeal || p.dealDiscount).slice(0, 3);

  // Real-time ticking countdown timer (8 hours, 42 minutes, 19 seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  const [addedIds, setAddedIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 }; // reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedIds((prev) => [...prev, p.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== p.id));
    }, 1500);
  };

  const handleBuy = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onBuyNow(p);
  };

  if (dealProducts.length === 0) return null;

  return (
    <section id="deals-section" className="py-12 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-rose-500/10 border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deals Header with Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-orange-200/50 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Today's Lightning Deals
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-xs font-black animate-pulse">
                  HOT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Limited-quantity algorithmic price cuts. Guaranteed lowest price of the season.
              </p>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-orange-200/70 shadow-xs">
            <Clock className="w-4 h-4 text-orange-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Ends In:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-slate-900">
              <span className="bg-slate-900 text-white px-2 py-0.5 rounded-md text-xs">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-900 text-white px-2 py-0.5 rounded-md text-xs">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-orange-600 text-white px-2 py-0.5 rounded-md text-xs">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Deals Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dealProducts.map((product) => {
            const isAdded = addedIds.includes(product.id);
            const savings = (product.originalPrice || product.price * 1.25) - product.price;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-2xl border border-orange-200/80 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Discount */}
                  <div className="p-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-black shadow-xs">
                      {product.dealDiscount || 25}% OFF
                    </span>

                    <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      Save ${savings.toFixed(0)}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50">
                    <ProductVisual product={product} className="w-full h-full" />
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                        <span>Sold: 82%</span>
                        <span className="text-orange-600 font-bold">Only {product.stock} items remaining</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-4/5 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => handleAdd(e, product)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs shadow-orange-500/25 active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => handleBuy(e, product)}
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all active:scale-95 text-center cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
