"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BackgroundCircles } from "@/components/ui/background-circles";

export function HeroScroll() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 z-0">
        <BackgroundCircles variant="septenary" className="h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-black dark:text-white text-center">
                We build brands that<br />
                <span className="block text-3xl sm:text-5xl md:text-[6rem] font-semibold tracking-tighter mt-2 leading-tight md:leading-none">
                  Move the Digital Space
                </span>
              </h1>
            </>
          }
        >
          <img
            src="/assets/tab-screen.png"
            alt="hero"
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}

export default HeroScroll;
