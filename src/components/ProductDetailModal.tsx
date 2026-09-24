import React, { useState } from 'react';
import { X, Star, Heart, Share2, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Sparkles, AlertCircle, Video, Image as ImageIcon } from 'lucide-react';
import { Product, Review } from '../types';
import { MOCK_REVIEWS } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: { name: string; hex: string }, selectedSize?: string, quantity?: number) => void;
  onBuyNow: (product: Product, selectedColor: { name: string; hex: string }, selectedSize?: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : undefined);
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<{ transformOrigin: string; transform: string }>({
    transformOrigin: 'center center',
    transform: 'scale(1)',
  });

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)',
    });
  };

  const handleAdd = () => {
    if (product.isSoldOut) return;
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuy = () => {
    if (product.isSoldOut) return;
    onBuyNow(product, selectedColor, selectedSize, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Gallery & Zoom */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage with Zoom or Video */}
            <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center select-none">
              
              {showVideo && product.videoUrl ? (
                <video
                  src={product.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full overflow-hidden cursor-crosshair relative"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={images[activeMediaIndex] || product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-150 ease-out"
                    style={zoomStyle}
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-md pointer-events-none">
                    Hover to zoom
                  </div>
                </div>
              )}

              {/* Badges on main stage */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
                {product.dealDiscount && (
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black shadow-sm">
                    {product.dealDiscount}% OFF
                  </span>
                )}
                {product.aiMatchTag && (
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {product.aiMatchTag}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveMediaIndex(idx);
                    setShowVideo(false);
                  }}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeMediaIndex === idx && !showVideo
                      ? 'border-blue-600 ring-2 ring-blue-600/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {/* Video tab thumbnail if product has video */}
              {product.videoUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`w-16 h-16 rounded-xl border-2 shrink-0 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    showVideo
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] font-bold">Video</span>
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-xs text-slate-600">
                <Truck className="w-4 h-4 text-blue-600 mb-1" />
                <span className="font-bold text-slate-900">Free Express</span>
                <span className="text-[10px] text-slate-400">Orders over $75</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-xs text-slate-600">
                <RotateCcw className="w-4 h-4 text-blue-600 mb-1" />
                <span className="font-bold text-slate-900">30-Day Returns</span>
                <span className="text-[10px] text-slate-400">Pre-paid label</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-blue-600 mb-1" />
                <span className="font-bold text-slate-900">2-Year Warranty</span>
                <span className="text-[10px] text-slate-400">LUMIX Authenticity</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-bold uppercase tracking-wider text-blue-600">{product.category}</span>
                <span>Brand: <strong className="text-slate-800">{product.brand}</strong></span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h2>

              {/* Star Rating & Wishlist & Share */}
              <div className="flex items-center justify-between mt-2.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <div className="flex text-amber-400">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">{product.rating.toFixed(1)}</span>
                  <span>·</span>
                  <span className="text-slate-500">{product.reviewsCount} customer reviews</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-500 hover:text-rose-500'
                    }`}
                    title={isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer relative"
                    title="Share product link"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedShare && (
                      <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap">
                        Link copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.dealDiscount && (
                  <span className="text-xs font-bold text-orange-600">
                    You save ${(product.originalPrice! - product.price).toFixed(2)} ({product.dealDiscount}% off)
                  </span>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div>
                {product.isSoldOut ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                    Sold Out
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Only {product.stock} left
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <Check className="w-3 h-3" />
                    In Stock ({product.stock} units)
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Color:{' '}
                <span className="text-slate-500 font-normal">
                  {selectedColor?.name}
                </span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
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

            {/* Size / Variant Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Size / Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            {!product.isSoldOut && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Quantity:
                </label>
                <div className="inline-flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold font-mono text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {product.isSoldOut ? (
              <div className="p-4 rounded-2xl bg-slate-100 text-center">
                <span className="text-sm font-bold text-slate-600">
                  This item is currently sold out.
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  You've been added to the priority notify list for the next batch.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  className={`py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-md active:scale-98 text-center cursor-pointer"
                >
                  Instant Checkout
                </button>
              </div>
            )}

            {/* Description & Technical Specifications Accordion */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Product Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Technical Specifications
                </h4>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs py-1 border-b border-slate-200/50 last:border-0">
                      <span className="text-slate-500">{key}</span>
                      <span className="font-semibold text-slate-900 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Customer Reviews Snippet */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Verified Customer Reviews ({MOCK_REVIEWS.length})
                  </h4>
                  <span className="text-xs text-blue-600 font-semibold cursor-pointer">
                    Read all
                  </span>
                </div>

                <div className="space-y-2.5">
                  {MOCK_REVIEWS.slice(0, 2).map((rev) => (
                    <div key={rev.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{rev.author}</span>
                        <div className="flex text-amber-400 text-xs">
                          {'★★★★★'.slice(0, rev.rating)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">"{rev.title}"</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
