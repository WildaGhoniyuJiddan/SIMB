import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Loader2, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      // Berkat proxy Vite: /api -> http://localhost/simatsu-api
      const res = await fetch('/api/loginadmin.php', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Login gagal');
      }

      // ✅ Login sukses
      // Opsi 1: pindah ke halaman admin versi React
      // navigate('/admin');

      // Opsi 2: langsung buka pageadmin.php (versi PHP lama)
      window.location.href = 'http://localhost/simatsu-api/pageadmin.php';
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <GlassCard className="max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Login Admin</h1>
            <p className="text-slate-400 text-sm">
              Masuk untuk mengelola data tsunami & konten sistem.
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-9 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-9 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-rose-400 bg-rose-900/30 border border-rose-500/40 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loading ? 'Memproses...' : 'Masuk sebagai Admin'}</span>
          </button>
        </form>
      </GlassCard>
    </div>
  );
};

export default AdminLogin;