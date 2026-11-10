import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { Rule } from "@/components/animations/Rule";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandMarks, ventures } from "@/lib/content";
import { cn } from "@/lib/utils";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Corporate portfolio: flagship houses as full editorial spreads, the rest as a ruled register. */
export function BusinessSection({ index = "02" }: { index?: string }) {
  const featured = ventures.filter((v) => v.photo);
  const rest = ventures.filter((v) => !v.photo);

  return (
    <section className="tone-charcoal section overflow-hidden" aria-label="Enterprises">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading index={index} eyebrow="Enterprises" title="The *enterprises* of RG Group" className="lg:col-span-7" />
          <Reveal className="lead muted lg:col-span-4 lg:col-start-9">
            Recognising the need for diversification, Vishnu R G led RG Group’s expansion into new verticals and global markets.
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 md:mt-36 md:space-y-44">
          {featured.map((v, i) => (
            <article key={v.name} className="group">
              <p className="label text-accent">
                <span className="numeral mr-4 text-base tracking-normal text-muted">{String(i + 1).padStart(2, "0")}</span>
                {v.category}
              </p>
              <Rule className="mt-5" />
              <TextReveal as="h3" text={v.name} className={cn("display h-xl mt-6 md:mt-10", i % 2 === 1 && "md:text-right")} />

              <div className="mt-7 grid gap-7 md:mt-14 md:gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
                <ImageReveal from={i % 2 ? "right" : "left"} className={cn("grade frame aspect-[16/10] lg:col-span-8", i % 2 === 1 && "lg:order-2 lg:col-start-5")}>
                  <ParallaxImage photo={v.photo!} sizes="(min-width: 1024px) 66vw, 100vw" amount={8} className="h-full w-full" />
                </ImageReveal>
                <div className={cn("lg:col-span-3 lg:pb-2", i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-10")}>
                  <Reveal as="p" className="leading-[1.85] text-fg/75">
                    {v.description}
                  </Reveal>
                  {v.url && (
                    <Reveal className="mt-8">
                      <a href={v.url} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-3 border-b border-line pb-2 font-serif text-xl transition-colors duration-500 hover:border-accent">
                        {host(v.url)}
                        <ArrowUpRight size={16} aria-hidden className="text-accent transition-transform duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    </Reveal>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 md:mt-48">
          <p className="eyebrow">The wider group</p>
          <Reveal stagger as="ul" className="mt-8 border-t border-line md:mt-10">
            {rest.map((v, i) => (
              <li key={v.name} className="group relative border-b border-line">
                <span aria-hidden className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-1000 ease-[var(--ease-lux)] group-hover:scale-x-100" />
                {/* Mobile: number in a narrow gutter, name / category / description stacked beside it. */}
                <div className="grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-2 py-7 md:grid-cols-12 md:items-baseline md:gap-6 md:py-12">
                  <span className="numeral row-span-3 pt-1.5 text-base text-muted md:col-span-1 md:row-span-1 md:pt-0">{String(featured.length + i + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-[clamp(1.85rem,8vw,2.4rem)] leading-[1.05] transition-[transform,color] duration-700 ease-[var(--ease-lux)] md:col-span-6 md:text-[3.6rem] md:leading-none md:group-hover:translate-x-4 md:group-hover:italic">
                    {v.name}
                  </h3>
                  <p className="label text-accent md:col-span-2">{v.category}</p>
                  <p className="text-[0.95rem] leading-relaxed text-fg/70 md:col-span-3 md:text-sm">{v.description}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-5 md:mt-20 md:gap-x-10">
          <p className="label w-full text-muted md:w-auto">Brand family</p>
          {brandMarks.map((b) => (
            <div key={b.alt} className="relative h-14 w-20 overflow-hidden md:h-16 md:w-24 bg-ivory p-2 opacity-90 transition-opacity duration-500 hover:opacity-100">
              <Image src={b.src} alt={b.alt} fill sizes="96px" className="object-contain p-1.5" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
