"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpaceParticles } from "@/components/ui/space-particles"
import { Sparkles } from "@/components/ui/sparkles"
import { useEffect, useState } from "react"

interface HeroProps {
    eyebrow?: string
    title: string
    subtitle: string
    ctaLabel?: string
    ctaHref?: string
}

export function Hero({
    eyebrow = "Innovate Without Limits",
    title,
    subtitle,
    ctaLabel = "Explore Now",
    ctaHref = "#",
}: HeroProps) {
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
        <section
            id="hero"
            className="relative mx-auto w-full pt-40 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-[linear-gradient(to_bottom,#fff,#ffffff_50%,#e8e8e8_88%)]  
      dark:bg-[linear-gradient(to_bottom,#000_0%,#111_60%,#000_100%)]
      rounded-b-xl"
        >
            {/* Space Particles */}
            <div className="absolute inset-0 z-0">
                <SpaceParticles
                    className="absolute inset-0"
                    quantity={120}
                    color="#ffffff"
                />
            </div>

            {/* Grid BG */}
            <div
                className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
            />

            {/* Eyebrow */}
            {eyebrow && (
                <a href="#" className="group">
                    <span
                        className="text-sm text-gray-600 dark:text-gray-400 font-geist mx-auto px-5 py-2 
            bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  
            border-[2px] border-gray-300/20 dark:border-white/5 
            rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center"
                    >
                        {eyebrow}
                        <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </a>
            )}

            {/* Title */}
            <h1
                className="text-balance 
        bg-gradient-to-br from-black from-30% to-black/40 
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter 
        text-transparent sm:text-6xl md:text-7xl lg:text-8xl 
        dark:from-white dark:to-white/40"
            >
                {title}
            </h1>

            {/* Subtitle */}
            <p
                className="mb-12 text-balance 
        text-lg tracking-tight text-gray-600 dark:text-gray-400 
        md:text-xl max-w-4xl mx-auto"
            >
                {subtitle}
            </p>

            {/* CTA */}
            {ctaLabel && (
                <div className="flex justify-center">
                    <Button
                        asChild
                        className="mt-[-20px] w-fit md:w-52 z-20 font-geist tracking-tighter text-center text-lg"
                    >
                        <a href={ctaHref}>{ctaLabel}</a>
                    </Button>
                </div>
            )}

            {/* Clients-style curved arc + glow + sparkles at bottom */}
            <div className="relative mt-16 h-80 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
                {/* Purple radial glow */}
                <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-80 dark:before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] dark:before:opacity-80" />
                {/* Curved arc border */}
                <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/10 bg-white dark:bg-black" />
                {/* Sparkles */}
                <Sparkles
                    density={1200}
                    className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                    color={theme === "dark" ? "#ffffff" : "#000000"}
                />
            </div>
        </section>
    )
}
