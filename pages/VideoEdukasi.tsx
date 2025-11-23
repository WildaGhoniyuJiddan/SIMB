import React from 'react';
import GlassCard from '../components/GlassCard';

const VideoEdukasi: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Video Edukasi</h1>
        <p className="text-slate-400">Visualisasi langkah mitigasi dari BMKG.</p>
      </div>

      <GlassCard className="p-2 md:p-4 bg-black/40 border-cyan-500/30">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/YXpIW3GoGco?autoplay=0&theme=dark&color=white"
            title="Video Mitigasi Tsunami"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </GlassCard>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard delay={0.2} className="text-center">
          <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
            1
          </div>
          <h3 className="font-bold mb-2">Tanggap Gempa</h3>
          <p className="text-sm text-slate-400">
            Waspada jika gempa dirasakan &gt; 1 menit atau guncangan sangat kuat.
          </p>
        </GlassCard>

        <GlassCard delay={0.3} className="text-center">
          <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
            2
          </div>
          <h3 className="font-bold mb-2">Evakuasi Cepat</h3>
          <p className="text-sm text-slate-400">
            Ikuti rambu jalur evakuasi. Jangan gunakan kendaraan bermotor.
          </p>
        </GlassCard>

        <GlassCard delay={0.4} className="text-center">
          <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
            3
          </div>
          <h3 className="font-bold mb-2">Tunggu Arahan</h3>
          <p className="text-sm text-slate-400">
            Pastikan kondisi aman dari otoritas resmi sebelum kembali.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default VideoEdukasi;