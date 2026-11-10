import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ContactSection } from "@/components/sections/ContactSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { aboutChapters, dossier, faqs, organisations, site } from "@/lib/content";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Vishnu R G — third generation of RG Group, founded in 1940 — and how he led its rebranding, certifications and expansion into 31+ countries.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Vishnu R G", images: ["/images/gallery/g15.webp"] },
};

// One authentic photograph between chapters (after the chapter at the same index).
const interludes: (Photo | null)[] = [
  { src: media.g13, alt: "Vishnu R G in conversation" },
  null,
  { src: media.t2015, alt: "Vishnu R G on stage" },
  { src: media.g16, alt: "At an RG Foods exhibition pavilion" },
  null,
  null,
];

export default function AboutPage() {
  return (
    <>
      <header className="tone-espresso grain relative overflow-hidden pt-28 md:pt-40">
        <div aria-hidden className="absolute -right-[10%] top-0 h-[90vh] w-[60vw] rounded-full bg-burgundy/45 blur-[150px]" />
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="pb-8 lg:col-span-7 lg:pb-24">
            <Reveal onLoad>
              <p className="eyebrow">About · {site.role}</p>
            </Reveal>
            <TextReveal as="h1" onLoad delay={0.05} text={"The third generation\nof a legacy *since 1940.*"} className="display h-xl mt-8" />
            <Reveal onLoad delay={0.5} as="p" className="lead mt-8 text-fg/70">
              Born into a legacy of entrepreneurial excellence — leading RG Group into a new era with a rare blend of traditional wisdom and modern vision.
            </Reveal>
          </div>
          <ImageReveal onLoad className="relative mx-auto aspect-[1100/1186] w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div aria-hidden className="absolute inset-x-[8%] bottom-0 top-[12%] rounded-t-full bg-burgundy" />
            <div aria-hidden className="absolute inset-x-[5%] bottom-0 top-[9%] rounded-t-full border border-accent/40" />
            <Image src={media.portraitCutout} alt={`${site.name}, portrait`} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-contain object-bottom" />
          </ImageReveal>
        </div>
      </header>

      <section className="tone-ivory section" aria-label="Biography">
        <div className="wrap">
          {aboutChapters.map((ch, i) => (
            <div key={ch.id}>
              <article id={ch.id} className="grid gap-6 border-t border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="numeral text-7xl leading-none text-accent md:text-8xl">{ch.numeral}</p>
                    <TextReveal as="h2" text={ch.title} className="display h-m mt-5 text-fg" />
                  </div>
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  <Reveal stagger className="space-y-6 text-[1.08rem] leading-[1.9] text-fg/80">
                    {ch.paragraphs.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </Reveal>
                  {"ventures" in ch && ch.ventures && (
                    <Reveal stagger as="ul" className="mt-10 border-t border-line">
                      {ch.ventures.map((v) => (
                        <li key={v.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                          <span className="font-serif text-2xl font-medium">{v.name}</span>
                          <span className="text-fg/70">{v.text}</span>
                        </li>
                      ))}
                    </Reveal>
                  )}
                  {"closing" in ch && ch.closing && <Reveal as="p" className="mt-8 font-serif text-[1.8rem] italic leading-snug text-burgundy">{ch.closing}</Reveal>}
                  {"quote" in ch && ch.quote && (
                    <Reveal as="blockquote" className="mt-12 border-l border-accent pl-8 font-serif text-[clamp(1.9rem,3vw,2.8rem)] italic leading-[1.2]">
                      “{ch.quote}”
                    </Reveal>
                  )}
                </div>
              </article>
              {interludes[i] && (
                <ImageReveal className={cn("grade mb-14 aspect-[16/9] md:mb-20 md:aspect-[21/9]", i % 2 ? "lg:mr-[16%]" : "lg:ml-[16%]")}>
                  <ParallaxImage photo={interludes[i]!} sizes="100vw" amount={12} position="50% 35%" />
                </ImageReveal>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="tone-charcoal section" aria-label="Profile">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Profile</p>
            <TextReveal as="h2" text="At a *glance.*" className="display h-l mt-6" />
            <Reveal className="mt-10">
              <a href={site.profilePdf} target="_blank" rel="noopener" className="btn">
                Download profile (PDF)
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal stagger as="dl" className="border-t border-line">
              {dossier.map((d) => (
                <div key={d.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="label pt-1 text-muted">{d.label}</dt>
                  <dd className="text-fg/90">
                    {d.href ? (
                      <a href={d.href} className="link-line">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </Reveal>
            <h3 className="label mt-14 text-accent">Organisations</h3>
            <Reveal stagger as="ul" className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {organisations.map((o) => (
                <li key={o} className="border-b border-line py-4 font-serif text-xl">
                  {o}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <LeadershipSection index="—" tone="cream" />

      <section className="tone-espresso section" aria-label="Frequently asked questions">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <TextReveal as="h2" text="Frequently asked *questions.*" className="display h-l mt-6" />
            <p className="mt-6 text-fg/70">Here are some of the questions we get asked the most. Hopefully, you’ll find the answers you’re looking for.</p>
          </div>
          <Reveal stagger className="border-t border-line lg:col-span-7 lg:col-start-6">
            {faqs.map((f, i) => (
              <details key={f.question} className="group border-b border-line" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 font-serif text-2xl leading-snug transition-colors duration-500 hover:text-accent md:text-[1.85rem] [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <Plus size={20} aria-hidden className="mt-1 shrink-0 text-accent transition-transform duration-500 group-open:rotate-45" />
                </summary>
                <p className="pb-8 pr-10 leading-[1.85] text-fg/75">{f.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
