import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/* ── Conditions ──
   `pinned` must match the `pinned` custom variant in src/styles/tailwind.css,
   which switches the lifecycle scene to position: sticky. (Sticky is used
   instead of ScrollTrigger's pin because PageTransition wraps the page in a
   transformed element, which breaks fixed-position pinning.) */
const CONDITIONS = {
    motion: "(prefers-reduced-motion: no-preference)",
    pinned: "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
    tablet: "(min-width: 768px)",
    pointer: "(hover: hover) and (pointer: fine)",
};

export interface MotionConditions {
    motion: boolean;
    pinned: boolean;
    tablet: boolean;
    pointer: boolean;
}

type Selector = (query: string) => HTMLElement[];
export type AnimationSetup = (root: HTMLElement, conditions: MotionConditions) => void | (() => void);

/* Runs `setup` inside a gsap.matchMedia() context scoped to the returned ref.
   Everything created in `setup` is reverted on breakpoint change and unmount.
   With reduced motion every setup returns early, leaving the static layout. */
export function useServicesAnimation<T extends HTMLElement>(setup: AnimationSetup) {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const root = ref.current;
        if (!root) return;

        const mm = gsap.matchMedia();
        mm.add(
            CONDITIONS,
            (context) => setup(root, context.conditions as unknown as MotionConditions),
            root
        );
        return () => mm.revert();
    }, [setup]);

    return ref;
}

/* ── Helpers ── */

/* The first-visit PageLoader overlay covers the page for ~1.5s. */
function introDelay() {
    try {
        return sessionStorage.getItem("stellar-loader-shown") === "true" ? 0.35 : 1.5;
    } catch {
        return 0.35;
    }
}

/* Image drifts a few px opposite the cursor. Returns its listener cleanup. */
function hoverMove(frame: HTMLElement) {
    const target = frame.querySelector<HTMLElement>("[data-mover]");
    if (!target) return () => {};

    const xTo = gsap.quickTo(target, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
        const rect = frame.getBoundingClientRect();
        xTo(((event.clientX - rect.left) / rect.width - 0.5) * -18);
        yTo(((event.clientY - rect.top) / rect.height - 0.5) * -18);
    };
    const onLeave = () => {
        xTo(0);
        yTo(0);
    };

    frame.addEventListener("mousemove", onMove);
    frame.addEventListener("mouseleave", onLeave);
    return () => {
        frame.removeEventListener("mousemove", onMove);
        frame.removeEventListener("mouseleave", onLeave);
    };
}

/* A rail that fills as its list scrolls past 60% of the viewport, with the
   step under that line reported as active. Shared by the growth journey, the
   process timeline and the mobile lifecycle. */
function stepRail(list: HTMLElement, onActive: (index: number) => void) {
    const fill = list.querySelector("[data-step-fill]");
    if (fill) {
        gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: 0.4 },
            }
        );
    }
    list.querySelectorAll("[data-step]").forEach((step, index) => {
        ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && onActive(index),
        });
    });
}

/* ── Page-wide editorial vocabulary ──
   Markup declares *what* an element does through data attributes; this turns
   them into tweens, so the section components stay free of animation code.

   data-lines        headline — each [data-line] rises out of its mask
   data-reveal       fade + slide up, staggered with its neighbours
   data-scrub-text   each [data-word] brightens as the block is read
   data-pillars      rules draw, then [data-pillar-word]s rise one by one
   data-clip         image frame wipes open, [data-clip-inner] settles
   data-parallax     image drifts inside its [data-frame]
   data-zoom         slow scale while the frame crosses the viewport
   data-hover-move   [data-mover] leans away from the cursor */
