import React, { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTAINER, HEADLINE_COMPACT, RevealLines, SECTION, SectionLabel } from "./primitives";
import { faqs } from "./servicesContent";

/* 009 — FAQ. A plain accordion: one question open at a time. */
export default function ServicesFAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className={`${SECTION} border-t border-sw-line`}>
            <div className={`${CONTAINER} grid gap-y-12 lg:grid-cols-12 lg:gap-x-16`}>
                <div className="lg:col-span-4">
                    <SectionLabel number="009">FAQ</SectionLabel>
                    <RevealLines lines={["Questions,", "answered."]} className={`${HEADLINE_COMPACT} mt-8`} />
                </div>

                <ul data-reveal className="border-b border-sw-line lg:col-span-8">
                    {faqs.map((faq, index) => {
                        const isOpen = open === index;
                        return (
                            <li key={faq.question} className="border-t border-sw-line">
                                <h3>
                                    <button
                                        type="button"
                                        id={`faq-question-${index}`}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${index}`}
                                        onClick={() => setOpen(isOpen ? null : index)}
                                        className="group/faq flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left md:py-8"
                                    >
                                        <span className="font-sw-display text-xl font-medium leading-snug tracking-[-0.025em] text-sw-fg transition-colors duration-500 group-hover/faq:text-sw-accent md:text-[1.7rem]">
                                            {faq.question}
                                        </span>
                                        <span
                                            aria-hidden
                                            className={cn(
                                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sw-line text-sw-fg transition-[transform,border-color] duration-500",
                                                isOpen && "rotate-45 border-sw-accent"
                                            )}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </span>
                                    </button>
                                </h3>
                                {/* grid-rows 0fr → 1fr animates to the answer's own height */}
                                <div
                                    id={`faq-answer-${index}`}
                                    role="region"
                                    aria-labelledby={`faq-question-${index}`}
                                    inert={!isOpen}
                                    className={cn(
                                        "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
                                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <p className="max-w-2xl pb-8 text-base leading-relaxed text-sw-muted md:text-lg">{faq.answer}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
