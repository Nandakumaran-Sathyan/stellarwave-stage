/**
 * GSAP Animation Utilities
 * Premium scroll-based animations for high-end digital marketing websites
 * 
 * Best Practices:
 * - Use ScrollTrigger with proper start/end points
 * - Keep animations subtle but impactful
 * - Optimize for performance with will-change hints
 * - Use stagger for sequential reveals
 * - Prefer scrub for scroll-tied animations
 */

import gsap from 'gsap';

// ====================
// EASING PRESETS
// ====================
export const EASINGS = {
  // Apple-style smooth easing
  apple: 'power3.out',
  // Stripe-style elegant easing
  stripe: 'power2.out',
  // Bouncy entrance (use sparingly)
  bouncy: 'back.out(1.5)',
  // Smooth in-out
  smooth: 'power2.inOut',
  // Linear for scroll scrubbing
  none: 'none',
} as const;

// ====================
// SCROLL TRIGGER CONFIGS
// ====================
export const SCROLL_CONFIGS = {
  // Standard fade-in on scroll
  fadeIn: {
    start: 'top 80%',
    end: 'top 60%',
    toggleActions: 'play none none none' as const,
  },
  // Earlier trigger for headers
  header: {
    start: 'top 85%',
    toggleActions: 'play none none none' as const,
  },
  // Scrub animation tied to scroll position
  scrub: (speed = 1.5) => ({
    start: 'top top',
    end: 'bottom top',
    scrub: speed,
  }),
  // Pin element during scroll
  pin: {
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    scrub: 1,
  },
} as const;

// ====================
// ANIMATION PRESETS
// ====================

/**
 * Fade-in with upward motion (section titles)
 * Apple/Stripe-level quality
 */
export const fadeUpAnimation = (delay = 0) => ({
  opacity: 0,
  y: 50,
  duration: 1,
  delay,
  ease: EASINGS.apple,
});

/**
 * Scale and fade entrance
 * Premium feel for hero elements
 */
export const scaleInAnimation = (delay = 0) => ({
  opacity: 0,
  scale: 0.95,
  duration: 1.2,
  delay,
  ease: EASINGS.apple,
});

/**
 * Staggered card reveal
 * Perfect for service cards, testimonials
 */
export const staggeredReveal = {
  opacity: 0,
  y: 60,
  scale: 0.95,
  duration: 0.8,
  stagger: {
    amount: 0.4, // Total time to stagger across all elements
    from: 'start' as const,
  },
  ease: EASINGS.stripe,
};

/**
 * Counter animation (stats)
 * Bouncy entrance for numbers
 */
export const counterAnimation = {
  opacity: 0,
  scale: 0.8,
  duration: 0.6,
  stagger: 0.1,
  ease: EASINGS.bouncy,
};

/**
 * Parallax movement for backgrounds
 * Subtle depth effect
 */
export const parallaxAnimation = (distance = 100) => ({
  y: distance,
  ease: EASINGS.none,
});

/**
 * Rotation tied to scroll
 * For decorative elements
 */
export const scrollRotation = (degrees = 180) => ({
  rotateZ: degrees,
  ease: EASINGS.none,
});

// ====================
// HOVER ANIMATIONS
// ====================

/**
 * Subtle depth motion on hover (glass cards)
 * Use with mouse position tracking for best effect
 */
export const glassCardHover = (element: HTMLElement, event: MouseEvent) => {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
  const rotateY = ((x - centerX) / centerX) * 5;
  
  gsap.to(element, {
    rotateX,
    rotateY,
    duration: 0.3,
    ease: EASINGS.smooth,
    transformPerspective: 1000,
  });
};

/**
 * Reset hover animation
 */
export const resetHover = (element: HTMLElement) => {
  gsap.to(element, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: EASINGS.smooth,
  });
};

// ====================
// TIMELINE BUILDERS
// ====================

/**
 * Create a hero entrance timeline
 * Orchestrates multiple elements in sequence
 */
export const createHeroTimeline = () => {
  return gsap.timeline({
    defaults: { ease: EASINGS.apple },
  });
};

/**
 * Create a scroll-triggered timeline
 */
export const createScrollTimeline = (trigger: HTMLElement, config = {}) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      ...SCROLL_CONFIGS.fadeIn,
      ...config,
    },
  });
};

// ====================
// PERFORMANCE HELPERS
// ====================

/**
 * Add will-change hint for better performance
 */
export const optimizeForAnimation = (element: HTMLElement) => {
  element.style.willChange = 'transform, opacity';
};

/**
 * Remove will-change after animation completes
 */
export const cleanupOptimization = (element: HTMLElement) => {
  element.style.willChange = 'auto';
};

// ====================
// USAGE EXAMPLES
// ====================

/**
 * Example 1: Section title fade-in
 * 
 * gsap.from(titleRef.current, {
 *   ...fadeUpAnimation(),
 *   scrollTrigger: {
 *     trigger: titleRef.current,
 *     ...SCROLL_CONFIGS.header,
 *   },
 * });
 */

/**
 * Example 2: Staggered card reveal
 * 
 * gsap.from(cardsRef.current.children, {
 *   ...staggeredReveal,
 *   scrollTrigger: {
 *     trigger: cardsRef.current,
 *     ...SCROLL_CONFIGS.fadeIn,
 *   },
 * });
 */

/**
 * Example 3: Parallax background
 * 
 * gsap.to(backgroundRef.current, {
 *   ...parallaxAnimation(150),
 *   scrollTrigger: {
 *     trigger: sectionRef.current,
 *     ...SCROLL_CONFIGS.scrub(2),
 *   },
 * });
 */

/**
 * Example 4: Glass card with depth hover
 * 
 * <div
 *   onMouseMove={(e) => glassCardHover(e.currentTarget, e.nativeEvent)}
 *   onMouseLeave={(e) => resetHover(e.currentTarget)}
 * >
 *   Card content
 * </div>
 */
