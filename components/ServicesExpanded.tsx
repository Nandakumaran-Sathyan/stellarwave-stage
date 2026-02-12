import React from "react";
import { motion } from "framer-motion";
import {
    Lightbulb,
    Palette,
    Code,
    TrendingUp,
    PenTool,
} from "lucide-react";
import ServiceDetailCard from "./ServiceDetailCard";
import { SpaceParticles } from "./ui/space-particles";
import { BackgroundCircles } from "./ui/background-circles";

const servicesData = [
    {
        id: "service-marketing-strategy",
        Icon: Lightbulb,
        name: "Marketing Strategy",
        tagline: "Data-Driven Strategies for Measurable Growth",
        fullDescription:
            "Transform your business with comprehensive marketing strategies built on deep market analysis and consumer insights. We develop customized roadmaps that align with your business goals, identify untapped opportunities, and create actionable plans for sustainable growth.",
        features: [
            "Market research and competitive analysis",
            "Customer persona development",
            "Multi-channel campaign planning",
            "Performance metrics and KPI tracking",
            "Brand positioning strategy",
            "Go-to-market planning",
            "ROI optimization",
        ],
        technologies: ["Google Analytics", "SEMrush", "HubSpot", "Tableau", "Ahrefs"],
    },
    {
        id: "service-brand-design",
        Icon: Palette,
        name: "Brand Design",
        tagline: "Visual Identities That Leave Lasting Impressions",
        fullDescription:
            "Craft a distinctive brand identity that resonates with your audience and stands out in the market. From logo design to complete brand guidelines, we create cohesive visual systems that tell your story and build emotional connections with your customers.",
        features: [
            "Logo design and brand marks",
            "Color palette and typography systems",
            "Brand guidelines and style guides",
            "Marketing collateral design",
            "Packaging and product design",
            "Social media visual templates",
            "Brand refresh and evolution",
        ],
        technologies: [
            "Adobe Creative Suite",
            "Figma",
            "Sketch",
            "Procreate",
            "After Effects",
        ],
    },
    {
        id: "service-web-development",
        Icon: Code,
        name: "Web Development",
        tagline: "High-Performance Websites Built for the Future",
        fullDescription:
            "Build cutting-edge web applications with modern technologies and best practices. We create fast, secure, and scalable websites that deliver exceptional user experiences across all devices while maintaining clean, maintainable code.",
        features: [
            "Custom website development",
            "E-commerce solutions",
            "Progressive web apps (PWA)",
            "API integration and development",
            "Performance optimization",
            "Security implementation",
            "Ongoing maintenance and support",
        ],
        technologies: [
            "React / Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Vercel / AWS",
        ],
    },
    {
        id: "service-digital-marketing",
        Icon: TrendingUp,
        name: "Digital Marketing",
        tagline: "Amplify Your Reach, Maximize Your Impact",
        fullDescription:
            "Drive targeted traffic and convert visitors into loyal customers through strategic digital marketing campaigns. We leverage SEO, paid advertising, social media, and content marketing to build your online presence and achieve measurable results.",
        features: [
            "Search engine optimization (SEO)",
            "Pay-per-click advertising (PPC)",
            "Social media marketing",
            "Email marketing campaigns",
            "Content marketing strategy",
            "Conversion rate optimization",
            "Analytics and reporting",
        ],
        technologies: [
            "Google Ads",
            "Meta Business Suite",
            "Mailchimp",
            "Google Search Console",
            "Hootsuite",
        ],
    },
    {
        id: "service-content-creation",
        Icon: PenTool,
        name: "Content Creation",
        tagline: "Compelling Stories That Connect and Convert",
        fullDescription:
            "Engage your audience with high-quality content that educates, entertains, and inspires action. From blog posts to video production, we create content that aligns with your brand voice and drives meaningful engagement across all platforms.",
        features: [
            "Blog writing and copywriting",
            "Video production and editing",
            "Infographic design",
            "Social media content",
            "Podcast production",
            "Photography and image editing",
            "Content calendar management",
        ],
        technologies: [
            "Adobe Premiere Pro",
            "Final Cut Pro",
            "Canva",
            "Grammarly",
            "WordPress",
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
                <BackgroundCircles variant="septenary" className="h-full opacity-30" />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ffffff/8%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#ffffff/5%,transparent_50%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="py-32 px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                                Our Services
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                            Comprehensive digital solutions designed to elevate your brand and
                            drive measurable success in the digital landscape
                        </p>
                    </motion.div>
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
