import React from "react";
import StageScene, { type StageSectionProps } from "./StageScene";
import { ImageParallax } from "./ImageParallax";
import { stageImages } from "./lifecycleData";

const SYSTEM = [
    { title: "Discovery", items: ["SEO", "Google Ads", "Meta Ads", "Lead Generation"] },
    { title: "Conversion", items: ["Landing Pages", "WhatsApp", "Email", "CRM", "Lead Nurturing"] },
    { title: "Measurement", items: ["Conversion Tracking", "Analytics", "Reporting"] },
];

/* ── 03 Demand — a funnel drawn by scroll: stage, line, stage, line, stage ── */
export default function DemandSection(props: StageSectionProps) {
    return (
        <StageScene
            {...props}
            pinClass="story:h-[calc(100vh+1500px)]"
            visual={
                <div className="relative h-[22rem] md:h-[32rem] story:h-[70vh]">
                    <ImageParallax
                        enter
                        reveal="right"
                        src={stageImages.demandAnalytics}
                        alt="Campaign analytics on a dashboard"
                        className="absolute right-0 top-0 h-[64%] w-[82%]"
                    />
                    <ImageParallax
                        step={3}
                        reveal="up"
                        src={stageImages.demandReach}
                        alt="A network of city lights seen from orbit"
                        className="absolute bottom-0 left-0 z-10 h-[44%] w-[56%]"
                    />
                </div>
            }
        >
            {/* Beats: 1 Discovery · 2 line · 3 Conversion · 4 line · 5 Measurement */}
            <div data-group data-drift="scale" className="mt-10 origin-left story:mt-8">
                {SYSTEM.map(({ title, items }, i) => (
                    <div key={title} className="relative pb-8 pl-10 last:pb-0">
                        <span
                            data-step={i * 2 + 1}
                            data-reveal="pop"
                            aria-hidden
                            className="absolute left-0 top-[9px] h-[9px] w-[9px] rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
                        />
                        {i < SYSTEM.length - 1 && (
                            <svg
                                aria-hidden
                                viewBox="0 0 2 100"
                                preserveAspectRatio="none"
                                className="absolute left-[3.5px] top-[18px] h-full w-[2px]"
                            >
                                <line
                                    data-step={i * 2 + 2}
                                    data-reveal="draw"
                                    x1="1"
                                    y1="0"
                                    x2="1"
                                    y2="100"
                                    pathLength={1}
                                    strokeDasharray={1}
                                    strokeDashoffset={0}
                                    strokeWidth="2"
                                    className="stroke-violet-500"
                                />
                            </svg>
                        )}
                        <div data-step={i * 2 + 1}>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-black dark:text-white md:text-2xl">
                                {title}
                            </h3>
                            <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                                {items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </StageScene>
    );
}
