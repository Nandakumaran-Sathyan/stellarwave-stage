import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import VideoHero from './components/VideoHero';
import HeroScroll from './components/HeroScroll';
import Services from './components/Services';
import { Clients } from './components/Clients';
import Team from './components/Team';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PageLoader onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background-dark text-white font-sans antialiased">
      <Navbar />
      <main>
        <VideoHero />
        <HeroScroll />
        <Services />
        <Clients />
        <Team />
        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;