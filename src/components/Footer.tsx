import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      
      {/* Newsletter Signup Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                VIP Neural Ingestion
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Unlock 20% Off Your First Order
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                Subscribe to receive algorithmic private drop notifications, exclusive sample sales, and bespoke styling digests.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Welcome to LUMIX VIP! Use code <strong>LUMIX20</strong> at checkout for 20% off.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email for private drop access..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <span>Join Club</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                L
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                LUMIX<span className="text-blue-400">.ai</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The world's leading generative neural commerce platform. Curated luxury essentials, algorithmic personalization, and sustainable fulfillment.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
              <span>·</span>
              <span>Cloud Engine 99.99%</span>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Fashion & Silhouettes</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Spatial Audio & Tech</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Leather & Metallic Bags</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Bio-Active Skincare</a></li>
              <li><a href="#deals-section" className="hover:text-orange-400 transition-colors">Today's Lightning Deals</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Client Concierge</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Live Order Tracking</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Worldwide Shipping</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">30-Day Effortless Returns</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Authenticity Guarantee</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">VIP Styling Desk</span></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Intelligence</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Neural Taste Engine</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">AR 3D Product Sandbox</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Carbon Offset Tracking</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy & Data Protections</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Developer API</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Verified Payment Badges */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} LUMIX.ai Commerce Inc. All rights reserved.
          </div>

          {/* Verified payment logos representation */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">VISA</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">APPLE PAY</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">KLARNA</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">BITCOIN / USDC</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
