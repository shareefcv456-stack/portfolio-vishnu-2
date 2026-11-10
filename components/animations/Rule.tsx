"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, introDelay, useGSAP } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Fine separator that draws itself from the left, with a short bronze lead segment. */
export function Rule({ className, onLoad = false, delay = 0 }: { className?: string; onLoad?: boolean; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current!.children, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.8,
          ease: "expo.inOut",
          stagger: 0.15,
          delay: onLoad ? introDelay() + delay : delay,
          scrollTrigger: onLoad ? undefined : { trigger: ref.current, start: "top 92%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden className={cn("relative h-px", className)}>
      <span className="absolute inset-0 bg-line" />
      <span className="absolute inset-y-0 left-0 w-16 bg-accent" />
    </div>
  );
}