export const animateEditorial: AnimationSetup = (root, { motion, tablet, pointer }) => {
    if (!motion) return;
    const q: Selector = gsap.utils.selector(root);

    q("[data-lines]").forEach((block) => {
        gsap.from(block.querySelectorAll("[data-line]"), {
            yPercent: 112,
            duration: 1.3,
            ease: "power4.out",
            stagger: 0.11,
            scrollTrigger: { trigger: block, start: "top 86%", once: true },
        });
    });

    const reveals = q("[data-reveal]");
    gsap.set(reveals, { autoAlpha: 0, y: 28 });
    ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.09, overwrite: true }),
    });

    q("[data-scrub-text]").forEach((block) => {
        gsap.fromTo(
            block.querySelectorAll("[data-word]"),
            { opacity: 0.16 },
            {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: block, start: "top 82%", end: "bottom 50%", scrub: true },
            }
        );
    });

    q("[data-pillars]").forEach((group) => {
        const inGroup = (query: string) => group.querySelectorAll(query);
        gsap.timeline({ scrollTrigger: { trigger: group, start: "top 78%", once: true } })
            .from(inGroup("[data-pillar-rule]"), { scaleX: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.24 }, 0)
            .from(inGroup("[data-pillar-word]"), { yPercent: 108, duration: 1.2, ease: "power4.out", stagger: 0.24 }, 0.15)
            .from(inGroup("[data-pillar-meta]"), { autoAlpha: 0, duration: 0.8, stagger: 0.24 }, 0.5)
            .from(inGroup("[data-outcome]"), { autoAlpha: 0, y: 16, duration: 1, ease: "power3.out" }, ">-0.35");
    });

    q("[data-clip]").forEach((frame) => {
        gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 88%", once: true } })
            .fromTo(
                frame,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power3.inOut", clearProps: "clipPath" },
                0
            )
            .fromTo(
                frame.querySelector("[data-clip-inner]"),
                { scale: 1.22 },
                { scale: 1, duration: 1.9, ease: "power3.out" },
                0
            );
    });

    /* Scroll-linked image movement is desktop/tablet only — on phones it costs
       more frames than it is worth. */
    if (tablet) {
        q("[data-parallax]").forEach((image) => {
            const amount = Number(image.dataset.parallax) || 7;
            gsap.fromTo(
                image,
                { yPercent: -amount },
                {
                    yPercent: amount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: image.closest("[data-frame]"),
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });

        q("[data-zoom]").forEach((layer) => {
            gsap.fromTo(
                layer,
                { scale: 1 },
                {
                    scale: 1.12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: layer.closest("[data-frame]"),
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });
    }

    if (!pointer) return;
    const cleanups = q("[data-hover-move]").map(hoverMove);
    return () => cleanups.forEach((cleanup) => cleanup());
};

/* ── Hero: slow load sequence, floating details, a faint drift on scroll ── */
export const animateHero: AnimationSetup = (root, { motion }) => {
    if (!motion) return;
    const q: Selector = gsap.utils.selector(root);

    gsap.timeline({ defaults: { ease: "power3.out" }, delay: introDelay() })
        .from(q("[data-hero='eyebrow']"), { autoAlpha: 0, y: 12, duration: 0.9 })
        .from(q("[data-hero='line']"), { yPercent: 112, duration: 1.5, stagger: 0.14, ease: "power4.out" }, 0.15)
        .from(q("[data-hero='copy']"), { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.12 }, 0.75)
        .fromTo(
            q("[data-hero='frame']"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power3.inOut", clearProps: "clipPath" },
            0.55
        )
        .fromTo(q("[data-clip-inner]"), { scale: 1.25 }, { scale: 1, duration: 2.2 }, 0.55)
        .from(q("[data-hero='float']"), { autoAlpha: 0, scale: 0.92, duration: 1.2, stagger: 0.18 }, 1.5);

    /* Floating details breathe on different periods so they never sync up. */
    q("[data-hero='float']").forEach((element, index) => {
        gsap.to(element, {
            y: index % 2 ? 14 : -16,
            duration: 3.4 + index * 0.9,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    });

    gsap.to(q("[data-hero='heading']"), {
        y: -50,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
};

/* ── 001: the five-stage line draws across (down, on phones) as it is read ── */
export const animateProgression: AnimationSetup = (root, { motion, tablet }) => {
    if (!motion) return;
    const q: Selector = gsap.utils.selector(root);
    const track = q("[data-progression]")[0];
    const nodes = q("[data-progression-node]");
    if (!track) return;

    const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: track, start: "top 82%", end: "bottom 55%", scrub: 0.5 },
    });
    tl.fromTo(
        q("[data-progression-fill]"),
        tablet ? { scaleX: 0, scaleY: 1 } : { scaleX: 1, scaleY: 0 },
        { scaleX: 1, scaleY: 1, duration: 1 },
        0
    );
    nodes.forEach((node, index) => {
        const at = (index / Math.max(nodes.length - 1, 1)) * 0.92;
        tl.fromTo(node, { opacity: 0.28 }, { opacity: 1, duration: 0.08 }, at).fromTo(
            node.querySelector("[data-progression-dot]"),
            { scale: 0 },
            { scale: 1, duration: 0.08, ease: "power2.out" },
            at
        );
    });
};

/* ── Growth journey / process timeline ── */
export const createStepRail =
    (onActive: (index: number | null) => void): AnimationSetup =>
    (root, { motion }) => {
        if (!motion) return;
        const list = root.querySelector<HTMLElement>("[data-step-list]");
        if (!list) return;

        onActive(0);
        stepRail(list, onActive);
        return () => onActive(null);
    };

/* ── 005: the most kinetic section — type and panels travel sideways ── */
export const animateSporting: AnimationSetup = (root, { motion }) => {
    if (!motion) return;
    const q: Selector = gsap.utils.selector(root);

    gsap.fromTo(
        q("[data-sport='marquee']"),
        { xPercent: 4 },
        {
            xPercent: -32,
            ease: "none",
            scrollTrigger: { trigger: q("[data-sport='stage']")[0], start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
    );

    const viewport = q("[data-sport='viewport']")[0];
    const track = q("[data-sport='track']")[0];
    if (!viewport || !track) return;

    gsap.fromTo(
        track,
        { x: 0 },
        {
            x: () => -(track.scrollWidth - viewport.clientWidth),
            ease: "none",
            scrollTrigger: {
                trigger: viewport,
                start: "top 85%",
                end: "bottom 20%",
                scrub: 0.6,
                invalidateOnRefresh: true,
            },
        }
    );
};

/* ── 008: the lifecycle ──
   Desktop: the scene is sticky for the length of its wrapper; scroll progress
   picks the active stage and draws the line to its node.
   Elsewhere: a vertical sequence driven by the shared step rail. */
export const createLifecycle =
    (onActive: (index: number | null) => void, stageCount: number): AnimationSetup =>
    (root, { motion, pinned }) => {
        if (!motion) return;
        const q: Selector = gsap.utils.selector(root);

        onActive(0);

        if (pinned) {
            /* Nodes sit at the centre of equal rows, so the line reaches node i
               when progress = i / stageCount, then runs out to the end. */
            const first = 100 - 100 / (stageCount * 2);
            const last = 100 / (stageCount * 2);
            const hold = 1 / stageCount;

            gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: q("[data-life='scene']")[0],
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    onUpdate: (self) => onActive(Math.min(stageCount - 1, Math.floor(self.progress * stageCount))),
                },
            })
                .fromTo(
                    q("[data-life='line']"),
                    { clipPath: `inset(0% 0% ${first}% 0%)` },
                    { clipPath: `inset(0% 0% ${last}% 0%)`, duration: 1 - hold }
                )
                .to(q("[data-life='line']"), { clipPath: "inset(0% 0% 0% 0%)", duration: hold });
        } else {
            const list = q("[data-step-list]")[0];
            if (list) stepRail(list, onActive);
        }

        return () => onActive(null);
    };

/* ── Final CTA: a magnetic button — a few pixels toward the cursor, nothing more ── */
export const animateCta: AnimationSetup = (root, { motion, pointer }) => {
    if (!motion || !pointer) return;
    const magnet = root.querySelector<HTMLElement>("[data-magnet]");
    if (!magnet) return;

    const xTo = gsap.quickTo(magnet, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(magnet, "y", { duration: 0.5, ease: "power3.out" });
    const onMove = (event: MouseEvent) => {
        const rect = magnet.getBoundingClientRect();
        xTo((event.clientX - rect.left - rect.width / 2) * 0.2);
        yTo((event.clientY - rect.top - rect.height / 2) * 0.2);
    };
    const onLeave = () => {
        xTo(0);
        yTo(0);
    };
    magnet.addEventListener("mousemove", onMove);
    magnet.addEventListener("mouseleave", onLeave);
    return () => {
        magnet.removeEventListener("mousemove", onMove);
        magnet.removeEventListener("mouseleave", onLeave);
    };
};

/* Re-measures trigger positions when the document height changes (route
   transition finishing, fonts, images). Nothing here changes layout itself,
   so this cannot loop. */
export function refreshOnLayoutChange() {
    let timer: number | undefined;
    const observer = new ResizeObserver(() => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
        observer.disconnect();
        window.clearTimeout(timer);
    };
}

export function scrollToId(id: string) {
    const element = document.getElementById(id);
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: reduced ? "auto" : "smooth",
    });
}
