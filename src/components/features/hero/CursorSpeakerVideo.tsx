import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const CursorSpeakerVideo = ({ videoRef, audioOn, setAudioOn }: {
  videoRef: React.RefObject<HTMLVideoElement>;
  audioOn: boolean;
  setAudioOn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const handleMouseLeave = () => setMouse(null);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex items-center justify-center"
      style={{ cursor: mouse ? 'none' : 'default' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setAudioOn((prev) => {
          if (videoRef.current) {
            videoRef.current.muted = prev;
            if (prev) videoRef.current.play();
          }
          return !prev;
        });
      }}
    >
      <video
        ref={videoRef}
        src="/assets/ipad-video.mp4"
        autoPlay
        loop
        muted={!audioOn}
        playsInline
        className="rounded-2xl object-cover"
        style={{ width: '100%', height: '100%' }}
      />
      {mouse && (
        <div
          style={{
            position: 'absolute',
            left: mouse.x - 18,
            top: mouse.y - 18,
            width: 36,
            height: 36,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
          }}
        >
          <Volume2 className="w-6 h-6 text-white" />
        </div>
      )}

      {/* Audio Status Indicator */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none transition-opacity opacity-80">
        {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        <span className="text-xs font-medium tracking-wide uppercase">
          {audioOn ? "Sound On" : "Sound Off"}
        </span>
      </div>
    </div>
  );
};

export default CursorSpeakerVideo;