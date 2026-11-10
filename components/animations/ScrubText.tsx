"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/animations";

/** Words brighten one by one as the passage scrolls through the viewport — for long statements. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLQuoteElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current!.querySelectorAll("span"), {
          opacity: 0.14,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <blockquote ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </blockquote>
  );
}
