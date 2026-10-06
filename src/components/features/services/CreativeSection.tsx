import React from "react";
import { CONTAINER, EditorialImage, HEADLINE, Pillars, RevealLines, SECTION, SectionLabel, ServiceList } from "./primitives";
import { creative, images } from "./servicesContent";

/* 003 — Creative. Two powerful images rather than a wall of thumbnails. */
export default function CreativeSection() {
    return (
        <section id={creative.id} className={SECTION}>
            <div className={CONTAINER}>
                <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-16">
                    <div className="lg:col-span-8">
                        <SectionLabel number={creative.number}>{creative.label}</SectionLabel>
                        <RevealLines lines={creative.headline} className={`${HEADLINE} mt-8`} />
                    </div>
                    <p data-reveal className="font-sw-display text-xl leading-snug tracking-[-0.02em] text-sw-muted md:text-2xl lg:col-span-4 lg:pb-3">
                        {creative.copy[0]}
                        <br />
                        <span className="text-sw-fg">{creative.copy[1]}</span>
                    </p>
                </div>
            </div>

            <div className="mt-14 px-3 sm:px-5 md:mt-20">
                <EditorialImage
                    src={images.creativeMain}
                    alt="A camera body and lenses laid out before a shoot"
                    zoom
                    sizes="100vw"
                    className="h-[58svh] min-h-[360px] md:h-[88vh] md:rounded-[3.5rem]"
                />
            </div>

            <div className={`${CONTAINER} mt-16 grid gap-y-14 md:mt-28 lg:grid-cols-12 lg:gap-x-16`}>
                <div className="lg:col-span-7">
                    <Pillars pillars={creative.pillars} outcome={creative.outcome} />
                    <ServiceList services={creative.services} className="mt-12 md:mt-16" />
                </div>
                <div className="lg:col-span-4 lg:col-start-9 lg:pt-24">
                    <EditorialImage
                        src={images.creativeDetail}
                        alt="A clapperboard held up at the start of a take"
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]"
                    />
                    <p data-reveal className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-sw-muted">
                        Brand films · Campaigns · Social content
                    </p>
                </div>
            </div>
        </section>
    );
}
