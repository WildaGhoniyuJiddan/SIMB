import React from 'react';
import GlassCard from '../components/GlassCard';
import { Skull, HeartCrack, Home, Droplets } from 'lucide-react';

const impacts = [
  {
    title: "Angka Kematian Tinggi",
    icon: Skull,
    desc: "Tsunami seringkali datang tiba-tiba dengan kekuatan dahsyat, menyebabkan banyak korban jiwa akibat tenggelam atau benturan puing.",
    color: "text-rose-400",
    bg: "bg-rose-500/10"
  },
  {
    title: "Kerusakan Infrastruktur",
    icon: Home,
    desc: "Menghancurkan rumah, jembatan, jalan, dan fasilitas umum. Melumpuhkan ekonomi daerah dalam waktu lama.",
    color: "text-orange-400",
    bg: "bg-orange-500/10"
  },
  {
    title: "Trauma Psikologis",
    icon: HeartCrack,
    desc: "Kehilangan keluarga dan harta benda menyebabkan PTSD (Post-Traumatic Stress Disorder) pada korban selamat.",
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  },
  {
    title: "Pencemaran & Penyakit",
    icon: Droplets,
    desc: "Rusaknya sanitasi dan sumber air bersih memicu wabah penyakit pasca bencana.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10"
  }
];

const Dampak: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
            <span className="text-rose-400 font-bold tracking-wider uppercase text-sm mb-2 block">Konsekuensi</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Dampak Masif <br/>Bencana Tsunami</h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Tsunami tidak hanya menghancurkan saat gelombang menerjang, namun meninggalkan luka mendalam baik fisik, psikologis, maupun lingkungan yang membutuhkan waktu bertahun-tahun untuk pulih.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
                {impacts.map((item, idx) => (
                    <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-4">
                        <div className={`p-3 rounded-xl ${item.bg} ${item.color} shrink-0`}>
                            <item.icon size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white">{item.title}</h3>
                            <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>

        <div className="relative hidden lg:block h-[600px]">
             {/* Abstract visual representation of impact */}
             <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
             <img 
                src="https://images.unsplash.com/photo-1525381832085-b9f4a56c5e26?q=80&w=1974&auto=format&fit=crop" 
                alt="Destruction" 
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
             />
             <div className="absolute -bottom-6 -left-6 z-20">
                <GlassCard className="bg-slate-900/90 border-rose-500/30">
                    <div className="text-2xl font-bold text-rose-500">Critical</div>
                    <div className="text-sm text-slate-400">Impact Level</div>
                </GlassCard>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Dampak;