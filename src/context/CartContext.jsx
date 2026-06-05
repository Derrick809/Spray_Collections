import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const loadStoredItems = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => loadStoredItems('cartItems'));
  const [orderHistory, setOrderHistory] = useState(() => loadStoredItems('orderHistory'));

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (product) => {
    setCartItems((items) => {
      const itemId = product.id || `item-${Date.now()}`;
      const existing = items.find((item) => item.id === itemId);
      if (existing) {
        return items.map((item) => item.id === itemId ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...items, { ...product, id: itemId, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    setCartItems((items) => items.map((item) => item.id === productId ? { ...item, qty: Math.max(1, qty) } : item));
  };

  const clearCart = () => setCartItems([]);

  const submitOrder = ({ items, total, customer = 'Guest' }) => {
    if (!items.length) return;
    const orderId = `ORD-${Date.now()}`;
    const newOrder = {
      id: orderId,
      customer,
      total,
      date: new Date().toLocaleDateString('en-GB'),
      status: 'Pending',
      items
    };
    setOrderHistory((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const totalItems = useMemo(() => cartItems.reduce((count, item) => count + item.qty, 0), [cartItems]);
  const totalPrice = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty * item.price, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice, orderHistory, submitOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
