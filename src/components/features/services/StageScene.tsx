import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { animateStage, useJourneyAnimation } from "@/animations/servicesAnimations";
import { JOURNEY_CONTAINER, JourneyLine, THREAD_FILL } from "./JourneyLine";
import type { LifecycleStage } from "./lifecycleData";

export interface StageSectionProps {
    stage: LifecycleStage;
    /** Name of the discipline behind this stage, e.g. "Strategy" */
    serviceName: string;
    onExplore: (serviceId: string) => void;
    sectionRef?: (element: HTMLElement | null) => void;
    key?: string;
}

interface StageSceneProps extends StageSectionProps {
    /** Pinned scroll distance, e.g. "story:h-[calc(100vh+1400px)]" */
    pinClass: string;
    /** Column split in story mode */
    columnsClass?: string;
    visual: React.ReactNode;
    /** Service items shown between the statement and the outcome */
    children?: React.ReactNode;
}

/* ── Shared shell for a lifecycle stage ──
   Mobile: visual → heading → statement → services → outcome, in normal flow.
   Story (desktop): copy left, visual right, pinned while the beats play. */
export default function StageScene({
    stage,
    serviceName,
    onExplore,
    sectionRef,
    pinClass,
    columnsClass = "story:grid-cols-[minmax(0,11fr)_minmax(0,10fr)]",
    visual,
    children,
}: StageSceneProps) {
    const ref = useJourneyAnimation<HTMLElement>(animateStage);

    return (
        <section
            ref={(element) => {
                ref.current = element;
                sectionRef?.(element);
            }}
            id={stage.id}
            aria-label={`${stage.index} ${stage.name}`}
            className="relative"
        >
            <div data-s="scene" className={cn("relative", pinClass)}>
                {/* overflow-clip (not hidden) keeps position: sticky working */}
                <div className="relative overflow-clip story:sticky story:top-0 story:h-screen">
                    {/* Stage name as oversized background type */}
                    <div
                        data-s="word"
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-6 select-none story:bottom-[-2.5vw] story:top-auto"
                    >
                        <div
                            data-s="word-inner"
                            className="whitespace-nowrap pl-[6vw] text-[22vw] font-black uppercase leading-[0.8] tracking-tighter text-black/[0.04] will-change-transform dark:text-white/[0.035] story:text-[19vw]"
                        >
                            {stage.name}
                        </div>
                    </div>

                    <div className={cn(JOURNEY_CONTAINER, "story:h-full")}>
                        <JourneyLine split />

                        <div
                            className={cn(
                                "relative grid gap-y-10 pb-24 pt-[15vw] md:pb-32 lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:pl-10 story:h-full story:items-center story:gap-x-12 story:pb-6 story:pt-24",
                                columnsClass
                            )}
                        >
                            <div data-s="visual" data-group className="lg:order-2">
                                {visual}
                            </div>

                            <div className="lg:order-1">
                                <header data-group className="relative">
                                    {/* Node where this stage meets the journey line */}
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "absolute -left-10 top-[7px] hidden h-2 w-2 -translate-x-1/2 rounded-full story:block",
                                            THREAD_FILL
                                        )}
                                    />
                                    <span
                                        data-s="tick"
                                        aria-hidden
                                        className="absolute -left-10 top-[10px] hidden h-px w-7 origin-left bg-violet-500 story:block"
                                    />

                                    <p
                                        data-enter
                                        className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400"
                                    >
                                        <span>{stage.index}</span>
                                        <span aria-hidden className="h-px w-8 bg-violet-500/50" />
                                        <span className="text-zinc-500 dark:text-zinc-400">{stage.tagline}</span>
                                    </p>
                                    <h2
                                        data-enter
                                        className="mt-4 text-6xl font-black uppercase leading-[0.9] tracking-tighter text-black dark:text-white sm:text-7xl 2xl:story:text-8xl"
                                    >
                                        {stage.name}
                                    </h2>
                                    <p
                                        data-enter
                                        className="mt-5 text-lg leading-snug text-zinc-500 dark:text-zinc-400 md:text-xl"
                                    >
                                        {stage.statement[0]}
                                        <br />
                                        <span className="text-black dark:text-white">{stage.statement[1]}</span>
                                    </p>
                                </header>

                                {children}

                                <footer data-group className="mt-9 story:mt-7">
                                    <p
                                        data-step={99}
                                        className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.3em] text-black dark:text-white md:text-sm"
                                    >
                                        <span>{stage.name}</span>
                                        <ArrowRight aria-hidden className="h-4 w-4 text-violet-500" />
                                        <span className="text-violet-600 dark:text-violet-400">{stage.outcome}</span>
                                    </p>

                                    {/* Everything else about the discipline lives one click away */}
                                    <div data-enter className="mt-5">
                                        <button
                                            type="button"
                                            onClick={() => onExplore(stage.serviceId)}
                                            className="group/explore inline-flex cursor-pointer items-center gap-2 text-left text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500 transition-colors duration-300 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                                        >
                                            <span className="relative">
                                                Explore {serviceName}
                                                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-violet-500 transition-[scale] duration-500 group-hover/explore:scale-x-100" />
                                            </span>
                                            <ArrowRight className="h-3.5 w-3.5 transition-[translate] duration-300 group-hover/explore:translate-x-1" />
                                        </button>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
