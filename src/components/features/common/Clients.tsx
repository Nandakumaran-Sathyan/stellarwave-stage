import { Sparkles } from "@/components/ui/sparkles"
import { useEffect, useRef, useState } from "react"

const logos = [
  { src: "/assets/Logo_s/snowforce.png", alt: "Snowforce" },
  { src: "/assets/Logo_s/tav.png", alt: "TAV Electric" },
  { src: "/assets/Logo_s/The-hummingbird.png", alt: "Humming Bird" },
  { src: "/assets/Logo_s/cycle-studio.png", alt: "Cycle Studio" },
  { src: "/assets/Logo_s/annanagarautoservice.png", alt: "Annanagar Auto Service", invert: true },
  { src: "/assets/Logo_s/tn-cycling-assosciation.png", alt: "TNCA" },
  { src: "/assets/Logo_s/tn-state-kickbozing.png", alt: "TNSKA", whiteSrc: "/assets/Logo_s/tn-state-kickbozing-white.jpeg" },
  { src: "/assets/Logo_s/TAA.png", alt: "TNAA" },
  { src: "/assets/Logo_s/tcl.png", alt: "TCL" },
  { src: "/assets/Logo_s/national-kick-boxing.png", alt: "National Kickboxing", whiteSrc: "/assets/Logo_s/national-kick-boxing-white.jpeg" },
  { src: "/assets/Logo_s/track-asia.png", alt: "Track Asia Cup", whiteSrc: "/assets/Logo_s/track-asia-white.JPG" },
];

function InfiniteMarquee({ theme }: { theme: 'light' | 'dark' }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;

    const step = () => {
      if (!isPausedRef.current) {
        scrollPos += 2.0;
        const firstStrip = scrollContainer.firstElementChild as HTMLElement;
        if (firstStrip && scrollPos >= firstStrip.offsetWidth) {
          scrollPos -= firstStrip.offsetWidth;
        }
        scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const renderLogos = () =>
    logos.map((logo, i) => {
      // Use white variant in dark mode if available
      const activeSrc = (theme === 'dark' && logo.whiteSrc) ? logo.whiteSrc : logo.src;
      return (
        <div
          key={`${logo.alt}-${i}`}
          className="flex-shrink-0 h-14 md:h-20 flex items-center justify-center mx-10"
        >
          <img
            src={activeSrc}
            alt={logo.alt}
            draggable={false}
            className="h-full w-auto max-w-[160px] object-contain select-none"
            style={{
              // Logo is white by default (invert:true) → invert in light, stay as-is in dark
              filter: logo.invert
                ? (theme === 'light' ? 'grayscale(100%) invert(1)' : 'grayscale(100%)')
                : 'grayscale(100%)',
              opacity: 0.5,
              transition: 'filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget;
              img.style.filter = "grayscale(0%)";
              img.style.opacity = "1";
              img.style.transform = "scale(1.15)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget;
              img.style.filter = logo.invert
                ? (theme === 'light' ? 'grayscale(100%) invert(1)' : 'grayscale(100%)')
                : 'grayscale(100%)';
              img.style.opacity = '0.5';
              img.style.transform = 'scale(1)';
            }}
          />
        </div>
      );
    });

  return (
    <div
      className="relative mx-auto max-w-7xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={scrollRef} className="flex will-change-transform" style={{ width: "max-content" }}>
        <div className="flex shrink-0">{renderLogos()}</div>
        <div className="flex shrink-0">{renderLogos()}</div>
        <div className="flex shrink-0">{renderLogos()}</div>
      </div>
    </div>
  );
}

export function Clients() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "dark" : "light")
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="clients" className="relative w-full overflow-hidden bg-white text-black dark:bg-black dark:text-white py-24 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 w-full max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-black via-neutral-600 to-zinc-400 dark:from-white dark:via-zinc-300 dark:to-zinc-900 bg-clip-text text-transparent transition-colors duration-700">
              Make your brand unmistakable
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium tracking-tight md:text-xl">
            We help businesses stand out and grow in digital spaces.
          </p>
        </div>

        {/* Logos Carousel */}
        <InfiniteMarquee theme={theme} />
      </div>

      {/* Sparkles Effect */}
      <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 dark:before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)]" />
        <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color={theme === "dark" ? "#ffffff" : "#000000"}
        />
      </div>
    </section>
  )
}
