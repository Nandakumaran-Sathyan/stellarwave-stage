import React from "react";
import { cn } from "@/lib/utils";

/* ── The journey line ──
   Every section lays out inside JOURNEY_CONTAINER and draws its part of the
   violet line at the same x-position, so the segments read as one continuous
   thread from the hero to the final point. On lg+ the left padding also
   clears the fixed lifecycle navigation. */
export const JOURNEY_CONTAINER = "relative mx-auto w-full max-w-[1480px] px-6 md:px-10 lg:pl-44 lg:pr-12";

/* Line x-position, measured from the container edge… */
export const RAIL_X = "left-3 md:left-5 lg:left-44";
/* …and the same position measured from inside the container's padding. */
export const RAIL_X_INNER = "-left-3 md:-left-5 lg:left-0";

export const THREAD_FILL = "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]";

interface JourneyLineProps {
    /* Two fills (60% / 40%) so a pinned scene can draw the line in while it
       scrolls into place, then finish it while pinned. */
    split?: boolean;
    className?: string;
}

export const JourneyLine: React.FC<JourneyLineProps> = ({ split, className }) => (
    <div aria-hidden className={cn("pointer-events-none absolute bottom-0 top-0 w-px", RAIL_X, className)}>
        <span className="absolute inset-0 bg-violet-500/15" />
        {split ? (
            <>
                <span data-rail-fill className={cn("absolute inset-x-0 top-0 h-[60%] origin-top", THREAD_FILL)} />
                <span data-rail-fill className={cn("absolute inset-x-0 bottom-0 top-[60%] origin-top", THREAD_FILL)} />
            </>
        ) : (
            <span data-rail-fill className={cn("absolute inset-0 origin-top", THREAD_FILL)} />
        )}
    </div>
);
