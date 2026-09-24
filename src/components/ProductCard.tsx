import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Video, Bell, Check, Zap } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor?: { name: string; hex: string }) => void;
  onBuyNow: (product: Product, selectedColor?: { name: string; hex: string }) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onNotifyRestock?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onNotifyRestock,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isAdded, setIsAdded] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isSoldOut) return;
    onAddToCart(product, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isSoldOut) return;
    onBuyNow(product, selectedColor);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  const handleNotify = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotified(true);
    if (onNotifyRestock) onNotifyRestock(product);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
        product.isSoldOut
          ? 'border-slate-200/60 opacity-90'
          : 'border-slate-200/80 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/8 hover:-translate-y-1'
      }`}
    >
      {/* Top Floating Badges & Wishlist */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-start justify-between pointer-events-none">
        {/* Promotional / Status Badges */}
        <div className="flex flex-col gap-1 items-start">
          {product.dealDiscount && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold shadow-xs">
              SALE {product.dealDiscount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold shadow-xs flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              NEW DROP
            </span>
          )}
          {product.tags.includes('sustainable') && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
              Sustainable
            </span>
          )}
          {product.stock > 0 && product.stock <= 5 && !product.isSoldOut && (
            <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 border border-white/60'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image / Media Stage */}
      <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden">
        {showVideoPreview && product.videoUrl ? (
          <video
            src={product.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <ProductVisual product={product} className="w-full h-full" />
        )}

        {/* Sold Out Dark Overlay */}
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-black tracking-widest text-white uppercase bg-black/80 px-3.5 py-1.5 rounded-lg border border-white/20 shadow-md">
              SOLD OUT
            </span>
            <span className="text-[11px] text-slate-200 mt-1 font-medium">
              TEMPORARILY OUT OF STOCK
            </span>
          </div>
        )}

        {/* Quick View & Video Trigger Controls (On Hover) */}
        {!product.isSoldOut && (
          <div className="absolute bottom-2.5 inset-x-2.5 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 text-[11px] font-semibold backdrop-blur-md shadow-sm border border-slate-200/80 hover:bg-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              Quick View
            </button>

            {product.videoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideoPreview(!showVideoPreview);
                }}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold backdrop-blur-md shadow-sm border flex items-center gap-1 transition-all cursor-pointer ${
                  showVideoPreview
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white/95 text-slate-800 border-slate-200/80 hover:bg-white'
                }`}
                title="Toggle Video Demo"
              >
                <Video className="w-3.5 h-3.5 text-blue-600" />
                {showVideoPreview ? 'Close Reel' : 'Video'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Card Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Color Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-600">{product.category}</span>
            {product.colors.length > 1 && (
              <span className="text-[11px] text-slate-400">
                {product.colors.length} {product.category === 'Accessories' ? 'metals' : 'colors'}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2.5" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor.name === c.name
                      ? 'ring-2 ring-blue-600 ring-offset-1 scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-slate-500 ml-1 truncate max-w-[120px]">
                {selectedColor.name}
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-slate-900">{product.rating.toFixed(1)}</span>
            <span>·</span>
            <span className="text-slate-400">{product.reviewsCount} reviews</span>
          </div>
        </div>

        {/* Pricing & Call To Action Buttons */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          {/* Price Row */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.dealDiscount && (
              <span className="text-[11px] font-bold text-orange-600">
                Save ${(product.originalPrice! - product.price).toFixed(0)}
              </span>
            )}
          </div>

          {/* Actions: Add to Cart & Buy Now */}
          {product.isSoldOut ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                disabled
                className="w-full py-2 px-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed text-center"
              >
                Sold Out
              </button>
              <button
                onClick={handleNotify}
                className={`w-full py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isNotified
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-white hover:bg-slate-50 border border-blue-200 text-blue-600 hover:border-blue-300'
                }`}
              >
                {isNotified ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5 text-blue-600" />
                    <span>Notify Me</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAdd}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-500/20 active:scale-95'
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
                onClick={handleBuy}
                className="py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-all active:scale-95 text-center cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
