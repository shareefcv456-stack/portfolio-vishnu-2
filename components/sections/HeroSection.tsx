"use client";

import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { Rule } from "@/components/animations/Rule";
import { TextReveal } from "@/components/animations/TextReveal";
import { EASE, MOTION_OK, gsap, introDelay, useGSAP } from "@/lib/animations";
import { heroStats, site } from "@/lib/content";
import { media } from "@/lib/media";

/**
 * Cinematic opener: editorial headline left, portrait set in a bronze-offset frame right,
 * verified figures along the base. On scroll the scene gains depth — copy lifts, portrait pushes in.
 */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Entrance: the bronze frame and vertical labels settle after the portrait opens.
        gsap.from("[data-hero-frame]", { autoAlpha: 0, x: -24, y: -24, duration: 1.8, ease: EASE, delay: introDelay() + 0.9 });
        gsap.from("[data-hero-side]", { autoAlpha: 0, duration: 1.4, delay: introDelay() + 1.2 });

        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-bg]", { yPercent: 28, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-copy]", { yPercent: -14, autoAlpha: 0.15, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-portrait]", { scale: 1.08, yPercent: -4, ease: "none", scrollTrigger: st });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="tone-espresso grain relative overflow-hidden" aria-labelledby="hero-title">
      {/* Depth: warm burgundy light, hollow founding year */}
      <div aria-hidden data-hero-bg className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[15%] -top-[20%] h-[95vh] w-[70vw] rounded-full bg-burgundy/55 blur-[150px]" />
        <div className="absolute -bottom-[25%] -left-[10%] h-[55vh] w-[45vw] rounded-full bg-bronze/10 blur-[140px]" />
        <span className="outline-type absolute -left-[1%] bottom-[4%] hidden font-serif leading-none lg:block" style={{ fontSize: "clamp(10rem, 36vw, 36rem)" }}>
          1940
        </span>
      </div>

      {/* Vertical edge labels (desktop) */}
      <p data-hero-side aria-hidden className="label absolute left-7 top-1/2 hidden -translate-x-1/2 -rotate-90 whitespace-nowrap text-muted 2xl:block">
        {site.location} · India
      </p>

      <div className="wrap relative grid min-h-[100svh] grid-cols-1 gap-12 pb-10 pt-28 md:pt-32 lg:grid-cols-12 lg:gap-6 lg:pb-12">
        <div data-hero-copy className="relative z-10 flex flex-col justify-between max-lg:pt-[max(30svh,13rem)] lg:col-span-7 lg:py-6">
          <Reveal onLoad delay={0.1}>
            <p className="eyebrow">I’m in Kerala · RG Group since 1940</p>
          </Reveal>

          <div className="mt-6 lg:mt-0">
            <TextReveal
              as="h1"
              onLoad
              delay={0.15}
              stagger={0.09}
              text={"Building *Legacies.*\nCreating *Possibilities.*"}
              className="display h-hero lg:[&>span:last-child]:pl-[10%]"
            />

            <Reveal onLoad delay={0.75} stagger className="mt-10 grid gap-8 md:mt-12 xl:grid-cols-[auto_1fr] xl:items-end xl:gap-14">
              <div className="border-l border-accent pl-5">
                <p className="font-serif text-[2rem] font-medium leading-none md:text-[2.6rem]" id="hero-title">
                  {site.name}
                </p>
                <p className="label mt-3 text-muted">CEO / Executive Director — RG Group</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-solid">
                  Work with Vishnu <ArrowUpRight size={14} aria-hidden />
                </Link>
                <a href={site.profilePdf} target="_blank" rel="noopener" className="btn">
                  Profile <FileText size={14} aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Mobile: the portrait becomes a full-bleed cinematic backdrop with the headline set over its lower edge. */}
        <div className="max-lg:absolute max-lg:inset-x-0 max-lg:top-0 max-lg:h-[min(80svh,48rem)] lg:relative lg:col-span-5">
          <span data-hero-frame aria-hidden className="absolute inset-0 hidden translate-x-3 translate-y-3 border border-accent/40 md:translate-x-5 md:translate-y-5 lg:inset-y-6 lg:block" />
          <ImageReveal onLoad delay={0} className="relative h-full w-full lg:absolute lg:inset-y-6 lg:h-auto">
            <div data-hero-portrait className="absolute inset-0">
              <ParallaxImage
                photo={{ src: media.g15, alt: `${site.name}, ${site.role}` }}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                amount={5}
                className="grade h-full w-full"
                position="50% 18%"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/40 lg:from-espresso/80 lg:via-espresso/5 lg:to-espresso/20" />
            <p className="label absolute right-5 top-5 hidden text-fg/80 lg:block">Est. 1940</p>
            <p className="label absolute bottom-5 left-5 right-5 hidden text-fg/85 lg:block">Third generation · CEO & Executive Director</p>
          </ImageReveal>
        </div>

        <div className="relative lg:col-span-12">
          <Rule onLoad delay={1} className="mb-7" />
          <Reveal onLoad delay={1.1} className="flex items-end justify-between gap-6">
            <dl className="grid flex-1 grid-cols-3 gap-4 md:max-w-2xl md:gap-12">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="label order-2 mt-2 text-muted">{s.label}</dt>
                  <dd className="numeral -order-1 text-[clamp(2rem,10vw,2.6rem)] leading-none md:text-6xl">
                    <AnimatedCounter {...s} />
                  </dd>
                </div>
              ))}
            </dl>
            <a href="#introduction" className="group hidden items-center gap-5 md:flex" aria-label="Scroll to introduction">
              <span className="label text-muted transition-colors duration-500 group-hover:text-fg">Discover</span>
              <span className="relative grid size-16 place-items-center rounded-full border border-line transition-colors duration-700 group-hover:border-accent">
                <span className="scroll-cue relative block h-7 w-px overflow-hidden bg-line" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
