import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Users, Globe2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop" 
            alt="Ocean Wave" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 md:p-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 text-sm font-bold tracking-wider mb-4 backdrop-blur-md">
              DISASTER AWARENESS
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kenali Bahaya <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Tsunami</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed backdrop-blur-sm bg-black/10 rounded-xl p-2">
              Gelombang laut raksasa yang disebabkan oleh gangguan dasar laut. Memahami karakteristiknya adalah kunci keselamatan kita.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/data">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2"
                >
                  Lihat Data <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/peta">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition-colors"
                >
                  Peta Sebaran
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard delay={0.2} className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-rose-500/20 text-rose-400">
            <Activity size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-bold">47</h3>
            <p className="text-slate-400 text-sm">Kejadian Tsunami Besar</p>
          </div>
        </GlassCard>

        <GlassCard delay={0.3} className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-orange-500/20 text-orange-400">
            <Users size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-bold">230K+</h3>
            <p className="text-slate-400 text-sm">Total Korban Jiwa</p>
          </div>
        </GlassCard>

        <GlassCard delay={0.4} className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Globe2 size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-bold">15</h3>
            <p className="text-slate-400 text-sm">Provinsi Terdampak</p>
          </div>
        </GlassCard>
      </div>

      {/* Info Section */}
      <GlassCard delay={0.5}>
         <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Apa itu Tsunami?</h2>
                <p className="text-slate-300 leading-relaxed text-justify">
                  Istilah dalam bahasa Jepang yang berarti gelombang ('nami') di pelabuhan ('tsu'). Tsunami adalah serangkaian gelombang yang bergerak dengan panjang dan periode yang sangat panjang, biasanya disebabkan oleh gangguan yang terkait dengan gempa bumi yang terjadi di bawah atau di dekat dasar laut.
                </p>
            </div>
            <div className="w-full md:w-1/3">
                <div className="bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-white/5">
                    <h3 className="font-bold mb-3 text-cyan-300">Tanda-tanda Alam</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex gap-2"><span className="text-cyan-400">●</span> Gempa bumi kuat &gt; 30 detik</li>
                        <li className="flex gap-2"><span className="text-cyan-400">●</span> Suara gemuruh dari laut</li>
                        <li className="flex gap-2"><span className="text-cyan-400">●</span> Air laut surut tiba-tiba</li>
                    </ul>
                </div>
            </div>
         </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;