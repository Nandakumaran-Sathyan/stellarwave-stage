import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { createStepRail, useServicesAnimation } from "@/animations/servicesAnimations";
import { CONTAINER, EditorialImage, HEADLINE, Pillars, RevealLines, SECTION, SectionLabel, ServiceList } from "./primitives";
import { growth, growthJourney, images } from "./servicesContent";

/* 004 — Growth. The services are shown as one connected journey, not cards. */
export default function GrowthSection() {
    /* null = motion off: every step reads at full strength */
    const [active, setActive] = useState<number | null>(null);
    const ref = useServicesAnimation<HTMLElement>(useMemo(() => createStepRail(setActive), []));

    return (
        <section ref={ref} id={growth.id} className={SECTION}>
            <div className={`${CONTAINER} grid gap-y-16 lg:grid-cols-12 lg:gap-x-16`}>
                <div className="lg:col-span-7">
                    <SectionLabel number={growth.number}>{growth.label}</SectionLabel>
                    <RevealLines lines={growth.headline} className={`${HEADLINE} mt-8`} />
                    <p data-reveal className="mt-8 max-w-md text-lg leading-relaxed text-sw-muted md:text-xl">
                        {growth.copy[0]}
                    </p>

                    <Pillars pillars={growth.pillars} outcome={growth.outcome} className="mt-14 md:mt-20" />
                    <ServiceList services={growth.services} className="mt-12 md:mt-16" />
                </div>

                <div className="lg:col-span-5">
                    <EditorialImage
                        src={images.growth}
                        alt="A performance dashboard charting audience behaviour over time"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="aspect-[5/4]"
                    />

                    {/* Audience → Content → Traffic → Leads → Conversion → Retention */}
                    <div className="mt-6 rounded-[2rem] border border-sw-line p-7 md:rounded-[3rem] md:p-10">
                        <p data-reveal className="text-[11px] font-medium uppercase tracking-[0.22em] text-sw-muted">
                            The growth system
                        </p>
                        <ol data-step-list className="relative mt-8">
                            <span aria-hidden className="absolute bottom-7 left-[5px] top-7 w-px bg-sw-line" />
                            <span data-step-fill aria-hidden className="absolute bottom-7 left-[5px] top-7 w-px origin-top bg-sw-accent" />
                            {growthJourney.map((step, index) => {
                                const reached = active === null || index <= active;
                                return (
                                    <li
                                        key={step.name}
                                        data-step
                                        className={cn(
                                            "relative flex items-baseline justify-between gap-4 py-4 pl-9 transition-opacity duration-700",
                                            reached ? "opacity-100" : "opacity-30"
                                        )}
                                    >
                                        <span
                                            aria-hidden
                                            className={cn(
                                                "absolute left-0 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border border-sw-accent transition-colors duration-700",
                                                reached ? "bg-sw-accent" : "bg-sw-bg"
                                            )}
                                        />
                                        <span className="font-sw-display text-2xl font-medium uppercase tracking-[-0.03em] text-sw-fg md:text-3xl">
                                            {step.name}
                                        </span>
                                        <span className="text-right text-xs text-sw-muted md:text-sm">{step.note}</span>
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
