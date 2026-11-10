"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/animations";
import type { Stat } from "@/types";

/** Counts up to a verified figure once it scrolls into view. Server-renders the final value. */
export function AnimatedCounter({ value, decimals = 0, suffix, className }: Omit<Stat, "label"> & { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => n.toFixed(decimals);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const num = ref.current!.firstElementChild as HTMLElement;
        const o = { v: 0 };
        num.textContent = fmt(0);
        gsap.to(o, {
          v: value,
          duration: 2.4,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
          onUpdate: () => void (num.textContent = fmt(o.v)),
        });
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      <span>{fmt(value)}</span>
      <span className="text-accent">{suffix}</span>
    </span>
  );
}
