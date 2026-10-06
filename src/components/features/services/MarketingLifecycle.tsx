import React, { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createLifecycle, useServicesAnimation } from "@/animations/servicesAnimations";
import { CONTAINER, HEADLINE_COMPACT, RevealLines, SectionLabel } from "./primitives";
import { lifecycleStages } from "./servicesContent";
import type { LifecycleStage } from "./servicesContent";

/* A gentle wave through the five nodes (x = 20, y = 50, 150 … 450 of 500). */
const WAVE =
    "M20 0 C26 17 26 33 20 50 " +
    [0, 1, 2, 3].map((i) => `C34 ${83 + i * 100} 6 ${116 + i * 100} 20 ${150 + i * 100}`).join(" ") +
    " C14 467 14 483 20 500";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function StageDetail({ stage }: { stage: LifecycleStage }) {
    return (
        <>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-sw-accent">{stage.tagline}</p>
            <p className="mt-4 font-sw-display text-2xl leading-snug tracking-[-0.02em] text-sw-muted md:text-[1.75rem]">
                {stage.statement[0]}
                <br />
                <span className="text-sw-fg">{stage.statement[1]}</span>
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.22em] text-sw-fg">
                <span>{stage.name}</span>
                <ArrowRight aria-hidden className="h-4 w-4 text-sw-accent" />
                <span className="text-sw-accent">{stage.outcome}</span>
            </p>
        </>
    );
}

/* 008 — The Stellar Wave system, the signature section.
   Pinned (desktop): the scene holds while scrolling walks through the stages;
   the line draws to each node and the active stage's detail swaps in.
   Elsewhere: the same five stages as a vertical sequence. */
export default function MarketingLifecycle() {
    /* null = motion off: every stage reads at full strength */
    const [active, setActive] = useState<number | null>(null);
    const ref = useServicesAnimation<HTMLElement>(
        useMemo(() => createLifecycle(setActive, lifecycleStages.length), [])
    );
    const current = active ?? 0;

    return (
        <section ref={ref} id="system" aria-label="The Stellar Wave system" className="relative border-t border-sw-line">
            <div data-life="scene" className="relative pinned:h-[calc(100vh+2800px)]">
                {/* overflow-clip (not hidden) keeps position: sticky working */}
                <div className="overflow-clip py-24 md:py-36 pinned:sticky pinned:top-0 pinned:flex pinned:h-screen pinned:items-center pinned:py-0">
                    <div className={`${CONTAINER} grid gap-y-14 lg:grid-cols-12 lg:gap-x-16`}>
                        <div className="lg:col-span-5 pinned:flex pinned:h-[70vh] pinned:flex-col pinned:justify-between">
                            <div>
                                <SectionLabel number="008">The Stellar Wave System</SectionLabel>
                                <RevealLines
                                    lines={["Five stages.", "One evolving", "marketing system."]}
                                    className={`${HEADLINE_COMPACT} mt-8`}
                                />
                            </div>

                            {/* Active stage — pinned layout only */}
                            <div className="hidden pinned:block">
                                <p className="flex items-end gap-3 font-sw-display tabular-nums text-sw-fg">
                                    <span aria-hidden className="block h-[1em] overflow-hidden text-[5.5rem] leading-none tracking-[-0.05em]">
                                        <span
                                            className={cn("block transition-transform duration-700", EASE)}
                                            style={{ transform: `translateY(-${(current * 100) / lifecycleStages.length}%)` }}
                                        >
                                            {lifecycleStages.map((stage) => (
                                                <span key={stage.index} className="block h-[1em]">
                                                    {stage.index}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                    <span aria-hidden className="pb-3 text-sm text-sw-muted">
                                        / 0{lifecycleStages.length}
                                    </span>
                                </p>
                                <div className="relative mt-6 h-40">
                                    {lifecycleStages.map((stage, index) => (
                                        <div
                                            key={stage.name}
                                            aria-hidden={index !== current}
                                            className={cn(
                                                "absolute inset-0 transition-[opacity,transform] duration-700",
                                                EASE,
                                                index === current ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                                            )}
                                        >
                                            <StageDetail stage={stage} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <ol data-step-list className="relative lg:col-span-6 lg:col-start-7 pinned:flex pinned:h-[70vh] pinned:flex-col">
                            {/* Pinned: one continuous wave, drawn by revealing the accent copy */}
                            <svg aria-hidden viewBox="0 0 40 500" preserveAspectRatio="none" className="absolute left-0 top-0 hidden h-full w-10 pinned:block">
                                <path d={WAVE} fill="none" stroke="var(--sw-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                            </svg>
                            <svg
                                data-life="line"
                                aria-hidden
                                viewBox="0 0 40 500"
                                preserveAspectRatio="none"
                                className="absolute left-0 top-0 hidden h-full w-10 pinned:block"
                            >
                                <path d={WAVE} fill="none" stroke="var(--sw-accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                            </svg>
                            {/* Flow: a straight rail that fills with the scroll */}
                            <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-sw-line pinned:hidden" />
                            <span data-step-fill aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-sw-accent pinned:hidden" />

                            {lifecycleStages.map((stage, index) => {
                                const isActive = active === null || index === active;
                                return (
                                    <li key={stage.name} data-step className="relative py-9 pl-10 pinned:flex pinned:flex-1 pinned:items-center pinned:py-0 pinned:pl-20">
                                        <span
                                            aria-hidden
                                            className={cn(
                                                "absolute left-0 top-[3.4rem] h-[11px] w-[11px] rounded-full border border-sw-accent transition-[background-color,transform] duration-700 pinned:left-[14.5px] pinned:top-1/2 pinned:-translate-y-1/2",
                                                isActive && active !== null ? "scale-125 bg-sw-accent" : "bg-sw-bg"
                                            )}
                                        />
                                        <div
                                            className={cn(
                                                "origin-left transition-[opacity,transform] duration-700",
                                                EASE,
                                                isActive ? "opacity-100" : "opacity-25 pinned:scale-[0.72]"
                                            )}
                                        >
                                            <p className="text-xs tabular-nums text-sw-muted pinned:hidden">{stage.index}</p>
                                            <h3 className="mt-2 font-sw-display text-[clamp(2.75rem,7.4vw,7rem)] font-medium uppercase leading-none tracking-[-0.05em] text-sw-fg pinned:mt-0 pinned:text-[min(8.6vh,7vw)]">
                                                {stage.name}
                                            </h3>
                                            <div className="mt-5 pinned:hidden">
                                                <StageDetail stage={stage} />
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
