import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Siren, 
  PersonStanding, 
  HeartHandshake, 
  Waves, 
  Radio, 
  Map, 
  Megaphone, 
  Anchor, 
  Car, 
  HelpingHand, 
  Home, 
  Utensils, 
  Stethoscope, 
  Tent,
  CheckCircle2
} from 'lucide-react';

const Mitigasi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'during' | 'after'>('before');

  // Tema warna per tab
  const theme = {
    before: {
      color: 'text-amber-400',
      bg: 'bg-amber-400/20',
      border: 'border-amber-400/30',
      gradient: 'from-amber-500/20 to-orange-500/5',
    },
    during: {
      color: 'text-rose-500',
      bg: 'bg-rose-500/20',
      border: 'border-rose-500/30',
      gradient: 'from-rose-600/20 to-red-600/5',
    },
    after: {
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/20',
      border: 'border-emerald-400/30',
      gradient: 'from-emerald-500/20 to-teal-500/5',
    }
  };

  const tabs = [
    { id: 'before', label: 'Prabencana', icon: Siren, desc: 'Persiapan Sebelum Terjadi' },
    { id: 'during', label: 'Saat Terjadi', icon: PersonStanding, desc: 'Tindakan Darurat' },
    { id: 'after', label: 'Pascabencana', icon: HeartHandshake, desc: 'Pemulihan & Evakuasi' },
  ] as const;

  const content = {
    before: [
      { title: "Kenali Tanda Alam", description: "Perhatikan surutnya air laut secara tiba-tiba, suara gemuruh seperti pesawat/kereta api, dan perilaku hewan yang aneh.", icon: Waves, image: "/assets/tandatsunami.jpg" },
      { title: "Pantau Informasi", description: "Selalu update dengan informasi resmi dari BMKG atau BPBD melalui radio, TV, atau aplikasi resmi.", icon: Radio, image: "/assets/pusatresmi.jpg" },
      { title: "Hafalkan Jalur Evakuasi", description: "Ketahui rute tercepat menuju dataran tinggi (Tsunami Safe Zone) dari rumah atau tempat kerja Anda.", icon: Map, image: "/assets/peta.jpg" },
      { title: "Latihan & Sosialisasi", description: "Ikuti simulasi bencana secara rutin agar tidak panik saat kejadian sebenarnya.", icon: Megaphone, image: "/assets/sosialisasi.jpg" },
    ],
    during: [
      { title: "Lari ke Tempat Tinggi", description: "Jangan menunggu peringatan! Jika gempa kuat >30 detik, segera lari ke bukit atau gedung tinggi.", icon: PersonStanding, image: "/assets/lariketinggi.jpg" },
      { title: "Jauhi Pantai & Sungai", description: "Gelombang tsunami bisa masuk melalui aliran sungai. Jauhi area perairan sejauh mungkin.", icon: Anchor, image: "/assets/tetapdilaut.jpg" },
      { title: "Tinggalkan Kendaraan", description: "Jalanan akan macet total. Berlari adalah cara tercepat untuk menyelamatkan diri.", icon: Car, image: "/assets/tinggalkankendaraan.jpg" },
      { title: "Waspada Gelombang Susulan", description: "Tsunami bukan satu gelombang. Gelombang berikutnya seringkali lebih besar.", icon: Waves, image: "/assets/susulan.jpg" },
      { title: "Selamatkan Diri Dulu", description: "Pastikan Anda selamat sebelum membantu orang lain. Jangan kembali demi harta benda.", icon: HelpingHand, image: "/assets/bantusesama.jpeg" },
    ],
    after: [
      { title: "Hindari Bangunan Rusak", description: "Waspada reruntuhan susulan. Jangan masuk ke rumah yang strukturnya sudah rapuh.", icon: Home, image: "/assets/tempatrusak.jpg" },
      { title: "Cek Logistik & Air", description: "Jangan minum air keran/sumur yang mungkin tercemar. Gunakan stok air kemasan.", icon: Utensils, image: "/assets/cekketersediaan.jpg" },
      { title: "Pertolongan Pertama", description: "Berikan bantuan medis darurat pada korban luka jika Anda memiliki kemampuan.", icon: Stethoscope, image: "/assets/p3k.jpg" },
      { title: "Menuju Pengungsian", description: "Ikuti arahan petugas menuju posko bantuan untuk pendataan dan logistik.", icon: Tent, image: "/assets/tenda.jpg" },
    ]
  };

  const currentTheme = theme[activeTab];

  return (
    <div className="max-w-6xl mx-auto min-h-[80vh]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Panduan Mitigasi</h1>
        <p className="text-slate-400">Ikuti prosedur keselamatan standar internasional.</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;
          const tabTheme = theme[tab.id];

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative p-4 rounded-2xl border transition-all duration-300 text-left group overflow-hidden
                ${isActive ? `bg-slate-800 ${tabTheme.border} shadow-lg` : 'bg-white/5 border-white/5 hover:bg-white/10'}
              `}
            >
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${tabTheme.gradient} opacity-25`} />
              )}

              <div className="relative z-10 flex items-center gap-4">
                <div
                  className={`
                    p-3 rounded-xl transition-colors duration-300
                    ${isActive ? `${tabTheme.bg} ${tabTheme.color}` : 'bg-slate-700 text-slate-400 group-hover:text-white'}
                  `}
                >
                  <TabIcon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {tab.label}
                  </h3>
                  <p className="text-xs text-slate-400">{tab.desc}</p>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="check-indicator"
                    className={tabTheme.color}
                  >
                    <CheckCircle2 size={20} />
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Content cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {content[activeTab].map((step, idx) => {
            const Icon = step.icon;
            return (
              <GlassCard
                key={idx}
                delay={idx * 0.1}
                hoverEffect={true}
                className={`
                  group relative p-0 overflow-hidden border-l-4
                  ${currentTheme.border.replace('30', '50')}
                `}
              >
                <div className="flex h-full">
                  {/* Kolom nomor dan icon */}
                  <div className="w-16 flex flex-col items-center pt-6 gap-2 border-r border-white/5 bg-slate-900/30">
                    <span className={`text-xl font-bold ${currentTheme.color}`}>{idx + 1}</span>
                    <div className="w-8 h-[2px] bg-white/20" />
                    <div className="mt-2 text-slate-500 group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* Kolom teks + gambar di kanan */}
                  <div className="flex-1 p-5 relative">
                    <div
                      className={`
                        absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
                        bg-gradient-to-br ${currentTheme.gradient}
                      `}
                    />

                    <div className="relative z-10 flex items-center gap-4">
                      {/* Teks (kiri) */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300">
                          {step.description}
                        </p>
                      </div>

                      {/* Gambar (kanan) – lebih besar dan tidak memotong teks */}
                      {step.image && (
                        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden border border-white/15 shadow-lg">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Mitigasi;