import React from "react";
import { motion } from "framer-motion";
import ServiceDetailCard from "./ServiceDetailCard";
import { SpaceParticles } from "@/components/ui/space-particles";
import { Hero } from "@/components/ui/hero-1";

const servicesData = [
    {
        id: "service-strategy",
        imageUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&auto=format&fit=crop&q=80",
        name: "Strategy",
        tagline: "Clarity before scale.",
        fullDescription:
            "Before campaigns, before content, before ads — we define direction. From brand strategy to go-to-market planning, we bring structure to ambition. Because growth without clarity becomes noise.",
        features: [
            "Your positioning in the market",
            "Your competitive advantage",
            "Your audience behaviour",
            "Your communication framework",
            "Your short- and long-term growth roadmap",
        ],
        technologies: ["Brand Strategy", "Go-to-Market Planning", "Growth Modeling", "Competitive Analysis", "Audience Research"],
    },
    {
        id: "service-creative",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
        name: "Creative",
        tagline: "Ideas that carry intent.",
        fullDescription:
            "Creativity is not decoration. It's how your brand is experienced. Every asset is aligned with your strategy — so your brand doesn't just look good, it communicates with purpose.",
        features: [
            "Brand identity systems",
            "Campaign concepts",
            "Social media content",
            "Short-form videos & brand films",
            "Retail & experiential creatives",
            "Presentation & sponsorship decks",
        ],
        technologies: [
            "Adobe Creative Suite",
            "Figma",
            "After Effects",
            "Premiere Pro",
            "Brand Identity Architecture",
        ],
    },
    {
        id: "service-growth",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        name: "Growth",
        tagline: "Measured. Scalable. Sustainable.",
        fullDescription:
            "Once direction and communication are aligned, we build momentum. We focus on outcomes — leads, conversions, authority, and long-term brand strength. Because visibility is temporary. Growth is engineered.",
        features: [
            "Performance marketing (Meta, Google & digital platforms)",
            "Conversion-focused funnels",
            "Website & UI/UX systems",
            "SEO & authority building",
            "Influencer & PR initiatives",
            "Marketing automation & CRM integration",
        ],
        technologies: [
            "React / Next.js",
            "Performance Marketing",
            "Google Analytics",
            "Meta Business Suite",
            "SEO & Analytics Tools",
        ],
    },
];

export default function ServicesExpanded() {
    return (
        <section className="relative w-full bg-white dark:bg-black overflow-hidden transition-colors duration-300">
            {/* Space Background Effects */}
            <div className="absolute inset-0 z-0">
                <SpaceParticles
                    className="absolute inset-0"
                    quantity={150}
                    color="#ffffff"
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#000000/5%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,#ffffff/8%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#000000/3%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom,#ffffff/5%,transparent_50%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <Hero
                    eyebrow="WHAT WE DO"
                    title="Strategy. Creative. Growth."
                    subtitle="At Stellar Wave, we help brands move forward with clarity and control. Everything we do falls under three focused disciplines — designed to work together."
                    ctaLabel="View Services"
                    ctaHref="#service-strategy"
                />

                {/* Philosophy Section */}
                <div className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-8">
                                Three Disciplines. One System.
                            </h2>
                            <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 font-medium mb-4">
                                We don't do isolated campaigns.
                            </p>
                            <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 font-medium">
                                We build integrated systems that compound.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Service Detail Cards */}
                <div className="py-20">
                    {servicesData.map((service, index) => (
                        <ServiceDetailCard
                            key={service.id}
                            id={service.id}
                            imageUrl={service.imageUrl}
                            name={service.name}
                            tagline={service.tagline}
                            fullDescription={service.fullDescription}
                            features={service.features}
                            technologies={service.technologies}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="py-32 px-4 sm:px-6 lg:px-8 text-center"
                >
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                            Three pillars. One integrated system.
                        </h2>
                        <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-8 leading-relaxed font-medium">
                            Built to help brands lead — not just participate.
                        </p>
                        <button
                            onClick={() => {
                                document
                                    .getElementById("contact")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                            Start Your Project
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
