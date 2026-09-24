import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles, Check, Bookmark } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 75;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon === 'FREESHIP';
  const shippingCost = subtotal === 0 ? 0 : isFreeShipping ? 0 : 12.00;
  const discountAmount = appliedCoupon ? (subtotal * couponDiscount) / 100 : 0;
  const estimatedTax = (subtotal - discountAmount) * 0.08875; // NYC sales tax rate
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + (subtotal > 0 ? estimatedTax : 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();

    if (code === 'LUMIX20') {
      setAppliedCoupon('LUMIX20');
      setCouponDiscount(20);
      setCouponCode('');
    } else if (code === 'VIP10') {
      setAppliedCoupon('VIP10');
      setCouponDiscount(10);
      setCouponCode('');
    } else if (code === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      setCouponDiscount(0);
      setCouponCode('');
    } else {
      setCouponError('Invalid promo code. Try "LUMIX20" for 20% off.');
    }
  };

  const handleSaveForLater = (productId: string) => {
    setSavedForLater((prev) => [...prev, productId]);
    onRemoveItem(productId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Drawer Container */}
      <div
        className="w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Your Cart</h3>
              <p className="text-xs text-slate-400">
                {items.length} {items.length === 1 ? 'smart item' : 'smart items'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-5 py-3">
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>
              {isFreeShipping
                ? '🎉 You unlocked Free Express Shipping!'
                : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping`}
            </span>
            <span className="font-mono">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
          </div>
          <div className="w-full h-1.5 bg-blue-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Explore our AI personalized recommendations or browse trending drops.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex gap-3.5"
              >
                {/* Product thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Selected Attributes */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </div>
                      {item.selectedSize && (
                        <>
                          <span>·</span>
                          <span className="font-semibold text-slate-700">{item.selectedSize}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper and Item Total */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Save for later button */}
                  <div className="mt-1">
                    <button
                      onClick={() => handleSaveForLater(item.product.id)}
                      className="text-[11px] text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>Save for later</span>
                    </button>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-white space-y-3.5 shadow-lg">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. LUMIX20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Applied Promo Pill or Error */}
            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span className="flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Code '{appliedCoupon}' Applied ({couponDiscount}% off)
                </span>
                <button
                  onClick={() => {
                    setAppliedCoupon(null);
                    setCouponDiscount(0);
                  }}
                  className="text-emerald-800 hover:underline font-medium cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
            {couponError && (
              <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promo Discount ({couponDiscount}%)</span>
                  <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono font-bold text-slate-900">
                  {shippingCost === 0 ? <span className="text-emerald-600">FREE</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (NYC)</span>
                <span className="font-mono font-bold text-slate-900">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-sm">
                <span className="font-extrabold text-slate-900">Total</span>
                <span className="font-mono font-extrabold text-lg text-slate-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, appliedCoupon || '')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>256-Bit Encrypted SSL Checkout • 30-Day Guarantees</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
