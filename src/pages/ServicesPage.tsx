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
            </Helmet>
            <main>
                <ServicesExpanded />
            </main>
            <Footer />
        </>
    );
}
