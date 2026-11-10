import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { ScrubText } from "@/components/animations/ScrubText";
import type { Tone } from "@/components/layout/PageHeader";
import { philosophy, site } from "@/lib/content";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

/** The statement: a quote that brightens word by word beside a portrait set on a burgundy plinth. */
export function PhilosophySection({ tone = "cream", index = "06" }: { tone?: Tone; index?: string }) {
  return (
    <section className={cn(`tone-${tone}`, "section relative overflow-hidden")} aria-label="Business philosophy">
      <div className="wrap relative grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="relative lg:sticky lg:top-24">
            <span aria-hidden className="absolute -bottom-5 -left-5 top-12 right-12 bg-burgundy md:-bottom-8 md:-left-8" />
            <ImageReveal className="grade relative aspect-[3/4] w-full">
              <ParallaxImage photo={{ src: media.g12, alt: `${site.name} in a green blazer` }} sizes="(min-width: 1024px) 40vw, 100vw" amount={8} position="50% 30%" />
            </ImageReveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <Reveal>
            <p className="eyebrow">
              <span className="numeral tracking-normal">{index}</span>Philosophy
            </p>
          </Reveal>
          <span aria-hidden className="mt-10 block font-serif text-[9rem] italic leading-[0.45] text-accent">“</span>
          <ScrubText text={philosophy.quote} className="display mt-4 text-[clamp(2.2rem,4.2vw,4rem)] italic leading-[1.08]" />
          <Reveal as="p" className="label mt-10 flex items-center gap-4 text-accent">
            <span className="h-px w-10 bg-current" /> {site.name}
          </Reveal>

          <div className="mt-24 border-t border-line pt-12">
            <Reveal as="h2" className="font-serif text-[2.4rem] font-medium leading-tight md:text-5xl">
              {philosophy.title}
            </Reveal>
            <Reveal stagger className="mt-7 space-y-5 leading-[1.9] text-fg/80">
              {philosophy.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Reveal>
            <Reveal stagger as="ol" className="mt-12 border-t border-line">
              {philosophy.pillars.map((p, i) => (
                <li key={p} className="flex items-baseline gap-6 border-b border-line py-5">
                  <span className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl md:text-3xl">{p}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
