import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { GLSLHills } from "@/components/ui/glsl-hills";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
    linkedin?: string;
    email?: string;
    github?: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Chief Executive Officer",
        bio: "Visionary leader with 15+ years in strategic growth and brand development.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        linkedin: "#",
        email: "sarah@stellarwave.com",
    },
    {
        id: 2,
        name: "Marcus Rodriguez",
        role: "Creative Director",
        bio: "Award-winning designer specializing in brand identity and digital experiences.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        linkedin: "#",
        email: "marcus@stellarwave.com",
    },
    {
        id: 3,
        name: "Aisha Patel",
        role: "Head of Strategy",
        bio: "Data-driven strategist focused on market intelligence and growth modeling.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
        linkedin: "#",
        email: "aisha@stellarwave.com",
    },
    {
        id: 4,
        name: "James Wilson",
        role: "Lead Developer",
        bio: "Full-stack engineer building scalable digital platforms and performance systems.",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
        linkedin: "#",
        github: "#",
        email: "james@stellarwave.com",
    },
    {
        id: 5,
        name: "Elena Volkov",
        role: "Performance Marketing Lead",
        bio: "Growth specialist driving measurable results across digital ecosystems.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        linkedin: "#",
        email: "elena@stellarwave.com",
    },
];

export default function TeamsPage() {
    return (
        <>
            <main className="relative w-full bg-white dark:bg-black min-h-screen overflow-hidden transition-colors duration-300">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f5f5f5,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,#1a1a1a,transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#fafafa,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom,#0a0a0a,transparent_50%)] pointer-events-none" />

                {/* ── GLSL HILLS HERO ── */}
                <div className="relative w-full" style={{ height: '100vh', minHeight: '600px' }}>
                    <div className="absolute inset-0">
                        <GLSLHills
                            width="100%"
                            height="100%"
                            cameraZ={125}
                            planeSize={256}
                            speed={0.5}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white dark:from-black/80 dark:via-transparent dark:to-black pointer-events-none z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="uppercase tracking-widest text-sm font-semibold text-black/50 dark:text-white/50 mb-6">

                            </p>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white mb-8 leading-tight">
                                Stellar Wave wasn't<br className="hidden md:block" />
                                built in a boardroom.
                            </h1>
                            <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 max-w-2xl mx-auto font-medium">
                                Built through conversations — between ambition and clarity.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* ── Content below hero ── */}
                <div className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* ── ABOUT US ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-28 pt-20"
                        >
                            {/* Origin Story */}
                            <div className="max-w-4xl mx-auto mb-20">
                                <p className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed text-center">
                                    Founded by <span className="font-bold text-black dark:text-white">Aravind</span> and <span className="font-bold text-black dark:text-white">Pavithira</span>, Stellar Wave began with a simple belief: that brands deserve structure before scale, and relationships before revenue.
                                </p>
                            </div>

                            {/* Founders */}
                            <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                                >
                                    <h3 className="text-2xl font-bold text-black dark:text-white mb-3">Aravind</h3>
                                    <p className="text-black/60 dark:text-white/60 leading-relaxed">
                                        Driven by growth — not just numbers, but meaningful expansion. From sports ecosystems to enterprise collaborations, his focus has been on building systems that last.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    className="p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                                >
                                    <h3 className="text-2xl font-bold text-black dark:text-white mb-3">Pavithira</h3>
                                    <p className="text-black/60 dark:text-white/60 leading-relaxed">
                                        The emotional intelligence behind the brand. With a deep eye for aesthetics and storytelling, she ensures every strategy carries clarity, warmth, and identity.
                                    </p>
                                </motion.div>
                            </div>

                            {/* Evolution paragraph */}
                            <div className="max-w-4xl mx-auto mb-16 text-center">
                                <p className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed mb-6">
                                    What began as discussions around positioning, perception, and purpose gradually evolved into something larger — a disciplined yet human approach to brand building.
                                </p>
                                <p className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed">
                                    We've never seen ourselves as an external agency stepping in from the outside. When we commit to a brand, we step into it fully — thinking like founders, aligning like partners, and executing with the ownership of an internal team.
                                </p>
                            </div>

                            {/* Closing philosophy */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="max-w-3xl mx-auto text-center p-10 rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent"
                            >
                                <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 mb-4 font-medium">
                                    If you're looking for vendors, we may not be the right fit.
                                </p>
                                <p className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                                    But if you're looking for partners who genuinely care about your growth and long-term impact — welcome to Stellar Wave.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* ── MEET THE TEAM ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <p className="uppercase tracking-widest text-md font-semibold text-black/40 dark:text-white/40 mb-4">
                                The People
                            </p>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6">
                                Meet Our Team
                            </h2>
                            <p className="text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto">

                                A diverse group of passionate professionals, each bringing unique skills and experiences to drive innovation and excellence in every project we undertake.
                            </p>
                        </motion.div>

                        {/* Team Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group relative"
                                >
                                    <div className="relative bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 overflow-hidden">
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Image */}
                                            <div className="mb-6 overflow-hidden rounded-xl">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    loading="lazy"
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Info */}
                                            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                                                {member.name}
                                            </h3>
                                            <p className="text-primary font-medium mb-3">
                                                {member.role}
                                            </p>
                                            <p className="text-black/60 dark:text-white/60 text-sm mb-6 leading-relaxed">
                                                {member.bio}
                                            </p>

                                            {/* Social Links */}
                                            <div className="flex gap-3">
                                                {member.linkedin && (
                                                    <a
                                                        href={member.linkedin}
                                                        className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-lg transition-all duration-300"
                                                        aria-label="LinkedIn"
                                                    >
                                                        <Linkedin size={18} className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" />
                                                    </a>
                                                )}
                                                {member.email && (
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-lg transition-all duration-300"
                                                        aria-label="Email"
                                                    >
                                                        <Mail size={18} className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" />
                                                    </a>
                                                )}
                                                {member.github && (
                                                    <a
                                                        href={member.github}
                                                        className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-lg transition-all duration-300"
                                                        aria-label="GitHub"
                                                    >
                                                        <Github size={18} className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
