import React from "react";
import Navbar from "@/components/layout/Navbar";
import VideoHero from "@/components/features/hero/VideoHero";
import HeroScroll from "@/components/features/hero/HeroScroll";
import Services from "@/components/features/services/Services";
import { Clients } from "@/components/features/common/Clients";
import Team from "@/components/features/team/Team";
import CTA from "@/components/features/common/CTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
    return (
        <>
            <Navbar />
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
        </>
    );
}
