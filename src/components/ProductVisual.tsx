import React, { useState } from 'react';
import { Sparkles, Headphones, ShoppingBag, Watch, Eye, Zap, Flame, Shirt } from 'lucide-react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  className?: string;
  showHoverZoom?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  className = 'h-64 w-full',
  showHoverZoom = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Category based theme colors for fallback or decorative backdrop
  const getCategoryGradient = () => {
    switch (product.category) {
      case 'Electronics':
        return 'from-blue-500/10 via-indigo-500/5 to-cyan-500/10 text-blue-600';
      case 'Bags':
        return 'from-amber-500/10 via-orange-500/5 to-yellow-500/10 text-amber-600';
      case 'Beauty':
        return 'from-rose-500/10 via-pink-500/5 to-fuchsia-500/10 text-rose-600';
      case 'Shoes':
        return 'from-cyan-500/10 via-blue-500/5 to-indigo-500/10 text-cyan-600';
      case 'Accessories':
        return 'from-yellow-500/10 via-amber-500/5 to-orange-500/10 text-yellow-600';
      case 'Fashion':
        return 'from-purple-500/10 via-violet-500/5 to-blue-500/10 text-purple-600';
      case 'Home & Living':
        return 'from-emerald-500/10 via-teal-500/5 to-cyan-500/10 text-emerald-600';
      default:
        return 'from-slate-100 to-slate-200 text-slate-700';
    }
  };

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'Electronics':
        return <Headphones className="w-12 h-12 stroke-[1.25]" />;
      case 'Bags':
        return <ShoppingBag className="w-12 h-12 stroke-[1.25]" />;
      case 'Beauty':
        return <Sparkles className="w-12 h-12 stroke-[1.25]" />;
      case 'Accessories':
        return <Watch className="w-12 h-12 stroke-[1.25]" />;
      case 'Fashion':
        return <Shirt className="w-12 h-12 stroke-[1.25]" />;
      case 'Shoes':
        return <Zap className="w-12 h-12 stroke-[1.25]" />;
      default:
        return <Flame className="w-12 h-12 stroke-[1.25]" />;
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#F8FAFC] flex items-center justify-center ${className}`}>
      {/* Background Soft Studio Aura */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient()} opacity-40 transition-opacity duration-500 group-hover:opacity-70`}
      />

      {/* Main Image */}
      {!imageError && (
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            showHoverZoom ? 'group-hover:scale-105' : ''
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Shimmer loading placeholder while loading */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200/50 to-slate-100 animate-pulse" />
      )}

      {/* Fallback Graphic container when image fails or loads */}
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <div className="w-20 h-20 rounded-2xl bg-white/90 shadow-sm border border-slate-200/80 flex items-center justify-center mb-3">
            {getCategoryIcon()}
          </div>
          <span className="text-xs font-semibold text-slate-700 line-clamp-1 px-4">{product.name}</span>
          <span className="text-[11px] text-slate-400 mt-1">{product.brand}</span>
        </div>
      )}

      {/* Soft gradient bottom scrim for legible badge contrast */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />
    </div>
  );
};
