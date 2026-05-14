import React, { useRef, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import PageTransition from "@/components/ui/PageTransition";
import ContactRedirect from "@/components/features/common/ContactRedirect";

const TeamsPage = React.lazy(() => import("@/pages/TeamsPage"));
const ClientPage = React.lazy(() => import("@/pages/ClientPage"));
const BlogPage = React.lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = React.lazy(() => import("@/pages/BlogPostPage"));

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

export default function AnimatedRoutes() {
    const location = useLocation();
    const prevIndex = useRef(getRouteIndex(location.pathname));

    const currentIndex = getRouteIndex(location.pathname);
    const direction = currentIndex > prevIndex.current ? 1 : currentIndex < prevIndex.current ? -1 : 0;

    // Update the ref AFTER computing direction so we compare old vs new
    React.useEffect(() => {
        prevIndex.current = currentIndex;
    }, [currentIndex]);

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
