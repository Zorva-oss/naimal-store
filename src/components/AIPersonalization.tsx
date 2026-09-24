import React, { useState } from 'react';
import { Sparkles, Heart, ShoppingBag, Star, Zap, Check, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface AIPersonalizationProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  activePersona: string;
  onChangePersona: () => void;
}

export const AIPersonalization: React.FC<AIPersonalizationProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  activePersona,
  onChangePersona,
}) => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'audio' | 'synergy' | 'trending' | 'bag'>('recommended');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    onToggleWishlist(productId);
  };

  // Filter recommendations based on active neural tab
  const getDisplayProducts = () => {
    switch (activeTab) {
      case 'audio':
        return products.filter((p) => p.category === 'Electronics').slice(0, 4);
      case 'synergy':
        return [
          products.find((p) => p.id === 'prod-nova-crossbody') || products[1],
          products.find((p) => p.id === 'prod-aerocraft-watch') || products[5],
          products.find((p) => p.id === 'prod-komorebi-overshirt') || products[9],
          products.find((p) => p.id === 'prod-lumina-lamp') || products[8],
        ];
      case 'trending':
        return products.filter((p) => p.isTrending || p.rating >= 4.9).slice(0, 4);
      case 'bag':
        return products.filter((p) => p.category === 'Bags' || p.category === 'Accessories').slice(0, 4);
      case 'recommended':
      default:
        return [
          products.find((p) => p.id === 'prod-aurawave-headphones') || products[0],
          products.find((p) => p.id === 'prod-nova-crossbody') || products[1],
          products.find((p) => p.id === 'prod-chronos-smartwatch') || products[2],
          products.find((p) => p.id === 'prod-aether-skin-serum') || products[3],
        ];
    }
  };

  const displayed = getDisplayProducts();

  return (
    <section className="py-12 bg-gradient-to-b from-[#FAFBFD] via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Neural Banner Card Wrapper */}
        <div className="rounded-3xl bg-white border border-blue-100 shadow-xl shadow-blue-900/5 p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                <div className="w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Lumix Neural Stream</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Picked Just For You
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Live neural stream generated based on your aesthetic browsing pattern and contextual affinities.
              </p>
            </div>

            {/* Persona Indicator & Config Button */}
            <button
              onClick={onChangePersona}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs text-slate-700 transition-all cursor-pointer self-start lg:self-auto group"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-medium text-slate-500">Active AI Persona:</span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600">{activePersona}</span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 ml-1" />
            </button>
          </div>

          {/* Interactive Recommendation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none border-b border-slate-100">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'recommended'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Recommended For You
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'audio'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Because You Viewed Spatial Audio
            </button>

            <button
              onClick={() => setActiveTab('synergy')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'synergy'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              You May Also Like (Cart Synergy)
            </button>

            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'trending'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Trending in New York, NY
            </button>

            <button
              onClick={() => setActiveTab('bag')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'bag'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Based on "Metallic Handbag"
            </button>
          </div>

          {/* Neural Recommendation Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {displayed.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isJustAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Top Floating Badge & Wishlist */}
                  <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs text-[11px] font-bold text-blue-700 border border-blue-100">
                      <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                      {product.aiMatchTag || `${product.aiMatchScore}% Match`}
                    </span>

                    <button
                      onClick={(e) => handleWishlist(e, product.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all pointer-events-auto cursor-pointer ${
                        isWishlisted
                          ? 'bg-rose-50 text-rose-600 shadow-sm'
                          : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Product Visual Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50">
                    <ProductVisual product={product} className="w-full h-full" />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      {/* Quiet Category & Brand */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <span className="font-semibold text-slate-600">{product.category}</span>
                        <span>·</span>
                        <span>{product.brand}</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* AI Neural Rationale */}
                      <div className="mt-2 text-[11px] text-blue-700 bg-blue-50/80 rounded-lg p-2 border border-blue-100/60 leading-tight flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{product.aiRationale || 'Synthesized based on your lifestyle profile.'}</span>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
                          <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-bold text-slate-900 font-mono tabular-nums">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick Add to Cart Button */}
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        disabled={product.isSoldOut}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95 shadow-blue-500/25'
                        }`}
                        title="Quick Add to Cart"
                      >
                        {isJustAdded ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
