import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { createStepRail, useServicesAnimation } from "@/animations/servicesAnimations";
import { CONTAINER, HEADLINE_COMPACT, RevealLines, SECTION, SectionLabel } from "./primitives";
import { processSteps } from "./servicesContent";

/* 006 — How we work. An editorial timeline: one line, five steps, the step
   being read is the one that is lit. */
export default function ProcessSection() {
    /* null = motion off: every step reads at full strength */
    const [active, setActive] = useState<number | null>(null);
    const ref = useServicesAnimation<HTMLElement>(useMemo(() => createStepRail(setActive), []));

    return (
        <section ref={ref} id="process" className={SECTION}>
            <div className={`${CONTAINER} grid gap-y-14 lg:grid-cols-12 lg:gap-x-16`}>
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-36">
                        <SectionLabel number="006">Process</SectionLabel>
                        <RevealLines lines={["From direction", "to momentum."]} className={`${HEADLINE_COMPACT} mt-8`} />
                    </div>
                </div>

                <ol data-step-list className="relative lg:col-span-6 lg:col-start-7">
                    <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-sw-line" />
                    <span data-step-fill aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-sw-accent" />
                    {processSteps.map((step, index) => {
                        const isActive = active === null || index === active;
                        return (
                            <li
                                key={step.name}
                                data-step
                                className={cn(
                                    "relative py-9 pl-9 transition-opacity duration-700 md:py-12 md:pl-14",
                                    isActive ? "opacity-100" : "opacity-30"
                                )}
                            >
                                <span
                                    aria-hidden
                                    className={cn(
                                        "absolute left-0 top-[3.1rem] h-[9px] w-[9px] -translate-x-1/2 rounded-full border border-sw-accent transition-colors duration-700 md:top-[4.4rem]",
                                        isActive && active !== null ? "bg-sw-accent" : "bg-sw-bg"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "block text-xs tabular-nums transition-colors duration-700",
                                        isActive && active !== null ? "text-sw-accent" : "text-sw-muted"
                                    )}
                                >
                                    {step.index}
                                </span>
                                <span className="mt-2 block font-sw-display text-[clamp(2.4rem,5vw,4.75rem)] font-medium uppercase leading-none tracking-[-0.04em] text-sw-fg">
                                    {step.name}
                                </span>
                                <span className="mt-4 block max-w-sm text-base leading-relaxed text-sw-muted md:text-lg">
                                    {step.note}
                                </span>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
