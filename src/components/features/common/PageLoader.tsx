import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  onLoadingComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 1200); // Minimal delay - fast fade out

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);



  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-colors duration-300 will-change-[opacity]">
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(131,80,232,0.38)_0%,rgba(131,80,232,0.16)_34%,rgba(131,80,232,0)_70%)] blur-2xl" />
          <motion.div
            className="absolute inset-2 rounded-full bg-[conic-gradient(from_90deg,transparent_0deg,rgba(131,80,232,0.95)_60deg,rgba(255,255,255,0.25)_110deg,transparent_180deg,rgba(131,80,232,0.8)_250deg,transparent_360deg)] [mask:radial-gradient(circle,transparent_0_48%,#000_49%_60%,transparent_61%)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              filter: 'drop-shadow(0 0 12px rgba(131, 80, 232, 0.65)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.2))',
              transformOrigin: 'center',
              willChange: 'transform',
            }}
          />
          <motion.div
            className="absolute inset-5 rounded-full border border-white/20 dark:border-white/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              borderStyle: 'dashed',
              filter: 'drop-shadow(0 0 10px rgba(131, 80, 232, 0.45))',
              transformOrigin: 'center',
              willChange: 'transform',
            }}
          />
          <motion.img
            src="/assets/logo-2.png"
            alt="StellarWave Logo"
            className="relative z-10 h-28 w-28 object-contain dark:invert-0 will-change-transform"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              filter: 'drop-shadow(0 0 18px rgba(220, 230, 240, 0.42)) drop-shadow(0 0 30px rgba(131, 80, 232, 0.28))',
            }}
          />
        </div>
        <p className="font-medium text-black dark:text-white">Destination : StellarWave</p>
      </div>
    </motion.div>
  );
};

export default PageLoader;
