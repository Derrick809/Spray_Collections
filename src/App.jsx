import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import CartDrawer from './Components/CartDrawer';
import Home from './Pages/Home';
import About from './Pages/About';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import CategoryPage from './Pages/CategoryPage';
import AdminDashboard from './Pages/AdminDashboard';
import Checkout from './Pages/Checkout';
import UserDashboard from './Pages/UserDashboard';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="relative">
          <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
