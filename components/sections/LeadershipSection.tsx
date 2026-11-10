import Image from "next/image";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import type { Tone } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { awards, recognitionPhotos, stats } from "@/lib/content";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Verified figures as an editorial composition, then the awards record as a ledger. */
export function LeadershipSection({ index = "04", tone = "ivory" }: { index?: string; tone?: Tone }) {
  const [lead, ...figures] = stats;
  return (
    <section className={cn(`tone-${tone}`, "section overflow-hidden")} aria-label="Recognition">
      <div className="wrap">
        <SectionHeading index={index} eyebrow="Recognition" title="Each award represents *dedication,* hard work and a commitment to success." titleClass="h-l max-w-5xl" />

        <div className="mt-20 grid gap-12 border-t border-line pt-12 md:mt-28 lg:grid-cols-12 lg:gap-8">
          <Reveal as="dl" className="flex flex-col lg:col-span-5">
            <dt className="order-2 mt-6 max-w-xs leading-snug text-muted">{lead.label}</dt>
            <dd className="numeral order-1 leading-[0.8] tracking-[-0.03em]" style={{ fontSize: "clamp(6rem, 15vw, 13rem)" }}>
              <AnimatedCounter {...lead} />
            </dd>
          </Reveal>
          <Reveal stagger as="dl" className="grid grid-cols-2 border-l-0 border-line lg:col-span-6 lg:col-start-7 lg:border-l">
            {figures.map((s, i) => (
              <div key={s.label} className={cn("flex flex-col border-line py-7 lg:px-8", i < 2 && "border-b", i % 2 === 0 && "pr-4 lg:pl-8", i % 2 === 1 && "border-l pl-6")}>
                <dt className="order-2 mt-3 max-w-[13rem] text-sm leading-snug text-muted">{s.label}</dt>
                <dd className="numeral order-1 text-[3.2rem] leading-none md:text-[4.4rem]">
                  <AnimatedCounter {...s} />
                </dd>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-28 grid gap-14 md:mt-40 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ImageReveal className="grade aspect-[4/5] w-full">
                <Image src={media.podium} alt="Vishnu R G addressing an audience from the podium" fill sizes="(min-width: 1024px) 33vw, 100vw" placeholder="blur" className="object-cover" />
              </ImageReveal>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {recognitionPhotos.map((p) => (
                  <div key={p.alt} className="grade frame relative aspect-square">
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 8vw, 25vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ol className="border-t border-line lg:col-span-7 lg:col-start-6">
            {awards.map((a) => (
              <Reveal as="li" key={a.name} className="group grid gap-4 border-b border-line py-10 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <p className="numeral text-5xl leading-none text-accent transition-transform duration-700 ease-[var(--ease-lux)] group-hover:-translate-y-1">{a.year}</p>
                <div>
                  <h3 className="font-serif text-[1.75rem] font-medium leading-snug md:text-[2.1rem]">{a.name}</h3>
                  <p className="label mt-3 text-muted">{a.by}</p>
                  <p className="mt-4 leading-relaxed text-fg/75">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
