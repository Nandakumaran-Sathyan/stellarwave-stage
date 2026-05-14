import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  onLoadingComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 10000); // Temporary 10 second preview

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
        <div className="relative flex h-36 w-36 items-center justify-center" style={{ perspective: '1200px' }}>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(131,80,232,0.38)_0%,rgba(131,80,232,0.16)_34%,rgba(131,80,232,0)_70%)] blur-2xl" />
          <motion.div
            className="absolute inset-5 rounded-full border border-white/20 dark:border-white/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
            style={{
              borderStyle: 'dashed',
              filter: 'drop-shadow(0 0 10px rgba(131, 80, 232, 0.45))',
              transformOrigin: 'center',
              willChange: 'transform',
            }}
          />
          <motion.div
            className="relative z-10 flex h-28 w-28 items-center justify-center will-change-transform"
            animate={{ rotateY: 360, rotateZ: 8 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src="/assets/logo-2.png"
              alt="StellarWave Logo"
              className="h-full w-full object-contain dark:invert-0"
              style={{
                filter: 'drop-shadow(0 0 18px rgba(220, 230, 240, 0.42)) drop-shadow(0 0 30px rgba(131, 80, 232, 0.28))',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          </motion.div>
        </div>
        <p className="font-medium text-black dark:text-white">Destination : StellarWave</p>
      </div>
    </motion.div>
  );
};

export default PageLoader;
