import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, TrendingUp, DollarSign, Package, Users, Sparkles, Check, AlertCircle, ShoppingBag, Eye } from 'lucide-react';
import { Product, Order } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics'>('overview');
  const [showAddForm, setShowAddForm] = useState(false);

  // New product draft form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Electronics');
  const [newProdPrice, setNewProdPrice] = useState('189.00');
  const [newProdStock, setNewProdStock] = useState('25');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80');

  if (!isOpen) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const created: Product = {
      id: `prod-custom-${Date.now()}`,
      name: newProdName,
      brand: 'LUMIX STUDIO',
      category: newProdCategory,
      price: parseFloat(newProdPrice) || 99,
      originalPrice: (parseFloat(newProdPrice) || 99) * 1.25,
      rating: 5.0,
      reviewsCount: 1,
      image: newProdImage,
      gallery: [newProdImage],
      description: 'Exclusive custom release engineered for modern luxury collectors.',
      colors: [
        { name: 'Matte Onyx', hex: '#1E293B' },
        { name: 'Titanium White', hex: '#F1F5F9' },
      ],
      stock: parseInt(newProdStock) || 10,
      isSoldOut: parseInt(newProdStock) === 0,
      isNew: true,
      tags: ['new-arrival', 'curated'],
      specifications: {
        Finish: 'Hand-Finished Anodized Satin',
        Origin: 'Limited Global Run',
      },
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddProduct(created);
    setNewProdName('');
    setShowAddForm(false);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 148920);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Container */}
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl">LUMIX Admin Command</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  LIVE STOREFRONT
                </span>
              </div>
              <p className="text-xs text-slate-400">Inventory, neural conversions & order routing control center</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sales Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'products' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'orders' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Analytics & Insights
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Sales Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Metric cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <div className="flex items-center justify-between text-blue-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                    ↑ +28.4% vs last week
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <div className="flex items-center justify-between text-indigo-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">
                    {1240 + orders.length}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                    ↑ 98.2% on-time delivery
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <div className="flex items-center justify-between text-purple-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">AI Accuracy</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">
                    99.4%
                  </div>
                  <span className="text-[11px] text-purple-600 font-bold mt-1 block">
                    Zero returns on AI matches
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center justify-between text-amber-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">CSAT Score</span>
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">
                    4.94 / 5.0
                  </div>
                  <span className="text-[11px] text-amber-600 font-bold mt-1 block">
                    Based on 12,400+ reviews
                  </span>
                </div>
              </div>

              {/* Live Conversion Stream */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Live Dispatch & Sales Activity
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="font-semibold text-slate-800">AuraWave Spatial ANC Headphones</span>
                      <span className="text-slate-400">purchased by user in Austin, TX</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">$289.00</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-slate-800">Nova Holographic Metallic Bag</span>
                      <span className="text-slate-400">purchased by VIP Sophia L. in New York, NY</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">$175.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Manage Products */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Inventory Catalog</h4>
                  <p className="text-xs text-slate-500">Live products synced to client store</p>
                </div>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddForm ? 'Cancel' : 'Add New Product'}</span>
                </button>
              </div>

              {/* Add Product Form Drawer */}
              {showAddForm && (
                <form onSubmit={handleCreateProduct} className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4">
                  <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Add New Product Drop
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Prism Ceramic Vase"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Category</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as Product['category'])}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Bags">Bags</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Home & Living">Home & Living</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        required
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Publish to Storefront
                  </button>
                </form>
              )}

              {/* Table of Products */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3 flex items-center gap-2.5">
                          <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-9 h-9 rounded-lg object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 block truncate max-w-[200px]">{p.name}</span>
                            <span className="text-[11px] text-slate-400">{p.brand}</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600">{p.category}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">${p.price.toFixed(2)}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={p.stock}
                            onChange={(e) => {
                              const newStock = parseInt(e.target.value) || 0;
                              onUpdateProduct({
                                ...p,
                                stock: newStock,
                                isSoldOut: newStock === 0,
                              });
                            }}
                            className="w-16 p-1 border border-slate-200 rounded-md font-mono text-center"
                          />
                        </td>
                        <td className="p-3">
                          {p.isSoldOut ? (
                            <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">
                              Sold Out
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Store Orders ({orders.length})</h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td className="p-3 font-mono font-bold text-slate-900">{o.id}</td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-900 block">{o.shippingAddress.fullName}</span>
                          <span className="text-[11px] text-slate-400">{o.shippingAddress.city}, {o.shippingAddress.state}</span>
                        </td>
                        <td className="p-3">{o.items.length} items</td>
                        <td className="p-3 font-mono font-bold text-slate-900">${o.total.toFixed(2)}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700">
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <select
                            value={o.status}
                            onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Top Performing Categories & Views</h4>
                <p className="text-xs text-slate-500">Real-time telemetry tracked across all active shoppers</p>
              </div>

              <div className="space-y-3">
                {[
                  { cat: 'Fashion & Kinetic Wear', share: 34, views: '42,810 views' },
                  { cat: 'Electronics & Spatial Audio', share: 28, views: '35,120 views' },
                  { cat: 'Luxury Bags & Crossbody', share: 22, views: '27,400 views' },
                  { cat: 'Beauty & Bio-Active Serums', share: 16, views: '20,090 views' },
                ].map((item) => (
                  <div key={item.cat} className="space-y-1 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="font-bold text-slate-800">{item.cat}</span>
                      <span className="text-slate-500 font-mono">{item.views} ({item.share}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.share}%` }} />
                    </div>
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
