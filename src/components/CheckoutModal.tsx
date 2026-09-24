import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Truck, User, MapPin, ArrowRight, ArrowLeft, Sparkles, PackageCheck, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  couponCode: string;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  couponCode,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Customer & Address, 2: Shipping, 3: Payment, 4: Confirmed Receipt

  // Form State
  const [customer, setCustomer] = useState({
    fullName: 'Sophia Laurent',
    email: 'sophia.laurent@lumix-vip.com',
    phone: '+1 (555) 234-8901',
    street: '742 Park Avenue, Apt 14B',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState<'express_ai' | 'standard' | 'sameday'>('express_ai');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'klarna' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'sameday' ? 25.00 : subtotal >= 75 || couponCode === 'FREESHIP' ? 0 : 12.00;
  const tax = (subtotal - appliedDiscount) * 0.08875;
  const total = Math.max(0, subtotal - appliedDiscount + shippingFee + tax);

  const handlePlaceOrder = () => {
    // Generate order object
    const newOrderId = `ORD-LMX-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: [...items],
      subtotal,
      discount: appliedDiscount,
      shipping: shippingFee,
      total,
      status: 'Processing',
      shippingAddress: { ...customer },
      trackingNumber: `LMX-US-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDelivery: shippingMethod === 'sameday' ? 'Today by 7:00 PM' : 'Tomorrow by 2:00 PM',
    };

    setConfirmedOrder(newOrder);
    onOrderComplete(newOrder);
    setStep(4);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#06B6D4', '#F97316', '#7C3AED'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Checkout Card Container */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              L
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {step === 4 ? 'Order Confirmed' : 'LUMIX Express Checkout'}
              </h3>
              <p className="text-xs text-slate-400">
                {step === 4 ? 'Your order is booked & preparing for dispatch' : 'Step ' + step + ' of 3 • Encrypted & Protected'}
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

        {/* Progress Step Indicator (Only during steps 1-3) */}
        {step < 4 && (
          <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/70 text-xs font-semibold text-center">
            <div className={`py-2.5 flex items-center justify-center gap-2 ${step >= 1 ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center">1</span>
              <span>Delivery Details</span>
            </div>
            <div className={`py-2.5 flex items-center justify-center gap-2 ${step >= 2 ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
              <span>Shipping Method</span>
            </div>
            <div className={`py-2.5 flex items-center justify-center gap-2 ${step >= 3 ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {/* STEP 1: Customer Contact & Delivery Address */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Shipping Address</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email (for AI Order Tracking)</label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={customer.street}
                    onChange={(e) => setCustomer({ ...customer, street: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">State</label>
                    <input
                      type="text"
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={customer.postalCode}
                      onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* VIP Member Perks note */}
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>LUMIX ELITE Tier 3 VIP auto-qualifies for Priority Fulfillment & White-Glove Packaging.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping Method */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Select Delivery Option</span>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setShippingMethod('express_ai')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    shippingMethod === 'express_ai'
                      ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      {shippingMethod === 'express_ai' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          Express AI Route Dispatch
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Delivered tomorrow by 2:00 PM • Carbon-Neutral Flight</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                    {subtotal >= 75 ? <span className="text-emerald-600">FREE</span> : '$12.00'}
                  </span>
                </div>

                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    shippingMethod === 'standard'
                      ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      {shippingMethod === 'standard' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        Standard Ground Delivery
                      </span>
                      <p className="text-xs text-slate-500">2–3 business days • 100% Recycled Packaging</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                    {subtotal >= 75 ? <span className="text-emerald-600">FREE</span> : '$8.00'}
                  </span>
                </div>

                <div
                  onClick={() => setShippingMethod('sameday')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    shippingMethod === 'sameday'
                      ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      {shippingMethod === 'sameday' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          VIP Same-Day Dedicated Courier
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                          NYC Metro
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Delivered today by 7:00 PM in armored luxury vault box</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">$25.00</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method & Review */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Payment Method</span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('klarna')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'klarna'
                      ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Klarna 4x
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Cash on Delivery
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Security CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <span className="font-bold">Cash on Delivery (COD) Selected</span>
                  <p>You can pay our courier via contactless terminal or cash upon delivery to {customer.street}.</p>
                </div>
              )}

              {/* Mini Order Summary */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Applied</span>
                    <span className="font-mono font-bold">-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee</span>
                  <span className="font-mono font-bold text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Sales Tax</span>
                  <span className="font-mono font-bold text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-extrabold text-slate-900 text-sm">
                  <span>Total Amount Due</span>
                  <span className="font-mono text-base text-blue-700">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmed Order Receipt & Tracking */}
          {step === 4 && confirmedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <PackageCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Thank You, {confirmedOrder.shippingAddress.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Your order <span className="font-mono font-bold text-blue-600">{confirmedOrder.id}</span> has been confirmed and routed to our nearest smart hub.
                </p>
              </div>

              {/* Status Timeline Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Tracking Code:</span>
                  <span className="font-mono font-bold text-slate-900">{confirmedOrder.trackingNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-600">{confirmedOrder.estimatedDelivery}</span>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span className="text-blue-600">✓ Order Placed</span>
                    <span className="text-blue-600 animate-pulse">● AI Routing & Picking</span>
                    <span className="text-slate-400">Dispatch</span>
                    <span className="text-slate-400">Delivered</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Purchased items list */}
              <div className="text-left space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Purchased Items ({confirmedOrder.items.length})
                </h4>
                {confirmedOrder.items.map((it) => (
                  <div key={it.product.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <img src={it.product.image} alt={it.product.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-slate-800">{it.product.name}</span>
                        <span className="text-slate-400 text-[11px] block">{it.selectedColor.name} • Qty: {it.quantity}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">${(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Navigation Controls (Steps 1-3) */}
        {step < 4 && (
          <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Place Order • ${total.toFixed(2)}</span>
              </button>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
