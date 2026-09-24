import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Heart, ShoppingBag, Bell, User, LayoutDashboard, ArrowRight, X, Flame } from 'lucide-react';
import { UserProfile, CartItem } from '../types';

interface HeaderProps {
  cartItemsCount: number;
  wishlistCount: number;
  user: UserProfile;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onSearchQuery: (query: string) => void;
  onSelectCategory: (category: string | null) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  wishlistCount,
  user,
  onOpenCart,
  onOpenProfile,
  onOpenAdmin,
  onSearchQuery,
  onSelectCategory,
  onScrollToSection,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const sampleQueries = [
    'Show me black bags under $50',
    'Spatial audio headphones for travel',
    'Minimalist watches with sapphire glass',
    'Sustainable outerwear and overshirts',
    'Gifts under $100 with 5 star rating',
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearchQuery(searchInput);
    setIsSearchOpen(false);
  };

  const handleSelectSuggestion = (query: string) => {
    setSearchInput(query);
    onSearchQuery(query);
    setIsSearchOpen(false);
  };

  const notifications = [
    { id: 1, title: 'Order Dispatched', desc: 'Order #ORD-LMX-892401 is out for delivery.', time: '10m ago' },
    { id: 2, title: 'VIP Price Cut', desc: 'AuraWave Headphones dropped by 25% today.', time: '1h ago' },
    { id: 3, title: 'AI Match Alert', desc: '3 new items aligned with your Urban Luxury persona.', time: '3h ago' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[11px] font-semibold py-1.5 px-4 text-center">
        <span>⚡ Spring Algorithmic Drop • Free Worldwide Express Delivery on orders $75+ with code <strong>LUMIX20</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left: Brand Identity Logo */}
          <div
            onClick={() => {
              onSelectCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-blue-500/25">
              L
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  LUMIX<span className="text-blue-600">.ai</span>
                </span>
                <span className="px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-wider border border-blue-200/60">
                  GEN 4
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block -mt-1">
                NEURAL COMMERCE
              </span>
            </div>
          </div>

          {/* Center: Intelligent AI Search Input */}
          <div ref={searchRef} className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Ask AI: 'Show me black bags under $50' or 'minimalist watches'..."
                  className="w-full pl-10 pr-24 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-2xl text-xs font-medium text-slate-900 transition-all outline-hidden shadow-xs focus:ring-2 focus:ring-blue-500/20"
                />
                
                {/* Submit / Clear */}
                <div className="absolute right-2 flex items-center gap-1">
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        onSearchQuery('');
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-200" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </form>

            {/* AI Search Dropdown Suggestions */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    Natural Language Search Prompts
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold">Gemini Grounded</span>
                </div>

                <div className="space-y-1">
                  {sampleQueries.map((query) => (
                    <div
                      key={query}
                      onClick={() => handleSelectSuggestion(query)}
                      className="p-2 rounded-xl hover:bg-blue-50/70 text-xs text-slate-700 hover:text-blue-700 font-medium flex items-center justify-between cursor-pointer transition-colors group"
                    >
                      <span>"{query}"</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Store Admin Dashboard Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Store Admin & Analytics"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all cursor-pointer relative border border-slate-200/60"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark all as read</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors text-xs space-y-0.5 cursor-pointer">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Wishlist */}
            <button
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all cursor-pointer relative border border-slate-200/60"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="px-3 sm:px-4 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/25 active:scale-95 transition-all cursor-pointer relative"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 font-mono text-[11px] font-extrabold flex items-center justify-center shadow-xs">
                {cartItemsCount}
              </span>
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-blue-600 transition-all cursor-pointer shadow-xs shrink-0 ml-1"
              title={`View ${user.name}'s Profile`}
            >
              <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </button>

          </div>

        </div>

        {/* Navigation Category Links Row */}
        <div className="flex items-center gap-6 overflow-x-auto py-2.5 border-t border-slate-100 scrollbar-none text-xs font-semibold text-slate-600">
          <button
            onClick={() => {
              onSelectCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onScrollToSection('catalog-section')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Explore Catalog
          </button>
          <button
            onClick={() => onScrollToSection('categories-section')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Categories
          </button>
          <button
            onClick={() => onScrollToSection('catalog-section')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            New Arrivals
          </button>
          <button
            onClick={() => onScrollToSection('deals-section')}
            className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Today's Deals</span>
          </button>
          <button
            onClick={() => onSelectCategory('Fashion')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Fashion
          </button>
          <button
            onClick={() => onSelectCategory('Bags')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Bags
          </button>
          <button
            onClick={() => onSelectCategory('Shoes')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Shoes
          </button>
          <button
            onClick={() => onSelectCategory('Electronics')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Electronics
          </button>
          <button
            onClick={() => onSelectCategory('Beauty')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Beauty
          </button>
          <button
            onClick={() => onSelectCategory('Accessories')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Accessories
          </button>
        </div>

      </div>

    </header>
  );
};
