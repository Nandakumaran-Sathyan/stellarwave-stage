import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { useMotionValue } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const location = useLocation();

    useEffect(() => {
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const lenis = new Lenis({
            duration: isCoarsePointer ? 1.1 : 0.9,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
            smoothWheel: true,
            touchMultiplier: 1.2,
            infinite: false,
            syncTouch: isCoarsePointer,
        });

        lenisRef.current = lenis;

        // Sync Lenis scroll position to window.scrollY so
        // position:sticky and framer-motion useScroll both work correctly
        lenis.on("scroll", ({ scroll }: { scroll: number }) => {
            // Keep document scroll in sync so sticky elements can see the right position
            document.documentElement.dataset.scroll = String(Math.round(scroll));
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const id = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(id);
            lenis.destroy();
        };
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return <>{children}</>;
}
