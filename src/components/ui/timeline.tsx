import {
    useScroll,
    useTransform,
    motion,
    useSpring,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
    id?: string;
}

/* Each item — CSS Grid for reliable sticky left column */
const TimelineItem = ({ item }: { item: TimelineEntry }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start 0.85", "end 0.15"],
    });

    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.2, 1, 1, 0.2]),
        { stiffness: 60, damping: 20 }
    );

    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [10, 0, 0, -10]),
        { stiffness: 60, damping: 20 }
    );

    return (
        /*  Grid: left column fixed width for desktop, single col on mobile  */
        <div
            ref={itemRef}
            id={item.id}
            className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 pt-16 md:pt-40"
        >
            {/* ── Left: sticky title — grid makes this rock-solid ── */}
            <div
                className="hidden md:block sticky top-28 h-fit z-10"
                style={{ alignSelf: "start" }}
            >
                {/* Dot — centred on the vertical line (line at left-8 = 32px)
            wrapper: absolute left-3, w-10 → centre = 12 + 20 = 32px ✓   */}
                {/* h-14 w-14 = 56px, left-1 = 4px → centre = 4+28 = 32px = left-8 ✓ */}
                <div className="h-14 w-14 absolute left-1 -top-2 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-purple-500" />
                </div>

                <motion.h3
                    style={{ opacity, y: translateY }}
                    className="pl-20 text-xl lg:text-3xl font-bold text-neutral-400 dark:text-neutral-500 leading-tight"
                >
                    {item.title}
                </motion.h3>
            </div>

            {/* ── Right: scrollable content ── */}
            <div className="pl-10 md:pl-0 w-full">
                {/* Mobile title */}
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-400 dark:text-neutral-500">
                    {item.title}
                </h3>
                {item.content}
            </div>
        </div>
    );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.getBoundingClientRect().height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="w-full bg-white dark:bg-black font-sans md:px-10" ref={containerRef}>
            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div key={index}>
                        <TimelineItem item={item} />
                    </div>
                ))}

                {/* Scroll-driven vertical line — left-8 (32px) bisects each dot, z-0 so dots render above */}
                <div
                    style={{ height: height + "px" }}
                    className="absolute left-8 top-0 w-[2px] z-0
            bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
            from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]
            [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{ height: heightTransform, opacity: opacityTransform }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
