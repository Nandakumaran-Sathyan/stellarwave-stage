import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Logo from '@/components/ui/Logo';

const VideoHero = React.lazy(() => import("@/components/features/hero/VideoHero"));
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

function MobileHero() {
    
    return (
        <section className="relative min-h-[92svh] overflow-hidden bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f4f0ff_0%,#ffffff_42%,#ececec_100%)] dark:bg-[radial-gradient(circle_at_top,#111111_0%,#050505_42%,#000000_100%)]" />
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
            <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-black/55 dark:text-white/55">
                    Stellar Wave
                </p>
                <Logo
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    src="/assets/logo.png"
                    alt="Stellar Wave Logo"
                    className="mt-8 h-auto w-[72vw] max-w-[340px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
                    loading="eager"
                    fetchPriority="high"
                />
                <h1 className="mt-10 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    Riding the Wave of Digital Excellence
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-6 text-black/65 dark:text-white/65 sm:text-base">
                    Strategic marketing, creative content, and growth systems for brands that need momentum.
                </p>
                <a
                    href="#contact"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02] dark:bg-white dark:text-black"
                >
                    Start a project
                </a>
            </div>
        </section>
    );
}


export default function HomePage() {
    const isMobile = useIsMobile();

    return (
        <div className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white transition-colors duration-300">
            <Helmet>
                <title>Digital Marketing Agency in Chennai | Stellar Wave</title>
                <meta name="description" content="Stellar Wave is a top digital marketing agency in Chennai specialising in brand strategy, creative content, performance marketing, and sports ecosystem marketing. Measurable results. Structured systems." />
                <link rel="canonical" href="https://stellarwave.in/" />
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://stellarwave.in/" />
                <meta property="og:title" content="Digital Marketing Agency in Chennai | Stellar Wave" />
                <meta property="og:description" content="Stellar Wave is a top digital marketing agency in Chennai specialising in brand strategy, creative content, performance marketing, and sports ecosystem marketing. Measurable results. Structured systems." />
                <meta property="og:image" content="https://stellarwave.in/icon.png" />
                <meta property="og:site_name" content="Stellar Wave" />
                <meta property="og:locale" content="en_IN" />
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Digital Marketing Agency in Chennai | Stellar Wave" />
                <meta name="twitter:description" content="Stellar Wave is a top digital marketing agency in Chennai specialising in brand strategy, creative content, performance marketing, and sports ecosystem marketing." />
                <meta name="twitter:image" content="https://stellarwave.in/icon.png" />
            </Helmet>
            <main>
                {isMobile ? <MobileHero /> : <VideoHero />}
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
            </main>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    );
}
