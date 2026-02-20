import React, { useState, useEffect, useRef } from 'react';
import { GlowEffect } from '@/components/ui/glow-effect';

// --- Data for the feature cards ---
const features = [
  {
    title: "Website Design & Development",
    description: "Custom, high-performance websites focused on brand identity, UX/UI, and conversions (Web, Mobile, Landing Pages).",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-white dark:bg-white",
    textColor: "text-gray-900 dark:text-gray-900",
    titleColor: "text-gray-900 dark:text-gray-900"
  },
  {
    title: "Brand Identity & Visual Design",
    description: "Logo design, brand guidelines, color systems, typography, and creative assets that define and elevate your brand.",
    imageUrl: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-gray-100 dark:bg-black",
    textColor: "text-gray-700 dark:text-gray-300",
    titleColor: "text-black dark:text-white"
  },
  {
    title: "Marketing Automation & Workflow Systems",
    description: "Automated lead capture, CRM integrations, email workflows, chatbots, and AI-driven customer journeys to scale operations.",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-white dark:bg-white",
    textColor: "text-gray-900 dark:text-gray-900",
    titleColor: "text-gray-900 dark:text-gray-900"
  },
  {
    title: "Digital Marketing & Growth Strategy",
    description: "SEO, performance ads, content strategy, social media branding, and analytics-driven growth campaigns.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-gray-100 dark:bg-black",
    textColor: "text-gray-700 dark:text-gray-300",
    titleColor: "text-black dark:text-white"
  },
];

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};


// --- Header Component ---
const AnimatedHeader = () => {
  const [headerRef, headerInView] = useScrollAnimation();
  const [pRef, pInView] = useScrollAnimation();

  return (
    <div className="text-center max-w-3xl mx-auto mb-12 px-4 sm:mb-16">
      <h2
        ref={headerRef}
        className={`text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter transition-all duration-700 ease-out text-black dark:text-white ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        What's in it for you?
      </h2>
      <p
        ref={pRef}
        className={`text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium tracking-tight mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        Gain all the skills you need to kick-start your professional path
      </p>
    </div>
  );
};

// This is the main component that orchestrates everything.
export function StickyFeatureSection() {
  return (
    <div className="bg-white dark:bg-black font-sans transition-colors duration-300">
      <div className="px-[5%]">
        <div className="max-w-7xl mx-auto">
          <section className="py-16 sm:py-24 md:py-48 flex flex-col items-center">

            <AnimatedHeader />

            <div className="w-full">
              {features.map((feature, index) => (
                <div key={index} className="relative mb-8 sm:mb-12 md:mb-16 sticky" style={{ top: '120px' }}>
                  <GlowEffect
                    colors={feature.bgColor.includes('bg-white') ? ['#0894FF', '#C959DD', '#FF2E54', '#FF9004'] : ['#FFFFFF', '#E0E0E0', '#CCCCCC', '#FFFFFF']}
                    mode='rotate'
                    blur='medium'
                    className="rounded-2xl sm:rounded-3xl"
                  />
                  <div
                    className={`${feature.bgColor} relative grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl transition-colors duration-300`}
                  >
                    <div className="flex flex-col justify-center">
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mb-3 sm:mb-4 ${feature.titleColor}`}>{feature.title}</h3>
                      <p className={`text-sm sm:text-base font-medium tracking-tight ${feature.textColor}`}>{feature.description}</p>
                    </div>

                    <div className="image-wrapper mt-6 sm:mt-8 md:mt-0">
                      <img
                        src={feature.imageUrl}
                        alt={feature.title}
                        loading="lazy"
                        className="w-full h-64 sm:h-80 md:h-96 rounded-lg shadow-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
