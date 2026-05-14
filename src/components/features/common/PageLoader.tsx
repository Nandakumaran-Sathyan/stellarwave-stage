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
        <motion.img
          src="/assets/logo-2.png"
          alt="StellarWave Logo"
          className="h-28 w-28 object-contain dark:invert-0 will-change-transform"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            filter: 'drop-shadow(0 0 28px rgba(220, 230, 240, 0.55))',
          }}
        />
        <p className="font-medium text-black dark:text-white">Destination : StellarWave</p>
      </div>
    </motion.div>
  );
};

export default PageLoader;
