import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GlobalPresenceSection } from "@/components/sections/GlobalPresenceSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, organisations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Enterprises",
  description:
    "RG Group's enterprises led by Vishnu R G — RG Foods, RG Gingelly Oil, Pride India Exports, RG Marines, RG Links and RG Arcade.",
  alternates: { canonical: "/business" },
  openGraph: { title: "Enterprises — Vishnu R G", images: ["/images/journal-3.webp"] },
};

export default function BusinessPage() {
  return (
    <>
      <PageHeader eyebrow="Enterprises · RG Group" title={"A Kerala legacy,\n*diversified.*"} intro={faqs[0].answer} tone="ivory" />
      <BusinessSection index="01" />

      <section className="tone-cream section" aria-label="Organisations">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeading index="02" eyebrow="Organisations" title="The *group* in full." titleClass="h-l" className="lg:col-span-5" />
          <Reveal stagger as="ol" className="border-t border-line lg:col-span-6 lg:col-start-7">
            {organisations.map((o, i) => (
              <li key={o} className="group flex items-baseline gap-6 border-b border-line py-5">
                <span className="numeral w-8 shrink-0 text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl transition-transform duration-700 ease-[var(--ease-lux)] group-hover:translate-x-2 md:text-[2rem]">{o}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <GlobalPresenceSection index="03" />
      <ContactSection />
    </>
  );
}
