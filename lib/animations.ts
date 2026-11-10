"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** House easing — long, soft deceleration. */
export const EASE = "expo.out";
export const EASE_INOUT = "power4.inOut";

/** Wrap animations so reduced-motion users get the final state instantly. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

let first: boolean | undefined;
/** True only for the first page load of a browser session (drives the intro curtain + hero delay). */
export function isFirstVisit() {
  if (first === undefined) {
    try {
      first = !sessionStorage.getItem("vrg-intro");
      sessionStorage.setItem("vrg-intro", "1");
    } catch {
      first = true;
    }
  }
  return first;
}

/** Seconds on-load animations should wait: until the intro curtain lifts on a first visit, else a beat. */
export const introDelay = () => (isFirstVisit() ? Math.max(0.35, 2.05 - performance.now() / 1000) : 0.35);
