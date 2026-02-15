import { Sparkles } from "@/components/ui/sparkles"
import { Building2, Zap, Rocket, Sparkles as SparklesIcon, Globe } from "lucide-react"

export function Clients() {
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
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light tracking-tight md:text-xl">
            We help businesses stand out and grow in digital spaces.
          </p>
        </div>

        {/* Logos Carousel */}
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
            {/* First set of logos */}
            <div className="flex min-w-full shrink-0 items-center justify-around gap-6 px-2 sm:gap-8 sm:px-4 md:gap-12">
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Building2 className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Zap className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Rocket className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <SparklesIcon className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Globe className="h-12 w-12 md:h-16 md:w-16" />
              </div>
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex min-w-full shrink-0 items-center justify-around gap-6 px-2 sm:gap-8 sm:px-4 md:gap-12">
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Building2 className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Zap className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Rocket className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <SparklesIcon className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              
              <div className="flex items-center justify-center text-zinc-400 transition-colors duration-300 hover:text-white">
                <Globe className="h-12 w-12 md:h-16 md:w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sparkles Effect */}
      <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#ffffff,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-white/20 bg-zinc-900" />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="black dark:white"
        />
      </div>
    </section>
  )
}
