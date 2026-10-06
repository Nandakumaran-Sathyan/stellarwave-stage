import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/* ── Breakpoints ──
   `story` = full pinned storyboard. Must match the `story` custom variant in
   src/styles/tailwind.css, which switches the scenes to position: sticky.
   (Sticky is used instead of ScrollTrigger's pin because PageTransition wraps
   the page in a transformed element, which breaks fixed-position pinning.) */
const STORY_QUERY =
    "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

const CONDITIONS = {
    story: STORY_QUERY,
    motion: "(prefers-reduced-motion: no-preference)",
    tablet: "(min-width: 768px)",
    pointer: "(hover: hover) and (pointer: fine)",
};

export interface JourneyConditions {
    story: boolean;
    motion: boolean;
    tablet: boolean;
    pointer: boolean;
}

type Selector = (query: string) => HTMLElement[];
type JourneySetup = (root: HTMLElement, conditions: JourneyConditions) => void | (() => void);

/* Runs `setup` inside a gsap.matchMedia() context scoped to the returned ref.
   Everything created in `setup` is reverted on breakpoint change and unmount. */
export function useJourneyAnimation<T extends HTMLElement>(setup: JourneySetup) {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const root = ref.current;
        if (!root) return;

        const mm = gsap.matchMedia();
        mm.add(
            CONDITIONS,
            (context) => setup(root, context.conditions as unknown as JourneyConditions),
            root
        );
        return () => mm.revert();
    }, [setup]);

    return ref;
}

/* ── Reveal vocabulary ──
   Markup declares *what* an element does (data-reveal) and *when*
   (data-enter = while the scene scrolls in, data-step="n" = nth beat while it
   is pinned). The scene timelines below turn that into tweens, so the stage
   components stay free of animation code. */
const REVEALS: Record<string, gsap.TweenVars> = {
    up: { autoAlpha: 0, y: 28 },
    down: { autoAlpha: 0, y: -40 },
    left: { autoAlpha: 0, x: -60 },
    right: { autoAlpha: 0, x: 60 },
    scale: { autoAlpha: 0, scale: 0.9 },
    pop: { autoAlpha: 0, scale: 0.4 },
    draw: { strokeDashoffset: 1 },
    "line-x": { scaleX: 0 },
    "line-y": { scaleY: 0 },
};

const RESTING: Record<string, number> = { autoAlpha: 1, x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, strokeDashoffset: 0 };

const revealOf = (el: HTMLElement) => {
    const from = REVEALS[el.dataset.reveal ?? "up"] ?? REVEALS.up;
    const to: gsap.TweenVars = {};
    Object.keys(from).forEach((key) => (to[key] = RESTING[key]));
    return { from, to, isLine: "strokeDashoffset" in from || "scaleX" in from || "scaleY" in from };
};

/* ── Helpers ── */

/* Draws rail segments top-to-bottom so the tip of the line holds at 60% of the viewport. */
function drawThread(fills: HTMLElement[], trigger: Element) {
    if (!fills.length) return;
    const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger, start: "top 60%", end: "bottom 60%", scrub: true },
    });
    fills.forEach((fill) => {
        tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, duration: fill.offsetHeight || 1 });
    });
}

