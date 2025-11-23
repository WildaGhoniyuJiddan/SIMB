import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Siren, PersonStanding, HeartHandshake, ArrowRight } from 'lucide-react';
import { MitigationStep } from '../types';

const Mitigasi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'during' | 'after'>('before');

  const tabs = [
    { id: 'before', label: 'Sebelum', icon: Siren, color: 'text-yellow-400' },
    { id: 'during', label: 'Saat Terjadi', icon: PersonStanding, color: 'text-rose-400' },
    { id: 'after', label: 'Setelah', icon: HeartHandshake, color: 'text-emerald-400' },
  ];

  const content: Record<string, MitigationStep[]> = {
    before: [
      { title: "Kenali Tanda Alam", description: "Perhatikan surutnya air laut secara tiba-tiba dan suara gemuruh.", icon: "🌊" },
      { title: "Pahami Rute Evakuasi", description: "Hafalkan jalur menuju dataran tinggi terdekat.", icon: "🗺️" },
      { title: "Siapkan Tas Siaga", description: "Obat-obatan, senter, dokumen penting, dan makanan darurat.", icon: "🎒" },
      { title: "Simulasi Bencana", description: "Ikuti latihan evakuasi yang diadakan pemerintah setempat.", icon: "🏃" },
    ],
    during: [
      { title: "JANGAN Ke Pantai", description: "Jika gempa kuat terjadi, segera jauhi pantai. Jangan tunggu sirine.", icon: "🚫" },
      { title: "Cari Tempat Tinggi", description: "Lari ke bukit atau gedung tinggi yang kokoh.", icon: "⛰️" },
      { title: "Tinggalkan Kendaraan", description: "Jalanan akan macet. Lari lebih cepat menyelamatkan nyawa.", icon: "🚗" },
      { title: "Pantau Informasi", description: "Dengarkan radio atau arahan petugas berwenang.", icon: "📻" },
    ],
    after: [
      { title: "Waspada Gelombang Susulan", description: "Tsunami biasanya terdiri dari beberapa gelombang.", icon: "⚠️" },
      { title: "Hindari Area Rusak", description: "Puing-puing dan kabel listrik putus sangat berbahaya.", icon: "🏚️" },
      { title: "Periksa Ketersediaan", description: "Cek stok makanan dan air bersih. Jangan minum air sembarangan.", icon: "💧" },
      { title: "Bantu Sesama", description: "Berikan pertolongan pertama pada korban luka jika mampu.", icon: "🤝" },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto min-h-[80vh]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Panduan Mitigasi</h1>
        <p className="text-slate-400">Langkah tepat menyelamatkan nyawa.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-900/50 backdrop-blur-md p-1 rounded-2xl flex gap-2 border border-white/10">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {content[activeTab].map((step, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="flex gap-4 items-start group hover:bg-white/10">
              <div className="text-4xl bg-slate-900/50 p-3 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </GlassCard>
          ))}
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