"use client";

import { useRef, type ElementType } from "react";
import { EASE, MOTION_OK, gsap, introDelay, useGSAP } from "@/lib/animations";

type Props = {
  /** Plain text; wrap words in *asterisks* for the bronze italic accent. Use "\n" to force a line break. */
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on page load (after the intro) instead of on scroll. */
  onLoad?: boolean;
  stagger?: number;
};

/** Split-word mask reveal: each word rises out of its own clipping box. */
export function TextReveal({ text, as: Tag = "h2", className, delay = 0, onLoad = false, stagger = 0.055 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current!.querySelectorAll(".mask > span"), {
          yPercent: 115,
          rotate: 2,
          duration: 1.5,
          ease: EASE,
          stagger,
          delay: onLoad ? introDelay() + delay : delay,
          scrollTrigger: onLoad ? undefined : { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref }
  );

  const lines = text.split("\n");
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className={lines.length > 1 ? "block" : undefined}>
          {line.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, si) => {
            const italic = seg.startsWith("*");
            const words = (italic ? seg.slice(1, -1) : seg).split(/(\s+)/);
            const out = words.map((w, wi) =>
              /^\s+$/.test(w) || !w ? (
                w && " "
              ) : (
                <span key={wi} className="mask">
                  <span>{w}</span>
                </span>
              )
            );
            return italic ? <em key={si}>{out}</em> : <span key={si}>{out}</span>;
          })}
        </span>
      ))}
    </Tag>
  );
}
