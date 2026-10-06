import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "./servicesData";

interface ServiceDetailDrawerProps {
    service: Service | null;
    onClose: () => void;
}

/* ── The full discipline, one click away ──
   The stages keep the page minimal; this panel carries the complete service
   copy — tagline, description, every feature and tool. */
export default function ServiceDetailDrawer({ service, onClose }: ServiceDetailDrawerProps) {
    const open = service !== null;
    const closeRef = useRef<HTMLButtonElement>(null);
    /* Keep the last service rendered while the panel slides out */
    const [shown, setShown] = useState<Service | null>(service);

    useEffect(() => {
        if (service) setShown(service);
    }, [service]);

    useEffect(() => {
        if (!open) return;
        closeRef.current?.focus();
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return createPortal(
        <div className={cn("fixed inset-0 z-[10000]", !open && "pointer-events-none")} aria-hidden={!open}>
            <div
                onClick={onClose}
                className={cn("absolute inset-0 bg-black/60 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
            />
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={shown?.name}
                data-lenis-prevent
                className={cn(
                    "absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto border-l border-black/10 bg-white p-8 text-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/10 dark:bg-[#0b0b0d] dark:text-white md:p-12",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    aria-label="Close"
                    className="mb-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center self-end rounded-full border border-black/10 text-zinc-500 hover:border-violet-500 hover:text-black dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>

                {shown && (
                    <>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">
                            The discipline
                        </p>
                        <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
                            {shown.name}
                        </h2>
                        <p className="mt-5 text-xl font-semibold italic text-violet-600 dark:text-violet-300 md:text-2xl">
                            {shown.tagline}
                        </p>
                        <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {shown.fullDescription}
                        </p>

                        <ul className="mt-8 space-y-3 border-t border-black/10 pt-8 dark:border-white/10">
                            {shown.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <span className="mt-[0.5em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 md:text-base">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <ul className="mt-8 flex flex-wrap gap-2">
                            {shown.technologies.map((tech) => (
                                <li
                                    key={tech}
                                    className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-zinc-600 transition-[border-color,box-shadow] duration-300 hover:border-violet-500 hover:shadow-[0_0_14px_rgba(139,92,246,0.3)] dark:border-white/10 dark:text-zinc-300"
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </aside>
        </div>,
        document.body
    );
}
