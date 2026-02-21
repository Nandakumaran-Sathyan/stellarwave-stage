import { Sparkles } from "@/components/ui/sparkles"
import { useEffect, useState } from "react"

const logos = [
  { src: "/assets/Logo_s/snowforce.png", alt: "Snowforce" },
  { src: "/assets/Logo_s/tav-electric.png", alt: "TAV Electric" },
  { src: "/assets/Logo_s/humming-bird.png", alt: "Humming Bird" },
  { src: "/assets/Logo_s/cycle-studio.png", alt: "Cycle Studio" },
  { src: "/assets/Logo_s/anna%20nagar%20auto%20service.png", alt: "Annanagar Auto Service", invert: true },
  { src: "/assets/Logo_s/tamilnadu-cycle-association.png", alt: "TNCA" },
  { src: "/assets/Logo_s/tamilnadu-state-kickboxing.png", alt: "TNSKA" },
  { src: "/assets/Logo_s/tamilnadu-athletic-association.png", alt: "TNAA" },
  { src: "/assets/Logo_s/tcl.png", alt: "TCL" },
  { src: "/assets/Logo_s/national%20kick%20boxing.png", alt: "National Kickboxing" },
  { src: "/assets/Logo_s/track%20asia.png", alt: "Track Asia Cup" },
];

const LogoStrip = () => (
  <div className="flex min-w-full shrink-0 items-center justify-around gap-8 px-4">
    {logos.map((logo) => (
      <div key={logo.alt} className="flex-shrink-0 h-12 md:h-16 flex items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          className={[
            "h-full w-auto max-w-[120px] object-contain",
            "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
            logo.invert ? "dark:invert" : "",
          ].join(" ")}
        />
      </div>
    ))}
  </div>
);

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
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <div className="flex animate-[scroll_20s_linear_infinite] hover:[animation-play-state:paused]">
            <LogoStrip />
            <LogoStrip />
          </div>
        </div>
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
