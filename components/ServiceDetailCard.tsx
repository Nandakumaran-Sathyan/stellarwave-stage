import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ServiceFeatureList } from "./ui/service-feature-list";
import { StarButton } from "./ui/star-button";

interface ServiceDetailCardProps {
    id: string;
    Icon: LucideIcon;
    name: string;
    tagline: string;
    fullDescription: string;
    features: string[];
    technologies: string[];
    index: number;
}

export default function ServiceDetailCard({
    id,
    Icon,
    name,
    tagline,
    fullDescription,
    features,
    technologies,
    index,
}: ServiceDetailCardProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-32 last:mb-0 scroll-mt-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? "" : "lg:grid-flow-dense"
                        }`}
                >
                    {/* Visual Section */}
                    <motion.div
                        className={`relative ${isEven ? "" : "lg:col-start-2"}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Glow Effect Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-full blur-3xl" />

                            {/* Icon Container */}
                            <div className="relative z-10 flex items-center justify-center h-full">
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative"
                                >
                                    <Icon
                                        className="h-48 w-48 md:h-64 md:w-64 text-white"
                                        style={{
                                            filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))",
                                        }}
                                    />
                                    {/* Orbiting particles */}
                                    <motion.div
                                        className="absolute -inset-4"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="absolute h-2 w-2 bg-white rounded-full"
                                                style={{
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: `rotate(${i * 120}deg) translateX(140px)`,
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Decorative Circles */}
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-pulse" />
                                <div className="absolute inset-8 border border-white/5 rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
                        <motion.div
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {/* Title */}
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {name}
                            </h2>

                            {/* Tagline */}
                            <p className="text-xl md:text-2xl text-gray-400 font-light mb-6 tracking-tight">
                                {tagline}
                            </p>

                            {/* Description */}
                            <p className="text-lg text-white/70 leading-relaxed mb-8">
                                {fullDescription}
                            </p>

                            {/* Features */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Key Features
                                </h3>
                                <ServiceFeatureList features={features} />
                            </div>

                            {/* Technologies */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Technologies & Tools
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map((tech, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/80 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div
                                onClick={() => {
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                <StarButton
                                    lightColor="#FFFFFF"
                                    className="rounded-3xl h-12 px-8 text-base cursor-pointer"
                                >
                                    Get Started with {name}
                                </StarButton>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
    );
}
