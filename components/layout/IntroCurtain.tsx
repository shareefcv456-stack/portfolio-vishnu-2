"use client";

import { useLayoutEffect, useRef } from "react";
import { isFirstVisit } from "@/lib/animations";

/** First-visit monogram curtain. CSS drives the motion; repeat visits hide it before paint. */
export function IntroCurtain() {
  const ref = useRef<HTMLDivElement>(null);
  const hide = () => ref.current?.style.setProperty("display", "none");
  useLayoutEffect(() => {
    if (!isFirstVisit()) hide();
  }, []);
  return (
    <div ref={ref} aria-hidden className="curtain grain" onAnimationEnd={(e) => e.target === e.currentTarget && hide()}>
      <div className="text-center">
        <div className="curtain-mark">
          V<span className="italic text-bronze">R</span>G
        </div>
        <div className="curtain-line" />
        <p className="label mt-5 text-muted" style={{ animation: "mark-in 1s var(--ease-lux) .35s both" }}>
          RG Group · Since 1940
        </p>
      </div>
    </div>
  );
}
