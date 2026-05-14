import React, { useRef, useEffect, useState } from 'react';

const SESSION_KEY = 'stellar-hero-video-played';

const VideoHero: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPlayed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
    const [isMobile, setIsMobile] = useState<boolean>(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    /* ── 1. Resize watcher ── */
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Stable string — only changes when the actual source file changes.
    // Using this as `key` so the video element remounts ONLY when source switches
    // (mobile ↔ desktop), not on every pixel resize. Matches 950ddda's stability pattern.
    const videoSrc = isMobile ? '/assets/logo%20black%20reels.mp4' : '/assets/logo%20black.mp4';

    /* ── 2. Playback logic (950ddda-compatible) ── */
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Set muted via DOM property — Safari checks the attribute, not React's prop
        video.muted = true;

        if (hasPlayed) {
            // Already played this session — show last frame
            const seekToEnd = () => {
                video.currentTime = video.duration;
                video.pause();
            };
            if (video.readyState >= 1) {
                seekToEnd();
            } else {
                video.addEventListener('loadedmetadata', seekToEnd, { once: true });
                return () => video.removeEventListener('loadedmetadata', seekToEnd);
            }
            return;
        }

        // First visit: play once, then mark as played.
        // Direct video.play() — same as 950ddda. Safari handles buffering readiness
        // internally; waiting for canplay/canplaythrough is unreliable on WebKit.
        const handleEnded = () => {
            video.pause();
            sessionStorage.setItem(SESSION_KEY, 'true');
        };
        video.addEventListener('ended', handleEnded);

        video.play().catch(() => {
            // Autoplay still blocked (e.g. iOS low-power mode) — unlock on touch/click
            const unlock = () => {
                video.muted = true;
                video.play().catch(() => { });
                document.removeEventListener('touchstart', unlock);
                document.removeEventListener('click', unlock);
            };
            document.addEventListener('touchstart', unlock, { once: true });
            document.addEventListener('click', unlock, { once: true });
        });

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [hasPlayed, isMobile]);

    return (
        <section
            id="video-hero"
            className="relative min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white overflow-hidden transition-colors duration-300"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop={false}
                    preload="metadata"
                    autoPlay={!hasPlayed}
                    key={videoSrc}
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="absolute inset-0 bg-black/10 dark:bg-black/10 pointer-events-none" />
        </section>
    );
};

export default VideoHero;
