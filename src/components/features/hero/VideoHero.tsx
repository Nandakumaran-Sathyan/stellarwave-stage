import React, { useRef, useEffect } from 'react';

const VideoHero: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Ensure video plays only once and pauses at the end
            const handleEnded = () => {
                video.pause();
            };

            video.addEventListener('ended', handleEnded);

            // Attempt to play the video
            video.play().catch((error) => {
                console.log('Video autoplay failed:', error);
            });

            return () => {
                video.removeEventListener('ended', handleEnded);
            };
        }
    }, []);

    return (
        <section
            id="video-hero"
            className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    loop={false}
                >
                    <source src="/assets/logo-hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Optional overlay for better text visibility if needed */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </section>
    );
};

export default VideoHero;
