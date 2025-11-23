import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import GlassCard from '../components/GlassCard';
import { Loader2 } from 'lucide-react';

// Tipe data sesuaikan dengan struktur database Anda nanti
interface TsunamiStats {
  year: string;
  casualties: number;
  label: string;
}

const DataTsunami: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<TsunamiStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // UNCOMMENT kalau sudah pakai API beneran
        // const response = await fetch('http://localhost/simatsu/api/get_data.php');
        // const result = await response.json();
        // setChartData(result);

        // --- SIMULASI DATA ---
        await new Promise((resolve) => setTimeout(resolve, 1500)); // pura-pura loading
        const mockDataFromDB: TsunamiStats[] = [
          { year: '2004', casualties: 227000, label: 'Aceh' },
          { year: '2006', casualties: 668, label: 'Pangandaran' },
          { year: '2010', casualties: 435, label: 'Mentawai' },
          { year: '2018', casualties: 4340, label: 'Palu' },
          { year: '2018', casualties: 437, label: 'Selat Sunda' },
        ];
        setChartData(mockDataFromDB);
        // ---------------------

      } catch (error) {
        console.error('Gagal mengambil data dari database:', error);
      } finally {
        // ini akan jalan baik try sukses maupun error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-cyan-400">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="animate-pulse">Mengambil data dari Server...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Data & Statistik</h1>
        <p className="text-slate-400">
          Analisis kejadian tsunami besar di Indonesia. Data diambil secara realtime dari database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Grafik Korban Jiwa</h2>
            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
              ● Live Data
            </span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  formatter={(value: number) => new Intl.NumberFormat('id-ID').format(value)}
                />
                <Bar dataKey="casualties" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : '#0ea5e9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-6">
            <GlassCard className="bg-gradient-to-br from-rose-900/40 to-slate-900/40 border-rose-500/30">
                <div className="text-rose-400 text-sm font-bold uppercase tracking-wider mb-1">Kejadian Terparah</div>
                {/* Contoh pengambilan data dinamis paling tinggi */}
                <div className="text-4xl font-bold text-white">
                  {chartData.reduce((max, prev) => prev.casualties > max.casualties ? prev : max, chartData[0]).year}
                </div>
                <div className="text-slate-400 text-sm mt-2">
                   Berdasarkan data korban jiwa tertinggi dalam database.
                </div>
            </GlassCard>

             <GlassCard className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-500/30">
                <div className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Total Data Masuk</div>
                <div className="text-4xl font-bold text-white">{chartData.length}</div>
                <div className="text-slate-400 text-sm mt-2">Record kejadian tercatat di sistem.</div>
            </GlassCard>
        </div>
      </div>

      <GlassCard delay={0.3}>
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Integrasi Database</h3>
        <p className="text-slate-300 leading-relaxed">
            Halaman ini sekarang menggunakan <strong>React Hooks (useEffect & useState)</strong>. 
            Saat ini menampilkan data simulasi. Untuk menghubungkan ke phpMyAdmin asli:
            <br/><br/>
            1. Buat file API PHP (contoh: <code>api.php</code>) yang melakukan query <code>SELECT</code> ke database MySQL Anda.
            <br/>
            2. Pastikan file PHP mengembalikan output <code>json_encode($data)</code>.
            <br/>
            3. Uncomment baris <code>fetch()</code> di dalam kode halaman ini dan arahkan ke URL file PHP tersebut.
        </p>
      </GlassCard>
    </div>
  );
};

export default DataTsunami;