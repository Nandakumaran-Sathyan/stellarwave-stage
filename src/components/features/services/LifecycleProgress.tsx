import React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { lifecycleStages } from "./lifecycleData";

interface LifecycleProgressProps {
    active: number;
    visible: boolean;
    onSelect: (index: number) => void;
}

/* Portalled to <body>: PageTransition wraps pages in a transformed element,
   which would otherwise capture position: fixed. */
export default function LifecycleProgress({ active, visible, onSelect }: LifecycleProgressProps) {
    const visibility = visible ? "opacity-100" : "pointer-events-none opacity-0";

    return createPortal(
        <>
            {/* Desktop — minimal list on the left edge */}
            <nav
                aria-label="Marketing lifecycle"
                className={cn(
                    "fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block",
                    visibility
                )}
            >
                <ol className="space-y-4">
                    {lifecycleStages.map((stage, i) => {
                        const isActive = i === active;
                        return (
                            <li key={stage.id}>
                                <button
                                    type="button"
                                    onClick={() => onSelect(i)}
                                    aria-current={isActive ? "step" : undefined}
                                    tabIndex={visible ? 0 : -1}
                                    className={cn(
                                        "flex cursor-pointer items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                                        isActive
                                            ? "text-black dark:text-white"
                                            : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-300"
                                    )}
                                >
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "h-px origin-left transition-[width,background-color,box-shadow] duration-500",
                                            isActive
                                                ? "w-6 bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.9)]"
                                                : "w-3 bg-current"
                                        )}
                                    />
                                    <span className="tabular-nums">{stage.index}</span>
                                    <span>{stage.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </nav>

            {/* Mobile / tablet — compact horizontal pill */}
            <nav
                aria-label="Marketing lifecycle"
                className={cn(
                    "fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-black/10 bg-white/95 px-2 shadow-lg transition-opacity duration-500 dark:border-white/10 dark:bg-[#0d0d10]/95 lg:hidden",
                    visibility
                )}
            >
                <ol className="flex items-center">
                    {lifecycleStages.map((stage, i) => {
                        const isActive = i === active;
                        return (
                            <li key={stage.id} className="flex items-center">
                                {i > 0 && (
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "h-px w-3 transition-colors duration-300",
                                            i <= active ? "bg-violet-500" : "bg-black/15 dark:bg-white/15"
                                        )}
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => onSelect(i)}
                                    aria-label={`${stage.index} ${stage.name}`}
                                    aria-current={isActive ? "step" : undefined}
                                    tabIndex={visible ? 0 : -1}
                                    className="flex items-center gap-2 px-2 py-3"
                                >
                                    <span
                                        className={cn(
                                            "h-2 w-2 rounded-full transition-[background-color,box-shadow] duration-300",
                                            isActive
                                                ? "bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.9)]"
                                                : "bg-black/25 dark:bg-white/25"
                                        )}
                                    />
                                    {isActive && (
                                        <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-black dark:text-white">
                                            {stage.index} {stage.name}
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>,
        document.body
    );
}
