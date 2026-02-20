import React from 'react';
import Aurora from '@/components/features/common/Aurora';
import { StarButton } from '@/components/ui/star-button';


// ----------------------
// Original Hero section commented out for redesign
/*
return (
  <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
    ...existing code...
  </section>
);
*/
// ----------------------

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden px-4 sm:px-6 md:px-8 transition-colors duration-300">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 scale-250 origin-top sm:scale-125 md:scale-100">
        <Aurora
          colorStops={["#093550", "#7f4148", "#a5827f"]}
          amplitude={0.5}
          blend={0.4}
        />
      </div>
      {/* Gradient overlay for background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-transparent dark:from-black/30 dark:via-black/20 dark:to-transparent pointer-events-none z-10" />
      {/* Logo centered with gradient overlay */}
      <div className="relative z-20 flex flex-col items-center w-full gap-8 md:gap-12">
        {/* Text above logo */}
        <div className="text-center space-y-2 md:space-y-3">
          <p className="text-sm sm:text-base md:text-lg text-black/70 dark:text-white/70 tracking-[0.3em] uppercase font-medium">
            Riding the Wave of Digital Excellence
          </p>
        </div>

        <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl flex items-center justify-center aspect-[2/1] sm:aspect-[3/1] md:aspect-[4/1]">
          <img
            src="/assets/logo.png"
            alt="Stellar Wave Logo"
            className="w-full h-full object-contain drop-shadow-lg max-h-[40vw] sm:max-h-[30vw] md:max-h-[20vw] dark:invert"
          />
          {/* Gradient overlay on logo */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-white/85 dark:from-transparent dark:to-black/85" />
        </div>

        {/* Text below logo */}
        <div className="text-center space-y-4 md:space-y-6 max-w-3xl">
          <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto font-medium tracking-tight">
            Elevating brands through strategic marketing, cutting-edge design, and powerful digital experiences
          </p>
        </div>

        {/* Star Button */}
        <div onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <StarButton
            lightColor="#FFFFFF"
            className="rounded-3xl h-11 px-6 text-sm sm:h-12 sm:px-8 sm:text-base cursor-pointer"
          >
            Revolutionize Your Brand
          </StarButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;