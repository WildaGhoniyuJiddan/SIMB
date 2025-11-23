import React from 'react';
import GlassCard from '../components/GlassCard';

const impacts = [
  {
    title: "Penyakit & Pencemaran",
    desc: "Gelombang tsunami menyebabkan surutnya air dan memberikan dampak pada kerusakan infrastruktur pembuangan limbah, memicu wabah penyakit.",
    img: "/assets/penyakit.avif",
    color: "border-cyan-500/30"
  },
  {
    title: "Angka Kematian Tinggi",
    desc: "Tingginya korban jiwa disebabkan tenggelam, benturan puing, atau terjebak reruntuhan bangunan.",
    img: "/assets/angkakematianmeningkat.jpeg",
    color: "border-rose-500/30"
  },
  {
    title: "Trauma Psikologis",
    desc: "Korban selamat sering mengalami trauma mendalam, kehilangan keluarga, dan PTSD yang membutuhkan pemulihan lama.",
    img: "/assets/trauma.webp",
    color: "border-purple-500/30"
  },
  {
    title: "Kerusakan Lingkungan & Infrastruktur",
    desc: "Menghancurkan ekosistem pesisir, perumahan, dan fasilitas umum, melumpuhkan ekonomi daerah.",
    img: "/assets/kerusakan.jpg",
    color: "border-orange-500/30"
  }
];

const Dampak: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-rose-400 font-bold tracking-wider uppercase text-sm mb-2 block">Konsekuensi</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dampak Masif Tsunami</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
            Tsunami meninggalkan luka mendalam baik fisik, psikologis, maupun lingkungan yang membutuhkan waktu bertahun-tahun untuk pulih.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {impacts.map((item, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className={`flex flex-col overflow-hidden p-0 border-t-4 ${item.color}`}>
                <div className="relative h-64 overflow-hidden">
                    <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    </div>
                </div>
                <div className="p-6 bg-slate-900/40 flex-1">
                    <p className="text-slate-300 leading-relaxed">
                        {item.desc}
                    </p>
                </div>
            </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Dampak;