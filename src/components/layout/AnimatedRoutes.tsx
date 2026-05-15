import React, { useEffect, useRef, useState, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import PageTransition from "@/components/ui/PageTransition";
import ContactRedirect from "@/components/features/common/ContactRedirect";

const loadTeamsPage = () => import("@/pages/TeamsPage");
const loadClientPage = () => import("@/pages/ClientPage");
const loadBlogPage = () => import("@/pages/BlogPage");
const loadBlogPostPage = () => import("@/pages/BlogPostPage");

const TeamsPage = React.lazy(loadTeamsPage);
const ClientPage = React.lazy(loadClientPage);
const BlogPage = React.lazy(loadBlogPage);
const BlogPostPage = React.lazy(loadBlogPostPage);

// Route order matches navbar position: Home(0), Services(1), Teams(2), Client(3), Blog(4)
const ROUTE_ORDER: Record<string, number> = {
    "/": 0,
    "/services": 1,
    "/teams": 2,
    "/client": 3,
    "/contact": 0,
    "/blog": 4,
};

function getRouteIndex(pathname: string): number {
    return ROUTE_ORDER[pathname] ?? 0;
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const handleChange = () => setIsMobile(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return isMobile;
}

export default function AnimatedRoutes() {
    const location = useLocation();
    const prevIndex = useRef(getRouteIndex(location.pathname));
    const isMobile = useIsMobile();

    const currentIndex = getRouteIndex(location.pathname);
    const direction = currentIndex > prevIndex.current ? 1 : currentIndex < prevIndex.current ? -1 : 0;

    // Update the ref AFTER computing direction so we compare old vs new
    React.useEffect(() => {
        prevIndex.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        const preloadRouteChunks = () => {
            void loadTeamsPage();
            void loadClientPage();
            void loadBlogPage();
            void loadBlogPostPage();
        };

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            const idleId = window.requestIdleCallback(preloadRouteChunks, { timeout: 1500 });
            return () => window.cancelIdleCallback(idleId);
        }

        const timer = window.setTimeout(preloadRouteChunks, 1200);
        return () => window.clearTimeout(timer);
    }, []);

    if (isMobile) {
        return (
            <div style={{ position: "relative", overflow: "clip" }}>
                <Suspense fallback={null}>
                    <Routes location={location}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/teams" element={<TeamsPage />} />
                        <Route path="/client" element={<ClientPage />} />
                        <Route path="/contact" element={<ContactRedirect />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:slug" element={<BlogPostPage />} />
                    </Routes>
                </Suspense>
            </div>
        );
    }

    return (
        <div style={{ position: "relative", overflow: "clip" }}>
            <AnimatePresence mode="sync" initial={false} custom={direction}>
                <PageTransition key={location.pathname} direction={direction}>
                    <Suspense fallback={null}>
                        <Routes location={location}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/teams" element={<TeamsPage />} />
                            <Route path="/client" element={<ClientPage />} />
                            <Route path="/contact" element={<ContactRedirect />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:slug" element={<BlogPostPage />} />
                        </Routes>
                    </Suspense>
                </PageTransition>
            </AnimatePresence>
        </div>
    );
}
