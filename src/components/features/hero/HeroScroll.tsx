"use client";
import React, { useRef, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BackgroundCircles } from "@/components/ui/background-circles";
import CursorSpeakerVideo from "./CursorSpeakerVideo";

export function HeroScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioOn, setAudioOn] = useState(false);
  return (
    <div className="relative flex flex-col overflow-hidden max-h-[52rem] md:max-h-none bg-white text-black dark:bg-[#050505] dark:text-white transition-colors duration-300">
      {/* Background Circles */}
      <div className="absolute inset-0 z-0">
        <BackgroundCircles variant="septenary" className="h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-16 -mb-16 md:mt-0 md:mb-0">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-black dark:text-white text-center">
                We build brands that<br />
                <span className="block text-3xl sm:text-5xl md:text-[6rem] font-semibold tracking-tighter mt-2 leading-tight md:leading-none">
                  Move the Digital Space
                </span>
              </h1>
            </>
          }
        >
          <CursorSpeakerVideo
            videoRef={videoRef}
            audioOn={audioOn}
            setAudioOn={setAudioOn}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}

export default HeroScroll;
