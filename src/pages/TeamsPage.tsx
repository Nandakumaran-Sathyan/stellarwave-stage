import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/layout/Footer";
import { GLSLHills } from "@/components/ui/glsl-hills";
import KineticTeamHybrid from "@/components/ui/kinetic-team-hybrid";



export default function TeamsPage() {
    return (
        <>
            <Helmet>
                <title>Meet the Team — Stellar Wave Digital Marketing Agency</title>
                <meta name="description" content="Meet the team behind Stellar Wave, a Chennai digital marketing agency founded by Aravind Sunil and Pavithra Saravanan." />
                <link rel="canonical" href="https://stellarwave.in/teams" />
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://stellarwave.in/teams" />
                <meta property="og:title" content="Meet the Team — Stellar Wave Digital Marketing Agency" />
                <meta property="og:description" content="Meet the team behind Stellar Wave, a Chennai digital marketing agency founded by Aravind Sunil and Pavithra Saravanan." />
                <meta property="og:image" content="https://stellarwave.in/icon.png" />
                <meta property="og:site_name" content="Stellar Wave" />
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Meet the Team — Stellar Wave Digital Marketing Agency" />
                <meta name="twitter:description" content="Meet the team behind Stellar Wave, a Chennai digital marketing agency founded by Aravind Sunil and Pavithra Saravanan." />
                <meta name="twitter:image" content="https://stellarwave.in/icon.png" />
            </Helmet>
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

                        {/* ── MEET THE TEAM — Orbital Constellation ── */}
                        <KineticTeamHybrid />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
