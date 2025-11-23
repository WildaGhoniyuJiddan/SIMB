import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  History, 
  Zap, 
  AlertTriangle, 
  Compass, 
  PlayCircle, 
  Map as MapIcon,
  Menu,
  X,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Data Tsunami', path: '/data', icon: BarChart3 },
  { label: 'Sejarah', path: '/sejarah', icon: History },
  { label: 'Penyebab', path: '/penyebab', icon: Zap },
  { label: 'Dampak', path: '/dampak', icon: AlertTriangle },
  { label: 'Mitigasi', path: '/mitigasi', icon: Compass },
  { label: 'Edukasi', path: '/edukasi', icon: PlayCircle },
  { label: 'Peta', path: '/peta', icon: MapIcon },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center gap-2">
           {/* Ganti src ini dengan path gambar Anda di folder public */}
           <img src="/assets/logosimbb.png" alt="Logo" className="w-8 h-8 object-contain" onError={(e) => {
             // Fallback jika gambar belum ada
             e.currentTarget.style.display = 'none';
             e.currentTarget.nextElementSibling?.classList.remove('hidden');
           }}/>
           <div className="hidden w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-glow">S</div>
           <span className="font-bold text-lg tracking-wider">SIMATSU</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`
              fixed md:sticky top-0 left-0 h-screen w-64 
              bg-slate-900/40 backdrop-blur-2xl border-r border-white/10
              z-40 flex flex-col
              ${isSidebarOpen ? 'block' : 'hidden md:flex'}
            `}
          >
            <div className="p-8 flex flex-col items-center justify-center border-b border-white/5">
               <motion.div 
                 animate={{ y: [0, -5, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="w-20 h-20 mb-4 flex items-center justify-center"
               >
                  {/* LOGO IMAGE: Pastikan file ada di public/assets/logosimbb.png */}
                  <img 
                    src="/assets/logosimbb.png" 
                    alt="SIMATSU Logo" 
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                    onError={(e) => {
                      // Fallback visual jika gambar tidak ditemukan
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">S</div>';
                    }}
                  />
               </motion.div>
               <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-white">SIMATSU</h1>
               <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Disaster Management</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                      ${isActive ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    <item.icon size={20} className={isActive ? 'text-cyan-400' : 'group-hover:text-cyan-300 transition-colors'} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                    {isActive && <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-full bg-cyan-400 rounded-r-full" />}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/5">
              <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all group">
                <UserCircle size={20} />
                <span className="font-medium">Admin Login</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;