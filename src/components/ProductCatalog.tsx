import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, ArrowDownAZ, ArrowUpZA, Check, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor?: { name: string; hex: string }) => void;
  onBuyNow: (product: Product, selectedColor?: { name: string; hex: string }) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onNotifyRestock: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlistIds,
  selectedCategory,
  onSelectCategory,
  onNotifyRestock,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'available' | 'new' | 'bestsellers' | 'sale'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const categories = ['All', 'Fashion', 'Bags', 'Shoes', 'Electronics', 'Beauty', 'Accessories', 'Home & Living'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'All' && selectedCategory !== 'New Drops') {
        if (p.category !== selectedCategory) return false;
      }

      // Tab filter
      if (filterTab === 'available' && p.isSoldOut) return false;
      if (filterTab === 'new' && !p.isNew) return false;
      if (filterTab === 'bestsellers' && p.rating < 4.8) return false;
      if (filterTab === 'sale' && !p.dealDiscount && !p.isDeal) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured order
    });
  }, [products, selectedCategory, filterTab, sortBy, maxPrice]);

  return (
    <section id="catalog-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalog Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trending Products & New Drops
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Explore multi-state collections verified by community ratings and algorithmic demand signals.
            </p>
          </div>

          {/* Quick State Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto self-start md:self-auto scrollbar-none">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilterTab('available')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'available'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Available Now
            </button>
            <button
              onClick={() => setFilterTab('new')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'new'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              New Drops
            </button>
            <button
              onClick={() => setFilterTab('bestsellers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'bestsellers'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setFilterTab('sale')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'sale'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              On Sale
            </button>
          </div>
        </div>

        {/* Category Pills & Controls Bar */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
          
          {/* Category Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {categories.map((cat) => {
              const active = (!selectedCategory && cat === 'All') || selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat === 'All' ? null : cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort & Price Filter Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="font-medium">Max:</span>
              <span className="font-mono font-bold text-slate-900">${maxPrice}</span>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No products match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filters or increasing the maximum price range.</p>
            <button
              onClick={() => {
                onSelectCategory(null);
                setFilterTab('all');
                setMaxPrice(500);
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Products Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onNotifyRestock={onNotifyRestock}
              />
            ))}
          </div>
        )}

        {/* Bottom Pagination & Count Indicator */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of{' '}
            <span className="font-bold text-slate-900">{products.length}</span> verified smart products
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                // cycle through view
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-all cursor-pointer"
            >
              Load 12 More
            </button>

            <button
              onClick={() => {
                onSelectCategory(null);
                setFilterTab('all');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs shadow-blue-500/25 transition-all cursor-pointer"
            >
              Explore All Categories
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
