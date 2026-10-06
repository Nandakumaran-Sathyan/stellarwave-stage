import React from "react";
import { cn } from "@/lib/utils";

interface ServiceClusterProps {
    title: string;
    items: string[];
    /** Beat on which the cluster appears */
    step: number;
    /** `card` = bordered container, `column` = open column under a rule */
    variant?: "card" | "column";
    className?: string;
    children?: React.ReactNode;
    key?: string;
}

/* A small group of services: a label and a short list, with lots of air. */
export const ServiceCluster: React.FC<ServiceClusterProps> = ({ title, items, step, variant = "card", className, children }) => (
    <div
        data-step={step}
        className={cn(
            "relative min-w-0 flex-1",
            variant === "card"
                ? "rounded-2xl border border-black/10 bg-white p-5 pb-6 transition-[border-color,box-shadow] duration-500 hover:border-violet-500/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] dark:border-white/10 dark:bg-[#0d0d10]"
                : "border-t border-black/10 pt-4 dark:border-white/10",
            className
        )}
    >
        {children}
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
            {title}
        </h3>
        <ul className="space-y-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
);
