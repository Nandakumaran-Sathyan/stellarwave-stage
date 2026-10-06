import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ServicesExpanded from "@/components/features/services/ServicesExpanded";
import Footer from "@/components/layout/Footer";

export default function ServicesPage() {
    const location = useLocation();

    useEffect(() => {
        // Check if there's a hash in the URL (e.g., #service-growth)
        if (location.hash) {
            // Wait for the route transition and the scroll animations to
            // measure the page, then jump — a smooth scroll started any
            // earlier is cancelled when they re-measure.
            const timer = setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    window.scrollTo({
                        top: element.getBoundingClientRect().top + window.scrollY,
                        behavior: "instant",
                    });
                }
            }, 600);
            return () => clearTimeout(timer);
        }
        // If no hash, scroll to top
        window.scrollTo(0, 0);
    }, [location.hash]);

    return (
        <>
            <Helmet>
                <title>Digital Marketing Services in Chennai | Stellar Wave</title>
                <meta name="description" content="Brand strategy, creative content, performance marketing, and sports ecosystem marketing — structured systems built for measurable growth in Chennai." />
                <link rel="canonical" href="https://stellarwave.in/services" />
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://stellarwave.in/services" />
                <meta property="og:title" content="Digital Marketing Services in Chennai | Stellar Wave" />
                <meta property="og:description" content="Brand strategy, creative content, performance marketing, and sports ecosystem marketing — structured systems built for measurable growth in Chennai." />
                <meta property="og:image" content="https://stellarwave.in/icon.png" />
                <meta property="og:site_name" content="Stellar Wave" />
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Digital Marketing Services in Chennai | Stellar Wave" />
                <meta name="twitter:description" content="Brand strategy, creative content, performance marketing, and sports ecosystem marketing — structured systems built for measurable growth in Chennai." />
                <meta name="twitter:image" content="https://stellarwave.in/icon.png" />
            </Helmet>
            <main>
                <ServicesExpanded />
            </main>
            <Footer />
        </>
    );
}
