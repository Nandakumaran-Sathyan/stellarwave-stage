import React from "react";
import { cn } from "@/lib/utils";
import { animateHero, useJourneyAnimation } from "@/animations/servicesAnimations";
import { JOURNEY_CONTAINER, JourneyLine, THREAD_FILL } from "./JourneyLine";
import { lifecycleStages } from "./lifecycleData";

/* Static film grain — an inline SVG turbulence tile, never animated. */
const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/* A few faint stars, drawn as gradients instead of a particle system. */
const STARS = [
    "radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.55), transparent)",
    "radial-gradient(1px 1px at 78% 14%, rgba(255,255,255,0.45), transparent)",
    "radial-gradient(1.5px 1.5px at 64% 58%, rgba(167,139,250,0.6), transparent)",
    "radial-gradient(1px 1px at 31% 71%, rgba(255,255,255,0.35), transparent)",
    "radial-gradient(1px 1px at 91% 66%, rgba(255,255,255,0.4), transparent)",
    "radial-gradient(1.5px 1.5px at 22% 48%, rgba(167,139,250,0.45), transparent)",
    "radial-gradient(1px 1px at 52% 9%, rgba(255,255,255,0.4), transparent)",
    "radial-gradient(1px 1px at 6% 84%, rgba(255,255,255,0.3), transparent)",
].join(",");

const HEADING_LINES = ["The Marketing", "Lifecycle"];

interface ServiceLifecycleHeroProps {
    onSelectStage: (index: number) => void;
}

export default function ServiceLifecycleHero({ onSelectStage }: ServiceLifecycleHeroProps) {
    const ref = useJourneyAnimation<HTMLElement>(animateHero);
    const last = lifecycleStages.length - 1;

    return (
        <section ref={ref} id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden">
            {/* Atmosphere: almost static — it only drifts as the page scrolls */}
            <div data-hero="bg" aria-hidden className="pointer-events-none absolute inset-0">
                <div data-hero="drift" className="absolute inset-0 will-change-transform">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_68%_30%,rgba(139,92,246,0.2),transparent_70%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_15%_85%,rgba(139,92,246,0.08),transparent_70%)]" />
                    <div className="absolute inset-0 hidden dark:block" style={{ backgroundImage: STARS }} />
                </div>
                <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay dark:opacity-[0.12]" style={{ backgroundImage: GRAIN }} />
            </div>

            <div className={cn(JOURNEY_CONTAINER, "z-10 flex flex-1 flex-col justify-center pb-14 pt-36")}>
                <div data-hero="copy" className="lg:pl-10">
                    <p
                        data-hero="eyebrow"
                        className="text-[11px] font-semibold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400"
                    >
                        Stellar Wave <span className="mx-2 text-violet-500">/</span> Services
                    </p>

                    <h1 className="mt-6 text-[13.5vw] font-black uppercase leading-[0.86] tracking-tighter text-black dark:text-white sm:text-[11vw] lg:text-[8.6vw] 2xl:text-[8.5rem]">
                        {HEADING_LINES.map((line) => (
                            /* Padding keeps the glyphs inside the reveal mask */
                            <span key={line} className="-mb-[0.06em] block overflow-hidden pb-[0.06em] pr-[0.04em]">
                                <span data-hero="line-text" className="block will-change-transform">
                                    {line}
                                </span>
                            </span>
                        ))}
                    </h1>

                    <p data-hero="subtitle" className="mt-8 max-w-xl text-lg text-zinc-500 dark:text-zinc-400 md:text-2xl">
                        Five stages. <span className="text-black dark:text-white">One evolving marketing system.</span>
                    </p>
                </div>
            </div>

            {/* The journey begins: five stages on one line, then the line drops into the page */}
            <div className={cn(JOURNEY_CONTAINER, "z-10 h-28 md:h-36")}>
                <div className="absolute left-3 right-6 top-0 h-px md:left-5 md:right-10 lg:left-44 lg:right-12">
                    <span aria-hidden className="absolute inset-0 bg-violet-500/15" />
                    <span data-hero="line" aria-hidden className={cn("absolute inset-0 origin-left", THREAD_FILL)} />
                    {lifecycleStages.map((stage, i) => (
                        <div key={stage.id} className="absolute top-0" style={{ left: `${(i / last) * 100}%` }}>
                            <span
                                data-hero="node"
                                aria-hidden
                                className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_12px_2px_rgba(139,92,246,0.7)]"
                            />
                            <div
                                data-hero="label"
                                className={cn(
                                    "absolute top-4 hidden md:block",
                                    i === 0 ? "left-0 lg:left-3" : i === last ? "right-0" : "-translate-x-1/2"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => onSelectStage(i)}
                                    className="cursor-pointer whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 transition-colors duration-300 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                                >
                                    <span className="mr-2 hidden text-violet-500 lg:inline">{stage.index}</span>
                                    {stage.name}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <JourneyLine />
            </div>
        </section>
    );
}
