import React from 'react';

const WaveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-ocean-900 to-slate-900"></div>

      {/* Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

      {/* --- ANIMATED WAVES SECTION --- */}
      <div className="absolute bottom-0 left-0 w-full leading-[0]">
        <style>{`
          .waves {
            position: relative;
            width: 100%;
            height: 15vh;
            margin-bottom: -7px; /* Fix for safari gap */
            min-height: 100px;
            max-height: 150px;
          }
          .parallax > use {
            animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
          }
          .parallax > use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
          }
          .parallax > use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
          }
          .parallax > use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
          }
          .parallax > use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
          }
          @keyframes move-forever {
            0% { transform: translate3d(-90px,0,0); }
            100% { transform: translate3d(85px,0,0); }
          }
        `}</style>
        
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            {/* Layer 1: Paling belakang, transparan, cepat */}
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(6, 182, 212, 0.2)" /> 
            
            {/* Layer 2: Tengah, agak transparan */}
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(6, 182, 212, 0.3)" />
            
            {/* Layer 3: Depan, warna solid cyan gelap */}
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(8, 145, 178, 0.4)" />
            
            {/* Layer 4: Paling depan, membaur dengan footer jika ada, atau sekedar aksen */}
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(15, 23, 42, 0.3)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WaveBackground;