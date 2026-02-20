import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import AnimatedRoutes from '@/components/layout/AnimatedRoutes';
import SmoothScroll from '@/components/ui/SmoothScroll';
import PageLoader from '@/components/features/common/PageLoader';
import VibgyorParticles from '@/components/ui/VibgyorParticles';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PageLoader onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <SmoothScroll>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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