import React, { useState } from 'react';
import { X, User, Package, Heart, Sliders, MapPin, CreditCard, Sparkles, Bell, ExternalLink, ArrowRight } from 'lucide-react';
import { UserProfile, Order, Product } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  orders: Order[];
  wishlistProducts: Product[];
  recentlyViewed: Product[];
  onSelectProduct: (product: Product) => void;
  onUpdatePersona: (newPersona: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  wishlistProducts,
  recentlyViewed,
  onSelectProduct,
  onUpdatePersona,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'ai_persona' | 'addresses'>('profile');
  const [editingPersona, setEditingPersona] = useState(user.aestheticPersona);

  if (!isOpen) return null;

  const personas = [
    'Minimalist Tech & Urban Luxury',
    'Streetwear Kinetic & Futuristic',
    'Quiet Luxury & Italian Tailoring',
    'Clean Botanical & Organic Wellness',
    'Cyberpunk Neo-Tokyo Audio',
  ];

  const handleSavePersona = () => {
    onUpdatePersona(editingPersona);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">{user.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[11px] font-extrabold shadow-xs">
                  {user.tier}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Member ID: <span className="font-mono text-slate-600 font-semibold">{user.membershipId}</span> •{' '}
                <span className="text-blue-600 font-bold">{user.rewardPoints} Lumix Points</span>
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Profile Overview
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wishlist' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Saved Wishlist ({wishlistProducts.length})
          </button>

          <button
            onClick={() => setActiveTab('ai_persona')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai_persona' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            AI Taste Engine
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'addresses' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Addresses
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Profile Overview */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* VIP Membership status card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200">
                    Tier 3 Lumix Elite Concierge
                  </span>
                  <h4 className="text-xl font-extrabold">{user.name}</h4>
                  <p className="text-xs text-blue-100 max-w-md">
                    You have unlocked unlimited free worldwide priority delivery, private styling consultations, and early access to all weekly drops.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-mono font-semibold">
                    <span>Reward Balance: {user.rewardPoints} Pts</span>
                    <span>Status: Lifetime Active</span>
                  </div>
                </div>
              </div>

              {/* Personal Information form display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block mb-1">Primary Email</span>
                  <span className="font-semibold text-slate-800 text-sm">{user.email}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block mb-1">Active AI Persona</span>
                  <span className="font-semibold text-blue-600 text-sm">{user.aestheticPersona}</span>
                </div>
              </div>

              {/* Recently Viewed Strip */}
              {recentlyViewed.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Recently Viewed By You
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {recentlyViewed.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p);
                        }}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer bg-white"
                      >
                        <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-full aspect-square object-cover rounded-lg mb-2" />
                        <span className="text-xs font-bold text-slate-900 block truncate">{p.name}</span>
                        <span className="text-xs font-mono text-slate-500">${p.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Order History & Live Shipments
              </h4>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No orders placed yet.
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between text-xs pb-2 border-b border-slate-100 gap-2">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                        <span className="text-slate-400 ml-2">Ordered on {ord.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                        }`}>
                          ● {ord.status}
                        </span>
                        <span className="font-mono font-extrabold text-slate-900 text-sm">
                          ${ord.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((it) => (
                        <div key={it.product.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img src={it.product.image} alt={it.product.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <span className="font-bold text-slate-900">{it.product.name}</span>
                              <span className="text-[11px] text-slate-400 block">{it.selectedColor.name} • Qty {it.quantity}</span>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-slate-900">${(it.product.price * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Tracking: <strong className="font-mono text-slate-800">{ord.trackingNumber}</strong></span>
                      <span className="text-blue-600 font-semibold">{ord.estimatedDelivery}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Saved Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Your Saved Wishlist ({wishlistProducts.length})
              </h4>

              {wishlistProducts.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Your wishlist is empty. Click the heart icon on any product to save it here.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer bg-white group flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-50 mb-2">
                          <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">{p.category}</span>
                        <h5 className="font-bold text-slate-900 text-sm line-clamp-1">{p.name}</h5>
                      </div>
                      <div className="pt-2 flex items-baseline justify-between">
                        <span className="font-mono font-bold text-slate-900">${p.price.toFixed(2)}</span>
                        <span className="text-xs font-semibold text-blue-600 group-hover:underline">View Product</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI Taste Engine */}
          {activeTab === 'ai_persona' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Custom Aesthetic Persona & Recommendation Tuning
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  LUMIX AI dynamically balances neural weights across silhouette types, hardware metals, and color spectrums.
                </p>
              </div>

              {/* Persona selector radio options */}
              <div className="space-y-2">
                {personas.map((p) => (
                  <div
                    key={p}
                    onClick={() => setEditingPersona(p)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      editingPersona === p
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{p}</span>
                    {editingPersona === p && <span className="text-blue-600 font-black">✓ Active</span>}
                  </div>
                ))}
              </div>

              {/* Aesthetic category weights progress indicators */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Affinity Neural Breakdown
                </h5>
                {user.browsingInterests.map((interest) => (
                  <div key={interest.category} className="space-y-1 text-xs">
                    <div className="flex justify-between font-medium text-slate-700">
                      <span>{interest.category}</span>
                      <span className="font-mono font-bold">{interest.weight}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${interest.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSavePersona}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Apply AI Preference Tuning
              </button>
            </div>
          )}

          {/* TAB 5: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Saved Shipping Locations
              </h4>
              <div className="space-y-3">
                {user.addresses.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{a.name}</span>
                        {a.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 mt-1">{a.street}, {a.city}</p>
                    </div>
                    <button className="text-blue-600 hover:underline font-semibold cursor-pointer">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
