import React from "react";
import { motion } from "framer-motion";
import {
    Target,
    Megaphone,
    Rocket,
    Shield,
    Trophy,
} from "lucide-react";
import ServiceDetailCard from "./ServiceDetailCard";
import { SpaceParticles } from "@/components/ui/space-particles";
import { Hero } from "@/components/ui/hero-1";

const servicesData = [
    {
        id: "service-marketing-strategy",
        Icon: Target,
        name: "Strategic Architecture",
        tagline: "Before capital is deployed, risk must be reduced.",
        fullDescription:
            "We design the strategic foundation that governs every execution decision — positioning, audience modeling, competitive mapping, and structured growth roadmaps. Execution without strategic control is volatility. We eliminate volatility.",
        features: [
            "Brand & positioning architecture",
            "Competitive ecosystem intelligence",
            "Audience segmentation frameworks",
            "Communication strategy systems",
            "3 / 6 / 12-month structured growth models",
            "Campaign & funnel engineering",
        ],
        technologies: ["Strategic Planning", "Market Intelligence", "Growth Modeling", "Competitive Analysis", "Brand Architecture"],
    },
    {
        id: "service-brand-design",
        Icon: Megaphone,
        name: "Communication & Influence Systems",
        tagline: "Perception determines market power.",
        fullDescription:
            "We build communication ecosystems that reinforce authority across digital, retail, institutional, and event environments. Creativity is not decoration. It is perception engineering.",
        features: [
            "Social & content governance systems",
            "High-precision creative production",
            "Motion & brand film assets",
            "Retail & experiential branding",
            "Campaign architecture",
            "Sponsor & board-level presentations",
        ],
        technologies: [
            "Adobe Creative Suite",
            "Figma",
            "After Effects",
            "Premiere Pro",
            "Cinema 4D",
        ],
    },
    {
        id: "service-web-development",
        Icon: Rocket,
        name: "Performance & Digital Infrastructure",
        tagline: "Growth must be measurable. And scalable.",
        fullDescription:
            "We architect digital performance systems that convert visibility into revenue, participation, and long-term market leverage. Every system operates under defined KPIs, reporting cadence, and optimization discipline. We do not 'run ads.' We build performance velocity.",
        features: [
            "Performance marketing (Meta & Google ecosystems)",
            "Conversion architecture & funnel optimization",
            "Retargeting intelligence",
            "Analytics integration & reporting frameworks",
            "Website & e-commerce systems",
            "Custom digital platforms & mobile applications",
        ],
        technologies: [
            "React / Next.js",
            "TypeScript",
            "Node.js",
            "Google Analytics",
            "Meta Business Suite",
        ],
    },
    {
        id: "service-digital-marketing",
        Icon: Shield,
        name: "Authority & Market Control Systems",
        tagline: "Short-term traction is easy. Sustained dominance is engineered.",
        fullDescription:
            "We design authority ecosystems that strengthen search visibility, influence conversation, and protect brand credibility. Brands that control narrative control markets.",
        features: [
            "Technical & strategic SEO frameworks",
            "Long-form content authority models",
            "Influencer & ambassador systems",
            "PR strategy & media positioning",
            "Online reputation monitoring",
            "Crisis communication advisory",
            "Automation & CRM integration",
        ],
        technologies: [
            "SEMrush",
            "Ahrefs",
            "Google Search Console",
            "HubSpot",
            "Salesforce",
        ],
    },
    {
        id: "service-content-creation",
        Icon: Trophy,
        name: "Sporting & Institutional Growth Architecture",
        tagline: "Competitive ecosystems require structural discipline.",
        fullDescription:
            "We specialize in building leagues, federations, championships, academies, and sporting properties with scalable digital and commercial systems. From regional platforms to national scale — we engineer sporting ecosystems for long-term relevance.",
        features: [
            "League & championship brand engineering",
            "Sponsorship architecture & investment decks",
            "Athlete & association positioning",
            "Governance-aligned communication systems",
            "Integrated digital amplification models",
        ],
        technologies: [
            "Brand Strategy",
            "Sponsorship Platforms",
            "Digital Ecosystems",
            "Event Management",
            "Analytics & Reporting",
        ],
    },
];

