import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WaveBackground from './components/WaveBackground';
import Dashboard from './pages/Dashboard';
import DataTsunami from './pages/DataTsunami';
import Sejarah from './pages/Sejarah';
import Penyebab from './pages/Penyebab';
import Dampak from './pages/Dampak';
import Mitigasi from './pages/Mitigasi';
import VideoEdukasi from './pages/VideoEdukasi';
import PetaSebaran from './pages/PetaSebaran';
import AdminLogin from './pages/AdminLogin';

const App: React.FC = () => {
  return (
    <Router>
      <WaveBackground />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<DataTsunami />} />
          <Route path="/sejarah" element={<Sejarah />} />
          <Route path="/penyebab" element={<Penyebab />} />
          <Route path="/dampak" element={<Dampak />} />
          <Route path="/mitigasi" element={<Mitigasi />} />
          <Route path="/edukasi" element={<VideoEdukasi />} />
          <Route path="/peta" element={<PetaSebaran />} />
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;