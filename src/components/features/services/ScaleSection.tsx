import React from "react";
import StageScene, { type StageSectionProps } from "./StageScene";
import { ImageParallax } from "./ImageParallax";
import { NodeChips, SystemNetwork } from "./SystemNetwork";
import { stageImages } from "./lifecycleData";

const NODES = [
    "Performance",
    "Marketing Automation",
    "CRM",
    "Conversion",
    "Customer Journey",
    "Analytics",
    "Business Process Automation",
    "Growth Consulting",
];

const ALT = "An abstract network of connected nodes";

/* ── 04 Scale — one connected system with Stellar Wave at the centre ── */
export default function ScaleSection(props: StageSectionProps) {
    return (
        <StageScene
            {...props}
            pinClass="story:h-[calc(100vh+1500px)]"
            columnsClass="story:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            visual={
                <>
                    <SystemNetwork
                        center="Stellar Wave"
                        nodes={NODES}
                        coreRadius={78}
                        core={
                            <>
                                <img
                                    src={stageImages.scale}
                                    alt={ALT}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 h-full w-full object-cover saturate-[0.7]"
                                />
                                <span aria-hidden className="absolute inset-0 bg-black/45" />
                            </>
                        }
                    />
                    <ImageParallax enter src={stageImages.scale} alt={ALT} className="h-64 md:hidden" />
                </>
            }
        >
            <NodeChips nodes={NODES} />
        </StageScene>
    );
}
