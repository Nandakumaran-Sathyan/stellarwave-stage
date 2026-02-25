import React, { useRef, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import PageTransition from "@/components/ui/PageTransition";

const TeamsPage = React.lazy(() => import("@/pages/TeamsPage"));
const ClientPage = React.lazy(() => import("@/pages/ClientPage"));

// Route order matches navbar position: Home(0), Services(1), Teams(2), Client(3)
const ROUTE_ORDER: Record<string, number> = {
    "/": 0,
    "/services": 1,
    "/teams": 2,
    "/client": 3,
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
            <AnimatePresence mode="wait" custom={direction}>
                <PageTransition key={location.pathname} direction={direction}>
                    <Suspense fallback={null}>
                        <Routes location={location}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/teams" element={<TeamsPage />} />
                            <Route path="/client" element={<ClientPage />} />
                        </Routes>
                    </Suspense>
                </PageTransition>
            </AnimatePresence>
        </div>
    );
}
