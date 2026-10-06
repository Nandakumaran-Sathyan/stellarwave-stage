import React, { useEffect } from "react";
import { animateEditorial, refreshOnLayoutChange, useServicesAnimation } from "@/animations/servicesAnimations";
import ServicesHero from "./ServicesHero";
import LifecycleIntro from "./LifecycleIntro";
import StrategySection from "./StrategySection";
import CreativeSection from "./CreativeSection";
import GrowthSection from "./GrowthSection";
import SportingSection from "./SportingSection";
import ProcessSection from "./ProcessSection";
import SelectedWork from "./SelectedWork";
import MarketingLifecycle from "./MarketingLifecycle";
import ServicesFAQ from "./ServicesFAQ";
import ServicesCTA from "./ServicesCTA";

/* The Services page: how Stellar Wave builds a complete marketing system.
   Copy and imagery live in servicesContent.ts; all motion is GSAP
   (servicesAnimations.ts) — the shared reveals are wired up here, once, for
   the whole page, and sections with their own choreography add to it. */
export default function ServicesExpanded() {
    const ref = useServicesAnimation<HTMLDivElement>(animateEditorial);

    useEffect(() => refreshOnLayoutChange(), []);

    return (
        /* No overflow-hidden here — the lifecycle scene relies on position: sticky */
        <div ref={ref} className="sw-services relative w-full bg-sw-bg text-sw-fg transition-colors duration-300">
            <ServicesHero />
            <LifecycleIntro />
            <StrategySection />
            <CreativeSection />
            <GrowthSection />
            <SportingSection />
            <ProcessSection />
            <SelectedWork />
            <MarketingLifecycle />
            <ServicesFAQ />
            <ServicesCTA />
        </div>
    );
}
