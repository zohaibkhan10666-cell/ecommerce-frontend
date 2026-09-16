import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../src/components/ui/button.jsx";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Star, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  ShoppingBag,
  Zap
} from "lucide-react";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById("featured-products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Motion Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-all duration-1000"
      >
        <source src="/e-commerce-hero.mp4" type="video/mp4" />
        <source src="/e-commerce%20hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Modern Multi-Layer Gradient & Mesh Overlay for Maximum Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-purple-950/60 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-600/20 via-transparent to-transparent pointer-events-none" />

      {/* Video Controls (Sound & Pause/Play) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          title={isPlaying ? "Pause video" : "Play video"}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <span className="w-px h-3 bg-white/20" />
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? "Unmute video" : "Mute video"}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Compelling Headline & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 backdrop-blur-md text-pink-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>Next-Gen Shopping Experience 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              <span className="text-white font-medium">Up to 50% Off</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Discover Extraordinary <br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                Products Crafted
              </span>{" "}
              For You
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl font-normal leading-relaxed">
              Explore our handpicked curation of luxury electronics, trending fashion, and everyday essentials. Seamless payments, authenticated brands, and lightning-fast delivery right to your doorstep.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/products">
                <Button className="h-13 px-8 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border-0 cursor-pointer">
                  <ShoppingBag className="w-5 h-5" />
                  Explore Catalog
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              
              <Button
                onClick={scrollToProducts}
                variant="outline"
                className="h-13 px-7 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 backdrop-blur-md rounded-2xl font-semibold text-base transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-yellow-400" />
                Trending Deals
              </Button>
            </div>

            {/* Trust Metrics / Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">4.9 / 5 Rating</h4>
                  <p className="text-xs text-slate-300">10,000+ Reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Express Delivery</h4>
                  <p className="text-xs text-slate-300">Fast & Tracked</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Secure</h4>
                  <p className="text-xs text-slate-300">JazzCash Protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive Glass Showcase Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Glass Card 1: Featured Brand Showcase */}
            <div className="group relative bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl hover:border-pink-400/50 transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Live Collection</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/30 text-pink-200 border border-pink-400/30">
                  Special Offer
                </span>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-2 border border-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src="/brand.png"
                    alt="Brand Highlights"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white leading-tight truncate group-hover:text-pink-300 transition-colors">
                    Premium Smart Gadgets
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                    Flagship performance, acoustic perfection, and cutting-edge design.
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-black text-pink-400">From ₹2,499</span>
                    <span className="text-xs text-slate-400 line-through">₹4,999</span>
                  </div>
                </div>
              </div>

              <Link to="/products" className="mt-4 block">
                <div className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-center text-xs font-bold text-white border border-white/15 transition-all flex items-center justify-center gap-2">
                  Browse This Category <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>

            {/* Glass Card 2: Quick Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Link to="/products?category=Electronics" className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-pink-400/50 transition-all hover:bg-white/15 group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🎧</span>
                  <span className="text-[10px] uppercase font-bold text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-full">Top Tech</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">Electronics</h4>
                <p className="text-xs text-slate-300 mt-0.5">Headphones, watches & more</p>
              </Link>

              <Link to="/products?category=Clothing" className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-pink-400/50 transition-all hover:bg-white/15 group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">✨</span>
                  <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full">Trendy</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">Fashion & Style</h4>
                <p className="text-xs text-slate-300 mt-0.5">New arrivals daily</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



