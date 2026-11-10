"use client";

import Image from "next/image";
import { useRef } from "react";
import { EASE, gsap, useGSAP } from "@/lib/animations";
import { milestones, timelineIntro } from "@/lib/content";
import { cn } from "@/lib/utils";

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";

/**
 * Leadership journey. Desktop: the section pins and the milestones travel horizontally,
 * with a live year read-out and progress rule. Mobile / reduced motion: a plain vertical timeline.
 */
export function TimelineSection({ index = "03", toneFrom }: { index?: string; /** Colour of the section above: the background warms from it as this one arrives. */ toneFrom?: string }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const barY = useRef<HTMLSpanElement>(null);
  const year = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      if (toneFrom)
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.from(ref.current, { backgroundColor: toneFrom, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 25%", scrub: true } });
        });

      mm.add(DESKTOP, () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth;
        let active = -1;
        const setYear = (i: number) => {
          if (i === active) return;
          active = i;
          year.current!.textContent = milestones[i].year;
          gsap.fromTo(year.current, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: EASE });
        };

        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            scrub: 0.8,
            end: () => `+=${dist()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              bar.current!.style.transform = `scaleX(${self.progress})`;
              setYear(Math.min(milestones.length - 1, Math.round(self.progress * (milestones.length - 1))));
            },
          },
        });

        el.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
          const st = { trigger: card, containerAnimation: tween, start: "left 92%", end: "left 40%", scrub: true };
          gsap.from(card.querySelector("[data-photo]"), { clipPath: "inset(0% 0% 0% 100%)", ease: "none", scrollTrigger: st });
          gsap.from(card.querySelector("[data-year]"), { yPercent: 35, autoAlpha: 0.15, ease: "none", scrollTrigger: st });
        });
      });

      mm.add(MOBILE, () => {
        gsap.from(barY.current, {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: track.current, start: "top 70%", end: "bottom 70%", scrub: true },
        });
        track.current!.querySelectorAll("[data-card]").forEach((card) =>
          gsap.from(card, { autoAlpha: 0, x: 24, duration: 1.1, ease: EASE, scrollTrigger: { trigger: card, start: "top 85%", once: true } })
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="tone-burgundy grain relative overflow-hidden lg:h-[100svh]" aria-labelledby="journey-title">
      <div className="wrap relative py-[var(--section)] lg:flex lg:h-full lg:max-w-none lg:items-center lg:p-0 lg:motion-reduce:overflow-x-auto">
        <ol ref={track} className="relative flex flex-col gap-14 pl-8 lg:flex-row lg:items-center lg:gap-[6vw] lg:pl-[var(--gutter)] lg:pr-[12vw]">
          {/* Mobile vertical rule */}
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line lg:hidden">
            <span ref={barY} className="absolute inset-0 origin-top bg-accent" />
          </span>

          <li className="list-none lg:w-[30vw] lg:shrink-0">
            <p className="eyebrow">
              <span className="numeral tracking-normal">{index}</span>Leadership journey
            </p>
            <h2 id="journey-title" className="display h-l mt-6">
              The path to <em>success</em> of RG Group
            </h2>
            <p className="mt-6 max-w-md leading-[1.85] text-fg/75">{timelineIntro.text}</p>
            <p className="label mt-10 hidden text-muted lg:block">Scroll to travel through time →</p>
          </li>

          {milestones.map((m, i) => (
            <li key={m.year} data-card className="relative list-none lg:w-[34vw] lg:max-w-[560px] lg:shrink-0">
              <span aria-hidden className={cn("absolute -left-8 top-3 -translate-x-1/2 rounded-full lg:hidden", m.current ? "size-3 bg-accent" : "size-2 bg-fg/60")} />
              <div data-photo className="grade frame relative aspect-[3/2] w-full overflow-hidden" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
                <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 1024px) 34vw, 90vw" placeholder="blur" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-burgundy/20 mix-blend-multiply" />
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-start sm:gap-6">
                <p data-year className={cn("numeral shrink-0 text-[clamp(3.4rem,15vw,4.2rem)] leading-[0.85] md:text-[5.4rem]", m.current ? "italic text-accent" : "text-fg")}>
                  {m.year}
                </p>
                <p className="text-base leading-relaxed text-fg/80 sm:pt-1 sm:text-[0.95rem]">
                  <span className="label mb-2 block text-muted">
                    Chapter {String(i + 1).padStart(2, "0")}
                    {m.current && " · Now"}
                  </span>
                  {m.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop HUD: live year + progress rule */}
        <div aria-hidden className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-8 hidden items-center gap-8 lg:flex">
          <span className="block h-[1.2em] overflow-hidden font-serif text-3xl italic leading-none text-accent">
            <span ref={year} className="block">
              {milestones[0].year}
            </span>
          </span>
          <span className="relative h-px flex-1 bg-line">
            <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-accent" />
          </span>
          <span className="font-serif text-3xl leading-none text-fg/40">{milestones.at(-1)!.year}</span>
        </div>
      </div>
    </section>
  );
}
