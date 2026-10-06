import React from "react";
import { animateHero, scrollToId, useServicesAnimation } from "@/animations/servicesAnimations";
import { CONTAINER, EditorialImage, PillLink, RevealLines, scrollToContactSoon } from "./primitives";
import { images, lifecycleStages } from "./servicesContent";

export default function ServicesHero() {
    const ref = useServicesAnimation<HTMLElement>(animateHero);

    return (
        <section ref={ref} aria-label="Services" className="relative pt-32 md:pt-48">
            <div className={CONTAINER}>
                <div data-hero="heading">
                    <p data-hero="eyebrow" className="text-[11px] font-medium uppercase tracking-[0.28em] text-sw-muted">
                        Stellar Wave <span className="mx-1 text-sw-accent">/</span> Services
                    </p>
                    <RevealLines
                        as="h1"
                        hero
                        lines={[
                            "Marketing built",
                            <>
                                as a <span className="text-sw-accent">system.</span>
                            </>,
                        ]}
                        className="mt-7 font-sw-display text-[clamp(3rem,10.6vw,11.5rem)] font-medium leading-[0.9] tracking-[-0.055em] text-sw-fg"
                    />
                </div>

                <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
                    <p data-hero="copy" className="font-sw-display text-xl leading-snug tracking-[-0.02em] text-sw-fg md:text-2xl lg:col-span-4">
                        Strategy. Creative. Growth.
                        <br />
                        <span className="text-sw-muted">Built to move brands forward.</span>
                    </p>
                    <div data-hero="copy" className="lg:col-span-5 lg:col-start-8">
                        <p className="max-w-md text-base leading-relaxed text-sw-muted md:text-lg">
                            We combine strategic thinking, creative expression and measurable growth systems to help
                            ambitious brands move from visibility to momentum.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <PillLink onClick={() => scrollToId("approach")}>Explore our services</PillLink>
                            <PillLink to="/#contact" onClick={scrollToContactSoon} variant="outline">
                                Start a conversation
                            </PillLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinematic visual — nearly full-bleed, with two details floating over it */}
            <div className="relative mt-14 px-3 sm:px-5 md:mt-20">
                <EditorialImage
                    src={images.hero}
                    alt="A crowd under falling confetti and stage light at a live brand event"
                    eager
                    clip={false}
                    zoom
                    sizes="100vw"
                    frameProps={{ "data-hero": "frame" }}
                    className="h-[64svh] min-h-[420px] md:h-[86vh] md:rounded-[3.5rem]"
                >
                    <ol
                        aria-label="The marketing system"
                        className="absolute inset-x-6 bottom-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 md:inset-x-12 md:bottom-10 md:text-xs"
                    >
                        {lifecycleStages.map((stage, index) => (
                            <li key={stage.name} className="flex items-center gap-3">
                                {index > 0 && <span aria-hidden className="h-px w-5 bg-violet-300/70 md:w-10" />}
                                {stage.signal}
                            </li>
                        ))}
                    </ol>
                </EditorialImage>

                <div
                    data-hero="float"
                    className="absolute right-8 top-10 hidden w-48 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-2xl shadow-black/50 md:block lg:right-20 lg:top-16 lg:w-60"
                >
                    <img
                        src={images.heroDetail}
                        alt="Phones raised to capture a live moment"
                        loading="eager"
                        decoding="async"
                        className="aspect-[4/5] w-full object-cover brightness-[0.85] saturate-[0.75]"
                    />
                </div>
                <p
                    data-hero="float"
                    className="absolute -top-5 left-8 flex items-center gap-2.5 rounded-full border border-white/15 bg-black/55 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md md:left-16 md:text-[11px]"
                >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    Strategy × Creative × Growth
                </p>
            </div>
        </section>
    );
}
