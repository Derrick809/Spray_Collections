import React from 'react';
import { FiInstagram, FiPhone, FiClock, FiGlobe } from 'react-icons/fi';

const MainFooter = () => (
  <footer className="bg-slate-950 text-slate-200 py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 lg:px-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-4">Cianelle_Luxe Fragrances</h2>
        <p className="text-xs sm:text-sm leading-7 text-slate-400">A premium fragrance experience crafted for luxury lovers. Browse body sprays, perfume oils, long lasting sprays, and elegant scents.</p>
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Connect with Us</h3>
        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-400">
          <li className="flex items-center gap-3"><FiPhone className="w-4 h-4 text-amber-300 flex-shrink-0" /> WhatsApp: <span className="text-white">0247283407</span></li>
          <li className="flex items-center gap-3"><FiInstagram className="w-4 h-4 text-amber-300 flex-shrink-0" /> Instagram: <span className="text-white">Sheis_cianelle</span></li>
          <li className="flex items-center gap-3"><FiGlobe className="w-4 h-4 text-amber-300 flex-shrink-0" /> Snapchat: <span className="text-white">christel_dior</span></li>
        </ul>
      </div>
      <div className="sm:col-span-2 md:col-span-1">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Opening Hours</h3>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-400">
          <p className="flex items-center gap-3"><FiClock className="w-4 h-4 text-amber-300 flex-shrink-0" /> Monday – Saturday: 8:00am GMT – 6:00pm</p>
          <p className="flex items-center gap-3"><FiClock className="w-4 h-4 text-amber-300 flex-shrink-0" /> Sunday: 12:00pm GMT – 6:00pm</p>
        </div>
      </div>
    </div>
    <div className="mt-8 sm:mt-12 border-t border-white/10 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-slate-500">© {new Date().getFullYear()} Cianelle_Luxe Fragrances. All rights reserved.</div>
  </footer>
);

export default MainFooter;
