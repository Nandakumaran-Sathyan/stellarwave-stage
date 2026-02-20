import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
            <main>
                <ServicesExpanded />
            </main>
            <Footer />
        </>
    );
}
