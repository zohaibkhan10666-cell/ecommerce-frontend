import React, { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import Features from "../src/components/ui/features.jsx";
import Footer from "../src/components/footer.jsx";
import { Button } from "../src/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../src/redux/cartSlice";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { 
  Star, 
  ShoppingCart, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Tag, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Zap
} from "lucide-react";

// Curated demo products to ensure pristine UX even before backend seeding or if backend is offline
const DEMO_HOME_PRODUCTS = [
  {
    _id: "demo-1",
    name: "Wireless ANC Pro Over-Ear Headphones",
    description: "Lossless spatial audio with 40-hour battery life, active noise cancellation, and ultra-comfortable memory foam cushions.",
    price: 4999,
    originalPrice: 7999,
    category: "Electronics",
    rating: 4.8,
    reviewCount: 142,
    stock: 15,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"]
  },
  {
    _id: "demo-2",
    name: "Apex Ultra Smart Fitness Watch",
    description: "AMOLED curved display with real-time biometric tracking, built-in GPS, and 14-day battery reserve.",
    price: 3499,
    originalPrice: 5999,
    category: "Electronics",
    rating: 4.9,
    reviewCount: 98,
    stock: 22,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"]
  },
  {
    _id: "demo-3",
    name: "Urban Minimalist Waterproof Backpack",
    description: "Ergonomic weather-resistant commuter backpack with dedicated 16-inch laptop compartment and USB pass-through.",
    price: 1999,
    originalPrice: 3299,
    category: "Clothing",
    rating: 4.7,
    reviewCount: 76,
    stock: 18,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"]
  },
  {
    _id: "demo-4",
    name: "AcousticStudio Hi-Fi Smart Speaker",
    description: "360-degree room-filling acoustic resonance with voice assistant integration and multi-room sync.",
    price: 2899,
    originalPrice: 4499,
    category: "Electronics",
    rating: 4.6,
    reviewCount: 64,
    stock: 9,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80"]
  },
  {
    _id: "demo-5",
    name: "Signature Classic Linen Bomber Jacket",
    description: "Tailored breathable pure linen jacket engineered for versatile casual comfort and timeless aesthetic.",
    price: 2499,
    originalPrice: 3999,
    category: "Clothing",
    rating: 4.8,
    reviewCount: 51,
    stock: 14,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"]
  },
  {
    _id: "demo-6",
    name: "Modern Scandinavian Ceramic Plant Set",
    description: "Matte-glazed geometric indoor planters crafted from premium clay, featuring integrated drainage trays.",
    price: 1299,
    originalPrice: 1899,
    category: "Home & Garden",
    rating: 4.9,
    reviewCount: 88,
    stock: 30,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80"]
  },
  {
    _id: "demo-7",
    name: "Performance Ergonomic Running Shoes",
    description: "Engineered responsive foam midsole with breathable mesh upper for supreme endurance on road and track.",
    price: 3199,
    originalPrice: 4999,
    category: "Sports",
    rating: 4.7,
    reviewCount: 110,
    stock: 12,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"]
  },
  {
    _id: "demo-8",
    name: "Precision Aluminum Mechanical Keyboard",
    description: "Hot-swappable tactile switches with customizable RGB illumination, PBT keycaps, and aircraft-grade aluminum chassis.",
    price: 3999,
    originalPrice: 5999,
    category: "Electronics",
    rating: 4.9,
    reviewCount: 124,
    stock: 8,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80"]
  }
];

const CATEGORIES = ["All", "Electronics", "Clothing", "Home & Garden", "Sports"];

function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/products?limit=8");
      if (response.data && response.data.success && response.data.products && response.data.products.length > 0) {
        setProducts(response.data.products);
      } else {
        setProducts(DEMO_HOME_PRODUCTS);
      }
    } catch (error) {
      console.log("Using curated demo products for home session:", error.message);
      setProducts(DEMO_HOME_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      description: `₹${product.price.toLocaleString()} • Ready for checkout`
    });
  };

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Toaster position="top-center" richColors />

      {/* Hero with Video Background */}
      <Hero />

      {/* Featured Products Session */}
      <section id="featured-products" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-pink-600" />
              Popular Right Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Trending Products & Deals
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-2 max-w-2xl">
              Discover top-rated selections curated for supreme quality, unbeatable prices, and rave customer reviews.
            </p>
          </div>

          <Link to="/products">
            <Button 
              variant="outline"
              className="group border-gray-300 hover:border-pink-600 text-gray-800 hover:text-pink-600 rounded-2xl px-6 py-2.5 font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {Array(8).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-4 shadow-md animate-pulse border border-gray-100">
                <div className="aspect-square bg-slate-200 rounded-2xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
                <div className="h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Button 
              onClick={() => setSelectedCategory("All")}
              className="mt-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl"
            >
              Show All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {filteredProducts.map((product) => {
              const discount = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative"
                >
                  {/* Product Image Area */}
                  <Link to={`/products/${product._id}`} className="block relative aspect-square bg-slate-100 overflow-hidden">
                    <img
                      src={product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {discount > 0 && (
                        <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-xs shadow-md">
                          {discount}% OFF
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-gray-900 font-bold text-xs shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white font-semibold text-xs">
                      {product.category}
                    </span>
                  </Link>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Stock */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{product.rating || 4.8}</span>
                          <span className="text-gray-400 font-normal">({product.reviewCount || 45})</span>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          In Stock
                        </span>
                      </div>

                      {/* Product Title */}
                      <Link to={`/products/${product._id}`}>
                        <h3 className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-pink-600 transition-colors" title={product.name}>
                          {product.name}
                        </h3>
                      </Link>

                      {/* Description */}
                      <p className="text-gray-500 text-xs line-clamp-2 mt-1 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <Button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full h-11 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* High-Impact Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 text-white p-8 sm:p-12 shadow-2xl border border-white/10">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-400/30">
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                Special Flash Promotion
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Get an Extra 20% Off Your Entire Cart
              </h3>
              <p className="text-slate-200 text-base sm:text-lg max-w-xl">
                Upgrade your lifestyle with our top-tier electronic gadgets, designer apparel, and home essentials. Limited time voucher applies at checkout.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 font-mono font-bold tracking-widest text-pink-300 text-sm">
                  CODE: EXTRA20
                </div>
                <span className="text-xs text-slate-300">Valid on all orders above ₹1,999</span>
              </div>
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <Link to="/products">
                <Button className="h-14 px-8 bg-white hover:bg-pink-50 text-gray-900 font-extrabold text-base rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer">
                  Shop Flash Deals <ArrowRight className="w-5 h-5 ml-2 text-pink-600" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Guarantees */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;