/* Image drifts a few px opposite the cursor. Returns its listener cleanup. */
function mouseParallax(frame: HTMLElement) {
    const img = frame.querySelector<HTMLElement>("[data-parallax-img]");
    if (!img) return () => {};

    const xTo = gsap.quickTo(img, "xPercent", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(img, "yPercent", { duration: 0.8, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
        const rect = frame.getBoundingClientRect();
        xTo(((event.clientX - rect.left) / rect.width - 0.5) * -5);
        yTo(((event.clientY - rect.top) / rect.height - 0.5) * -5);
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

/* The first-visit PageLoader overlay covers the page for ~1.5s. */
function introDelay() {
    try {
        return sessionStorage.getItem("stellar-loader-shown") === "true" ? 0.3 : 1.5;
    } catch {
        return 0.3;
    }
}

/* ── Hero: slow load sequence, then a faint drift on scroll ── */
export const animateHero: JourneySetup = (root, { motion }) => {
    if (!motion) return;
    const q: Selector = gsap.utils.selector(root);

    gsap.timeline({ defaults: { ease: "power3.out" }, delay: introDelay() })
        .from(q("[data-hero='bg']"), { autoAlpha: 0, duration: 2.4, ease: "power1.inOut" })
        .from(q("[data-hero='eyebrow']"), { autoAlpha: 0, y: 12, duration: 0.9 }, 0.5)
        .from(q("[data-hero='line-text']"), { yPercent: 108, duration: 1.4, stagger: 0.16, ease: "power4.out" }, 0.8)
        .from(q("[data-hero='subtitle']"), { autoAlpha: 0, y: 20, duration: 1 }, "-=0.7")
        .from(q("[data-hero='line']"), { scaleX: 0, duration: 1.8, ease: "power2.inOut" }, "-=0.5")
        .from(q("[data-hero='node']"), { autoAlpha: 0, scale: 0, duration: 0.6, stagger: 0.2, ease: "back.out(2)" }, "-=1.5")
        .from(q("[data-hero='label']"), { autoAlpha: 0, y: 8, duration: 0.6, stagger: 0.2 }, "<0.1")
        .from(q("[data-rail-fill]"), { scaleY: 0, duration: 0.8, ease: "power2.in" }, "-=0.3");

    gsap.to(q("[data-hero='drift']"), {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(q("[data-hero='copy']"), {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
};

/* ── Stage scenes ── */

/* Desktop: the scene is sticky for the length of its wrapper. One scrubbed
   timeline brings it in, another plays its beats while pinned. The two never
   animate the same property of the same element, so they cannot fight. */
function storyStage(q: Selector, scene: HTMLElement) {
    const [railIn, railPinned] = q("[data-rail-fill]");

    const enter = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: scene, start: "top bottom", end: "top top", scrub: true },
    });
    enter
        .fromTo(q("[data-s='word']"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.4)
        .fromTo(railIn, { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: "none" }, 0.4);
    q("[data-enter]").forEach((el, i) => {
        const { from, to } = revealOf(el);
        enter.fromTo(el, from, { ...to, duration: 0.45 }, Math.min(0.35 + i * 0.04, 0.55));
    });

    /* Positions below are fractions of the pinned scroll distance (timeline length = 1). */
    const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: scene, start: "top top", end: "bottom bottom", scrub: 1 },
    });

    tl.fromTo(railPinned, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "none" }, 0)
        .fromTo(q("[data-s='word-inner']"), { xPercent: 0 }, { xPercent: -12, duration: 1, ease: "none" }, 0)
        .fromTo(q("[data-parallax-img]"), { scale: 1, x: 0, y: 0 }, { scale: 1.08, x: 10, y: -20, duration: 1, ease: "none" }, 0)
        /* Systems breathe by a few pixels — never spin. */
        .fromTo(q("[data-drift='orbit']"), { y: 6, rotation: -1.2 }, { y: -6, rotation: 1.2, duration: 1, ease: "none" }, 0)
        .fromTo(q("[data-drift='scale']"), { scale: 1 }, { scale: 1.03, duration: 1, ease: "none" }, 0)
        .fromTo(q("[data-s='tick']"), { scaleX: 0 }, { scaleX: 1, duration: 0.06 }, 0.01);

    /* Beats: each data-step value gets its own slice of the scroll, in order. */
    const steps = q("[data-step]");
    const order = [...new Set(steps.map((el) => Number(el.dataset.step)))].sort((a, b) => a - b);
    const START = 0.07;
    const slot = (0.88 - START) / order.length;
    steps.forEach((el) => {
        const { from, to, isLine } = revealOf(el);
        const at = START + order.indexOf(Number(el.dataset.step)) * slot;
        tl.fromTo(el, from, { ...to, duration: slot * (isLine ? 0.95 : 0.7), ease: isLine ? "none" : "power2.out" }, at);
    });

    /* Hand-off: the visual starts leaving before the next stage arrives. */
    tl.fromTo(q("[data-s='visual']"), { y: 0, autoAlpha: 1 }, { y: -40, autoAlpha: 0.4, duration: 0.08, ease: "power1.in" }, 0.92);
}

/* Mobile / tablet / short viewports: no pinning. Each data-group plays a
   short one-shot reveal of its own elements when it scrolls into view. */
function flowStage(q: Selector, scene: HTMLElement, tablet: boolean) {
    drawThread(q("[data-rail-fill]"), scene);

    const groups = new Map<Element, HTMLElement[]>();
    q("[data-enter], [data-step]").forEach((el) => {
        const group = el.closest("[data-group]") ?? scene;
        groups.set(group, [...(groups.get(group) ?? []), el]);
    });

    groups.forEach((elements, group) => {
        const tl = gsap.timeline({
            defaults: { duration: 0.7, ease: "power2.out" },
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
        elements.forEach((el, i) => tl.from(el, revealOf(el).from, Math.min(i * 0.07, 1.2)));
    });

    if (tablet) {
        q("[data-parallax-frame]").forEach((frame) => {
            gsap.fromTo(
                frame.querySelector("[data-parallax-img]"),
                { scale: 1 },
                {
                    scale: 1.08,
                    ease: "none",
                    scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
                }
            );
        });
    }
}

export const animateStage: JourneySetup = (root, { motion, story, tablet, pointer }) => {
    if (!motion) return;
    const q: Selector = gsap.utils.selector(root);
    const scene = q("[data-s='scene']")[0];

    if (story) storyStage(q, scene);
    else flowStage(q, scene, tablet);

    if (!pointer) return;
    const cleanups = q("[data-parallax-frame]").map(mouseParallax);
    return () => cleanups.forEach((cleanup) => cleanup());
};

/* ── Finale: the thread converges into a point, then the question ── */
export const animateFinale: JourneySetup = (root, { motion, pointer }) => {
    if (!motion) return;
    const q: Selector = gsap.utils.selector(root);

    gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: root, start: "top 60%", once: true },
    })
        .from(q("[data-c='down']"), { scaleY: 0, duration: 0.5, ease: "none" })
        .from(q("[data-c='across']"), { scaleX: 0, duration: 0.9 })
        .from(q("[data-c='centre']"), { scaleY: 0, duration: 0.45 })
        .from(q("[data-c='point']"), { scale: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(3)" })
        .from(q("[data-c='glow']"), { scale: 0, autoAlpha: 0, duration: 1.4, ease: "power2.out" }, "<")
        .from(q("[data-c='line']"), { autoAlpha: 0, y: 30, duration: 0.9, ease: "power3.out" }, "-=0.9")
        .from(q("[data-c='stage']"), { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.12, ease: "power2.out" }, "-=0.4")
        .from(q("[data-c='ask']"), { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.15, ease: "power3.out" }, "-=0.2");

    /* Magnetic CTA — a few pixels toward the cursor, nothing more. */
    const magnet = q("[data-c='magnet']")[0];
    if (!pointer || !magnet) return;

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

/* ── Progress indicator ──
   Navigation state rather than decoration, so it runs regardless of motion preference. */
export function createProgressTriggers(
    storyboard: HTMLElement,
    sections: HTMLElement[],
    onActive: (index: number) => void,
    onVisible: (visible: boolean) => void
) {
    const ctx = gsap.context(() => {
        ScrollTrigger.create({
            trigger: storyboard,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => onVisible(self.isActive),
        });
        sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onToggle: (self) => self.isActive && onActive(index),
            });
        });
    });
    return () => ctx.revert();
}

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

export function scrollToElement(element: HTMLElement | null | undefined) {
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: reduced ? "auto" : "smooth",
    });
}
