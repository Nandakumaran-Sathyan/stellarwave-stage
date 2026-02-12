import React from "react";
import Navbar from "../components/Navbar";
import ServicesExpanded from "../components/ServicesExpanded";
import Footer from "../components/Footer";

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main>
                <ServicesExpanded />
            </main>
            <Footer />
        </>
    );
}
