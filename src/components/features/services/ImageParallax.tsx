import React from "react";
import { cn } from "@/lib/utils";

interface ImageParallaxProps {
    src: string;
    alt: string;
    /** Size and position of the frame */
    className?: string;
    eager?: boolean;
    /** Reveal while the scene scrolls in… */
    enter?: boolean;
    /** …or on the nth beat while it is pinned */
    step?: number;
    reveal?: string;
    key?: string;
}

/* A masked image with the shared lifecycle grade (darkened, desaturated,
   violet light). servicesAnimations.ts drives the scroll scale/shift and the
   cursor-following movement through the data-parallax-* hooks. */
export const ImageParallax: React.FC<ImageParallaxProps> = ({ src, alt, className, eager, enter, step, reveal }) => (
    <div
        data-parallax-frame
        data-enter={enter ? "" : undefined}
        data-step={step}
        data-reveal={reveal}
        className={cn(
            "group relative overflow-hidden rounded-2xl border border-black/10 bg-zinc-900 shadow-[0_0_50px_rgba(139,92,246,0.12)] dark:border-white/10",
            className
        )}
    >
        {/* Oversized by 5% a side so parallax never exposes an edge */}
        <img
            data-parallax-img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute -inset-[5%] h-[110%] w-[110%] max-w-none object-cover brightness-[0.8] contrast-[1.1] saturate-[0.65] transition-[scale] duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
        />
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(200deg,rgba(139,92,246,0.22),transparent_45%,rgba(8,8,8,0.6))]"
        />
    </div>
);
