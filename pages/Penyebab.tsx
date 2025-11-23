import React from 'react';
import GlassCard from '../components/GlassCard';

const causes = [
  {
    title: "Longsor Bawah Laut",
    desc: "Runtuhan material di lereng dasar laut menyebabkan perubahan mendadak pada volume air.",
    img: "/assets/longsor.webp",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Gunung Berapi Bawah Laut",
    desc: "Letusan kuat dapat memicu pergerakan tanah atau kolom air yang masif.",
    img: "/assets/gunung.jpg",
    color: "from-red-500 to-rose-600"
  },
  {
    title: "Gempa Bumi Tektonik",
    desc: "Penyebab paling umum. Pergeseran lempeng vertikal di dasar laut.",
    img: "/assets/gempa.png",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Benda Langit (Meteor)",
    desc: "Sangat jarang, namun hantaman benda langit besar ke laut dapat memicu mega-tsunami.",
    img: "/assets/benda.jpg",
    color: "from-purple-500 to-violet-600"
  }
];

const Penyebab: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Penyebab Tsunami</h1>
        <p className="text-slate-400">Memahami pemicu gelombang maut.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {causes.map((item, idx) => (
          <GlassCard key={idx} delay={idx * 0.1} className="h-full flex flex-col p-0 overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-40 mix-blend-multiply`}></div>
            </div>
            <div className="p-6 flex-1 flex flex-col relative bg-slate-900/40">
                <div className={`absolute -top-8 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center text-white font-bold text-xl`}>
                    {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Penyebab;