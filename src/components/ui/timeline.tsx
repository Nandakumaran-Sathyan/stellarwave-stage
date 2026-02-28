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
            <div className="w-full">
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

                {/* ── Comet scroll tracker ── */}
                <div
                    style={{ height: height + "px" }}
                    className="hidden md:block absolute left-8 top-0 w-[2px] z-0
                        bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                        from-transparent from-[0%] via-neutral-200/30 dark:via-neutral-700/30 to-transparent to-[99%]
                        [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    {/* Comet tail — cosmic gradient trail */}
                    <motion.div
                        style={{ height: heightTransform, opacity: opacityTransform }}
                        className="absolute inset-x-0 top-0 w-[2px] rounded-full overflow-visible"
                    >
                        {/* Main nebula tail — long multi-color gradient */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] rounded-full"
                            style={{
                                height: "500px",
                                background: "linear-gradient(to top, #ffffff 0%, #e879f9 8%, #a855f7 18%, #7c3aed 30%, #6366f1 45%, #3b82f6 60%, #06b6d4 75%, rgba(6,182,212,0.1) 90%, transparent 100%)",
                            }}
                        />

                        {/* Aurora glow — wide soft color wash */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[24px] rounded-full"
                            style={{
                                height: "400px",
                                background: "linear-gradient(to top, rgba(232,121,249,0.35), rgba(139,92,246,0.25) 25%, rgba(99,102,241,0.15) 50%, rgba(6,182,212,0.08) 75%, transparent 100%)",
                                filter: "blur(8px)",
                            }}
                        />

                        {/* Outer nebula haze — ultra-wide ambient glow */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40px] rounded-full"
                            style={{
                                height: "250px",
                                background: "linear-gradient(to top, rgba(168,85,247,0.2), rgba(59,130,246,0.1) 40%, transparent 100%)",
                                filter: "blur(14px)",
                            }}
                        />

                        {/* ── Comet head — celestial body ── */}
                        <motion.div
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Distant corona — outermost ring */}
                            <motion.div
                                className="absolute -inset-6 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                style={{
                                    background: "conic-gradient(from 0deg, rgba(6,182,212,0.3), rgba(139,92,246,0.15), rgba(232,121,249,0.3), rgba(99,102,241,0.15), rgba(6,182,212,0.3))",
                                    filter: "blur(8px)",
                                }}
                            />
                            {/* Inner halo */}
                            <div
                                className="absolute -inset-3 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, rgba(232,121,249,0.5) 0%, rgba(139,92,246,0.3) 30%, rgba(59,130,246,0.1) 60%, transparent 80%)",
                                    filter: "blur(5px)",
                                }}
                            />
                            {/* Bright core */}
                            <div
                                className="h-8 w-8 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, #ffffff 0%, #f0abfc 25%, #a78bfa 50%, #7c3aed 75%, rgba(124,58,237,0.3) 100%)",
                                    boxShadow: "0 0 6px 3px rgba(255,255,255,0.6), 0 0 14px 5px rgba(232,121,249,0.5), 0 0 28px 10px rgba(139,92,246,0.4), 0 0 50px 18px rgba(99,102,241,0.2), 0 0 80px 30px rgba(6,182,212,0.1)",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
