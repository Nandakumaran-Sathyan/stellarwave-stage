import React from "react";
import Navbar from "../components/Navbar";
import VideoHero from "../components/VideoHero";
import HeroScroll from "../components/HeroScroll";
import Services from "../components/Services";
import { Clients } from "../components/Clients";
import Team from "../components/Team";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <VideoHero />
                <HeroScroll />
                <Services />
                <Clients />
                <Team />
                <CTA />
            </main>
            <Footer />
        </>
    );
}
