import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, OrderStatus, ProductCategory } from '../types';
import {
  X,
  Package,
  ShoppingBag,
  Plus,
  Trash2,
  DollarSign,
  TrendingUp,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  FileSpreadsheet,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';

export const CRMModal: React.FC = () => {
  const {
    crmOpen,
    setCrmOpen,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatBDT,
    resetProductsToDefault
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    banglaName: '',
    category: 'Three-Piece' as ProductCategory,
    price: 3500,
    originalPrice: 4200,
    stockCount: 20,
    inStock: true,
    fabric: 'Pure Lawn Cotton',
    workDetails: 'Embroidered neckline and daman',
    careInstructions: 'Dry clean or cold wash',
    description: '',
    imageUrl: '/src/assets/images/hero_fashion_model_1792172507098.jpg',
    sizes: '38, 40, 42, 44',
    colorName: 'Rose Pink',
    colorHex: '#e11d48'
  });

  if (!crmOpen) return null;

  // Analytics metrics
  const totalRevenue = orders.reduce((acc, ord) => acc + ord.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' || o.orderStatus === 'confirmed').length;
  const lowStockProducts = products.filter((p) => p.stockCount <= 10);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `custom-${Date.now()}`,
      name: newProd.name,
      banglaName: newProd.banglaName || undefined,
      slug: newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newProd.category,
      price: Number(newProd.price),
      originalPrice: Number(newProd.originalPrice) || undefined,
      discountPercent: newProd.originalPrice ? Math.round(((newProd.originalPrice - newProd.price) / newProd.originalPrice) * 100) : undefined,
      rating: 5.0,
      reviewCount: 1,
      isNew: true,
      inStock: newProd.inStock,
      stockCount: Number(newProd.stockCount),
      images: [newProd.imageUrl || '/src/assets/images/hero_fashion_model_1792172507098.jpg'],
      colors: [
        { name: newProd.colorName || 'Default', hex: newProd.colorHex || '#e11d48' }
      ],
      sizes: newProd.sizes.split(',').map((s) => s.trim()),
      fabric: newProd.fabric,
      workDetails: newProd.workDetails,
      careInstructions: newProd.careInstructions,
      sku: `AA-NEW-${Math.floor(100 + Math.random() * 900)}`,
      description: newProd.description || 'Authentix luxury handcrafted fashion ensemble.'
    };

    addProduct(created);
    setShowAddProductModal(false);
  };

  const handleExportCSV = () => {
    const headers = ['Order Number,Customer Name,Phone,Address,District,Payment,Total BDT,Status,Courier,Tracking\n'];
    const rows = orders.map((o) =>
      `"${o.orderNumber}","${o.customer.fullName}","${o.customer.phone}","${o.customer.fullAddress.replace(/"/g, '""')}","${o.customer.district}","${o.paymentMethod.toUpperCase()}","${o.total}","${o.orderStatus}","${o.courier || ''}","${o.trackingCode || ''}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `authentix_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-6xl h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CRM Top Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold font-serif text-xl">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">Authentix Apparel — Merchant CRM</h2>
                <span className="text-[10px] bg-rose-900/80 text-rose-200 px-2 py-0.5 rounded font-mono uppercase">
                  Connected DB
                </span>
              </div>
              <p className="text-xs text-stone-400">Inventory Management & Nationwide Courier Dispatch Center</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              title="Export all orders to Excel / Courier CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setCrmOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* KPI Metric Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-stone-200 border-b border-stone-200">
          <div className="bg-white p-4">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">Total Revenue</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-stone-900 font-mono tabular-nums">{formatBDT(totalRevenue)}</span>
              <span className="text-[10px] text-emerald-700 font-semibold">+18% this week</span>
            </div>
          </div>
          <div className="bg-white p-4">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">Orders Processed</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-stone-900 font-mono tabular-nums">{totalOrders}</span>
              <span className="text-[10px] text-stone-500">({pendingOrders} pending dispatch)</span>
            </div>
          </div>
          <div className="bg-white p-4">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">Active Catalog</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-rose-700 font-mono tabular-nums">{products.length} Products</span>
            </div>
          </div>
          <div className="bg-white p-4">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">Stock Status</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-stone-900 font-mono tabular-nums">
                {products.filter((p) => p.inStock).length} in Stock
              </span>
              {lowStockProducts.length > 0 && (
                <span className="text-[10px] text-amber-700 font-semibold">({lowStockProducts.length} low stock)</span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Product Inventory ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Orders & Courier Dispatch ({orders.length})
            </button>
          </div>

          {activeTab === 'products' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddProductModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
              <button
                onClick={resetProductsToDefault}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
                title="Reset to default 34 products"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Tab Content: Products */}
        {activeTab === 'products' && (
          <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name or SKU..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-rose-500"
                />
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1">
                {['All', 'Three-Piece', 'Western Dress', 'Hijab', 'Kurti & Tunics', 'Saree & Festive'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white font-medium'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div className="flex-1 overflow-y-auto border border-stone-200 rounded-xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="sticky top-0 bg-stone-100 text-stone-700 font-semibold border-b border-stone-200 z-10">
                  <tr>
                    <th className="py-2.5 px-4">Item</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Price (BDT)</th>
                    <th className="py-2.5 px-3">Stock Units</th>
                    <th className="py-2.5 px-3">Availability</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-sans">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-12 object-cover object-top rounded border border-stone-200 shrink-0"
                          />
                          <div>
                            <span className="font-semibold text-stone-900 block line-clamp-1">{p.name}</span>
                            <span className="text-[11px] text-stone-500 font-mono">{p.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="text-[11px] font-medium text-stone-700">{p.category}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900">{formatBDT(p.price)}</span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-stone-400 line-through">
                              {formatBDT(p.originalPrice)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateProduct(p.id, { stockCount: Math.max(0, p.stockCount - 1) })}
                            className="w-5 h-5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded flex items-center justify-center font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-7 text-center font-bold text-stone-800">{p.stockCount}</span>
                          <button
                            onClick={() => updateProduct(p.id, { stockCount: p.stockCount + 1 })}
                            className="w-5 h-5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded flex items-center justify-center font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-sans">
                        <button
                          onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                            p.inStock
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
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

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Live Orders from Bangladeshi Customers ({orders.length})
              </span>
              <span className="text-xs text-stone-500">
                Sorted by most recent order
              </span>
            </div>

            <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 sm:p-5 bg-white hover:bg-stone-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-stone-900">{ord.orderNumber}</span>
                        <span className="text-xs text-stone-400">·</span>
                        <span className="text-xs text-stone-500">
                          {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="text-xs text-stone-400">·</span>
                        <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                          {ord.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : `bKash (${ord.trxId || 'Verified'})`}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 mt-1">
                        <strong>{ord.customer.fullName}</strong> — <a href={`tel:${ord.customer.phone}`} className="text-rose-600 hover:underline">{ord.customer.phone}</a>
                        <span className="text-stone-400 mx-1.5">|</span>
                        <span>{ord.customer.fullAddress}, {ord.customer.district}</span>
                      </div>
                    </div>

                    {/* Order Status Select & Courier */}
                    <div className="flex items-center gap-2">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                          ord.orderStatus === 'delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : ord.orderStatus === 'shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="pending">Pending Confirmation</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Packaging & Quality Check</option>
                        <option value="shipped">Handed to Courier</option>
                        <option value="delivered">Delivered & Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <span className="text-xs font-bold text-stone-900 font-mono tabular-nums">
                        {formatBDT(ord.total)}
                      </span>
                    </div>
                  </div>

                  {/* Order items preview */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-stone-600">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-stone-50 px-2 py-1 rounded border border-stone-200">
                          <span className="font-semibold text-stone-800">{it.product.name}</span>
                          <span className="text-stone-400">({it.selectedSize}) x{it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Truck className="w-3.5 h-3.5 text-stone-400" />
                      <span>Courier: <strong>{ord.courier || 'Steadfast Courier'}</strong></span>
                      <span className="font-mono text-[11px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">
                        {ord.trackingCode || 'AA-TRK-PENDING'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Product Modal Overlay */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 border border-stone-200 max-h-[85vh] overflow-y-auto text-left">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="font-serif font-bold text-lg text-stone-900">Add New Clothing Item to Authentix</h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. Zari Embroidered Silk Three-Piece"
                    className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Bangla Name (Optional)</label>
                    <input
                      type="text"
                      value={newProd.banglaName}
                      onChange={(e) => setNewProd({ ...newProd, banglaName: e.target.value })}
                      placeholder="জরির কাজ করা সিল্ক থ্রি-পিস"
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Category</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value as ProductCategory })}
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                    >
                      <option value="Three-Piece">Three-Piece</option>
                      <option value="Western Dress">Western Dress</option>
                      <option value="Hijab">Hijab & Abaya</option>
                      <option value="Kurti & Tunics">Kurti & Tunics</option>
                      <option value="Saree & Festive">Saree & Festive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Price (৳ BDT)</label>
                    <input
                      type="number"
                      required
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Original Price (৳)</label>
                    <input
                      type="number"
                      value={newProd.originalPrice}
                      onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Stock Units</label>
                    <input
                      type="number"
                      value={newProd.stockCount}
                      onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Available Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={newProd.sizes}
                    onChange={(e) => setNewProd({ ...newProd, sizes: e.target.value })}
                    placeholder="38, 40, 42, 44 or S, M, L, XL"
                    className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Fabric Composition</label>
                    <input
                      type="text"
                      value={newProd.fabric}
                      onChange={(e) => setNewProd({ ...newProd, fabric: e.target.value })}
                      placeholder="Pure Organza / Georgette / Lawn"
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Color Name</label>
                    <input
                      type="text"
                      value={newProd.colorName}
                      onChange={(e) => setNewProd({ ...newProd, colorName: e.target.value })}
                      placeholder="Dusty Rose / Emerald Green"
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                  >
                    Save & Publish to Store
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
