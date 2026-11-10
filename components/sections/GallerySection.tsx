import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/lib/content";
import { cn } from "@/lib/utils";

const COVER = 1;
// Asymmetric editorial composition after the cinematic cover: [gallery index, grid placement, aspect]
const LAYOUT: [number, string, string][] = [
  [4, "md:col-span-4 md:col-start-1", "aspect-[3/4]"],
  [9, "md:col-span-4 md:col-start-6 md:mt-40", "aspect-[2/3]"],
  [6, "md:col-span-3 md:col-start-10 md:mt-16", "aspect-[4/5]"],
  [13, "md:col-span-6 md:col-start-2 md:mt-12", "aspect-[3/2]"],
  [7, "md:col-span-4 md:col-start-9 md:mt-28", "aspect-[4/5]"],
];

const Caption = ({ n, text, className }: { n: number; text: string; className?: string }) => (
  <figcaption className={cn("mt-4 flex items-baseline gap-3 text-xs text-muted", className)}>
    <span className="numeral text-sm text-accent">{String(n).padStart(2, "0")}</span>
    {text}
  </figcaption>
);

export function GallerySection() {
  const cover = gallery[COVER];
  return (
    <section className="tone-charcoal section overflow-hidden" aria-label="Gallery">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="07" eyebrow="Gallery & media" title="On stage, *in the field,* among people." />
          <Reveal>
            <Link href="/gallery" className="btn shrink-0">
              View the full gallery <ArrowUpRight size={14} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Cinematic cover: near full-bleed, drifting inside a letterbox frame */}
      <figure className="group mt-16 px-[var(--gutter)] md:mt-24 xl:px-[calc(var(--gutter)/2)]">
        <Link href="/gallery" aria-label={`${cover.caption} — open gallery`} className="block">
          <ImageReveal className="grade frame aspect-[4/3] w-full md:aspect-[21/9]">
            <ParallaxImage photo={cover} sizes="100vw" amount={12} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent" />
            <p className="absolute bottom-5 left-5 flex items-baseline gap-3 text-sm text-ivory/90 md:bottom-8 md:left-8">
              <span className="numeral text-accent">01</span>
              {cover.caption}
            </p>
          </ImageReveal>
        </Link>
      </figure>

      <div className="wrap mt-6 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-12 md:gap-6">
        {LAYOUT.map(([i, place, aspect], n) => {
          const item = gallery[i];
          return (
            <figure key={item.src.src} className={cn("group", place, n === 2 && "col-span-2")}>
              <Link href="/gallery" aria-label={`${item.caption} — open gallery`} className="block">
                <ImageReveal from={n % 2 ? "right" : "bottom"} className={cn("grade frame w-full", aspect)}>
                  <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 40vw, 50vw" placeholder="blur" className="object-cover" />
                </ImageReveal>
              </Link>
              <Caption n={n + 2} text={item.caption} />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
