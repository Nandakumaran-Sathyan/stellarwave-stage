"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

/**
 * Global background particles with strong mouse repulsion.
 * Light mode → VIBGYOR rainbow colors
 * Dark mode  → white / cool-toned particles
 */

const VIBGYOR_COLORS = [
    "#9400D3", "#4B0082", "#2563EB", "#10B981",
    "#F59E0B", "#F97316", "#EF4444", "#EC4899",
    "#06B6D4", "#8B5CF6", "#14B8A6", "#F43F5E",
];

const DARK_COLORS = ["#ffffff", "#e0e0e0", "#c0c0ff", "#d0f0ff"];

interface VibgyorParticlesProps {
    className?: string;
    quantity?: number;
}

export default function VibgyorParticles({
    className = "",
    quantity = 200,
}: VibgyorParticlesProps) {
    const [isReady, setIsReady] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setIsReady(true));
    }, []);

    useEffect(() => {
        const check = () =>
            setIsDark(document.documentElement.classList.contains("dark"));
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        if (container) console.log("Global particles loaded");
    };

    const colors = isDark ? DARK_COLORS : VIBGYOR_COLORS;

    const options: ISourceOptions = useMemo(
        () => ({
            background: { color: { value: "transparent" } },
            fullScreen: false,
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: { enable: false },
                    onHover: { enable: true, mode: "repulse" },
                },
                modes: {
                    repulse: {
                        distance: 250,
                        duration: 0.6,
                        speed: 1.5,
                        factor: 8,
                        maxSpeed: 60,
                    },
                },
            },
            particles: {
                color: { value: colors },
                move: {
                    enable: true,
                    direction: "none" as const,
                    outModes: { default: "bounce" as const },
                    random: true,
                    speed: 0.4,
                    straight: false,
                },
                number: {
                    density: { enable: true, width: 1920, height: 1080 },
                    value: quantity,
                },
                opacity: {
                    value: { min: isDark ? 0.1 : 0.3, max: isDark ? 0.5 : 0.8 },
                    animation: { enable: true, speed: 0.8, sync: false },
                },
                shape: { type: "circle" },
                size: { value: { min: 1, max: isDark ? 2.5 : 4 } },
                twinkle: {
                    particles: {
                        enable: true,
                        frequency: 0.08,
                        opacity: 1,
                        color: {
                            value: isDark
                                ? ["#ffffff", "#aaaaff"]
                                : ["#FFFFFF", "#FFD700", "#FF69B4", "#00FFFF"],
                        },
                    },
                },
            },
            detectRetina: true,
        }),
        [quantity, isDark, colors]
    );

    if (!isReady) return null;

    return (
        <Particles
            key={isDark ? "dark-particles" : "light-particles"}
            id="global-particles"
            className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
            particlesLoaded={particlesLoaded}
            options={options}
        />
    );
}
