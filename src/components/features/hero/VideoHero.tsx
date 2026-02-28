import React, { useRef, useEffect, useState } from 'react';

const SESSION_KEY = 'stellar-hero-video-played';

const VideoHero: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPlayed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    /* ── 1. Resize watcher ── */
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* ── 2. Playback logic ── */
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const tryPlay = () => {
            video.play().catch(() => {
                // Autoplay blocked — wait for first touch/click then play
                const unlock = () => {
                    video.play().catch(() => { });
                    document.removeEventListener('touchstart', unlock);
                    document.removeEventListener('click', unlock);
                };
                document.addEventListener('touchstart', unlock, { once: true });
                document.addEventListener('click', unlock, { once: true });
            });
        };

        if (hasPlayed) {
            // Already played — seek to last frame
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

        // First visit — play once then mark done
        const handleEnded = () => {
            video.pause();
            sessionStorage.setItem(SESSION_KEY, 'true');
        };
        video.addEventListener('ended', handleEnded);

        // Wait until enough data is available before playing (critical for mobile)
        if (video.readyState >= 3) {
            tryPlay();
        } else {
            video.addEventListener('canplay', tryPlay, { once: true });
        }

        return () => {
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('canplay', tryPlay);
        };
    }, [hasPlayed, isMobile]);

    const videoSrc = isMobile
        ? '/assets/logo-hero-mobile.mp4'
        : '/assets/logo-hero.mp4';

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
                    preload="auto"
                    autoPlay={!hasPlayed}
                    key={isMobile ? 'mobile' : 'desktop'}
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
