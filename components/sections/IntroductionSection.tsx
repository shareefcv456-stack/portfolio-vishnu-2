import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Generations } from "@/components/sections/Generations";
import { intro, site } from "@/lib/content";
import { media } from "@/lib/media";

export function IntroductionSection() {
  return (
    <section id="introduction" className="tone-ivory section overflow-hidden" aria-label="About Vishnu R G">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-2 lg:pt-4">
            <p className="eyebrow">
              <span className="numeral tracking-normal">01</span>About
            </p>
          </Reveal>
          <TextReveal
            as="p"
            stagger={0.03}
            className="display h-l lg:col-span-10"
            text="Fuelled by *innovation* and guided by *purpose,* I combine effort and strategy to shape a legacy of lasting success."
          />
        </div>

        <div className="mt-20 grid gap-16 md:mt-32 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-6">
            <ImageReveal from="left" className="grade aspect-[6/5] w-full">
              <ParallaxImage photo={{ src: media.g11, alt: `${site.name} in a navy suit` }} sizes="(min-width: 1024px) 50vw, 100vw" />
            </ImageReveal>
            <ImageReveal
              delay={0.3}
              className="grade relative -mt-20 ml-auto mr-[-0.5rem] w-[44%] outline outline-[10px] outline-ivory md:-mt-36 lg:mr-[-14%]"
            >
              <Image src={media.g9} alt={`${site.name}, informal portrait`} sizes="(min-width: 1024px) 22vw, 44vw" placeholder="blur" className="aspect-[4/5] h-auto w-full object-cover" />
            </ImageReveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <TextReveal as="h2" text={intro.heading} className="display h-m" />
            <Reveal stagger className="mt-8 space-y-5 text-[1.05rem] leading-[1.9] text-fg/80">
              {intro.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Reveal>
            <Reveal className="mt-12 flex flex-wrap items-center gap-8">
              <Link href="/about" className="btn">
                Know more <ArrowUpRight size={14} aria-hidden />
              </Link>
              <a href={site.profilePdf} target="_blank" rel="noopener" className="label link-line">
                Download profile
              </a>
            </Reveal>
          </div>
        </div>

        <Generations className="mt-28 md:mt-40" />
      </div>
    </section>
  );
}
