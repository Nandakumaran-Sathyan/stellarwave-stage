import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ServicesExpanded from "@/components/features/services/ServicesExpanded";
import Footer from "@/components/layout/Footer";

export default function ServicesPage() {
    const location = useLocation();

    useEffect(() => {
        // Check if there's a hash in the URL (e.g., #service-web-development)
        if (location.hash) {
            // Small delay to ensure the page has rendered
            setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            // If no hash, scroll to top
            window.scrollTo(0, 0);
        }
    }, [location.hash]);

    return (
        <>
            <Helmet>
                <title>Digital Marketing Services in Chennai — Brand Strategy, Creative &amp; Growth | Stellar Wave</title>
                <meta name="description" content="Explore Stellar Wave's digital marketing services in Chennai — Brand Strategy, Creative Content, Performance Marketing, and Sports Ecosystem Marketing. We build structured systems that drive measurable growth." />
                <link rel="canonical" href="https://stellarwave.in/services" />
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://stellarwave.in/services" />
                <meta property="og:title" content="Digital Marketing Services in Chennai | Stellar Wave" />
                <meta property="og:description" content="Explore Stellar Wave's digital marketing services in Chennai — Brand Strategy, Creative Content, Performance Marketing, and Sports Ecosystem Marketing." />
                <meta property="og:image" content="https://stellarwave.in/icon.png" />
                <meta property="og:site_name" content="Stellar Wave" />
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Digital Marketing Services in Chennai | Stellar Wave" />
                <meta name="twitter:description" content="Explore Stellar Wave's digital marketing services in Chennai — Brand Strategy, Creative Content, Performance Marketing, and Sports Ecosystem Marketing." />
                <meta name="twitter:image" content="https://stellarwave.in/icon.png" />
            </Helmet>
            <main>
                <ServicesExpanded />
            </main>
            <Footer />
        </>
    );
}
