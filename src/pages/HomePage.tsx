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
                <title>Stellar Wave — Digital Marketing Agency in Chennai</title>
                <meta name="description" content="Stellar Wave is a Chennai-based digital marketing agency specialising in brand strategy, creative content, performance marketing, and sports ecosystem marketing. Structured systems. Measurable impact." />
                <link rel="canonical" href="https://stellarwave.in/" />
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
