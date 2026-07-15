import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { categoryFolders } from '../data/productData';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

const Navbar = ({ onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMobileDashboardOpen, setIsMobileDashboardOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const { totalItems, currentUser } = useCart();
  const navLinkClass = 'flex items-center justify-center h-10 px-2 lg:px-3 text-black hover:text-[#D4AF37] transition leading-none whitespace-nowrap font-medium tracking-[0.2em] uppercase text-[11px] lg:text-xs';
  const navButtonClass = 'flex items-center justify-center h-10 px-2 lg:px-3 gap-1 text-black hover:text-[#D4AF37] focus:outline-none transition leading-none whitespace-nowrap font-medium tracking-[0.2em] uppercase text-[11px] lg:text-xs';

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#D4AF37] shadow-sm ">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 sm:gap-6">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
            <img src="/cianelle.svg.jpeg" alt="Cianelle Luxe Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
            <div className="hidden sm:block text-sm sm:text-base font-serif tracking-[0.25em] text-black whitespace-nowrap">
              CIANELLE_LUXE
            </div>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-end gap-1 lg:gap-2 font-sans">
            <Link to="/" className={navLinkClass}>Home</Link>
            <Link to="/about" className={navLinkClass}>About</Link>
            <Link to="/menu" className={navLinkClass}>Menu</Link>
            <Link to="/contact" className={navLinkClass}>Contact</Link>
            <div className="relative group">
              <button
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                onBlur={() => setTimeout(() => setIsDashboardOpen(false), 200)}
                className={navButtonClass}
              >
                Dashboards <FiChevronDown className="w-3 h-3" />
              </button>
              {isDashboardOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-sm py-1 z-50">
                  <Link to="/dashboard" className="block px-3 py-2 text-xs lg:text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] normal-case transition">
                    User Dashboard
                  </Link>
                  <Link to="/admin" className="block px-3 py-2 text-xs lg:text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] normal-case transition">
                    Manager Dashboard
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className={navButtonClass}
              >
                Categories <FiChevronDown className="w-3 h-3" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-sm py-1 z-50">
                  {categoryFolders.map((cat) => (
                    <Link key={cat.slug} to={`/categories/${cat.slug}`} className="block px-3 py-2 text-xs lg:text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] normal-case transition">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button type="button" onClick={() => { setIsAuthOpen(true); setAuthMode('signin'); }} className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 hover:text-slate-950 transition flex-shrink-0">
              <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button onClick={onOpenCart} className="flex items-center justify-center h-10 w-10 text-black hover:text-[#D4AF37] relative focus:outline-none transition flex-shrink-0">
              <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItems > 0 && <span className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </button>
          </div>

          <div className="md:hidden flex flex-wrap items-center gap-2">
            <button onClick={onOpenCart} className="relative p-2 text-black focus:outline-none">
              <FiShoppingCart className="w-5 h-5" />
              {totalItems > 0 && <span className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </button>
            <button type="button" onClick={() => { setIsAuthOpen(true); setAuthMode('signin'); }} className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-700 hover:border-amber-300 hover:text-slate-950 transition">
              <FiUser className="w-5 h-5" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black p-2 focus:outline-none">
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2 uppercase text-sm tracking-wide shadow-inner">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-gray-50 text-black">Home</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-gray-50 text-black">About</Link>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-gray-50 text-black">Menu</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-gray-50 text-black">Contact</Link>
          <div className="border-b border-gray-50">
            <button
              onClick={() => setIsMobileDashboardOpen(!isMobileDashboardOpen)}
              className="w-full flex items-center justify-between py-2 text-black"
            >
              Dashboards
              <FiChevronDown className={`text-xs transition ${isMobileDashboardOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileDashboardOpen && (
              <div className="space-y-1 pl-4 pb-2">
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-black">User Dashboard</Link>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#D4AF37]">Manager Dashboard</Link>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <button type="button" onClick={() => { setIsAuthOpen(true); setAuthMode('signin'); setIsMobileMenuOpen(false); }} className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm uppercase tracking-[0.2em] text-slate-700 hover:border-amber-300 hover:text-slate-950 transition">
              {currentUser ? `Hi, ${currentUser.firstName}` : 'Login / Sign Up'}
            </button>
            <p className="text-[11px] tracking-[0.35em] text-gray-500">Categories</p>
            {categoryFolders.map((cat) => (
              <Link key={cat.slug} to={`/categories/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-black hover:text-[#D4AF37] border-b border-gray-50 last:border-b-0">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialMode={authMode} />
    </nav>
  );
};

export default Navbar;
