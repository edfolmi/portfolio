import { useEffect, useState } from "react";


// ============================================
// PRELOADER
// ============================================
const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stages = ['Loading assets', 'Preparing experience', 'Almost ready'];
    const stageInterval = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 800);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(stageInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(stageInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-950 z-[9999] flex items-center justify-center">
      <div className="text-center relative">
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-cyan-400/20 rounded-full animate-ping" />
          <div className="absolute w-32 h-32 border-2 border-amber-400/20 rounded-full animate-pulse" />
        </div>
        
        <div className="relative z-10">
          <div className="text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-white to-amber-400 bg-clip-text text-transparent animate-pulse">
            Edfolmi
          </div>
          
          <div className="w-80 h-2 bg-slate-800 rounded-full overflow-hidden mb-4 mx-auto">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          
          <div className="text-cyan-400 font-mono text-lg mb-2">{Math.floor(progress)}%</div>
          <div className="text-gray-500 text-sm animate-pulse">
            {['Loading assets', 'Preparing experience', 'Almost ready'][stage]}...
          </div>
        </div>
      </div>
    </div>
  );
};

export { Preloader };