export default function ServicesExpanded() {
    return (
        <section className="relative w-full bg-black overflow-hidden">
            {/* Space Background Effects */}
            <div className="absolute inset-0 z-0">
                <SpaceParticles
                    className="absolute inset-0"
                    quantity={150}
                    color="#ffffff"
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ffffff/8%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#ffffff/5%,transparent_50%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <Hero
                    eyebrow="Growth Is Engineered"
                    title="Markets reward clarity. They punish noise."
                    subtitle="Stellar Wave designs structured growth systems for brands, institutions, and competitive ecosystems that intend to lead — not participate. We operate where strategic direction, creative precision, and measurable performance converge."
                    ctaLabel="View Services"
                    ctaHref="#service-marketing-strategy"
                />

                {/* Philosophy Section */}
                <div className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        {/* Growth Is Engineered */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                                Growth Is Engineered.
                            </h2>
                            <div className="space-y-4 text-xl md:text-2xl text-white/80 font-light">
                                <p>Markets reward clarity.</p>
                                <p>They punish noise.</p>
                            </div>
                        </motion.div>

                        {/* Mission Statement */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-16"
                        >
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed text-center max-w-4xl mx-auto mb-12">
                                Stellar Wave designs structured growth systems for brands, institutions, and competitive ecosystems
                                that intend to lead — not participate.
                            </p>
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed text-center max-w-4xl mx-auto">
                                We operate where strategic direction, creative precision, and measurable performance converge.
                            </p>
                        </motion.div>

                        {/* No's Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="grid md:grid-cols-3 gap-8 mb-20"
                        >
                            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-lg text-white/60">No fragmented execution.</p>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-lg text-white/60">No campaign dependency.</p>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-lg text-white/60">No vanity metrics.</p>
                            </div>
                        </motion.div>

                        {/* Only Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center mb-24"
                        >
                            <p className="text-2xl md:text-3xl text-white font-medium">
                                Only structured, compounding growth.
                            </p>
                        </motion.div>

                        {/* Our Philosophy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-20"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                                Our Philosophy
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                                    <p className="text-xl text-white/90 mb-2">Visibility is rented.</p>
                                    <p className="text-xl text-white font-medium">Authority is built.</p>
                                </div>
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                                    <p className="text-xl text-white/90 mb-2">Campaigns create spikes.</p>
                                    <p className="text-xl text-white font-medium">Systems create market control.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Strategic Partner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-20"
                        >
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                                We do not operate as a vendor.
                            </p>
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed text-center max-w-4xl mx-auto">
                                We function as a strategic growth partner — aligning with founders, CXOs, and leadership teams to
                                convert ambition into structured expansion.
                            </p>
                        </motion.div>

                        {/* Three Principles */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-center"
                        >
                            <p className="text-lg text-white/60 mb-6">
                                Every initiative is engineered around three principles:
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                <span className="text-2xl md:text-3xl font-bold text-white">Clarity.</span>
                                <span className="text-2xl md:text-3xl font-bold text-white">Control.</span>
                                <span className="text-2xl md:text-3xl font-bold text-white">Compounding Impact.</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Service Detail Cards */}
                <div className="py-20">
                    {servicesData.map((service, index) => {
                        const { id, Icon, name, tagline, fullDescription, features, technologies } = service;
                        return (
                            <ServiceDetailCard
                                key={id}
                                id={id}
                                Icon={Icon}
                                name={name}
                                tagline={tagline}
                                fullDescription={fullDescription}
                                features={features}
                                technologies={technologies}
                                index={index}
                            />
                        );
                    })}
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="py-32 px-4 sm:px-6 lg:px-8 text-center"
                >
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Digital Presence?
                        </h2>
                        <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
                            Let's discuss how our services can help you achieve your business
                            goals and stand out in the digital space.
                        </p>
                        <button
                            onClick={() => {
                                document
                                    .getElementById("contact")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                            Start Your Project
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
