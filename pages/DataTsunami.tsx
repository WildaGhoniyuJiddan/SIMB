import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import GlassCard from '../components/GlassCard';

const data = [
  { year: '2004', casualties: 227000, label: 'Aceh' },
  { year: '2006', casualties: 668, label: 'Pangandaran' },
  { year: '2010', casualties: 435, label: 'Mentawai' },
  { year: '2018', casualties: 4340, label: 'Palu' },
  { year: '2018', casualties: 437, label: 'Selat Sunda' },
];

const DataTsunami: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Data & Statistik</h1>
        <p className="text-slate-400">Analisis kejadian tsunami besar di Indonesia dalam dua dekade terakhir.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <h2 className="text-xl font-bold mb-6">Grafik Korban Jiwa</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="casualties" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : '#0ea5e9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-6">
            <GlassCard className="bg-gradient-to-br from-rose-900/40 to-slate-900/40 border-rose-500/30">
                <div className="text-rose-400 text-sm font-bold uppercase tracking-wider mb-1">Tahun Terparah</div>
                <div className="text-4xl font-bold text-white">2004</div>
                <div className="text-slate-400 text-sm mt-2">Gempa & Tsunami Aceh dengan magnitudo 9.1-9.3 SR.</div>
            </GlassCard>

             <GlassCard className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-500/30">
                <div className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Total Kejadian (2018)</div>
                <div className="text-4xl font-bold text-white">2</div>
                <div className="text-slate-400 text-sm mt-2">Tsunami Palu & Selat Sunda terjadi dalam satu tahun yang sama.</div>
            </GlassCard>
        </div>
      </div>

      <GlassCard delay={0.3}>
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Analisis Singkat</h3>
        <p className="text-slate-300 leading-relaxed">
            Data menunjukkan bahwa wilayah Indonesia sangat rentan terhadap tsunami, terutama di sepanjang zona subduksi pertemuan lempeng. Tahun 2004 menjadi pengingat terbesar akan kekuatan alam ini. Namun, kejadian di Palu (2018) mengajarkan kita tentang bahaya longsoran bawah laut dan likuifaksi, sementara Selat Sunda (2018) mengingatkan akan bahaya vulkanik Anak Krakatau.
        </p>
      </GlassCard>
    </div>
  );
};

export default DataTsunami;