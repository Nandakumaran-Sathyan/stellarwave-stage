import React from 'react';
import { Footer as FooterSection } from './ui/footer-section';

const Footer: React.FC = () => {
  return (
    <div className="bg-black relative z-20 pt-12">
      <FooterSection />
    </div>
  );
};

export default Footer;