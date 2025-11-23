import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Siren, PersonStanding, HeartHandshake } from 'lucide-react';
import { MitigationStep } from '../types';

const Mitigasi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'during' | 'after'>('before');

  const tabs = [
    { id: 'before', label: 'Sebelum', icon: Siren, color: 'text-yellow-400', banner: '/assets/sebelum.png' },
    { id: 'during', label: 'Saat Terjadi', icon: PersonStanding, color: 'text-rose-400', banner: '/assets/saat.png' },
    { id: 'after', label: 'Setelah', icon: HeartHandshake, color: 'text-emerald-400', banner: '/assets/setelah.png' },
  ];

  const content: Record<string, MitigationStep[]> = {
    before: [
      { title: "Kenali Tanda Alam", description: "Perhatikan surutnya air laut secara tiba-tiba dan suara gemuruh.", icon: "🌊", image: "/assets/tandatsunami.jpg" },
      { title: "Pusat Informasi", description: "Ketahui sumber info resmi (BMKG, BNPB) dan sistem peringatan dini.", icon: "📡", image: "/assets/pusatresmi.jpg" },
      { title: "Peta Evakuasi", description: "Pahami rute ke tempat tinggi (tesunami safe zone) terdekat.", icon: "🗺️", image: "/assets/peta.jpg" },
      { title: "Sosialisasi & Edukasi", description: "Ikuti pelatihan dan edukasi tentang bahaya tsunami.", icon: "📢", image: "/assets/sosialisasi.jpg" },
    ],
    during: [
      { title: "Lari ke Tempat Tinggi", description: "Segera lari menjauhi pantai menuju bukit atau gedung tinggi.", icon: "🏃", image: "/assets/lariketinggi.jpg" },
      { title: "Tetap di Laut", description: "Jika berada di perahu, arahkan ke laut lepas, jangan ke pantai.", icon: "⛵", image: "/assets/tetapdilaut.jpg" },
      { title: "Waspada Susulan", description: "Jangan kembali sebelum keadaan dinyatakan aman, gelombang susulan bisa lebih besar.", icon: "⚠️", image: "/assets/susulan.jpg" },
      { title: "Tinggalkan Kendaraan", description: "Jalanan akan macet. Lari lebih cepat menyelamatkan nyawa.", icon: "🚗", image: "/assets/tinggalkankendaraan.jpg" },
      { title: "Saring Informasi", description: "Hanya percayai info resmi, jangan termakan hoax.", icon: "📱", image: "/assets/saring.jpg" },
      { title: "Bantu Sesama", description: "Prioritaskan nyawa, bantu lansia dan anak-anak.", icon: "🤝", image: "/assets/bantusesama.jpeg" },
    ],
    after: [
      { title: "Hindari Tempat Rusak", description: "Jauhi bangunan retak dan kabel listrik yang putus.", icon: "🏚️", image: "/assets/tempatrusak.jpg" },
      { title: "Cek Makanan", description: "Pastikan makanan dan air tidak tercemar air banjir.", icon: "💧", image: "/assets/cekketersediaan.jpg" },
      { title: "Bantuan P3K", description: "Berikan pertolongan pertama pada korban luka ringan.", icon: "⛑️", image: "/assets/p3k.jpg" },
      { title: "Tenda Pengungsian", description: "Segera menuju posko pengungsian jika rumah tidak aman.", icon: "⛺", image: "/assets/tenda.jpg" },
    ]
  };

  return (
    <div className="max-w-6xl mx-auto min-h-[80vh]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Panduan Mitigasi</h1>
        <p className="text-slate-400">Langkah tepat menyelamatkan nyawa.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-12 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-md p-1 rounded-2xl flex flex-wrap justify-center gap-2 border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                relative px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300
                ${activeTab === tab.id ? 'text-white shadow-lg' : 'text-slate-400 hover:text-white'}
              `}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                />
              )}
              <tab.icon size={18} className={activeTab === tab.id ? tab.color : ''} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {content[activeTab].map((step, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col sm:flex-row gap-4 items-start group hover:bg-white/10 p-0 overflow-hidden">
                   {step.image && (
                       <div className="w-full sm:w-1/3 h-48 sm:h-auto relative shrink-0">
                           <img src={step.image} alt={step.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       </div>
                   )}
                  <div className="p-5 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{step.title}</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </GlassCard>
            ))}
            </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 text-center">
         <p className="text-slate-400 text-sm italic border p-4 rounded-xl border-dashed border-white/20 inline-block">
            "Kesiapsiagaan adalah kunci keselamatan. Jangan panik, tetap waspada."
         </p>
      </div>
    </div>
  );
};

export default Mitigasi;