/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, INITIAL_USER_PROFILE, MOCK_ADVERTISEMENTS, MOCK_ORDERS } from './data/mockData';
import { Product, CartItem, UserProfile, Order } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { AIPersonalization } from './components/AIPersonalization';
import { NewVariety } from './components/NewVariety';
import { TodaysDeals } from './components/TodaysDeals';
import { ShortVideoFeed } from './components/ShortVideoFeed';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';

export default function App() {
  // Catalog State
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[0],
      quantity: 1,
      selectedColor: MOCK_PRODUCTS[0].colors[0],
    },
    {
      product: MOCK_PRODUCTS[1],
      quantity: 1,
      selectedColor: MOCK_PRODUCTS[1].colors[0],
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'prod-chronos-smartwatch',
    'prod-solaris-aviator',
  ]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([
    MOCK_PRODUCTS[0],
    MOCK_PRODUCTS[1],
  ]);

  // Modals & Panels State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // User & Orders State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [appliedCheckoutDiscount, setAppliedCheckoutDiscount] = useState(0);
  const [checkoutCouponCode, setCheckoutCouponCode] = useState('');

  // Notification Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scroll smoothly to section
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add / Remove from Cart
  const handleAddToCart = (
    product: Product,
    selectedColor?: { name: string; hex: string },
    selectedSize?: string,
    quantity: number = 1
  ) => {
    const color = selectedColor || product.colors[0];
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedColor.name === color.name && it.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize }];
    });
    showToast(`Added ${product.name} to your bag.`);
  };

  // Immediate Buy Now (opens checkout directly)
  const handleBuyNow = (
    product: Product,
    selectedColor?: { name: string; hex: string },
    selectedSize?: string,
    quantity: number = 1
  ) => {
    handleAddToCart(product, selectedColor, selectedSize, quantity);
    setIsCartOpen(false);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from saved wishlist');
        return prev.filter((id) => id !== productId);
      }
      showToast('Saved to your wishlist');
      return [...prev, productId];
    });
  };

  // Select Product (Opens PDP modal and adds to recently viewed)
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Natural Language Search Filtering
  const processedProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const lowerQuery = searchQuery.toLowerCase();
    
    // Check for price constraint like "under 50" or "under $100"
    const priceMatch = lowerQuery.match(/under\s*\$?(\d+)/i);
    const maxBudget = priceMatch ? parseFloat(priceMatch[1]) : null;

    return products.filter((p) => {
      // If max budget extracted, check price
      if (maxBudget !== null && p.price > maxBudget) {
        return false;
      }

      // Check category keyword
      if (lowerQuery.includes('bag') && p.category !== 'Bags') return false;
      if (lowerQuery.includes('headphone') && !p.name.toLowerCase().includes('headphone')) return false;
      if (lowerQuery.includes('watch') && !p.name.toLowerCase().includes('watch')) return false;

      // Color check
      if (lowerQuery.includes('black') && !p.colors.some((c) => c.name.toLowerCase().includes('black') || c.name.toLowerCase().includes('onyx') || c.name.toLowerCase().includes('noir'))) {
        return false;
      }

      // General text matching
      return (
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.tags.some((t) => lowerQuery.includes(t.toLowerCase())) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    });
  }, [products, searchQuery]);

  // Wishlist full products
  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col font-sans">
      
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header / Navigation */}
      <Header
        cartItemsCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlistIds.length}
        user={user}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearchQuery={(q) => {
          setSearchQuery(q);
          if (q) handleScrollToSection('catalog-section');
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
          if (cat) handleScrollToSection('catalog-section');
        }}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-1">
        
        {/* Search Active Indicator Banner */}
        {searchQuery && (
          <div className="bg-blue-50 border-b border-blue-200 py-3 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-blue-900">
              <span className="font-semibold">
                AI Search Active: <span className="font-bold">"{searchQuery}"</span> ({processedProducts.length} results found)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-bold underline hover:text-blue-700 cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* 2. Hero Section */}
        <Hero
          onShopNow={() => handleScrollToSection('catalog-section')}
          onExploreNewArrivals={() => handleScrollToSection('catalog-section')}
          onSelectProduct={handleSelectProduct}
          featuredProducts={products}
        />

        {/* 3. Product Categories */}
        <Categories
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleScrollToSection('catalog-section');
          }}
          selectedCategory={selectedCategory}
        />

        {/* 7. AI Personalization: "Picked Just For You" */}
        <AIPersonalization
          products={products}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          activePersona={user.aestheticPersona}
          onChangePersona={() => setIsProfileOpen(true)}
        />

        {/* 5. New Variety / Material Spotlight */}
        <NewVariety
          products={products}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* 10. Deals Section with Countdown */}
        <TodaysDeals
          products={products}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* 9. Advertisement / Video Feed (TikTok/Reels style vertical carousel) */}
        <ShortVideoFeed
          ads={MOCK_ADVERTISEMENTS}
          products={products}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Product Exploration & Catalog Showcase */}
        <ProductCatalog
          products={processedProducts}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onNotifyRestock={(p) => showToast(`Restock alert set for ${p.name}`)}
        />

      </main>

      {/* 6. Product Details Page / Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
      />

      {/* 11. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(discount, coupon) => {
          setAppliedCheckoutDiscount(discount);
          setCheckoutCouponCode(coupon);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 12. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscount={appliedCheckoutDiscount}
        couponCode={checkoutCouponCode}
        onOrderComplete={(newOrder) => {
          setOrders((prev) => [newOrder, ...prev]);
          setCartItems([]);
          showToast(`Order #${newOrder.id} successfully placed!`);
        }}
      />

      {/* 13. User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        orders={orders}
        wishlistProducts={wishlistProducts}
        recentlyViewed={recentlyViewed}
        onSelectProduct={handleSelectProduct}
        onUpdatePersona={(newPersona) => {
          setUser((prev) => ({ ...prev, aestheticPersona: newPersona }));
          showToast(`AI Taste Persona updated to "${newPersona}"`);
        }}
      />

      {/* 14 & 15. Admin Dashboard & Analytics Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        onAddProduct={(newProd) => {
          setProducts((prev) => [newProd, ...prev]);
          showToast(`Published ${newProd.name} to store catalog.`);
        }}
        onUpdateProduct={(updated) => {
          setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
          showToast(`Updated inventory for ${updated.name}`);
        }}
        onDeleteProduct={(id) => {
          setProducts((prev) => prev.filter((p) => p.id !== id));
          showToast('Product removed from catalog.');
        }}
        onUpdateOrderStatus={(orderId, status) => {
          setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
          showToast(`Order ${orderId} updated to ${status}`);
        }}
      />

      {/* 16. Footer */}
      <Footer />

    </div>
  );
}
