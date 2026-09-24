import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, MessageSquare, ShoppingBag, Sparkles, ArrowRight, Share2, Flame } from 'lucide-react';
import { Advertisement, Product } from '../types';

interface ShortVideoFeedProps {
  ads: Advertisement[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ShortVideoFeed: React.FC<ShortVideoFeedProps> = ({
  ads,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const videoAds = ads.filter((a) => a.type === 'video_reel');
  const bannerAd = ads.find((a) => a.type === 'banner');

  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({
    'ad-reel-1': 4280,
    'ad-reel-2': 8910,
    'ad-reel-3': 6140,
  });
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isAlready = prev[id];
      setLikesMap((l) => ({
        ...l,
        [id]: isAlready ? l[id] - 1 : (l[id] || 0) + 1,
      }));
      return { ...prev, [id]: !isAlready };
    });
  };

  const currentReel = videoAds[activeAdIndex] || videoAds[0];
  const linkedProduct = products.find((p) => p.id === currentReel?.targetProductId);

  return (
    <section className="py-14 bg-slate-900 text-white overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Social Shopping & Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LUMIX Live Video Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Experience dynamic product showcases, tactile acoustic tests, and runway styling in immersive vertical video.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold backdrop-blur-md border border-white/15">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              TikTok & Reels Format
            </span>
          </div>
        </div>

        {/* Video Reel Showcase & Banners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Vertical Video Reel Card (TikTok/Reel style phone frame) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[580px] sm:h-[620px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/60 bg-black select-none">
              
              {/* Actual Video Player */}
              <video
                key={currentReel.mediaUrl}
                src={currentReel.mediaUrl}
                autoPlay={isPlaying}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Top Reel Overlay Header */}
              <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  {currentReel.badge}
                </span>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Right Vertical Action Rail (Like, Comment, Share) */}
              <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-4">
                {/* Like Button */}
                <button
                  onClick={() => handleToggleLike(currentReel.id)}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${
                    likedMap[currentReel.id]
                      ? 'bg-rose-600 text-white scale-110'
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}>
                    <Heart className={`w-5 h-5 ${likedMap[currentReel.id] ? 'fill-white' : ''}`} />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow-md">
                    {likesMap[currentReel.id] || currentReel.likes}
                  </span>
                </button>

                {/* Comment Button */}
                <button className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-all shadow-lg">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow-md">
                    {currentReel.comments}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                  }}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  title="Copy Reel Link"
                >
                  <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-all shadow-lg">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow-md">
                    Share
                  </span>
                </button>
              </div>

              {/* Bottom Scrim & Product Tag overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent z-20 space-y-3">
                
                {/* Audio Soundtrack title */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="truncate">{currentReel.soundTrack}</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-base font-extrabold text-white drop-shadow-sm">
                    {currentReel.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                    {currentReel.subtitle}
                  </p>
                </div>

                {/* Floating In-Video Product Card & Shop Now CTA */}
                {linkedProduct && (
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-xl">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={linkedProduct.image}
                        alt={linkedProduct.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-xl object-cover shrink-0 border border-white/30"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">
                          {linkedProduct.name}
                        </div>
                        <div className="text-xs font-mono font-bold text-cyan-300">
                          ${linkedProduct.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProduct(linkedProduct)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-slate-950 font-bold text-xs whitespace-nowrap shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      Shop Now
                    </button>
                  </div>
                )}

              </div>

            </div>
          </div>

          {/* Right Column: Video Playlist & Horizontal Campaigns */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Playlist switcher cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Trending Video Drops ({videoAds.length})
              </h3>

              <div className="space-y-2.5">
                {videoAds.map((ad, idx) => (
                  <div
                    key={ad.id}
                    onClick={() => setActiveAdIndex(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      activeAdIndex === idx
                        ? 'bg-white/15 border-cyan-400/80 shadow-lg'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 relative">
                        <video src={ad.mediaUrl} className="w-full h-full object-cover" muted />
                        {activeAdIndex === idx && (
                          <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                            <Play className="w-4 h-4 text-cyan-300 fill-cyan-300" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{ad.title}</h4>
                          <span className="text-[10px] font-extrabold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                            {ad.discount}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{ad.subtitle}</p>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 ${activeAdIndex === idx ? 'text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Large Seasonal Campaign Banner Card */}
            {bannerAd && (
              <div className="rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 border border-white/20 shadow-2xl">
                <div className="relative z-10 space-y-3 max-w-md">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                    {bannerAd.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {bannerAd.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {bannerAd.subtitle}
                  </p>
                  <button
                    onClick={() => {
                      const el = document.getElementById('catalog-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer mt-2"
                  >
                    <span>{bannerAd.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
