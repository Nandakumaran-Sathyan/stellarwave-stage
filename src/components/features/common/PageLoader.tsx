import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  onLoadingComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-8">
        {/* 3D Rotating Logo Container */}
        <div style={{ perspective: '1200px' }}>
          <motion.div
            animate={{
              rotateY: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/assets/logo-2.png"
              alt="StellarWave Logo"
              className="w-32 h-32 object-contain"
              style={{
                filter: `
                  drop-shadow(0 0 30px rgba(220, 230, 240, 0.9))
                  drop-shadow(0 0 60px rgba(180, 190, 200, 0.7))
                  drop-shadow(0 10px 40px rgba(160, 170, 180, 0.6))
                  drop-shadow(0 20px 60px rgba(140, 150, 160, 0.5))
                  drop-shadow(0 0 100px rgba(200, 210, 220, 0.4))
                `
              }}
            />
          </motion.div>
        </div>
        <p className="font-medium text-white">Destination : StellarWave</p>
      </div>
    </motion.div>
  );
};

export default PageLoader;
