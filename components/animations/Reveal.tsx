"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { EASE, MOTION_OK, gsap, introDelay, useGSAP } from "@/lib/animations";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  onLoad?: boolean;
  /** Animate direct children one after another instead of the block as a whole. */
  stagger?: boolean;
  y?: number;
};

/** Quiet entrance for supporting copy — a short rise with a soft blur, used sparingly. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, onLoad = false, stagger = false, y = 28 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Blur is costly to paint on phones: there the rise is a plain fade.
      mm.add({ ok: MOTION_OK, wide: "(min-width: 768px)" }, (ctx) => {
        const { ok, wide } = ctx.conditions!;
        if (!ok) return;
        const el = ref.current!;
        gsap.from(stagger ? el.children : el, {
          y: wide ? y : Math.min(y, 18),
          autoAlpha: 0,
          filter: wide ? "blur(6px)" : "none",
          duration: wide ? 1.3 : 1,
          ease: EASE,
          stagger: stagger ? 0.09 : 0,
          delay: onLoad ? introDelay() + delay : delay,
          clearProps: "filter",
          scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
