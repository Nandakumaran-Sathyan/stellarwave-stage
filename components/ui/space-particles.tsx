"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface SpaceParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    color?: string;
}

export function SpaceParticles({
    className = "",
    quantity = 100,
    staticity = 50,
    ease = 50,
    color = "#ffffff",
}: SpaceParticlesProps) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setIsReady(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        if (container) {
            console.log("Space particles loaded", container);
        }
    };

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: color,
                },
                move: {
                    enable: true,
                    direction: "top",
                    outModes: {
                        default: "out",
                        top: "out",
                        bottom: "out",
                    },
                    random: true,
                    speed: 0.3,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        width: 1920,
                        height: 1080,
                    },
                    value: quantity,
                },
                opacity: {
                    value: { min: 0.1, max: 0.6 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false,
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 0.5, max: 2.5 },
                },
                twinkle: {
                    particles: {
                        enable: true,
                        frequency: 0.05,
                        opacity: 1,
                    },
                },
            },
            detectRetina: true,
        }),
        [quantity, color]
    );

    if (!isReady) {
        return null;
    }

    return (
        <Particles
            id="space-particles"
            className={className}
            particlesLoaded={particlesLoaded}
            options={options}
        />
    );
}
