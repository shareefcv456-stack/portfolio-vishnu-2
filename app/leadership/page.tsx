import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { Generations } from "@/components/sections/Generations";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timelineIntro } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership Journey",
  description: "From 1940 to today — three generations of leadership and the milestones of RG Group under Vishnu R G.",
  alternates: { canonical: "/leadership" },
  openGraph: { title: "Leadership Journey — Vishnu R G", images: ["/images/gallery/g4.webp"] },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeader eyebrow="Leadership journey · 1940 – today" title={"Three generations,\none *direction.*"} intro={timelineIntro.text} tone="espresso" />

      <section className="tone-ivory section" aria-label="Three generations">
        <div className="wrap">
          <SectionHeading index="01" eyebrow="Lineage" title="From founder to *third generation.*" titleClass="h-l max-w-4xl" />
          <Generations className="mt-16 md:mt-24" />
        </div>
      </section>

      <TimelineSection index="02" />
      <LeadershipSection index="03" />
      <PhilosophySection tone="espresso" index="04" />
      <ContactSection />
    </>
  );
}
