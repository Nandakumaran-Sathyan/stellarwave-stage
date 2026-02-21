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
            "Before campaigns. Before content. Before ads. We define direction. Because when direction is clear, every decision becomes sharper.",
        features: [
            "Your market positioning",
            "Your competitive advantage",
            "Your audience behaviour",
            "Your communication framework",
            "Your short and long-term growth roadmap",
        ],
        technologies: ["Brand Strategy", "Go-to-Market Planning", "Growth Modeling", "Competitive Analysis", "Audience Research"],
    },
    {
        id: "service-creative",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
        name: "Creative",
        tagline: "Your brand's personality, brought to life.",
        fullDescription:
            "A brand is not just seen — it is experienced. We shape that experience through considered design, purposeful storytelling, and creative systems that reflect who you are. Creativity, for us, carries intent.",
        features: [
            "Brand identity systems",
            "Campaign concepts",
            "Content creation & storytelling",
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
        tagline: "Momentum that moves.",
        fullDescription:
            "Growth is not static. It's engineered. We build digital systems that turn visibility into measurable progress. We focus on outcomes — leads, conversions, authority, and long-term brand strength. Because visibility is temporary. Momentum is sustainable.",
        features: [
            "Performance marketing (Meta, Google & digital platforms)",
            "Conversion-driven funnels",
            "Website & UI/UX development",
            "SEO & authority building",
            "Influencer collaborations",
            "Marketing automation & CRM systems",
        ],
        technologies: [
            "React / Next.js",
            "Performance Marketing",
            "Google Analytics",
            "Meta Business Suite",
            "SEO & Analytics Tools",
        ],
    },
    {
        id: "service-sports",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
        name: "Competitive Sporting Ecosystems",
        tagline: "When the environment demands adrenaline and precision — we deliver both.",
        fullDescription:
            "Beyond strategy, creativity, and growth systems — we operate inside competitive sporting ecosystems. We build and amplify properties where moments win attention, but structure builds legacy.",
        features: [
            "League & championship branding",
            "Institutional sports communication systems",
            "Sponsorship & investment decks",
            "Athlete and academy positioning",
            "Event amplification & digital reach",
        ],
        technologies: [
            "Sports Branding",
            "Event Management",
            "Sponsorship Strategy",
            "Digital Amplification",
            "Athlete Communication",
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
                    subtitle="At Stellar Wave, we help brands move forward with clarity, personality, and measurable momentum. Everything we do is built around four core disciplines — working together as one integrated system."
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
                                Four disciplines. One integrated mindset.
                            </h2>
                            <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 font-medium">
                                Built to help brands — and ecosystems — lead.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Service Detail Cards — first 3 */}
                <div className="py-20">
                    {servicesData.slice(0, 3).map((service, index) => (
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

                {/* "And One More Thing" transition */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="pb-30 px-4 sm:px-6 lg:px-8 text-center"
                >
                    <div className="max-w-4xl mx-auto">
                        <p className="text-sm uppercase tracking-widest font-semibold text-black/40 dark:text-white/40 mb-6">
                            And One More Thing.
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
                            Beyond strategy, creativity,<br className="hidden md:block" /> and growth systems
                        </h2>
                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-black to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                            we operate inside{" "}
                            <span className="text-gray-500 dark:text-gray-400">COMPETITIVE SPORTING ECOSYSTEMS.</span>
                        </p>
                    </div>
                </motion.div>

                {/* 4th card — Competitive Sporting Ecosystems */}
                <div className="pb-20">
                    {servicesData.slice(3).map((service, index) => (
                        <ServiceDetailCard
                            key={service.id}
                            id={service.id}
                            imageUrl={service.imageUrl}
                            name={service.name}
                            tagline={service.tagline}
                            fullDescription={service.fullDescription}
                            features={service.features}
                            technologies={service.technologies}
                            index={3 + index}
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
                            Four disciplines. One integrated mindset.
                        </h2>
                        <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-8 leading-relaxed font-medium">
                            Built to help brands — and ecosystems — lead.
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
