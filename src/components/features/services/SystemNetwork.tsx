import React from "react";
import { cn } from "@/lib/utils";

/* Diagram space. The container keeps this aspect ratio, so SVG units map
   1:1 onto the percentage-positioned HTML labels. */
const W = 600;
const H = 460;
const CX = W / 2;
const CY = H / 2;
const RX = 228;
const RY = 172;

interface SystemNetworkProps {
    /** Label of the central node */
    center: string;
    nodes: string[];
    /** Radius of the central node, in diagram units */
    coreRadius?: number;
    /** Rendered inside the central node, behind its label (e.g. an image) */
    core?: React.ReactNode;
    /** Rendered behind the whole network (e.g. a full-bleed image) */
    backdrop?: React.ReactNode;
    /** Force light text — for networks sitting on a dark image in either theme */
    onImage?: boolean;
    className?: string;
}

/* ── A connected system: one centre, a ring of nodes, lines drawn outward ──
   Beats: 1 = orbits, then one beat per node (its line draws, its label pops).
   Rendered from md up; on mobile the stage lists the same nodes as chips. */
export const SystemNetwork: React.FC<SystemNetworkProps> = ({
    center,
    nodes,
    coreRadius = 62,
    core,
    backdrop,
    onImage,
    className,
}) => {
    const points = nodes.map((label, i) => {
        const angle = ((-90 + (i * 360) / nodes.length) * Math.PI) / 180;
        /* Alternate the radius so the ring reads as a system, not a clock face */
        const reach = i % 2 === 0 ? 1 : 0.84;
        return {
            label,
            x: CX + Math.cos(angle) * RX * reach,
            y: CY + Math.sin(angle) * RY * reach,
            x0: CX + Math.cos(angle) * coreRadius,
            y0: CY + Math.sin(angle) * coreRadius,
            above: Math.sin(angle) < -0.3,
        };
    });

    return (
        <div className={cn("relative hidden w-full md:block", className)} style={{ aspectRatio: `${W} / ${H}` }}>
            {backdrop}

            <div data-drift="orbit" className="pointer-events-none absolute inset-0 will-change-transform">
                <svg aria-hidden viewBox={`0 0 ${W} ${H}`} fill="none" className="absolute inset-0 h-full w-full overflow-visible">
                    {[1, 0.84].map((reach) => (
                        <ellipse
                            key={reach}
                            data-step={1}
                            data-reveal="draw"
                            cx={CX}
                            cy={CY}
                            rx={RX * reach}
                            ry={RY * reach}
                            pathLength={1}
                            strokeDasharray={1}
                            strokeDashoffset={0}
                            className={onImage ? "stroke-white/15" : "stroke-black/10 dark:stroke-white/10"}
                        />
                    ))}
                    {points.map(({ label, x, y, x0, y0 }, i) => (
                        <line
                            key={label}
                            data-step={i + 2}
                            data-reveal="draw"
                            x1={x0}
                            y1={y0}
                            x2={x}
                            y2={y}
                            pathLength={1}
                            strokeDasharray={1}
                            strokeDashoffset={0}
                            className="stroke-violet-500/70"
                        />
                    ))}
                </svg>

                {points.map(({ label, x, y, above }, i) => (
                    <div
                        key={label}
                        data-step={i + 2}
                        data-reveal="pop"
                        className="group/node pointer-events-auto absolute"
                        style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
                    >
                        <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.8)] transition-[scale,box-shadow] duration-300 group-hover/node:scale-150 group-hover/node:shadow-[0_0_18px_4px_rgba(139,92,246,0.7)]" />
                        <span
                            className={cn(
                                "absolute left-1/2 w-28 -translate-x-1/2 text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.18em]",
                                above ? "bottom-3" : "top-3",
                                onImage ? "text-white/85" : "text-zinc-600 dark:text-zinc-300"
                            )}
                        >
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Central node */}
            <div
                data-enter
                data-reveal="scale"
                className="absolute left-1/2 top-1/2 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-violet-500/50 bg-[#0d0d10] shadow-[0_0_60px_rgba(139,92,246,0.3)]"
                style={{ width: `${((coreRadius * 2) / W) * 100}%` }}
            >
                {core}
                <span className="relative px-2 text-center text-[10px] font-bold uppercase leading-tight tracking-[0.25em] text-white lg:text-[11px]">
                    {center}
                </span>
            </div>
        </div>
    );
};

/* The same nodes as a plain list — used on mobile in place of the diagram. */
export const NodeChips: React.FC<{ nodes: string[]; className?: string }> = ({ nodes, className }) => (
    <ul data-group className={cn("mt-8 flex flex-wrap gap-2 md:hidden", className)}>
        {nodes.map((node, i) => (
            <li
                key={node}
                data-step={i + 2}
                className="rounded-full border border-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:border-white/10 dark:text-zinc-300"
            >
                {node}
            </li>
        ))}
    </ul>
);
