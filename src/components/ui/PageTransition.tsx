import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
    children: React.ReactNode;
    direction: number;
    key?: string;
}

const variants = {
    enter: (direction: number) => ({
        x: direction >= 0 ? "100%" : "-100%",
    }),
    center: {
        x: 0,
    },
    exit: (direction: number) => ({
        x: direction >= 0 ? "-100%" : "100%",
    }),
};

export default function PageTransition({ children, direction }: PageTransitionProps) {
    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "tween", duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
            }}
            style={{
                width: "100%",
                minHeight: "100vh",
            }}
        >
            {children}
        </motion.div>
    );
}
