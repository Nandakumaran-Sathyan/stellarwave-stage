import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* Shared building blocks of the Services page. Motion is declared with data
   attributes and driven by animateEditorial (servicesAnimations.ts). */

export const CONTAINER = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
export const SECTION = "relative py-24 md:py-36 lg:py-44";
export const HEADLINE =
    "font-sw-display text-[clamp(2.6rem,6.4vw,6.75rem)] font-medium leading-[0.96] tracking-[-0.045em] text-sw-fg";
/* Smaller headline for narrow columns */
export const HEADLINE_COMPACT =
    "font-sw-display text-[clamp(2.4rem,4.4vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.045em] text-sw-fg";

/* 001 ● THE APPROACH */
export function SectionLabel({ number, children, className }: { number: string; children: React.ReactNode; className?: string }) {
    return (
        <p
            data-reveal
            className={cn(
                "inline-flex items-center gap-2.5 rounded-full border border-sw-line px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-sw-fg",
                className
            )}
        >
            <span className="tabular-nums text-sw-muted">{number}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-sw-accent" />
            <span>{children}</span>
        </p>
    );
}

/* Headline whose lines rise out of a mask. With `hero`, the hero's load
   timeline drives the same markup instead of a scroll trigger. */
export function RevealLines({
    as: Tag = "h2",
    lines,
    className,
    hero,
}: {
    as?: "h1" | "h2" | "h3" | "p";
    lines: React.ReactNode[];
    className?: string;
    hero?: boolean;
}) {
    const lineAttr = hero ? { "data-hero": "line" } : { "data-line": "" };
    return (
        <Tag data-lines={hero ? undefined : ""} className={className}>
            {lines.map((line, index) => (
                /* Padding keeps descenders inside the mask */
                <span key={index} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                    <span {...lineAttr} className="block will-change-transform">
                        {line}
                        {/* Keeps the words apart for anything reading the text without layout */}
                        {index < lines.length - 1 && " "}
                    </span>
                </span>
            ))}
        </Tag>
    );
}

/* Statement that brightens word by word as it is read. */
export function ScrubText({ as: Tag = "p", text, className }: { as?: "h2" | "p"; text: string; className?: string }) {
    return (
        <Tag data-scrub-text className={className}>
            {text.split(" ").map((word, index) => (
                <React.Fragment key={index}>
                    <span data-word>{word}</span>{" "}
                </React.Fragment>
            ))}
        </Tag>
    );
}

interface EditorialImageProps {
    src: string;
    alt: string;
    /** Size, aspect and radius of the frame */
    className?: string;
    eager?: boolean;
    /** Wipe open when scrolled into view (the hero runs its own reveal) */
    clip?: boolean;
    zoom?: boolean;
    /** Parallax travel, in % of the image height */
    parallax?: number;
    sizes?: string;
    frameProps?: Record<string, string>;
    children?: React.ReactNode;
    key?: string;
}

/* A rounded, masked photograph with the shared grade. Layers, outside in:
   frame (clip reveal) → clip-inner (settle) → mover (hover, zoom) → image
   (parallax). Each animation owns its own layer, so none of them fight. */
export function EditorialImage({
    src,
    alt,
    className,
    eager,
    clip = true,
    zoom,
    parallax = 7,
    sizes,
    frameProps,
    children,
}: EditorialImageProps) {
    return (
        <div
            data-frame
            data-clip={clip ? "" : undefined}
            data-hover-move
            {...frameProps}
            className={cn("group/image relative overflow-hidden rounded-[2rem] bg-zinc-900 md:rounded-[3rem]", className)}
        >
            <div data-clip-inner className="absolute inset-0 will-change-transform">
                <div data-mover data-zoom={zoom ? "" : undefined} className="absolute inset-0 will-change-transform">
                    {/* Oversized so parallax and hover never expose an edge */}
                    <img
                        data-parallax={parallax}
                        src={src}
                        alt={alt}
                        sizes={sizes}
                        loading={eager ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute -left-[5%] -top-[10%] h-[120%] w-[110%] max-w-none object-cover brightness-[0.78] contrast-[1.08] saturate-[0.7] will-change-transform"
                    />
                </div>
            </div>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(190deg,rgba(116,69,220,0.14),transparent_40%,rgba(6,6,6,0.55))]"
            />
            {children}
        </div>
    );
}

