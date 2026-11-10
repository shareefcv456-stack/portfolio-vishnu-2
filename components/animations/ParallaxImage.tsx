"use client";

import Image from "next/image";
import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

type Props = {
  photo: Photo;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** Travel in percent of the frame height. */
  amount?: number;
  position?: string;
};

/** Photograph that drifts gently inside its frame while the frame scrolls past. */
export function ParallaxImage({ photo, className, sizes, priority, amount = 10, position = "center" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Phones get half the travel: less repaint work, and it reads calmer on a small screen.
      mm.add({ ok: MOTION_OK, wide: "(min-width: 768px)" }, (ctx) => {
        const { ok, wide } = ctx.conditions!;
        if (!ok) return;
        const travel = wide ? amount : amount / 2;
        gsap.fromTo(
          ref.current!.firstElementChild,
          { yPercent: -travel },
          { yPercent: travel, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div data-zoom className="absolute inset-x-0" style={{ top: `-${amount}%`, bottom: `-${amount}%` }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
