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

                {/* ── Comet scroll tracker — Desktop only ── */}
                <div
                    style={{ height: height + "px" }}
                    className="hidden md:block absolute left-8 top-0 w-[2px] z-0
                        bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                        from-transparent from-[0%] via-neutral-200/20 dark:via-neutral-700/20 to-transparent to-[99%]
                        [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{ height: heightTransform, opacity: opacityTransform }}
                        className="absolute inset-x-0 top-0 w-[2px] rounded-full overflow-visible"
                    >
                        {/* Core beam */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full"
                            style={{
                                height: "600px",
                                background: "linear-gradient(to top, #ffffff 0%, #f0abfc 5%, #e879f9 12%, #a855f7 22%, #7c3aed 35%, #6366f1 50%, #3b82f6 65%, #06b6d4 80%, rgba(6,182,212,0.05) 95%, transparent 100%)",
                            }}
                        />
                        {/* Inner glow */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[10px] rounded-full"
                            style={{
                                height: "500px",
                                background: "linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(232,121,249,0.4) 10%, rgba(168,85,247,0.3) 30%, rgba(99,102,241,0.15) 60%, transparent 100%)",
                                filter: "blur(4px)",
                            }}
                        />
                        {/* Wide aurora wash */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[32px] rounded-full"
                            style={{
                                height: "420px",
                                background: "linear-gradient(to top, rgba(232,121,249,0.45), rgba(139,92,246,0.3) 20%, rgba(99,102,241,0.2) 45%, rgba(6,182,212,0.1) 70%, transparent 100%)",
                                filter: "blur(10px)",
                            }}
                        />
                        {/* Outer nebula haze */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[56px] rounded-full"
                            style={{
                                height: "280px",
                                background: "linear-gradient(to top, rgba(168,85,247,0.25), rgba(59,130,246,0.12) 45%, transparent 100%)",
                                filter: "blur(18px)",
                            }}
                        />

                        {/* ── Comet head — cosmic crystal diamond ── */}
                        <motion.div
                            className="absolute -bottom-5 left-1/2 -translate-x-1/2"
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Outer corona — slow conic rotate */}
                            <motion.div
                                className="absolute -inset-8 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                style={{
                                    background: "conic-gradient(from 0deg, rgba(6,182,212,0.35), rgba(139,92,246,0.18), rgba(232,121,249,0.35), rgba(99,102,241,0.18), rgba(6,182,212,0.35))",
                                    filter: "blur(10px)",
                                }}
                            />
                            {/* Inner orbital ring — counter-rotate */}
                            <motion.div
                                className="absolute -inset-4 rounded-full border border-purple-400/30"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                style={{ filter: "blur(1px)" }}
                            />
                            {/* Tilted orbital ring */}
                            <motion.div
                                className="absolute -inset-6 rounded-full border border-fuchsia-400/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                                style={{ transform: "scaleY(0.35)", filter: "blur(1px)" }}
                            />
                            {/* Inner radial halo */}
                            <div
                                className="absolute -inset-3 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(232,121,249,0.4) 30%, rgba(139,92,246,0.2) 60%, transparent 80%)",
                                    filter: "blur(4px)",
                                }}
                            />
                            {/* Diamond / crystal core */}
                            <motion.div
                                className="relative h-5 w-5"
                                animate={{ rotate: [0, 45, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #f0abfc 30%, #a78bfa 60%, #7c3aed 100%)",
                                    borderRadius: "4px",
                                    boxShadow: "0 0 8px 4px rgba(255,255,255,0.7), 0 0 18px 7px rgba(232,121,249,0.6), 0 0 36px 12px rgba(139,92,246,0.45), 0 0 60px 20px rgba(99,102,241,0.25), 0 0 100px 36px rgba(6,182,212,0.12)",
                                }}
                            />
                            {/* Floating sparks */}
                            {([
                                { x: -14, y: -8, delay: 0, size: 3, color: "rgba(232,121,249,0.9)" },
                                { x: 16, y: -12, delay: 0.4, size: 2, color: "rgba(255,255,255,0.9)" },
                                { x: -18, y: 4, delay: 0.8, size: 2, color: "rgba(139,92,246,0.9)" },
                                { x: 12, y: 6, delay: 1.2, size: 3, color: "rgba(6,182,212,0.9)" },
                                { x: -6, y: -18, delay: 1.6, size: 2, color: "rgba(99,102,241,0.9)" },
                                { x: 20, y: -4, delay: 2.0, size: 2, color: "rgba(232,121,249,0.7)" },
                            ] as const).map((spark, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        width: spark.size,
                                        height: spark.size,
                                        left: "50%",
                                        top: "50%",
                                        background: spark.color,
                                        boxShadow: `0 0 4px 2px ${spark.color}`,
                                    }}
                                    animate={{
                                        x: [0, spark.x, 0],
                                        y: [0, spark.y, 0],
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1.2, 0.5],
                                    }}
                                    transition={{
                                        duration: 2.4,
                                        delay: spark.delay,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
