import React from "react";
import StageScene, { type StageSectionProps } from "./StageScene";
import { ImageParallax } from "./ImageParallax";
import { ServiceCluster } from "./ServiceCluster";
import { stageImages } from "./lifecycleData";

const CLUSTERS = [
    {
        title: "Brand",
        items: ["Brand Strategy", "Positioning", "Identity", "Logo System", "Guidelines"],
        /* Each card hangs a little lower than the last and overlaps its neighbour */
        className: "md:z-10",
        stem: "md:h-6",
    },
    {
        title: "Digital",
        items: ["Website Strategy", "UI / UX", "Development", "Landing Pages"],
        className: "md:z-20 md:-ml-3 md:mt-5",
        stem: "md:h-11",
    },
    {
        title: "Expression",
        items: ["Brand Film", "Presentations", "Launch Assets"],
        className: "md:z-30 md:-ml-3 md:mt-10",
        stem: "md:h-16",
    },
];

/* ── 01 Foundation — one hero image, three clusters hung from one line ── */
export default function FoundationSection(props: StageSectionProps) {
    return (
        <StageScene
            {...props}
            pinClass="story:h-[calc(100vh+1400px)]"
            visual={
                <ImageParallax
                    enter
                    reveal="right"
                    src={stageImages.foundation}
                    alt="Brand and design systems taking shape in a studio"
                    className="h-72 md:h-[28rem] story:h-[70vh]"
                />
            }
        >
            <div data-group className="relative mt-10 story:mt-8">
                {/* The connection — drawn once all three clusters are in place */}
                <span
                    data-step={4}
                    data-reveal="line-x"
                    aria-hidden
                    className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-violet-500/70 md:block"
                />
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-0 md:pt-6">
                    {CLUSTERS.map(({ title, items, className, stem }, i) => (
                        <ServiceCluster key={title} title={title} items={items} step={i + 1} className={className}>
                            <span
                                aria-hidden
                                className={`absolute bottom-full left-6 hidden w-px bg-violet-500/50 md:block ${stem}`}
                            >
                                <span className="absolute -left-[3px] -top-[3px] h-[7px] w-[7px] rounded-full bg-violet-500" />
                            </span>
                        </ServiceCluster>
                    ))}
                </div>
            </div>
        </StageScene>
    );
}
