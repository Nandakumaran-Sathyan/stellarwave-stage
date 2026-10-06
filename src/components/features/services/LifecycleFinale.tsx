import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { animateFinale, useJourneyAnimation } from "@/animations/servicesAnimations";
import { JOURNEY_CONTAINER, RAIL_X_INNER, THREAD_FILL } from "./JourneyLine";
import { lifecycleStages } from "./lifecycleData";

interface LifecycleFinaleProps {
    onSelectStage: (index: number) => void;
}

/* ── The lifecycle, brought together — and the question it leads to ── */
export default function LifecycleFinale({ onSelectStage }: LifecycleFinaleProps) {
    const ref = useJourneyAnimation<HTMLElement>(animateFinale);
    const navigate = useNavigate();

    const handleStart = () => {
        const contact = document.getElementById("contact");
        if (contact) contact.scrollIntoView({ behavior: "smooth" });
        // The contact section lives on the home page — same target as the navbar's Contact link.
        else navigate("/#contact");
    };

    return (
        <section ref={ref} className="relative overflow-clip">
            <div className={JOURNEY_CONTAINER}>
                <div className="relative pb-36 pt-64 text-center md:pt-72">
                    {/* The line leaves the rail, crosses to centre and converges into one point */}
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                        <span data-c="down" className={cn("absolute top-0 h-24 w-px origin-top", RAIL_X_INNER, THREAD_FILL)} />
                        <span
                            data-c="across"
                            className={cn("absolute right-1/2 top-24 h-px origin-left", RAIL_X_INNER, THREAD_FILL)}
                        />
                        <span data-c="centre" className={cn("absolute left-1/2 top-24 h-20 w-px origin-top", THREAD_FILL)} />
                        <span
                            data-c="glow"
                            className="absolute left-1/2 top-44 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_65%)]"
                        />
                        <span
                            data-c="point"
                            className="absolute left-1/2 top-44 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_24px_6px_rgba(139,92,246,0.7)]"
                        />
                    </div>

                    <div className="relative mx-auto max-w-5xl">
                        <p
                            data-c="line"
                            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400"
                        >
                            The Marketing Lifecycle
                        </p>

                        <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-x-6">
                            {lifecycleStages.map((stage, i) => (
                                <li key={stage.id} data-c="stage" className="flex items-center gap-x-4 md:gap-x-6">
                                    {i > 0 && <ArrowRight aria-hidden className="h-4 w-4 text-violet-500" />}
                                    <button
                                        type="button"
                                        onClick={() => onSelectStage(i)}
                                        className="cursor-pointer text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 hover:text-black dark:text-zinc-400 dark:hover:text-white md:text-base"
                                    >
                                        {stage.name}
                                    </button>
                                </li>
                            ))}
                        </ol>

                        <h2
                            data-c="ask"
                            className="mt-14 text-5xl font-black leading-[0.95] tracking-tighter text-black dark:text-white md:text-7xl lg:text-8xl"
                        >
                            Where is your business today?
                        </h2>

                        <div data-c="ask" className="mt-12">
                            <div data-c="magnet" className="inline-block p-3">
                                <button
                                    onClick={handleStart}
                                    className="group/cta inline-flex cursor-pointer items-center gap-3 rounded-full bg-black px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-[background-color,box-shadow] duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.45)] dark:bg-white dark:text-black"
                                >
                                    Start Your Project
                                    <ArrowRight className="h-4 w-4 transition-[translate] duration-300 group-hover/cta:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
