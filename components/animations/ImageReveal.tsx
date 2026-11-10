"use client";

import { useRef, type ReactNode } from "react";
import { EASE_INOUT, MOTION_OK, gsap, introDelay, useGSAP } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  onLoad?: boolean;
  from?: "bottom" | "left" | "right";
};

const START = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" };

/** Curtain-style clip reveal; the photograph settles from a slight zoom as the frame opens. */
export function ImageReveal({ children, className, delay = 0, onLoad = false, from = "bottom" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          delay: onLoad ? introDelay() + delay : delay,
          scrollTrigger: onLoad ? undefined : { trigger: ref.current, start: "top 85%", once: true },
        });
        tl.from(ref.current, { clipPath: START[from], duration: 1.6, ease: EASE_INOUT }).from(
          ref.current!.querySelector("[data-zoom]") ?? ref.current!.firstElementChild,
          { scale: 1.25, duration: 2, ease: "power3.out" },
          0
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      {children}
    </div>
  );
}
