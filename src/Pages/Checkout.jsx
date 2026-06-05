import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, totalPrice, submitOrder } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    submitOrder({ items: cartItems, total: totalPrice, customer: 'Guest' });
    navigate('/dashboard');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-gray-200 p-8 text-center shadow-sm">
          <h1 className="text-2xl font-serif font-semibold text-slate-950 mb-4">Your cart is empty</h1>
          <p className="text-sm text-slate-500 mb-6">Add items to your cart first, then return here to complete checkout.</p>
          <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-black text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-amber-400 transition">
            <FiChevronLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400">Checkout</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-950">Order Summary</h1>
          </div>
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-sm border border-slate-200 px-5 py-3 text-sm uppercase tracking-[0.2em] text-slate-700 hover:border-amber-300 hover:text-slate-950 transition">
            <FiChevronLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-serif font-semibold text-slate-950 mb-4">Items in Your Order</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-100 p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-base font-semibold text-slate-950">{item.name}</h3>
                          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">ID: {item.id}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Qty: {item.qty}</p>
                        <p className="text-sm text-slate-500 mt-1">Unit price: ₵{item.price.toFixed(2)}</p>
                        <p className="text-sm font-semibold text-slate-950 mt-2">Line total: ₵{(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-serif font-semibold text-slate-950 mb-4">Order Details</h2>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span>Subtotal</span>
                  <span>₵{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between pt-3 text-lg font-semibold text-slate-950">
                  <span>Total</span>
                  <span>₵{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950 mb-4">Ready to place your order?</h2>
              <button onClick={handleConfirm} className="w-full bg-black text-white py-3 uppercase tracking-[0.2em] text-xs font-bold rounded-sm hover:bg-amber-400 transition">
                Confirm Order
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
