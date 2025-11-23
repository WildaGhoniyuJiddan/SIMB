import React from 'react';
import GlassCard from '../components/GlassCard';
import { MapPin } from 'lucide-react';
import { TsunamiEvent } from '../types';

const events: TsunamiEvent[] = [
  {
    id: 1,
    year: 2018,
    location: "Palu & Donggala",
    magnitude: 7.4,
    height: 6,
    casualties: 4340,
    description: "Gempa bermagnitudo 7.4 memicu tsunami akibat longsoran bawah laut di Teluk Palu.",
    image: "/assets/palu.jpg"
  },
  {
    id: 2,
    year: 2018,
    location: "Selat Sunda",
    magnitude: 0,
    height: 5,
    casualties: 437,
    description: "Dipicu oleh longsoran tubuh Gunung Anak Krakatau ke laut, tanpa didahului gempa tektonik yang kuat.",
    image: "/assets/selatsunda.jpg"
  },
  {
    id: 3,
    year: 2011,
    location: "Tohoku, Jepang",
    magnitude: 9.0,
    height: 40.5,
    casualties: 19747,
    description: "Salah satu gempa terbesar dalam sejarah, menyebabkan kecelakaan nuklir Fukushima.",
    image: "/assets/jepang.jpg"
  },
  {
    id: 4,
    year: 2004,
    location: "Aceh, Indonesia",
    magnitude: 9.1,
    height: 30,
    casualties: 227000,
    description: "Bencana tsunami paling mematikan dalam sejarah modern, berdampak pada 14 negara.",
    image: "/assets/aceh.jpg"
  }
];

const Sejarah: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Jejak Sejarah</h1>
        <p className="text-slate-400">Mempelajari masa lalu untuk menyelamatkan masa depan.</p>
      </div>

      <div className="relative">
        {/* Center Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent rounded-full hidden md:block opacity-30"></div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={event.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <div className="relative group overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl">
                    <img 
                        src={event.image} 
                        alt={event.location} 
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-md">{event.year}</span>
                    </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                 <GlassCard hoverEffect={false} className="relative">
                    {/* Dot connector for desktop */}
                    <div className={`absolute top-1/2 ${index % 2 === 0 ? '-right-[42px]' : '-left-[42px]'} w-5 h-5 bg-cyan-400 rounded-full border-4 border-slate-900 hidden md:block transform -translate-y-1/2 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10`}></div>
                    
                    <div className="flex items-center gap-2 mb-2 text-cyan-300">
                        <MapPin size={16} />
                        <span className="font-semibold tracking-wide uppercase text-sm">{event.location}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{event.year} Tsunami</h2>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 border-b border-white/10 pb-4">
                        {event.description}
                    </p>
                    <div className="flex justify-between text-sm">
                        <div className="text-center">
                            <div className="text-xs text-slate-400 uppercase">Mag</div>
                            <div className="font-bold text-white">{event.magnitude > 0 ? event.magnitude : '-'} SR</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-slate-400 uppercase">Tinggi</div>
                            <div className="font-bold text-cyan-300">{event.height}m</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-slate-400 uppercase">Korban</div>
                            <div className="font-bold text-rose-400">{event.casualties.toLocaleString()}</div>
                        </div>
                    </div>
                 </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sejarah;