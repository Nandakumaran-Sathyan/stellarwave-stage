import React, { useRef, useEffect, useState } from 'react';

const SESSION_KEY = 'stellar-hero-video-played';

const VideoHero: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPlayed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Initial theme detection
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');

        // Watch for theme changes
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

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

        // First visit: play once, then mark as played
        const handleEnded = () => {
            video.pause();
            sessionStorage.setItem(SESSION_KEY, 'true');
        };

        video.addEventListener('ended', handleEnded);
        video.play().catch((error) => {
            console.log('Video autoplay failed:', error);
        });

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [hasPlayed, theme]);

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
                    autoPlay={!hasPlayed}
                    key={theme}
                >
                    <source src={theme === 'light' ? '/assets/logo-white.mp4' : '/assets/logo-hero.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Optional overlay for better text visibility if needed */}
            <div className="absolute inset-0 bg-black/10 dark:bg-black/10 pointer-events-none" />
        </section>
    );
};

export default VideoHero;