/* Three large words, revealed one after another, then the stage they lead to. */
export function Pillars({ pillars, outcome, className }: { pillars: string[]; outcome: [string, string]; className?: string }) {
    return (
        <div data-pillars className={className}>
            {pillars.map((pillar, index) => (
                <div key={pillar} className="relative flex items-end justify-between gap-6 py-4 md:py-5">
                    <span data-pillar-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-sw-line" />
                    <span className="block overflow-hidden pb-[0.06em]">
                        <span
                            data-pillar-word
                            className="block font-sw-display text-[clamp(2.1rem,5.2vw,5rem)] font-medium uppercase leading-none tracking-[-0.04em] text-sw-fg will-change-transform"
                        >
                            {pillar}
                        </span>
                    </span>
                    <span data-pillar-meta aria-hidden className="pb-2 text-xs tabular-nums text-sw-muted">
                        0{index + 1}
                    </span>
                </div>
            ))}
            <div className="relative py-6">
                <span data-pillar-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-sw-line" />
                <p
                    data-outcome
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-[0.22em] text-sw-fg md:text-sm"
                >
                    <span>{outcome[0]}</span>
                    <ArrowRight aria-hidden className="h-4 w-4 text-sw-accent" />
                    <span className="text-sw-accent">{outcome[1]}</span>
                </p>
            </div>
        </div>
    );
}

/* Set like the contents page of a strategy document rather than as cards. */
export function ServiceList({ services, className }: { services: string[]; className?: string }) {
    return (
        <div className={className}>
            <p data-reveal className="text-[11px] font-medium uppercase tracking-[0.22em] text-sw-muted">
                Services included
            </p>
            <ul data-reveal className="mt-5 grid gap-x-10 sm:grid-cols-2">
                {services.map((service, index) => (
                    <li
                        key={service}
                        className="flex items-baseline justify-between gap-4 border-t border-sw-line py-3 text-sm text-sw-fg md:text-[15px]"
                    >
                        <span>{service}</span>
                        <span aria-hidden className="text-[11px] tabular-nums text-sw-muted">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface PillLinkProps {
    children: React.ReactNode;
    /** Route to navigate to; omit for a plain button */
    to?: string;
    onClick?: () => void;
    variant?: "solid" | "outline";
    className?: string;
    dataAttrs?: Record<string, string>;
}

/* Pill CTA with the arrow in its own disc. */
export function PillLink({ children, to, onClick, variant = "solid", className, dataAttrs }: PillLinkProps) {
    const classes = cn(
        "group/pill inline-flex cursor-pointer items-center gap-4 rounded-full py-2 pl-6 pr-2 text-sm font-medium transition-colors duration-500",
        variant === "solid"
            ? "bg-sw-fg text-sw-bg hover:bg-sw-accent hover:text-white"
            : "border border-sw-line text-sw-fg hover:border-sw-accent",
        className
    );
    const content = (
        <>
            <span>{children}</span>
            <span
                aria-hidden
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover/pill:-rotate-45",
                    variant === "solid" ? "bg-sw-bg text-sw-fg" : "bg-sw-fg text-sw-bg"
                )}
            >
                <ArrowRight className="h-4 w-4" />
            </span>
        </>
    );

    return to ? (
        <Link to={to} onClick={onClick} className={classes} {...dataAttrs}>
            {content}
        </Link>
    ) : (
        <button type="button" onClick={onClick} className={classes} {...dataAttrs}>
            {content}
        </button>
    );
}

/* The home page mounts #contact after its route transition, so the link
   scrolls to it once it exists — the same approach the navbar uses. */
export function scrollToContactSoon() {
    window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 800);
}

/* Underlined text link with an arrow, e.g. VIEW PROJECT ↗ */
export function TextLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
    return (
        <Link
            to={to}
            className={cn(
                "group/link inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-sw-fg",
                className
            )}
        >
            <span className="relative">
                {children}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-sw-accent transition-transform duration-500 group-hover/link:scale-x-100" />
            </span>
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
    );
}
