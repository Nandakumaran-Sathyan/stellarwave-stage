import React from "react";
import { CONTAINER, EditorialImage, HEADLINE, Pillars, RevealLines, SECTION, SectionLabel, ServiceList } from "./primitives";
import { images, strategy } from "./servicesContent";

/* 002 — Strategy. Set like a strategy document: image one side, the three
   pillars as large type on the other. */
export default function StrategySection() {
    return (
        <section id={strategy.id} className={SECTION}>
            <div className={`${CONTAINER} grid gap-y-14 lg:grid-cols-12 lg:gap-x-16`}>
                <div className="lg:col-span-5">
                    <EditorialImage
                        src={images.strategy}
                        alt="The curved lattice facade of a modern building against open sky"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="aspect-[4/5] sm:aspect-[16/10] lg:sticky lg:top-28 lg:aspect-[4/5]"
                    />
                </div>

                <div className="lg:col-span-7">
                    <SectionLabel number={strategy.number}>{strategy.label}</SectionLabel>
                    <RevealLines lines={strategy.headline} className={`${HEADLINE} mt-8`} />
                    <p data-reveal className="mt-8 max-w-md text-lg leading-relaxed text-sw-muted md:text-xl">
                        {strategy.copy[0]}
                    </p>

                    <Pillars pillars={strategy.pillars} outcome={strategy.outcome} className="mt-14 md:mt-20" />
                    <ServiceList services={strategy.services} className="mt-12 md:mt-16" />
                </div>
            </div>
        </section>
    );
}
