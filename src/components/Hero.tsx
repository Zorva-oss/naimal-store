import React, { useState } from 'react';
import { Sparkles, ArrowRight, ChevronRight, RotateCw, Eye, ShieldCheck, Zap, Volume2, VolumeX, Flame } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onShopNow: () => void;
  onExploreNewArrivals: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  onShopNow,
  onExploreNewArrivals,
  onSelectProduct,
  featuredProducts,
}) => {
  const [is3DActive, setIs3DActive] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isPlayingDemo, setIsPlayingDemo] = useState(true);

  const rotateShowcase = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  const headphones = featuredProducts.find((p) => p.id === 'prod-aurawave-headphones') || featuredProducts[0];
  const bag = featuredProducts.find((p) => p.id === 'prod-nova-crossbody') || featuredProducts[1];
  const watch = featuredProducts.find((p) => p.id === 'prod-chronos-smartwatch') || featuredProducts[2];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-white via-[#F8FAFC] to-[#FAFBFD]">
      {/* Background ambient decorative blurs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Micro Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                Powered by Lumix Neural Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-semibold shadow-xs">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                Limited Spring Drop • Up to 40% Off
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              Discover Products <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 bg-clip-text text-transparent">
                You'll Love
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Hyper-personalized curation in real-time. Our generative AI analyzes your taste, fit, and style profile to bring you bespoke luxury essentials.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onShopNow}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 active:scale-98 transition-all cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreNewArrivals}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm sm:text-base shadow-xs hover:border-slate-300 active:scale-98 transition-all cursor-pointer"
              >
                <span>Explore New Arrivals</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* Social Proof & Trust Metrics */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <span className="font-bold text-slate-900">4.9/5</span>
                <span className="text-slate-500">by 120,000+ smart shoppers</span>
              </div>

              <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>99.4% Match Accuracy</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D / Media Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white/95 border border-slate-200/80 shadow-2xl shadow-blue-900/10 overflow-hidden backdrop-blur-sm p-4 sm:p-6 transition-all">
              
              {/* Studio Backdrop Lighting */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-blue-50/20 pointer-events-none" />

              {/* Card Header Pills */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-100">
                <button
                  onClick={() => setIs3DActive(!is3DActive)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    is3DActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                  }`}
                  title="Toggle Interactive 3D Orbit Mode"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${is3DActive ? 'animate-spin' : ''}`} />
                  <span>3D AR View</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
                    <Zap className="w-3.5 h-3.5 text-blue-600" />
                    Trend Score: 98/100
                  </span>
                </div>
              </div>

              {/* Main Visual Arena with Floating Holographic Products & Organic Plinth */}
              <div className="relative h-[340px] sm:h-[400px] w-full flex items-center justify-center select-none overflow-hidden my-2">
                
                {/* 3D Grid floor hint */}
                <div className="absolute bottom-6 inset-x-8 h-24 bg-gradient-to-t from-slate-200/30 to-transparent rounded-full blur-md" />

                {/* Vibrant Fluid Sculpted Pedestal (Electric Blue -> Cyan -> Orange gradient) */}
                <div className="absolute bottom-0 w-64 sm:w-80 h-28 sm:h-36 rounded-[40px] bg-gradient-to-r from-blue-600 via-cyan-400 to-orange-400 blur-xs shadow-xl shadow-cyan-500/20 transform transition-transform duration-700 hover:scale-102 flex items-center justify-center">
                  <div className="w-[96%] h-[92%] rounded-[36px] bg-gradient-to-tr from-blue-500 via-teal-300 to-amber-300 opacity-90 blur-[1px]" />
                </div>

                {/* Floating Product 1: AuraWave Iridescent Headphones (Left) */}
                <div
                  className="absolute left-3 sm:left-8 top-12 sm:top-16 z-20 group cursor-pointer animate-float"
                  style={{
                    transform: `rotate(${rotationAngle * 0.1}deg) scale(0.95)`,
                    transition: 'transform 0.5s ease-out',
                  }}
                  onClick={() => onSelectProduct(headphones)}
                  onMouseEnter={() => setActiveHotspot('headphones')}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative w-32 sm:w-40 h-32 sm:h-40 rounded-2xl bg-white/90 shadow-xl border border-white/60 p-2.5 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/25">
                    <img
                      src={headphones.image}
                      alt={headphones.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                      99%
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[11px] font-bold text-slate-800 bg-white/90 px-2 py-0.5 rounded-md shadow-xs border border-slate-100">
                      AuraWave ANC
                    </span>
                  </div>
                </div>

                {/* Floating Product 2: Nova Holographic Luxury Bag (Center - Dominant) */}
                <div
                  className="absolute top-2 sm:top-4 z-30 group cursor-pointer animate-float-reverse"
                  style={{
                    transform: `rotate(${rotationAngle * -0.05}deg) scale(1.05)`,
                    transition: 'transform 0.5s ease-out',
                  }}
                  onClick={() => onSelectProduct(bag)}
                  onMouseEnter={() => setActiveHotspot('bag')}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative w-40 sm:w-52 h-40 sm:h-52 rounded-2xl bg-white/95 shadow-2xl border-2 border-amber-200/50 p-2.5 backdrop-blur-md transition-all duration-300 group-hover:scale-108 group-hover:shadow-amber-500/30">
                    <img
                      src={bag.image}
                      alt={bag.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      Curated Pick
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs font-bold text-slate-900 bg-white/95 px-2.5 py-0.5 rounded-md shadow-xs border border-amber-100">
                      Nova Metallic Crossbody
                    </span>
                  </div>
                </div>

                {/* Floating Product 3: Chronos Smartwatch (Right) */}
                <div
                  className="absolute right-3 sm:right-8 top-16 sm:top-20 z-20 group cursor-pointer animate-float"
                  style={{
                    transform: `rotate(${rotationAngle * 0.15}deg) scale(0.92)`,
                    transition: 'transform 0.5s ease-out',
                  }}
                  onClick={() => onSelectProduct(watch)}
                  onMouseEnter={() => setActiveHotspot('watch')}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative w-28 sm:w-36 h-28 sm:h-36 rounded-2xl bg-white/90 shadow-xl border border-white/60 p-2 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-500/25">
                    <img
                      src={watch.image}
                      alt={watch.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[11px] font-bold text-slate-800 bg-white/90 px-2 py-0.5 rounded-md shadow-xs border border-slate-100">
                      Chronos V4
                    </span>
                  </div>
                </div>

                {/* Hotspot Floating Tooltip when hovering */}
                {activeHotspot && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-slate-900/90 text-white text-xs px-3.5 py-2 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-2 pointer-events-none animate-in fade-in zoom-in-95">
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>Click to launch Instant Neural View & Specs</span>
                  </div>
                )}

              </div>

              {/* Bottom Telemetry Bar */}
              <div className="relative z-10 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
                  <span className="font-semibold text-slate-800">
                    Personalized Pick: <span className="text-purple-600 font-bold">Synergy with Sophia's Style</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={rotateShowcase}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title="Rotate 3D Stage"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[11px] font-medium border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Real-Time Ingestion
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
