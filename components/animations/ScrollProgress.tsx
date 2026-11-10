"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/animations";

/** Hairline reading-progress bar; also re-measures ScrollTrigger once web fonts settle. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-bronze"
      style={{ scaleX }}
    />
  );
}
