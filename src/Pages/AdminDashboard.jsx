import React, { useMemo, useState, useEffect } from 'react';
import { FiGrid, FiSliders, FiPlusSquare, FiShoppingBag, FiSettings } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { categoryFolders } from '../data/productData';

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { products, updateProduct, addProduct, deleteProductById, orderHistory, clearOrderHistory, updateOrderStatus } = useCart();
  const [searchText, setSearchText] = useState('');
  const [editBuffer, setEditBuffer] = useState({});
  const [newItem, setNewItem] = useState({ name: '', price: '', category: categoryFolders[0].name, description: '', image: null, preview: null });
  const [companyInfo, setCompanyInfo] = useState(() => {
    const stored = localStorage.getItem('companyInfo');
    return stored ? JSON.parse(stored) : {
      name: 'Cianelle_Luxe Fragrances',
      phone: '0247283407',
      email: 'info@cianelle.com',
      address: 'Kwadaso-Kumasi',
      days: 'Monday – Saturday',
      times: '8:00am GMT – 6:00pm'
    };
  });
  const [orders, setOrders] = useState(orderHistory);
  const [companySaveMessage, setCompanySaveMessage] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredProducts = useMemo(() => {
    const lower = searchText.toLowerCase();
    return products.filter((item) => item.name.toLowerCase().includes(lower) || item.category.toLowerCase().includes(lower));
  }, [products, searchText]);

  // Update orders when orderHistory changes
  useEffect(() => {
    setOrders(orderHistory);
  }, [orderHistory]);

  const dailyOrders = useMemo(() => {
    const today = new Date().toLocaleDateString('en-GB');
    return orders.filter((order) => order.date === today).length;
  }, [orders]);
  const weeklyOrders = useMemo(() => orders.length, [orders]);
  const totalOrders = useMemo(() => orders.length, [orders]);

  const handleLogin = () => {
    if (password === 'NanaKofi12345@') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Access denied.');
    }
  };

  const saveCompanyInfo = () => {
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    setCompanySaveMessage('Company information saved successfully!');
    setTimeout(() => setCompanySaveMessage(''), 3000);
  };

  const toggleOrderStatus = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    const newStatus = order.status === 'Pending' ? 'Delivered' : 'Pending';
    updateOrderStatus(orderId, newStatus);
  };

  const clearAllOrders = () => {
    setOrders([]);
    clearOrderHistory();
    setShowClearConfirm(false);
  };

  const handleProductChange = (id, field, value) => {
    setEditBuffer((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === 'price' ? value : value
      }
    }));
  };

  const saveProductChanges = (id) => {
    const pending = editBuffer[id];
    if (!pending) return;
    updateProduct(id, {
      ...pending,
      price: parseFloat(pending.price) || 0
    });
    setEditBuffer((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const toggleAvailability = (id) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    updateProduct(id, { available: !product.available });
  };

  const deleteProduct = (id) => {
    deleteProductById(id);
  };

  const handleNewItemChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setNewItem((prev) => ({ ...prev, image: file, preview }));
    }
  };

  const clearNewItem = () => {
    if (newItem.preview) {
      URL.revokeObjectURL(newItem.preview);
    }
    setNewItem({ name: '', price: '', category: categoryFolders[0].name, description: '', image: null, preview: null });
  };

  const addNewProduct = () => {
    if (!newItem.name || !newItem.price || !newItem.description || !newItem.preview) {
      return;
    }
    const category = categoryFolders.find((cat) => cat.name === newItem.category) || categoryFolders[0];
    const newProduct = {
      id: `new-${Date.now()}`,
      name: newItem.name,
      category: category.name,
      slug: category.slug,
      price: parseFloat(newItem.price),
      description: newItem.description,
      image: newItem.preview,
      available: true
    };
    addProduct(newProduct);
    clearNewItem();
  };

  const handleCompanyChange = (field, value) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] relative">
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-6">
          <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-serif font-semibold text-slate-950 mb-4">Clear All Orders?</h2>
            <p className="text-sm text-slate-600 mb-6">This action cannot be undone. All order records will be permanently deleted.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowClearConfirm(false)} className="flex-1 border border-slate-200 text-slate-700 px-4 py-3 rounded-sm font-semibold hover:bg-slate-100 transition">
                Cancel
              </button>
              <button onClick={clearAllOrders} className="flex-1 bg-red-500 text-white px-4 py-3 rounded-sm font-semibold hover:bg-red-600 transition">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-6">
          <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-serif font-semibold text-slate-950 mb-4">Manager Access Required</h2>
            <p className="text-sm text-slate-600 mb-6">Enter the password to access the dashboard.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full border border-slate-200 rounded-sm px-4 py-3 mb-4 text-sm focus:outline-none focus:border-[#D4AF37]"
              placeholder="Enter manager password"
            />
            {authError && <p className="text-sm text-red-500 mb-4">{authError}</p>}
            <button onClick={handleLogin} className="w-full bg-[#D4AF37] text-black uppercase tracking-[0.2em] font-semibold text-sm py-3 rounded-sm hover:bg-black hover:text-white transition">
              Submit Password
            </button>
          </div>
        </div>
      )}

      <div className={isAuthenticated ? 'opacity-100' : 'opacity-20 pointer-events-none'}>
        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-56 lg:w-72 bg-[#1a1a1a] text-gray-400 p-4 sm:p-6 flex flex-col space-y-3 sm:space-y-4">
            <div className="border-b border-neutral-800 pb-3 sm:pb-4">
              <h2 className="text-white text-base sm:text-lg font-serif tracking-widest">CIANELLE ADMIN</h2>
            </div>
            {[
              { name: 'Dashboard', icon: <FiGrid /> },
              { name: 'Manage Spray', icon: <FiSliders /> },
              { name: 'Add New Item', icon: <FiPlusSquare /> },
              { name: 'View Orders', icon: <FiShoppingBag /> },
              { name: 'Analytics Dashboard', icon: <FiSettings /> }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm tracking-wide uppercase transition-colors rounded-sm min-h-[44px] ${activeTab === tab.name ? 'bg-[#D4AF37] text-black font-semibold' : 'hover:bg-neutral-800 hover:text-white'}`}
              >
                {tab.icon}
                <span className="text-xs font-semibold hidden sm:inline">{tab.name}</span>
                <span className="text-xs font-semibold sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            ))}
          </aside>

          <main className="flex-1 p-4 sm:p-6 lg:p-10">
              <div className="bg-white rounded-2xl sm:rounded-[32px] shadow-sm border border-gray-100 p-4 sm:p-6">
              {activeTab === 'Dashboard' && (
                <div>
                  <div className="mb-8">
                    <h1 className="text-2xl font-serif font-semibold text-slate-950 uppercase tracking-wide">Admin Overview</h1>
                    <p className="text-sm text-slate-500 mt-2">Summary of product, order, and business performance.</p>
                  </div>
                  <div className="grid gap-3 sm:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-6">
                      <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500">Products</p>
                      <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-serif font-semibold text-slate-950">{products.length}</p>
                    </div>
                    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-6">
                      <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500">Orders</p>
                      <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-serif font-semibold text-slate-950">{totalOrders}</p>
                    </div>
                    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-6">
                      <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500">Company</p>
                      <p className="mt-2 sm:mt-4 text-sm sm:text-2xl font-serif font-semibold text-slate-950 whitespace-normal ">{companyInfo.name}</p>
                    </div>
                    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-6">
                      <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500">Location</p>
                      <p className="mt-2 sm:mt-4 text-sm sm:text-2xl font-serif font-semibold text-slate-950 whitespace-normal">{companyInfo.address}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Manage Spray' && (
                <div>
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-serif font-semibold text-slate-950">Manage Spray</h1>
                      <p className="text-sm text-slate-500 mt-2">Search, edit, mark unavailable, or delete items.</p>
                    </div>
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search products..."
                      className="w-full md:w-64 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-separate border-spacing-y-3">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-[0.3em] text-slate-500">
                          <th className="px-4 py-3">Product</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Price</th>
                          <th className="px-4 py-3">Availability</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="bg-slate-50 rounded-3xl">
                            <td className="px-4 py-4 align-top">
                              <div className="font-semibold text-slate-950">{product.name}</div>
                              <div className="text-xs text-slate-500">{product.description}</div>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <select
                                value={editBuffer[product.id]?.category ?? product.category}
                                onChange={(e) => handleProductChange(product.id, 'category', e.target.value)}
                                className="border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
                              >
                                {categoryFolders.map((cat) => (
                                  <option key={cat.slug} value={cat.name}>{cat.name}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <input
                                type="number"
                                value={editBuffer[product.id]?.price ?? product.price}
                                onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                                className="w-24 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
                              />
                            </td>
                            <td className="px-4 py-4 align-top">
                              <button
                                onClick={() => toggleAvailability(product.id)}
                                className={`rounded-full px-4 py-2 text-xs font-semibold ${product.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}
                              >
                                {product.available ? 'Available' : 'Unavailable'}
                              </button>
                            </td>
                            <td className="px-4 py-4 align-top space-y-2">
                              <button onClick={() => saveProductChanges(product.id)} className="w-full rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black hover:bg-amber-300 transition">
                                Save Changes
                              </button>
                              <button onClick={() => deleteProduct(product.id)} className="w-full rounded-full bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-red-600 transition">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'Add New Item' && (
                <div>
                  <div className="mb-6">
                    <h1 className="text-2xl font-serif font-semibold text-slate-950">Add New Item</h1>
                    <p className="text-sm text-slate-500 mt-2">Upload from local device, preview, and add a new product.</p>
                  </div>
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold mb-2">Upload Image</label>
                        <input type="file" accept="image/*" onChange={handleUpload} className="w-full border border-slate-200 rounded-sm p-3 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold mb-2">Product Name</label>
                        <input type="text" value={newItem.name} onChange={(e) => handleNewItemChange('name', e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold mb-2">Price (₵)</label>
                        <input type="number" value={newItem.price} onChange={(e) => handleNewItemChange('price', e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold mb-2">Category</label>
                        <select value={newItem.category} onChange={(e) => handleNewItemChange('category', e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#D4AF37]">
                          {categoryFolders.map((category) => (
                            <option key={category.slug} value={category.name}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold mb-2">Description</label>
                        <textarea value={newItem.description} onChange={(e) => handleNewItemChange('description', e.target.value)} rows="4" className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
                      </div>
                    </div>
                    <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                      <h2 className="text-xl font-serif font-semibold text-slate-950 mb-4">Preview Item</h2>
                      <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white">
                        {newItem.preview ? (
                          <img src={newItem.preview} alt="Preview" className="h-72 w-full object-cover" />
                        ) : (
                          <div className="flex h-72 items-center justify-center text-sm text-slate-500">No image selected yet.</div>
                        )}
                      </div>
                      <div className="mt-6 space-y-4">
                        <div>
                          <p className="text-sm text-slate-500">Name</p>
                          <p className="font-semibold text-slate-950">{newItem.name || 'Preview title'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Price</p>
                          <p className="font-semibold text-slate-950">{newItem.price ? `₵${newItem.price}` : '₵0.00'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Category</p>
                          <p className="font-semibold text-slate-950">{newItem.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-end">
                    <button onClick={clearNewItem} className="w-full md:w-auto border border-slate-300 text-slate-700 px-6 py-3 uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-slate-100 transition">Clear Form</button>
                    <button onClick={addNewProduct} className="w-full md:w-auto bg-[#D4AF37] text-black px-6 py-3 uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-black hover:text-white transition">Save Product</button>
                  </div>
                </div>
              )}

              {activeTab === 'View Orders' && (
                <div>
                  <div className="mb-6">
                    <h1 className="text-2xl font-serif font-semibold text-slate-950">View Orders & Company Settings</h1>
                    <p className="text-sm text-slate-500 mt-2">Review current orders and update business contact details.</p>
                  </div>
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                      <div className="rounded-2xl sm:rounded-[32px] border border-slate-200 bg-slate-50 p-4 sm:p-6">
                        <h2 className="text-xl font-semibold text-slate-950 mb-4">Orders</h2>
                        {orders.length === 0 ? (
                          <p className="text-sm text-slate-500">There are no current orders in the system.</p>
                        ) : (
                          <div className="space-y-4">
                            {orders.map((order) => (
                              <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between gap-3 mb-3">
                                  <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">Order ID</p>
                                    <p className="font-semibold text-slate-950">{order.id}</p>
                                  </div>
                                  <span className={`text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {order.status}
                                  </span>
                                </div>
                                <div className="space-y-2 text-sm mb-4">
                                  <div><span className="text-slate-500">Customer: </span><span className="font-semibold text-slate-950">{order.customer}</span></div>
                                  <div><span className="text-slate-500">Total: </span><span className="font-semibold text-slate-950">₵{order.total.toFixed(2)}</span></div>
                                  <div><span className="text-slate-500">Date: </span><span className="font-semibold text-slate-950">{order.date}</span></div>
                                </div>
                                {order.items && order.items.length > 0 && (
                                  <div className="mb-4 border-t border-slate-200 pt-3">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-2">Items</p>
                                    <div className="space-y-1 text-xs">
                                      {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-slate-600">
                                          <span>{item.name} (ID: {item.id}) x{item.qty}</span>
                                          <span>₵{(item.price * item.qty).toFixed(2)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <button
                                  onClick={() => toggleOrderStatus(order.id)}
                                  className={`w-full rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                                    order.status === 'Delivered'
                                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                      : 'bg-[#D4AF37] text-black hover:bg-amber-300'
                                  }`}
                                >
                                  {order.status === 'Delivered' ? 'Mark as Pending' : 'Mark as Delivered'}
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        {orders.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-slate-200">
                            <button
                              onClick={() => setShowClearConfirm(true)}
                              className="w-full rounded-full bg-red-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-red-600 transition"
                            >
                              Clear All Orders
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="rounded-2xl sm:rounded-[32px] border border-slate-200 bg-slate-50 p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-semibold text-slate-950 mb-3 sm:mb-4">Company Info</h2>
                      {companySaveMessage && (
                        <div className="mb-4 rounded-lg bg-emerald-100 text-emerald-700 p-3 text-xs font-semibold uppercase tracking-[0.2em]">
                          {companySaveMessage}
                        </div>
                      )}
                      {['name', 'phone', 'email', 'address', 'days', 'times'].map((field) => (
                        <div key={field} className="mb-3 sm:mb-4">
                          <label className="block text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold mb-2">{field === 'name' ? 'Company Name' : field === 'phone' ? 'Phone' : field === 'email' ? 'Email' : field === 'address' ? 'Address' : field === 'days' ? 'Opening Days' : 'Opening Times'}</label>
                          <input
                            type="text"
                            value={companyInfo[field]}
                            onChange={(e) => handleCompanyChange(field, e.target.value)}
                            className="w-full border border-slate-200 rounded-sm px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                          />
                        </div>
                      ))}
                      <button
                        onClick={saveCompanyInfo}
                        className="w-full bg-[#D4AF37] text-black px-4 py-3 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition mt-6"
                      >
                        Save Company Info
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Analytics Dashboard' && (
                <div>
                  <div className="mb-6">
                    <h1 className="text-2xl font-serif font-semibold text-slate-950">Analytics Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-2">Monitor order activity and clear history as needed.</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      { label: 'Daily Orders', value: dailyOrders },
                      { label: 'Weekly Orders', value: weeklyOrders },
                      { label: 'Total Orders', value: totalOrders }
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{stat.label}</p>
                        <p className="mt-4 text-4xl font-serif font-semibold text-slate-950">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-950">Order History</h2>
                        <p className="text-sm text-slate-500 mt-2">Clear history to reset analytics and order data.</p>
                      </div>
                      <button onClick={() => setShowClearConfirm(true)} className="rounded-full bg-red-500 px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-white hover:bg-red-600 transition">
                        Clear History
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
