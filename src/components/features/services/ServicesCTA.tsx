import React from "react";
import { animateCta, scrollToId, useServicesAnimation } from "@/animations/servicesAnimations";
import { CONTAINER, PillLink, RevealLines, scrollToContactSoon } from "./primitives";
import { lifecycleStages } from "./servicesContent";

/* Final CTA — one question, the five possible answers, one way to start. */
export default function ServicesCTA() {
    const ref = useServicesAnimation<HTMLElement>(animateCta);

    return (
        <section ref={ref} aria-label="Start a conversation" className="relative overflow-clip border-t border-sw-line py-28 md:py-44">
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-[45%] left-1/2 h-[80%] w-[110%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(116,69,220,0.22),transparent)]"
            />

            <div className={`${CONTAINER} relative`}>
                <RevealLines
                    lines={["Where is your", "brand today?"]}
                    className="font-sw-display text-[clamp(3rem,10.4vw,11rem)] font-medium leading-[0.9] tracking-[-0.055em] text-sw-fg"
                />

                <ol data-reveal aria-label="Lifecycle stages" className="mt-14 grid border-b border-sw-line sm:grid-cols-5 md:mt-20">
                    {lifecycleStages.map((stage) => (
                        <li key={stage.name} className="border-t border-sw-line">
                            <button
                                type="button"
                                onClick={() => scrollToId("system")}
                                className="group/stage flex w-full cursor-pointer items-baseline justify-between gap-3 py-5 text-left sm:flex-col sm:justify-start sm:py-7"
                            >
                                <span className="text-[11px] tabular-nums text-sw-muted">{stage.index}</span>
                                <span className="font-sw-display text-xl font-medium uppercase tracking-[-0.02em] text-sw-fg transition-colors duration-500 group-hover/stage:text-sw-accent lg:text-2xl">
                                    {stage.name}
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>

                <div data-reveal className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
                    <PillLink to="/#contact" onClick={scrollToContactSoon} dataAttrs={{ "data-magnet": "" }} className="py-3 pl-8 text-base">
                        Start a conversation
                    </PillLink>
                    <PillLink to="/client" variant="outline" className="py-3 pl-8 text-base">
                        Explore our work
                    </PillLink>
                </div>
            </div>
        </section>
    );
}
