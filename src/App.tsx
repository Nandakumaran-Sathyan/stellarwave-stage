import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import TeamsPage from '@/pages/TeamsPage';
import ClientPage from '@/pages/ClientPage';
import PageLoader from '@/components/features/common/PageLoader';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PageLoader onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background-dark text-white font-sans antialiased">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/client" element={<ClientPage />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;