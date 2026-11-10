"use client";

import { useRef } from "react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE, MOTION_OK, gsap, useGSAP } from "@/lib/animations";
import { presence } from "@/lib/content";

// Equirectangular window over 30°E–130°E, 5°S–45°N (10 units per degree).
const W = 1000;
const H = 500;
const project = ([lon, lat]: readonly [number, number]) => [(lon - 30) * 10, (45 - lat) * 10] as const;

/** Sea-chart style map: only the places the original record names, linked back to Calicut. */
export function GlobalPresenceSection({ index = "05" }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);
  const hq = project(presence[0].coords);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-map]", start: "top 75%", once: true } });
        tl.from("[data-grid]", { autoAlpha: 0, duration: 1.2, ease: "power2.out" })
          .from("[data-marker]", { scale: 0, transformOrigin: "center", stagger: 0.25, duration: 0.9, ease: "back.out(2)" }, 0.3)
          .fromTo("[data-arc]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, stagger: 0.25, ease: EASE }, 0.6)
          .from("[data-place]", { autoAlpha: 0, y: 8, stagger: 0.2, duration: 0.8, ease: EASE }, 1);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="tone-espresso grain section overflow-hidden" aria-label="Global business presence">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading index={index} eyebrow="Global presence" title="From Calicut to *31+ countries.*" />
            <Reveal className="lead mt-8 text-fg/75">
              Today, RG Group operates in 31+ countries, supported by a robust network of 450+ distributors across India and a growing global footprint.
            </Reveal>
            <Reveal stagger as="dl" className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                { value: 31, suffix: "+", label: "Countries" },
                { value: 450, suffix: "+", label: "Distributors in India" },
                { value: 60, suffix: "%", label: "GCC oil-segment share, 2017" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="label order-2 mt-2 leading-relaxed text-muted">{s.label}</dt>
                  <dd className="numeral order-1 text-5xl leading-none md:text-6xl">
                    <AnimatedCounter {...s} />
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>

          <figure data-map className="lg:col-span-7">
            <svg viewBox={`0 0 ${W} ${H}`} className="hidden h-auto w-full sm:block" role="img" aria-label="Map marking Calicut headquarters, the GCC and China">
              <defs>
                <radialGradient id="glow">
                  <stop offset="0%" stopColor="#aa895b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#aa895b" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g data-grid stroke="#f2ebdd" strokeOpacity="0.09" strokeWidth="1">
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2={H} />
                ))}
                {Array.from({ length: 6 }, (_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 100} x2={W} y2={i * 100} strokeDasharray="2 6" />
                ))}
                <line x1="0" y1="450" x2={W} y2="450" strokeOpacity="0.3" />
              </g>
              <g data-grid fill="#a79d8d" fontSize="11" letterSpacing="2" fontFamily="var(--font-manrope)">
                {[40, 60, 80, 100, 120].map((lon) => (
                  <text key={lon} x={(lon - 30) * 10 + 6} y={H - 8}>
                    {lon}°E
                  </text>
                ))}
                {[40, 20, 0].map((lat) => (
                  <text key={lat} x="6" y={(45 - lat) * 10 - 6}>
                    {lat === 0 ? "EQUATOR" : `${lat}°N`}
                  </text>
                ))}
              </g>

              {presence.slice(1).map((p) => {
                const [x, y] = project(p.coords);
                const cx = (hq[0] + x) / 2;
                const cy = Math.min(hq[1], y) - 120;
                return (
                  <path
                    key={p.name}
                    data-arc
                    d={`M${hq[0]},${hq[1]} Q${cx},${cy} ${x},${y}`}
                    fill="none"
                    stroke="#aa895b"
                    strokeWidth="1.5"
                    pathLength={1}
                    strokeDasharray="1"
                  />
                );
              })}

              {presence.map((p) => {
                const [x, y] = project(p.coords);
                const end = x > 700;
                const tx = end ? x - 14 : x + 14;
                return (
                  <g key={p.name}>
                    <circle cx={x} cy={y} r={p.hq ? 60 : 36} fill="url(#glow)" />
                    <g data-marker>
                      <circle cx={x} cy={y} r={p.hq ? 7 : 5} fill={p.hq ? "#aa895b" : "#f2ebdd"} />
                      <circle cx={x} cy={y} r={p.hq ? 16 : 11} fill="none" stroke="#aa895b" strokeOpacity="0.6">
                        <animate attributeName="r" values={p.hq ? "8;26" : "6;18"} dur="2.8s" repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" />
                      </circle>
                    </g>
                    <g data-place textAnchor={end ? "end" : "start"}>
                      <text x={tx} y={y + (p.hq ? 30 : -18)} fill="#f2ebdd" fontSize="34" fontWeight="500" fontFamily="var(--font-cormorant)">
                        {p.name}
                      </text>
                      <text x={tx} y={y + (p.hq ? 50 : 2)} className="max-sm:hidden" fill="#a79d8d" fontSize="14" letterSpacing="1.5" fontFamily="var(--font-manrope)">
                        {p.note.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
            <ul className="space-y-4 border-t border-line pt-6 sm:hidden">
              {presence.map((p) => (
                <li key={p.name} className="flex gap-3 text-sm">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="font-serif text-xl">{p.name}</span>
                    <span className="block text-xs text-muted">{p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <figcaption className="mt-4 text-xs leading-relaxed text-muted">
              Marked: places named in RG Group’s own record. RG products reach 31+ countries in all; the full list is not published here.
            </figcaption>
          </figure>
        </div>

        <Reveal className="mt-14 border-t border-line pt-10 md:mt-28 md:pt-12">
          <p className="display h-l max-w-5xl">
            <span className="label mb-5 block text-accent">2025 — and beyond</span>
            Driving global expansion to bring RG Foods to <em>every corner of the world</em> by 2030.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
