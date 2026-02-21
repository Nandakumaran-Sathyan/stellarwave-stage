import React, { ReactNode, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { GlowEffect } from "@/components/ui/glow-effect";

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[32rem] grid-cols-3 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
};

const GLOW_COLORS = ["#a855f7", "#ec4899", "#f97316", "#3b82f6"];

function BentoCard({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
}: {
    key?: React.Key;
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
    href: string;
    cta: string;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={cn(
                "group relative col-span-3 rounded-xl p-[2px] transition-all duration-300",
                className,
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Glow behind the card */}
            {hovered && (
                <GlowEffect
                    colors={GLOW_COLORS}
                    mode="rotate"
                    blur="strong"
                    scale={1}
                    duration={4}
                    className="rounded-xl"
                />
            )}

            {/* Card itself */}
            <div
                className={cn(
                    "relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[10px]",
                    // light styles
                    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                    // dark styles
                    "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                )}
            >
                <div>{background}</div>
                <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                    <Icon className="h-12 w-12 origin-left transform-gpu text-black dark:text-white transition-all duration-300 ease-in-out group-hover:scale-75" />
                    <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                        {name}
                    </h3>
                    <p className="max-w-lg text-neutral-400 dark:text-neutral-400">{description}</p>
                </div>

                <div
                    className={cn(
                        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                    )}
                >
                    <a
                        href={href}
                        className="pointer-events-auto text-neutral-400 hover:text-neutral-300"
                    >
                        {cta}
                    </a>
                    <ArrowRightIcon className="ml-2 h-4 w-4 text-neutral-400" />
                </div>
                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
            </div>
        </div>
    );
}

export { BentoCard, BentoGrid };
