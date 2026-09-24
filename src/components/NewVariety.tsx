import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ArrowRight, Video, Check, Layers, Zap } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface NewVarietyProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor?: { name: string; hex: string }, selectedSize?: string) => void;
  onBuyNow: (product: Product, selectedColor?: { name: string; hex: string }, selectedSize?: string) => void;
}

export const NewVariety: React.FC<NewVarietyProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const newArrivals = products.filter((p) => p.isNew || p.id.includes('veloce') || p.id.includes('aerocraft')).slice(0, 4);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const currentProduct = newArrivals[activeProductIndex] || newArrivals[0];

  const [selectedColor, setSelectedColor] = useState(currentProduct?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(currentProduct?.sizes ? currentProduct.sizes[0] : undefined);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Sync selected color and size when active product changes
  const switchProduct = (index: number) => {
    setActiveProductIndex(index);
    const prod = newArrivals[index];
    if (prod) {
      setSelectedColor(prod.colors[0]);
      setSelectedSize(prod.sizes ? prod.sizes[0] : undefined);
      setIsPlayingVideo(false);
    }
  };

  const handleAdd = () => {
    onAddToCart(currentProduct, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(currentProduct, selectedColor, selectedSize);
  };

  if (!currentProduct) return null;

  return (
    <section className="py-14 bg-gradient-to-b from-white via-slate-50 to-[#FAFBFD] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Seasonal Innovations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              New Variety & Material Spotlight
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Fresh silhouette drops engineered with progressive bio-composites, aerospace titanium, and smart ergonomics.
            </p>
          </div>

          {/* Product switcher tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none self-start md:self-auto">
            {newArrivals.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => switchProduct(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeProductIndex === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {item.name.split(' ')[0]} {item.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Spotlight Stage */}
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Media Column with Video/Photo toggle */}
          <div className="lg:col-span-7 relative bg-slate-900 min-h-[360px] lg:min-h-[480px] flex items-center justify-center overflow-hidden">
            {isPlayingVideo && currentProduct.videoUrl ? (
              <video
                src={currentProduct.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full relative">
                <ProductVisual product={currentProduct} className="w-full h-full min-h-[380px] lg:min-h-[480px]" />
              </div>
            )}

            {/* Video overlay toggle button */}
            {currentProduct.videoUrl && (
              <button
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Video className="w-4 h-4 text-blue-400" />
                <span>{isPlayingVideo ? 'Show High-Res Photo' : 'Watch Promotional Video'}</span>
              </button>
            )}

            {/* Floating Top Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                NEW VARIETY DROP
              </span>
            </div>

            {/* Inventory Warning Badge */}
            {currentProduct.stock <= 8 && (
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow-md">
                  Only {currentProduct.stock} left in initial release
                </span>
              </div>
            )}
          </div>

          {/* Right Specification & Selection Details */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Brand */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-bold uppercase tracking-wider text-blue-600">{currentProduct.category}</span>
                <span>·</span>
                <span>{currentProduct.brand}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentProduct.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  ${currentProduct.price.toFixed(2)}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                    ${currentProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Free Express Delivery
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Color Swatch Picker */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Colorway:{' '}
                  <span className="text-slate-500 font-normal">
                    {selectedColor?.name || currentProduct.colors[0]?.name}
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  {currentProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor?.name === c.name
                          ? 'ring-2 ring-blue-600 ring-offset-2 scale-110'
                          : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size / Variant Picker (if available) */}
              {currentProduct.sizes && currentProduct.sizes.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Available Sizes / Variants:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material specifications snippet */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Key Specifications</span>
                </div>
                <div className="space-y-1">
                  {Object.entries(currentProduct.specifications).slice(0, 3).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-slate-500">{key}:</span>
                      <span className="font-semibold text-slate-800 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuy}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-98 text-center cursor-pointer"
              >
                Buy Now
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
