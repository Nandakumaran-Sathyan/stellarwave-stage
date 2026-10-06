import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
    createProgressTriggers,
    refreshOnLayoutChange,
    scrollToElement,
} from "@/animations/servicesAnimations";
import { servicesData } from "./servicesData";
import { lifecycleStages } from "./lifecycleData";
import type { StageSectionProps } from "./StageScene";
import ServiceLifecycleHero from "./ServiceLifecycleHero";
import FoundationSection from "./FoundationSection";
import PresenceSection from "./PresenceSection";
import DemandSection from "./DemandSection";
import ScaleSection from "./ScaleSection";
import AuthoritySection from "./AuthoritySection";
import LifecycleProgress from "./LifecycleProgress";
import LifecycleFinale from "./LifecycleFinale";
import ServiceDetailDrawer from "./ServiceDetailDrawer";

/* One section per lifecycle stage, in order (see lifecycleData.ts). */
const STAGE_SECTIONS: React.ComponentType<StageSectionProps>[] = [
    FoundationSection,
    PresenceSection,
    DemandSection,
    ScaleSection,
    AuthoritySection,
];

const serviceById = (id: string | null) => servicesData.find((service) => service.id === id) ?? null;

export default function ServicesExpanded() {
    const storyboardRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [active, setActive] = useState(0);
    const [progressVisible, setProgressVisible] = useState(false);
    const [openServiceId, setOpenServiceId] = useState<string | null>(null);

    useLayoutEffect(() => {
        const storyboard = storyboardRef.current;
        if (!storyboard) return;

        const sections = sectionRefs.current.filter((el): el is HTMLElement => el !== null);
        const stopProgress = createProgressTriggers(storyboard, sections, setActive, setProgressVisible);
        const stopRefresh = refreshOnLayoutChange();
        return () => {
            stopProgress();
            stopRefresh();
        };
    }, []);

    const selectStage = useCallback((index: number) => scrollToElement(sectionRefs.current[index]), []);
    const closeDrawer = useCallback(() => setOpenServiceId(null), []);

    return (
        /* No overflow-hidden here — the stage scenes rely on position: sticky */
        <section className="relative w-full bg-white text-black transition-colors duration-300 dark:bg-[#080808] dark:text-white">
            <ServiceLifecycleHero onSelectStage={selectStage} />

            {/* The lifecycle — one scene per stage */}
            <div ref={storyboardRef}>
                {STAGE_SECTIONS.map((StageSection, i) => {
                    const stage = lifecycleStages[i];
                    return (
                        <StageSection
                            key={stage.id}
                            stage={stage}
                            serviceName={serviceById(stage.serviceId)?.name ?? stage.name}
                            onExplore={setOpenServiceId}
                            sectionRef={(element) => {
                                sectionRefs.current[i] = element;
                            }}
                        />
                    );
                })}
            </div>

            <LifecycleFinale onSelectStage={selectStage} />

            <LifecycleProgress active={active} visible={progressVisible} onSelect={selectStage} />
            <ServiceDetailDrawer service={serviceById(openServiceId)} onClose={closeDrawer} />
        </section>
    );
}
