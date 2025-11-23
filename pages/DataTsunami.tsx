import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import GlassCard from '../components/GlassCard';
import { Loader2 } from 'lucide-react';

interface TsunamiStats {
  year: number;
  count: number;
}

interface TsunamiRecord {
  id: number | null;
  tanggal: string;
  waktu: string;
  lokasi: string;
  magnitudo: number;
  kedalaman: string;
  dampak: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  chart: {
    labels: number[];
    counts: number[];
  };
  records: TsunamiRecord[];
}

const DataTsunami: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<TsunamiStats[]>([]);
  const [records, setRecords] = useState<TsunamiRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/data.php');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json: ApiResponse = await res.json();
        if (!json.success) {
          console.error('API gagal:', json.message);
          return;
        }

        const labels = json.chart?.labels ?? [];
        const counts = json.chart?.counts ?? [];

        const mapped: TsunamiStats[] = labels.map((year, index) => ({
          year,
          count: counts[index] ?? 0,
        }));

        setChartData(mapped);
        setRecords(json.records);
      } catch (error) {
        console.error('Gagal mengambil data dari database:', error);
      } finally {
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

  const worstYear =
    chartData.length > 0
      ? chartData.reduce((max, prev) =>
          prev.count > max.count ? prev : max
        )
      : null;

  const formatTanggal = (tanggal: string) => {
    const d = new Date(tanggal);
    if (Number.isNaN(d.getTime())) return tanggal;
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(d);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Data & Statistik
        </h1>
        <p className="text-slate-400">
          Analisis frekuensi kejadian tsunami di Indonesia. Data diambil
          langsung dari database.
        </p>
      </div>

      {/* GRAFIK + KARTU RINGKASAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Grafik Frekuensi Kejadian</h2>
            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
              ● Live Data
            </span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  formatter={(value: number) =>
                    new Intl.NumberFormat('id-ID').format(value)
                  }
                  labelFormatter={(label) => `Tahun ${label}`}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#f43f5e' : '#0ea5e9'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="bg-gradient-to-br from-rose-900/40 to-slate-900/40 border-rose-500/30">
            <div className="text-rose-400 text-sm font-bold uppercase tracking-wider mb-1">
              Tahun Terbanyak
            </div>
            <div className="text-4xl font-bold text-white">
              {worstYear ? worstYear.year : '-'}
            </div>
            <div className="text-slate-400 text-sm mt-2">
              Berdasarkan jumlah kejadian tsunami terbanyak dalam database.
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-500/30">
            <div className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">
              Total Tahun Tercatat
            </div>
            <div className="text-4xl font-bold text-white">
              {chartData.length}
            </div>
            <div className="text-slate-400 text-sm mt-2">
              Tahun kejadian yang tercatat di sistem.
            </div>
          </GlassCard>
        </div>
      </div>

      {/* TABEL DATA RIWAYAT KEJADIAN */}
      <GlassCard delay={0.15} className="mt-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <div>
            <h2 className="text-xl font-bold text-white">
              Daftar Riwayat Kejadian Tsunami
            </h2>
            <p className="text-slate-400 text-sm">
              Data diambil dari tabel <code>data_tsunami</code>.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-sky-700/90 text-white">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Waktu Kejadian</th>
                <th className="px-4 py-3 text-left">Lokasi</th>
                <th className="px-4 py-3 text-left">Magnitudo</th>
                <th className="px-4 py-3 text-left">Kedalaman</th>
                <th className="px-4 py-3 text-left">Dampak</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900/40 divide-y divide-white/5">
              {records.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    Belum ada data tsunami yang tercatat.
                  </td>
                </tr>
              )}

              {records.map((row, idx) => (
                <tr key={row.id ?? idx} className="hover:bg-slate-800/60">
                  <td className="px-4 py-4 align-top text-slate-300">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="font-semibold text-white">
                      {formatTanggal(row.tanggal)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {row.waktu} WIB
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-slate-100">
                    {row.lokasi}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span className="inline-flex items-center rounded-full bg-lime-200/90 text-lime-800 text-xs font-semibold px-3 py-1">
                      {row.magnitudo} SR
                    </span>
                  </td>
                  <td className="px-4 py-4 align-top text-slate-100">
                    {row.kedalaman}
                  </td>
                  <td className="px-4 py-4 align-top text-slate-100 max-w-xl">
                    {row.dampak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard delay={0.3}>
        <h3 className="text-xl font-bold mb-4 text-cyan-400">
          Integrasi Database
        </h3>
        <p className="text-slate-300 leading-relaxed">
        </p>
      </GlassCard>
    </div>
  );
};

export default DataTsunami;