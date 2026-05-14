import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import AnimatedRoutes from '@/components/layout/AnimatedRoutes';
import SmoothScroll from '@/components/ui/SmoothScroll';
import PageLoader from '@/components/features/common/PageLoader';
// Lazy load VibgyorParticles to avoid blocking initial render
const VibgyorParticles = React.lazy(() => import('@/components/ui/VibgyorParticles'));

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

  // Check if user has visited before in this session
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('stellar-loader-shown') === 'true';
    setHasLoadedBefore(alreadyShown);
    // Only show loader on first visit for 1.5 seconds max
    if (!alreadyShown) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem('stellar-loader-shown', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <BrowserRouter>
      <SmoothScroll>
        {/* Show loader overlay only on first visit, non-blocking */}
        {showLoader && <PageLoader onLoadingComplete={() => setShowLoader(false)} />}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300">
          {/* <VibgyorParticles quantity={200} /> */}
          <Navbar />
          <AnimatedRoutes />
        </motion.div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;