import React from "react";
import { cn } from "@/lib/utils";
import { CONTAINER, EditorialImage, HEADLINE, RevealLines, SECTION, SectionLabel, TextLink } from "./primitives";
import { projects } from "./servicesContent";
import type { Project } from "./servicesContent";

const number = (index: number) => String(index + 1).padStart(2, "0");

function ProjectMeta({ project, index, onImage }: { project: Project; index: number; onImage?: boolean }) {
    return (
        <p
            className={cn(
                "flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]",
                onImage ? "text-white/75" : "text-sw-muted"
            )}
        >
            <span className="tabular-nums">{number(index)}</span>
            <span aria-hidden className="h-px w-6 bg-sw-accent" />
            {project.category}
        </p>
    );
}

/* Image above, caption below — used for every project after the lead. */
function ProjectCard({ project, index, className, aspect }: { project: Project; index: number; className?: string; aspect: string; key?: string }) {
    return (
        <article className={className}>
            <EditorialImage src={project.image} alt={project.alt} sizes="(min-width: 1024px) 60vw, 100vw" className={aspect} />
            <div data-reveal className="mt-6 px-1 md:px-2">
                <ProjectMeta project={project} index={index} />
                <h3 className="mt-4 font-sw-display text-3xl font-medium leading-[1.05] tracking-[-0.035em] text-sw-fg md:text-[2.6rem]">
                    {project.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-sw-muted">{project.description}</p>
                <p className="mt-4 text-xs text-sw-fg">{project.scope}</p>
                <TextLink to="/client" className="mt-6">
                    View project
                </TextLink>
            </div>
        </article>
    );
}

/* 007 — Selected work. Asymmetric, one project at a time — never a 3-column grid. */
export default function SelectedWork() {
    const [lead, second, third, fourth] = projects;

    return (
        <section id="work" className={SECTION}>
            <div className={`${CONTAINER} flex flex-wrap items-end justify-between gap-8`}>
                <div>
                    <SectionLabel number="007">Selected Work</SectionLabel>
                    <RevealLines lines={["Built for brands", "that want to move."]} className={`${HEADLINE} mt-8`} />
                </div>
                <div data-reveal className="pb-3">
                    <TextLink to="/client">All clients</TextLink>
                </div>
            </div>

            {/* Lead project — most of the viewport */}
            <article className="mt-14 px-3 sm:px-5 md:mt-20">
                <EditorialImage
                    src={lead.image}
                    alt={lead.alt}
                    zoom
                    sizes="100vw"
                    className="h-[78svh] min-h-[520px] md:h-[92vh] md:rounded-[3.5rem]"
                >
                    <div className="absolute inset-x-6 bottom-7 md:inset-x-12 md:bottom-12">
                        <ProjectMeta project={lead} index={0} onImage />
                        <h3 className="mt-4 max-w-4xl font-sw-display text-[clamp(2.1rem,5.6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
                            {lead.title}
                        </h3>
                        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
                            <div>
                                <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg">{lead.description}</p>
                                <p className="mt-3 text-xs text-white/90">{lead.scope}</p>
                            </div>
                            <TextLink to="/client" className="text-white">
                                View project
                            </TextLink>
                        </div>
                    </div>
                </EditorialImage>
            </article>

            <div className={`${CONTAINER} mt-20 grid gap-y-20 md:mt-32 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-32`}>
                <ProjectCard project={second} index={1} aspect="aspect-[4/3]" className="lg:col-span-7" />
                <ProjectCard project={third} index={2} aspect="aspect-[4/5]" className="lg:col-span-4 lg:col-start-9 lg:mt-48" />
                <ProjectCard project={fourth} index={3} aspect="aspect-[16/10]" className="lg:col-span-8 lg:col-start-3" />
            </div>
        </section>
    );
}
