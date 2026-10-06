import React from "react";
import StageScene, { type StageSectionProps } from "./StageScene";
import { ImageParallax } from "./ImageParallax";
import { NodeChips, SystemNetwork } from "./SystemNetwork";
import { stageImages } from "./lifecycleData";

const NODES = [
    "PR",
    "Founder Branding",
    "Thought Leadership",
    "Partnerships",
    "Events",
    "Sponsorships",
    "Brand Collaborations",
    "Industry Positioning",
];

const ALT = "A packed arena under stage lighting as confetti falls";

/* ── 05 Authority — the strongest image, with the system drawn over it ── */
export default function AuthoritySection(props: StageSectionProps) {
    return (
        <StageScene
            {...props}
            pinClass="story:h-[calc(100vh+1600px)]"
            columnsClass="story:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            visual={
                <>
                    <SystemNetwork
                        center="Authority"
                        nodes={NODES}
                        onImage
                        backdrop={
                            <>
                                <ImageParallax
                                    enter
                                    reveal="scale"
                                    src={stageImages.authority}
                                    alt={ALT}
                                    className="absolute inset-0 rounded-3xl"
                                />
                                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-black/60" />
                            </>
                        }
                    />
                    <ImageParallax enter src={stageImages.authority} alt={ALT} className="h-64 md:hidden" />
                </>
            }
        >
            {/* The specialised ecosystem where this stage is lived every day */}
            <p
                data-step={0}
                className="mt-8 max-w-sm border-l border-violet-500/60 pl-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
                And one more thing — we operate inside{" "}
                <span className="font-semibold text-black dark:text-white">competitive sporting ecosystems.</span>
            </p>
            <NodeChips nodes={NODES} />
        </StageScene>
    );
}
