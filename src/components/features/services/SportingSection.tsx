import React from "react";
import { animateSporting, useServicesAnimation } from "@/animations/servicesAnimations";
import { CONTAINER, EditorialImage, RevealLines, SECTION, SectionLabel, ServiceList } from "./primitives";
import { images, sporting } from "./servicesContent";

/* 005 — Competitive sporting ecosystems. Built like a sports campaign:
   immersive panels, type and imagery travelling sideways. */
export default function SportingSection() {
    const ref = useServicesAnimation<HTMLElement>(animateSporting);

    return (
        <section ref={ref} id={sporting.id} className={SECTION}>
            <div className={`${CONTAINER} grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-16`}>
                <div className="lg:col-span-9 xl:col-span-8">
                    <SectionLabel number={sporting.number}>{sporting.label}</SectionLabel>
                    <RevealLines
                        lines={sporting.headline}
                        className="mt-8 font-sw-display text-[clamp(1.45rem,4vw,4.25rem)] font-medium leading-[1] tracking-[-0.045em] text-sw-fg"
                    />
                </div>
                <p data-reveal className="text-lg leading-relaxed text-sw-muted md:text-xl lg:col-span-3 lg:pb-2">
                    {sporting.copy}
                </p>
            </div>

            <div data-sport="stage" className="mt-14 px-3 sm:px-5 md:mt-20">
                <EditorialImage
                    src={images.sportingHero}
                    alt="A packed football stadium under floodlights"
                    zoom
                    parallax={5}
                    sizes="100vw"
                    className="h-[66svh] min-h-[400px] md:h-[94vh] md:rounded-[3.5rem]"
                >
                    <p
                        data-sport="marquee"
                        aria-hidden
                        className="pointer-events-none absolute bottom-[-0.08em] left-0 whitespace-nowrap font-sw-display text-[22vw] font-medium uppercase leading-[0.85] tracking-[-0.05em] text-white/90 will-change-transform md:text-[17vw]"
                    >
                        {sporting.marquee} <span className="text-violet-300">/</span> {sporting.marquee}
                    </p>
                </EditorialImage>
            </div>

            {/* Panels travel sideways with the scroll; with motion off the row scrolls by hand */}
            <div data-sport="viewport" className="mt-3 overflow-x-auto px-3 motion-safe:overflow-x-clip sm:mt-5 sm:px-5">
                <div data-sport="track" className="flex w-max gap-3 will-change-transform sm:gap-5">
                    {sporting.panels.map((panel, index) => (
                        <figure key={panel.caption} className="w-[74vw] shrink-0 sm:w-[46vw] lg:w-[34vw]">
                            <EditorialImage
                                src={panel.src}
                                alt={panel.alt}
                                clip={false}
                                sizes="(min-width: 1024px) 34vw, 74vw"
                                className="aspect-[4/5]"
                            />
                            <figcaption className="mt-4 flex items-baseline gap-3 px-2 text-[11px] font-medium uppercase tracking-[0.22em] text-sw-fg">
                                <span className="tabular-nums text-sw-muted">0{index + 1}</span>
                                {panel.caption}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>

            <div className={`${CONTAINER} mt-16 grid md:mt-28 lg:grid-cols-12 lg:gap-x-16`}>
                <ServiceList services={sporting.services} className="lg:col-span-8 lg:col-start-5" />
            </div>
        </section>
    );
}
