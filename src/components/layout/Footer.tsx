import React from 'react';
import { Footer as FooterSection } from '@/components/ui/footer-section';

const Footer: React.FC = () => {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white relative z-20 pt-12 transition-colors duration-300">
      <FooterSection />
    </div>
  );
};

export default Footer;