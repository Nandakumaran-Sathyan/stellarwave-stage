import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from "lucide-react";
import Footer from "@/components/layout/Footer";
import CircularGallery from "@/components/ui/CircularGallery";

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

                {/* Content */}
                <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6">
                                Meet Our Team
                            </h1>
                            <p className="text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto">
                                A collective of strategists, creators, and engineers dedicated to
                                building structured growth systems that drive market leadership.
                            </p>
                        </motion.div>

                        {/* Circular Gallery Hero Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="mb-20"
                            style={{ height: '600px', position: 'relative' }}
                        >
                            <CircularGallery
                                items={teamMembers.map(member => ({
                                    image: member.image,
                                    text: member.name
                                }))}
                                bend={6}
                                textColor="#ffffff"
                                borderRadius={0.09}
                                scrollSpeed={1.7}
                                scrollEase={0.05}
                            />
                            {/* Gradient fade at the bottom */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-10 bg-gradient-to-b from-transparent via-white/80 to-white dark:from-transparent dark:via-black/80 dark:to-black"
                            />
                        </motion.div>

                        {/* Team Title and Description */}
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">Team</h2>
                            <p className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl mx-auto">
                                A diverse group of passionate professionals, each bringing unique skills and experiences to drive innovation and excellence in every project we undertake.
                            </p>
                        </div>

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
