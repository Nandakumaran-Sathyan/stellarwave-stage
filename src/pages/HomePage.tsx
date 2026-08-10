import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import VideoHero from "@/components/features/hero/VideoHero";
const HeroScroll = React.lazy(() => import("@/components/features/hero/HeroScroll"));
const Services = React.lazy(() => import("@/components/features/services/Services"));
const Clients = React.lazy(() => import("@/components/features/common/Clients").then((module) => ({ default: module.Clients })));
const CTA = React.lazy(() => import("@/components/features/common/CTA"));
const Footer = React.lazy(() => import("@/components/layout/Footer"));

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const handleChange = () => setIsMobile(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return isMobile;
}

function useIdleMount(delay = 900) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let timeoutId: number | undefined;
        let idleId: number | undefined;

        const finish = () => setMounted(true);

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(() => {
                timeoutId = window.setTimeout(finish, delay);
            }, { timeout: delay + 300 });
        } else {
            timeoutId = window.setTimeout(finish, delay);
        }

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, [delay]);

    return mounted;
}

function DeferredMobileSections({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();
    const mounted = useIdleMount();

    if (!isMobile) {
        return <>{children}</>;
    }

    return mounted ? <>{children}</> : null;
}

export default function HomePage() {
    const isMobile = useIsMobile();

    return (
        <div className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white transition-colors duration-300">
            <Helmet>
                <title>Digital Marketing Agency in Chennai | Stellar Wave</title>
                <meta name="description" content="Stellar Wave is a digital marketing agency in Chennai for brand strategy, creative content, performance marketing, and sports ecosystem marketing." />
                <link rel="canonical" href="https://stellarwave.in/" />
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://stellarwave.in/" />
                <meta property="og:title" content="Digital Marketing Agency in Chennai | Stellar Wave" />
                <meta property="og:description" content="Stellar Wave is a digital marketing agency in Chennai for brand strategy, creative content, performance marketing, and sports ecosystem marketing." />
                <meta property="og:image" content="https://stellarwave.in/icon.png" />
                <meta property="og:site_name" content="Stellar Wave" />
                <meta property="og:locale" content="en_IN" />
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Digital Marketing Agency in Chennai | Stellar Wave" />
                <meta name="twitter:description" content="Stellar Wave is a digital marketing agency in Chennai for brand strategy, creative content, performance marketing, and sports ecosystem marketing." />
                <meta name="twitter:image" content="https://stellarwave.in/icon.png" />
            </Helmet>
            <main>
                <VideoHero />
                <DeferredMobileSections>
                    <Suspense fallback={null}>
                        <HeroScroll />
                    </Suspense>
                    <Suspense fallback={null}>
                        <Services />
                    </Suspense>
                    <Suspense fallback={null}>
                        <Clients />
                    </Suspense>
                    <div id="contact">
                        <Suspense fallback={null}>
                            <CTA />
                        </Suspense>
                    </div>
                </DeferredMobileSections>
            </main>
            {isMobile ? (
                <DeferredMobileSections>
                    <Suspense fallback={null}>
                        <Footer />
                    </Suspense>
                </DeferredMobileSections>
            ) : (
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            )}
        </div>
    );
}
