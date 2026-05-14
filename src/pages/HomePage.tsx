import React from "react";
import { Helmet } from "react-helmet-async";
import VideoHero from "@/components/features/hero/VideoHero";
import HeroScroll from "@/components/features/hero/HeroScroll";
import Services from "@/components/features/services/Services";
import { Clients } from "@/components/features/common/Clients";
import Team from "@/components/features/team/Team";
import CTA from "@/components/features/common/CTA";
import Footer from "@/components/layout/Footer";


export default function HomePage() {

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
                <VideoHero />
                <HeroScroll />
                <Services />
                <Clients />
                {/* <Team /> */}
                <div id="contact">
                    <CTA />
                </div>
            </main>
            <Footer />
        </div>
    );
}
