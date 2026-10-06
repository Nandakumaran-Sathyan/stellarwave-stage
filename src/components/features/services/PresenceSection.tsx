import React from "react";
import StageScene, { type StageSectionProps } from "./StageScene";
import { ImageParallax } from "./ImageParallax";
import { ServiceCluster } from "./ServiceCluster";
import { stageImages } from "./lifecycleData";

const CLUSTERS = [
    { title: "Production", items: ["Photography", "Videography", "Reels", "Motion Graphics"] },
    { title: "Content", items: ["Content Strategy", "Instagram", "LinkedIn", "Founder Content"] },
    { title: "Communication", items: ["Campaign Creative", "Event Branding", "Employer Branding"] },
];

/* ── 02 Presence — an editorial collage arriving from three directions ── */
export default function PresenceSection(props: StageSectionProps) {
    return (
        <StageScene
            {...props}
            pinClass="story:h-[calc(100vh+1400px)]"
            visual={
                <div className="relative h-[24rem] md:h-[34rem] story:h-[72vh]">
                    <ImageParallax
                        enter
                        reveal="scale"
                        src={stageImages.presenceMain}
                        alt="Camera and lenses prepared for a production shoot"
                        className="absolute left-0 top-[10%] h-[62%] w-[70%]"
                    />
                    <ImageParallax
                        step={1}
                        reveal="right"
                        src={stageImages.presenceContent}
                        alt="Video edit timeline for social content"
                        className="absolute right-0 top-0 z-10 h-[38%] w-[42%]"
                    />
                    <ImageParallax
                        step={2}
                        reveal="up"
                        src={stageImages.presenceCommunication}
                        alt="A brand presentation on stage in front of an audience"
                        className="absolute bottom-0 right-[6%] z-20 h-[36%] w-[54%]"
                    />
                </div>
            }
        >
            <div data-group className="mt-10 grid gap-6 sm:grid-cols-3 story:mt-9">
                {CLUSTERS.map(({ title, items }, i) => (
                    <ServiceCluster key={title} variant="column" title={title} items={items} step={i + 3} />
                ))}
            </div>
        </StageScene>
    );
}
