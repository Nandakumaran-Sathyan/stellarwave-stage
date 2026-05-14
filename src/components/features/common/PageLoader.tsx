import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  onLoadingComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show loader for 10s, then fade out smoothly before completing
    const showDuration = 10000; // ms
    const fadeDuration = 450; // ms (matches animation timing)

    const timer = setTimeout(() => {
      setFadeOut(true);
      const finish = setTimeout(() => onLoadingComplete(), fadeDuration);
      return () => clearTimeout(finish);
    }, showDuration);

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
          {/* Static neon background with vignette effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full"
            animate={fadeOut ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              background: `
                radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 34%, rgba(255,255,255,0) 70%),
                radial-gradient(circle, transparent 50%, rgba(0,0,0,0.3) 100%)
              `,
              filter: 'blur(22px)',
              boxShadow: '0 0 36px rgba(255,255,255,0.8), inset 0 0 36px rgba(0,0,0,0.15)',
            }}
          />

          {/* Logo spinning on Y axis (sideways 3D) */}
          <motion.div
            className="relative z-10 flex h-28 w-28 items-center justify-center will-change-transform"
            animate={{
              rotateY: fadeOut ? 0 : 360,
              opacity: fadeOut ? 0 : 1,
            }}
            transition={{
              rotateY: fadeOut ? { duration: 0.45, ease: 'easeOut' } : { duration: 4.5, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.45, ease: 'easeOut' },
            }}
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <img
              src="/assets/logo-2.png"
              alt="StellarWave Logo"
              className="h-full w-full object-contain"
              style={{
                filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.12))',
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
