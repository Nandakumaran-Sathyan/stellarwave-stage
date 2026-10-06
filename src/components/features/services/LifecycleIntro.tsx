import React from "react";
import { animateProgression, useServicesAnimation } from "@/animations/servicesAnimations";
import { CONTAINER, RevealLines, ScrubText, SECTION, SectionLabel } from "./primitives";
import { lifecycleStages } from "./servicesContent";

/* 001 — The approach. Introduces the five-stage line the rest of the page follows. */
export default function LifecycleIntro() {
    const ref = useServicesAnimation<HTMLElement>(animateProgression);

    return (
        <section ref={ref} id="approach" className={SECTION}>
            <div className={CONTAINER}>
                <SectionLabel number="001">The Approach</SectionLabel>

                <ScrubText
                    as="h2"
                    text="Marketing is not a collection of tactics."
                    className="mt-10 max-w-5xl font-sw-display text-[clamp(2rem,4.6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-sw-fg"
                />
                <RevealLines as="p" lines={["It’s a system."]} className="mt-3 font-sw-display text-[clamp(2.6rem,6.4vw,6.75rem)] font-medium leading-[0.96] tracking-[-0.045em] text-sw-accent md:mt-4" />

                <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12">
                    <p data-reveal className="text-lg leading-relaxed text-sw-muted md:col-span-4 md:col-start-6 md:text-xl">
                        Every brand needs a different combination of clarity, visibility, demand and growth.
                    </p>
                    <p data-reveal className="text-lg leading-relaxed text-sw-fg md:col-span-3 md:text-xl">
                        Our work connects those pieces into one marketing system.
                    </p>
                </div>

                {/* Clarity → Presence → Demand → Scale → Authority */}
                <ol
                    data-progression
                    aria-label="The five stages of the marketing system"
                    className="relative mt-20 grid gap-y-9 pl-8 md:mt-32 md:grid-cols-5 md:gap-y-0 md:pl-0 md:pt-10"
                >
                    <span aria-hidden className="absolute bottom-2 left-[3px] top-2 w-px bg-sw-line md:inset-x-0 md:bottom-auto md:left-0 md:top-[3px] md:h-px md:w-auto" />
                    <span
                        data-progression-fill
                        aria-hidden
                        className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-sw-accent md:inset-x-0 md:bottom-auto md:left-0 md:top-[3px] md:h-px md:w-auto md:origin-left"
                    />
                    {lifecycleStages.map((stage) => (
                        <li key={stage.name} data-progression-node className="relative">
                            <span aria-hidden className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full border border-sw-accent bg-sw-bg md:-top-10 md:left-0">
                                <span data-progression-dot className="absolute inset-0 rounded-full bg-sw-accent" />
                            </span>
                            <span className="block text-[11px] tabular-nums text-sw-muted">{stage.index}</span>
                            <span className="mt-2 block font-sw-display text-2xl font-medium uppercase tracking-[-0.02em] text-sw-fg lg:text-[2rem]">
                                {stage.signal}
                            </span>
                            <span className="mt-2 block text-sm text-sw-muted">{stage.tagline}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
